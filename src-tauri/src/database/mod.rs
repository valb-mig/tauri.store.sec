use rusqlite::{ Connection, Result };

pub fn schema() -> Result<()> {

    let conn = match Connection::open("db/sqlite.db") {
        Ok(c) => c,
        Err(e) => panic!("Error opening database: {}", e),
    };

    /*
        User 
    */

    conn.execute(
        "CREATE TABLE sec_user (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            auth TEXT NOT NULL,
            create_date DATETIME NOT NULL,
            last_login DATETIME NOT NULL
        )",
        [],
    )?;

    /*
        Password storage
    */

    conn.execute(
        "CREATE TABLE sec_passwords (
            id INTEGER PRIMARY KEY,
            password TEXT NOT NULL,
            create_date DATETIME NOT NULL,
            last_update DATETIME NOT NULL
        )",
        [],
    )?;

    /*
        Password log
    */

    conn.execute(
        "CREATE TABLE sec_logs (
            id INTEGER PRIMARY KEY,
            log_desc TEXT NOT NULL,
            create_date DATETIME NOT NULL
        )",
        [],
    )?;

    Ok(())
}
