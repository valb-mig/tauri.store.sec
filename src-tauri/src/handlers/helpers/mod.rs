use bcrypt::{hash, verify};

pub fn hash_token(token: &str) -> Result<String, bcrypt::BcryptError>{
    let hashed_password = hash(token, bcrypt::DEFAULT_COST)?;
    Ok(hashed_password)
}

pub fn verify_password(token: &str, hashed_token: &str) -> bool {
    match verify(token, hashed_token) {
        Ok(result) => result,
        Err(_) => false,
    }
}