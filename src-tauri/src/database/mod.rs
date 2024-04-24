use rusqlite::{ Connection, Result };

pub fn connection() -> Result<Connection, rusqlite::Error> {

    match Connection::open("db/sqlite.db") {
        Ok(c) => Ok(c),
        Err(e) => Err(e),
    }
}

pub fn schema() -> Result<()> {

    let conn = connection()?;

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
            title TEXT NOT NULL,
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
