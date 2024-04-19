// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod database;

use crate::database::schema;

mod handlers;

use handlers::{
  run_add_token, 
  run_verify_token,
  run_add_password
};

fn main() {

  let _ = schema();

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      run_add_token,
      run_verify_token,
      run_add_password
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
