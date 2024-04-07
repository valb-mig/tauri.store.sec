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
        "CREATE TABLE user (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            auth TEXT NOT NULL,
            date DATETIME NOT NULL
        )",
        [],
    )?;

    /*
        Password storage
    */

    conn.execute(
        "CREATE TABLE passwords (
            id INTEGER PRIMARY KEY,
            password TEXT NOT NULL
        )",
        [],
    )?;

    Ok(())
}
