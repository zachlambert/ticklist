use std::io::{Error, ErrorKind};
use actix_web::{get, App, HttpRequest, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
use sqlx::PgPool;
use ticklist::{
    item::{get_items, get_item_by_slug, get_item_tags},
    conn::get_database_conn
};

#[get("/items")]
async fn items(state: actix_web::web::Data<AppState>) -> impl Responder {
    let result = match get_items(&state.pool).await {
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
    let result = match get_item_by_slug(&state.pool, &slug).await {
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

#[get("/item/{id}/tags")]
async fn item_tags(state: actix_web::web::Data<AppState>, req: HttpRequest) -> impl Responder {
    let id: i32 = req.match_info().get("id").unwrap().parse().unwrap();
    let result = match get_item_tags(&state.pool, id).await {
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
    let pool = match get_database_conn().await {
        Ok(result) => result,
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
