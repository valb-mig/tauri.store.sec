use rusqlite::{Connection, Result};

pub fn schema() -> Result<()> {
    let conn = Connection::open("db/sqlite.db")?;

    /*
        User 
    */

    conn.execute(
        "CREATE TABLE user (
            id INTEGER PRIMARY KEY,
            auth TEXT NOT NULL
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

pub fn select(query: String) {
    println!("{}", query);
}
