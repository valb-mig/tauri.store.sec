use std::error::Error;
use serde::Serialize;
use serde_json;
use chrono::Utc;
use rusqlite::{ Connection, Result };

#[derive(Debug, Serialize)]
struct User {
    name: String,
    date: String,
}

#[derive(Serialize)]
pub struct ReturnResponse {
    success: bool,
    response: String
}

fn add_token(token: String) -> Result<User, Box<dyn Error>> {

    let os_user = whoami::username().to_string();

    if !check_user(&os_user)? {

        let current_time = Utc::now();
        let formatted_time = current_time.format("%Y-%m-%d %H:%M:%S").to_string();
    
        let token_hash = token.to_string();

        let conn = match Connection::open("db/sqlite.db") {
            Ok(c) => c,
            Err(e) => panic!("[Rust] Error: opening database: {}", e),
        };
    
        let new_user = User {
            name: os_user.clone(),
            date: formatted_time.to_string()
        };

        conn.execute(
            "INSERT INTO user (name, auth, date) VALUES (?1, ?2, ?3)",
            (&new_user.name, token_hash, &new_user.date),
        )?;

        println!("[Rust] Token: {}", token);
        println!("[Rust] User: {}", os_user);

        Ok(new_user)
    }
    else
    {
        Err(Box::new(std::io::Error::new(std::io::ErrorKind::Other, "[Rust] User already exists")))
    }
}

fn check_user(name: &str) -> Result<bool> {
    let conn = Connection::open("db/sqlite.db")?;
    let mut stmt = conn.prepare("SELECT COUNT(*) FROM user WHERE name = ?1")?;
    let mut rows = stmt.query(&[name])?;

    if let Some(row) = rows.next()? {
        let count: i32 = row.get(0)?;
        Ok(count > 0)
    } else {
        Err(rusqlite::Error::QueryReturnedNoRows)    
    }
}

#[tauri::command]
pub fn run_add_token(token: String) -> ReturnResponse {
    match add_token(token) {
        Ok(new_user) => ReturnResponse {
            success: true,
            response: serde_json::to_string(&new_user).unwrap(),
        },
        Err(err) => ReturnResponse {
            success: false,
            response: format!("[Rust] Error: {}", err),
        },
    }
}