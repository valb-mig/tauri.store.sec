use std::error::Error;
use serde::Serialize;
use serde_json;
use chrono::Local;

use crate::database::connection;

pub mod helpers;

use helpers::{
    hash_token,
    verify_password
};

#[derive(Debug, Serialize)]
struct User {
    name: String,
    create_date: String,
}

#[derive(Debug, Serialize)]
struct Password {
    title: String,
    password: String,
}

#[derive(Serialize)]
pub struct ReturnResponse {
    success: bool,
    response: String
}

// Commands

#[tauri::command]
pub fn run_get_passwords() -> ReturnResponse {
    match get_passwords() {
        Ok(response_passwords) => ReturnResponse {
            success: true,
            response: serde_json::to_string(&response_passwords).unwrap(),
        },
        Err(err) => ReturnResponse {
            success: false,
            response: format!("[Rust] Error: {}", err),
        },
    }
}

#[tauri::command]
pub fn run_add_password(title: &str, password: &str) -> ReturnResponse {

    match add_password(title, password) {
        Ok(_bool) => ReturnResponse {
            success: true,
            response: "[Rust] Password saved".to_string(),
        },
        Err(err) => ReturnResponse {
            success: false,
            response: format!("[Rust] Error: {}", err),
        },
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

#[tauri::command]
pub fn run_verify_token(token: String) -> ReturnResponse {
    match verify_token(token) {
        Ok(response_user) => ReturnResponse {
            success: true,
            response: serde_json::to_string(&response_user).unwrap(),
        },
        Err(err) => ReturnResponse {
            success: false,
            response: format!("[Rust] Error: {}", err),
        },
    }
}

#[tauri::command]
pub fn run_check_user() -> ReturnResponse {

    let os_user = whoami::username().to_string();

    match check_user(&os_user) {
        Ok(_) => ReturnResponse {
            success: true,
            response: format!("[Rust] User exists"),
        },
        Err(err) => ReturnResponse {
            success: false,
            response: format!("[Rust] Error: {}", err),
        },
    }
}

// Command Handlers

fn add_password(title: &str, password: &str) -> Result<bool, Box<dyn Error>> {
    
    let os_user = whoami::username().to_string();

    if check_user(&os_user)? {

        let conn = connection()?;

        let current_time = Local::now();
        let formatted_time = current_time.format("%Y-%m-%d %H:%M:%S").to_string();

        conn.execute(
            "INSERT INTO sec_passwords (title, password, create_date, last_update) VALUES (?1, ?2, ?3, ?4)",
            (&title, &password, formatted_time.to_string(), formatted_time.to_string()),
        )?;
    }

    Ok(false)
}

fn add_token(token: String) -> Result<User, Box<dyn Error>> {

    let os_user = whoami::username().to_string();

    if !check_user(&os_user)? {

        let current_time = Local::now();
        let formatted_time = current_time.format("%Y-%m-%d %H:%M:%S").to_string();
    
        let token_hash = hash_token(&token)?;

        let conn = connection()?;
    
        let new_user = User {
            name: os_user.clone(),
            create_date: formatted_time.to_string()
        };

        conn.execute(
            "INSERT INTO sec_user (name, auth, create_date, last_login) VALUES (?1, ?2, ?3, ?4)",
            (&new_user.name, token_hash, &new_user.create_date, formatted_time.to_string()),
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

fn check_user(name: &str) -> Result<bool, Box<dyn Error>> {
    
    let conn = connection()?;
    let mut stmt = conn.prepare("SELECT COUNT(*) FROM sec_user WHERE name = ?1")?;
    let mut rows = stmt.query(&[name])?;

    if let Some(row) = rows.next()? {
        let count: i32 = row.get(0)?;
        Ok(count > 0)
    } else {
        Err(Box::new(rusqlite::Error::QueryReturnedNoRows))  
    }
}

fn verify_token(token: String) -> Result<User, Box<dyn Error>> {

    let os_user = whoami::username().to_string();

    let conn = connection()?;
    let mut stmt = conn.prepare("SELECT name, auth, create_date FROM sec_user WHERE name = ?1")?;

    let user = stmt.query_row([os_user], |row| {

        let auth_hash: String = row.get(1)?;

        if verify_password(token.as_str(), &auth_hash) {
            Ok( User {
                name: row.get(0)?,
                create_date: row.get(2)?,
            })
        } else {
            Err(rusqlite::Error::ToSqlConversionFailure(Box::new(std::io::Error::new(std::io::ErrorKind::Other, "[Rust] Invalid password"))))
        }
    });

    match user {
        Ok(user) => {
            println!("[Rust] User found, {} - {}", user.name, user.create_date);
            Ok(user)
        }
        Err(rusqlite::Error::QueryReturnedNoRows) => Err(Box::new(std::io::Error::new(std::io::ErrorKind::Other, "[Rust] User not found"))),
        Err(err) => Err(Box::new(err)),
    }
}

fn get_passwords() -> Result<Vec<Password>, Box<dyn Error>> {
    
    let conn = connection()?;

    let mut stmt = conn.prepare("SELECT * FROM sec_passwords")?;

    let rows = stmt.query_map([], |row| {
        Ok(Password {
            title: row.get(1)?,
            password: row.get(2)?,
        })
    })?;

    let mut passwords = Vec::new();
    
    for password in rows {
        passwords.push(password?);
    }

    Ok(passwords)
}