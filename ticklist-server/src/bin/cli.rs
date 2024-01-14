use ticklist::{
    item::{get_items, get_item_by_slug},
    conn::get_database_conn
};
use futures::executor::block_on;

fn main() -> Result<(), String> {
    let conn = block_on(get_database_conn())?;
    let items = block_on(get_items(&conn))?;
    println!("{:?}", items);
    let item = block_on(get_item_by_slug(&conn, "attack-on-titan-anime-series"));
    println!("{:?}", item);
    Ok(())
}
