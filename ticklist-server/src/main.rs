use std::io::{Error, ErrorKind};
use actix_web::{get, App, HttpRequest, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
use sqlx::PgPool;
use serde::Serialize;

#[derive(Serialize, sqlx::FromRow)]
struct Item {
    id: i32,
    name: String,
    item_type: String,
    slug: String,
    properties: String,
}

#[get("/items")]
async fn items(state: actix_web::web::Data<AppState>) -> impl Responder {
    let query = r#"
    select Item.id, Item.name, ItemType.name as item_type, Item.slug, Item.properties
    from Item join Itemtype on Item.item_type_id = ItemType.id
    "#;

    let result: Vec<Item> = match sqlx::query_as::<_, Item>(query)
        .fetch_all(&state.pool).await
    {
        Ok(result) => result,
        Err(err) => return HttpResponse::InternalServerError()
            .body(err.to_string()),
    };

    let json = match serde_json::to_string(&result) {
        Ok(json) => json,
        Err(err) => return HttpResponse::InternalServerError()
            .body(err.to_string()),
    };
    return HttpResponse::Ok().body(json);
}

#[get("/item/{slug}")]
async fn item(state: actix_web::web::Data<AppState>, req: HttpRequest) -> impl Responder {
    let slug: String = req.match_info().get("slug").unwrap().parse().unwrap();
    let query = r#"
    select Item.id, Item.name, ItemType.name as item_type, Item.slug, Item.properties
    from Item join Itemtype on Item.item_type_id = ItemType.id
    where Item.slug = $1
    "#;

    let result: Item = match sqlx::query_as::<_, Item>(query)
        .bind(slug)
        .fetch_one(&state.pool).await
    {
        Ok(query) => query,
        Err(err) => return HttpResponse::InternalServerError()
            .body(err.to_string()),
    };

    let json = match serde_json::to_string(&result) {
        Ok(json) => json,
        Err(err) => return HttpResponse::InternalServerError()
            .body(err.to_string()),
    };
    return HttpResponse::Ok().body(json);
}

#[derive(Serialize, sqlx::FromRow)]
struct ItemTag {
    tag: String,
    vote_count: i32,
    vote_score_mean: f32
}

#[get("/item/{id}/tags")]
async fn item_tags(state: actix_web::web::Data<AppState>, req: HttpRequest) -> impl Responder {
    let id: i64 = req.match_info().get("id").unwrap().parse().unwrap();
    let query = r#"
    select Tag.name as tag, ItemTag.vote_count, ItemTag.vote_score_mean
    from ItemTag join Tag on ItemTag.tag_id = Tag.id
    where ItemTag.item_id = $1
    order by ItemTag.vote_score_mean desc, ItemTag.vote_count desc
    "#;

    let result: Vec<ItemTag> = match sqlx::query_as::<_, ItemTag>(query)
        .bind(id)
        .fetch_all(&state.pool).await
    {
        Ok(result) => result,
        Err(err) => return HttpResponse::InternalServerError()
            .body(err.to_string()),
    };

    let json = match serde_json::to_string(&result) {
        Ok(json) => json,
        Err(err) => return HttpResponse::InternalServerError()
            .body(err.to_string()),
    };
    return HttpResponse::Ok().body(json);
}

struct AppState {
    pool: PgPool,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let database_url = match dotenvy::var("DATABASE_URL") {
        Ok(value) => value,
        Err(err) => return Err(Error::new(ErrorKind::Other, err.to_string())),
    };
    let pool = match PgPool::connect(&database_url).await {
        Ok(value) => value,
        Err(err) => return Err(Error::new(ErrorKind::Other, err.to_string())),
    };
    let data = actix_web::web::Data::new(AppState {
        pool,
    });

    HttpServer::new(
        move || {
            let cors = Cors::default()
              .allowed_origin("http://localhost:9000");

            App::new()
                .app_data(data.clone())
                .wrap(cors)
                .service(items)
                .service(item)
                .service(item_tags)
        })
        .bind(("127.0.0.1", 5000))?
        .run()
        .await
}
