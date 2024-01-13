use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use sqlx::postgres::PgPoolOptions;
use serde::{Serialize, Deserialize};

const DB_HOST: &str = "localhost";
const DB_NAME: &str = "app";

#[derive(Serialize, Deserialize)]
struct Item {
    id: i32,
    name: String,
    item_type: String,
    properties: String,
}

#[get("/items")]
async fn items() -> impl Responder {

    let user = "api_read";
    let password = "api_read";
    let pool = match PgPoolOptions::new()
        .max_connections(5)
        .connect(&format!("postgres://{password}:{user}@{DB_HOST}/{DB_NAME}")).await
    {
        Ok(pool) => pool,
        Err(err) => return HttpResponse::InternalServerError().body(err.to_string()),
    };

    let result: Vec<Item> = match sqlx::query_as!(Item,
        r#"
        select Item.id, Item.name, ItemType.name as item_type, Item.properties
        from Item join Itemtype on Item.item_type_id = ItemType.id
        "#)
        .fetch_all(&pool).await
    {
        Ok(query) => query,
        Err(err) => return HttpResponse::InternalServerError().body(err.to_string()),
    };

    let json = match serde_json::to_string(&result) {
        Ok(json) => json,
        Err(err) => return HttpResponse::InternalServerError().body(err.to_string()),
    };
    return HttpResponse::Ok().body(json);
}

#[get("/item")]
async fn item(req_body: String) -> impl Responder {
    return HttpResponse::Ok().body(req_body);
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    return HttpServer::new(
        || {
            return App::new()
                .service(items)
                .service(item);
        })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await;
}
