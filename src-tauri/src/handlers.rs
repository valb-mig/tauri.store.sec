use chrono::Utc;
use rusqlite::{ Connection, Result };

#[derive(Debug)]
struct User {
    id:   i32,
    name: String,
    auth: String,
    date: String,
}

fn add_token(token: String) -> Result <()> {

    let os_user = whoami::username().to_string();

    if !check_user(&os_user)? {

        let current_time = Utc::now();
        let formatted_time = current_time.format("%Y-%m-%d %H:%M:%S").to_string();
    
        let conn = match Connection::open("db/sqlite.db") {
            Ok(c) => c,
            Err(e) => panic!("[Rust] Error: opening database: {}", e),
        };
    
        let new_user = User {
            id:   0,
            name: os_user.clone(),
            auth: token.to_string(),
            date: formatted_time.to_string(),
        };
        conn.execute(
            "INSERT INTO user (name, auth, date) VALUES (?1, ?2, ?3)",
            (&new_user.name, &new_user.auth, &new_user.date),
        )?;
    }
    else
    {
        println!("[Rust] User already exists");
    }

    println!("[Rust] Token: {}", token);
    println!("[Rust] User: {}", os_user);

    Ok(())
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
pub fn run_add_token(token: String) {
    let _ = add_token(token);
}