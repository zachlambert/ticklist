use ticklist::{
    item::get_items,
    conn::get_database_conn
};
use futures::executor::block_on;

fn main() -> Result<(), String> {
    let conn = block_on(get_database_conn())?;
    let items = block_on(get_items(&conn))?;
    println!("{:?}", items);
    Ok(())
}
