// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod handlers;

pub mod database;

use crate::database::schema;
use handlers::run_add_token;

fn main() {

  let _ = schema();

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![run_add_token])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}