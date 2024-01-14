use sqlx::PgPool;
use serde::Serialize;
use crate::error::Error;
use jsonschema::JSONSchema;

#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct Item {
    id: i32,
    name: String,
    item_type: String,
    slug: String,
    properties: String,
}

#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct ItemType {
    id: i32,
    name: String,
    slug: String,
    schema: String,
}

#[derive(sqlx::FromRow)]
pub struct IdReturn {
    id: i32,
}

pub async fn get_item_type(pool: &PgPool, slug: &str) -> Result<ItemType, Error> {
    let query = r#"
    select * from ItemType where ItemType.slug = $1
    "#;

    match sqlx::query_as::<_, ItemType>(query)
        .bind(slug)
        .fetch_one(pool).await
    {
        Ok(result) => Ok(result),
        Err(sqlx::Error::RowNotFound) => Err(Error::ItemTypeNotFound),
        Err(err) => Err(Error::SqlError(err)),
    }
}

pub fn create_item_slug(name: &str, item_type: &ItemType) -> String {
    let mut slug = String::new();
    slug.push_str(&name.to_string().to_lowercase().replace(" ", "-"));
    slug.push_str("-");
    slug.push_str(&item_type.slug);
    return slug;
}

pub async fn create_item(
    pool: &PgPool,
    name: &str,
    item_type_slug: &str,
    properties: &str) -> Result<Item, Error>
{
    let item_type = get_item_type(pool, item_type_slug).await?;

    let schema_json: serde_json::Value = match serde_json::from_str(&item_type.schema) {
        Ok(result) => result,
        Err(err) => {
            println!("{:?}", err);
            return Err(Error::ItemTypeSchemaInvalid);
        },
    };

    let schema = match JSONSchema::options()
        .with_draft(jsonschema::Draft::Draft7)
        .compile(&schema_json)
    {
        Ok(result) => result,
        Err(err) => {
            println!("{:?}", err);
            return Err(Error::ItemTypeSchemaInvalid);
        },
    };

    let properties_json: serde_json::Value = match serde_json::from_str(properties) {
        Ok(result) => result,
        Err(err) => {
            println!("{:?}", err);
            return Err(Error::ItemPropertiesInvalid);
        }
    };

    match schema.validate(&properties_json) {
        Ok(_) => (),
        Err(_) => return Err(Error::ItemPropertiesInvalid)
    }

    let slug = create_item_slug(name, &item_type);

    let query = r#"
    insert into Item (name, item_type_id, slug, properties)
    values ($1, $2, $3, $4)
    returning id
    "#;

    let id = match sqlx::query_as::<_, IdReturn>(query)
        .bind(name)
        .bind(item_type.id)
        .bind(slug)
        .bind(properties)
        .fetch_one(pool).await
    {
        Ok(result) => result.id,
        Err(err) => return Err(Error::SqlError(err)),
    };

    get_item_by_id(pool, id).await
}

pub async fn get_items(pool: &PgPool) -> Result<Vec<Item>, Error> {
    let query = r#"
    select Item.id, Item.name, ItemType.slug as item_type, Item.slug, Item.properties
    from Item join Itemtype on Item.item_type_id = ItemType.id
    "#;

    match sqlx::query_as::<_, Item>(query)
        .fetch_all(pool).await
    {
        Ok(result) => Ok(result),
        Err(err) => Err(Error::SqlError(err)),
    }
}

pub async fn get_item_by_id(pool: &PgPool, id: i32) -> Result<Item, Error> {
    let query = r#"
    select Item.id, Item.name, ItemType.slug as item_type, Item.slug, Item.properties
    from Item join Itemtype on Item.item_type_id = ItemType.id
    where Item.id = $1
    "#;

    match sqlx::query_as::<_, Item>(query)
        .bind(id)
        .fetch_one(pool).await
    {
        Ok(query) => Ok(query),
        Err(sqlx::Error::RowNotFound) => Err(Error::ItemNotFound),
        Err(err) => Err(Error::SqlError(err)),
    }
}

pub async fn get_item_by_slug(pool: &PgPool, slug: &str) -> Result<Item, Error> {
    let query = r#"
    select Item.id, Item.name, ItemType.slug as item_type, Item.slug, Item.properties
    from Item join Itemtype on Item.item_type_id = ItemType.id
    where Item.slug = $1
    "#;

    match sqlx::query_as::<_, Item>(query)
        .bind(slug)
        .fetch_one(pool).await
    {
        Ok(query) => Ok(query),
        Err(sqlx::Error::RowNotFound) => Err(Error::ItemNotFound),
        Err(err) => Err(Error::SqlError(err)),
    }
}

/*
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
*/

/*
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
*/
