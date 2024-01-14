use sqlx::PgPool;
use crate::error::Error;

pub fn get_database_url() -> Result<String, Error> {
    match dotenvy::var("DATABASE_URL") {
        Ok(value) => Ok(value),
        Err(err) => return Err(Error::EnvironmentError(err.to_string())),
    }
}

pub async fn get_database_conn() -> Result<PgPool, Error> {
    match PgPool::connect(&get_database_url()?).await {
        Ok(value) => Ok(value),
        Err(err) => return Err(Error::SqlError(err)),
    }
}
