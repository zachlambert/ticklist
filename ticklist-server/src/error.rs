#[derive(Debug)]
pub enum Error {
    ItemNotFound,
    ItemPropertiesInvalid,
    ItemTypeSchemaInvalid,
    ItemTypeNotFound,
    EnvironmentError(String),
    SqlError(sqlx::Error),
}

