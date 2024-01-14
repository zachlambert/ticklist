use sqlx::PgPool;

pub fn get_database_url() -> Result<String, String> {
    match dotenvy::var("DATABASE_URL") {
        Ok(value) => Ok(value),
        Err(err) => return Err(err.to_string()),
    }
}

pub async fn get_database_conn() -> Result<PgPool, String> {
    match PgPool::connect(&get_database_url()?).await {
        Ok(value) => Ok(value),
        Err(err) => return Err(err.to_string()),
    }
}
