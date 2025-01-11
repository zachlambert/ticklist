use ticklist::{
    item::{Item, ItemType, create_item_type, create_item},
    error::Error,
    conn::get_database_conn
};
use serde::{Serialize, Deserialize};
use schemars::{schema_for, JsonSchema};
use sqlx::PgPool;
use futures::executor::block_on;
use chrono::{NaiveDate, Date, DateTime, Local, Utc};

#[derive(Serialize, Deserialize, JsonSchema)]
#[schemars(rename_all = "camelCase")]
struct Film {
    director: String,
    summary: String,
    runtime: i32, // minutes
    release_date: Date<Utc>,
    budget: i32, // USD
    box_office: i32, //  USD
}

fn create_films(conn: &PgPool) -> Result<(), Error> {
    let item: ItemType = block_on(create_item_type(
        conn,
        "Film",
        &serde_json::to_string(&schema_for!(Film)).unwrap()))?;

    block_on(create_item(
        conn,
        "Inception",
        &item.slug,
        &serde_json::to_string(&Film {
            director: "Christopher Nolan".to_string(),
            summary: r#"
Cobb steals information from his targets by entering their dreams. He is wanted for his alleged role in his wife's murder and his only chance at redemption is to perform a nearly impossible task.
        "#.to_string(),
            runtime: 148,
            release_date: NaiveDate::from_ymd_opt(2010, 7, 8).unwrap().with_timezone<Ytc>().unwrap(),
            budget: 160000000,
            box_office: 839000000,
        }).unwrap()))?;

    Ok(())
}

#[derive(JsonSchema)]
#[schemars(rename_all = "camelCase")]
struct TvSeries {
    director: String,
}

fn create_tv_series(conn: &PgPool) -> Result<(), Error> {
    let _ = block_on(create_item_type(
        conn,
        "Film",
        &serde_json::to_string(&schema_for!(Film)).unwrap()))?;

    Ok(())
}

fn main() -> Result<(), Error> {
    let conn = block_on(get_database_conn())?;

    let date = NaiveDate::from_ymd_opt(2010, 7, 8).unwrap();
    println!("{}", date);

    // create_films(&conn)?;
    // create_tv_series(&conn)?;

    Ok(())
}
