#[derive(Debug)]
pub enum Error {
    ItemNotFound(String),
    ItemPropertiesInvalid(String),
    ItemTypeNotFound(String),
    EnvironmentError(String),
    SqlError(sqlx::Error),
}

