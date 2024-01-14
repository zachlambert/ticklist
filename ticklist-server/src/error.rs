use core::fmt;

#[derive(Debug)]
pub enum Error {
    ItemNotFound,
    ItemPropertiesInvalid,
    ItemTypeSchemaInvalid,
    ItemTypeNotFound,
    EnvironmentError(String),
    SqlError(sqlx::Error),
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}
