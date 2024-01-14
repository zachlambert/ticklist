use ticklist::{
    item::{get_items, get_item_by_slug, create_item},
    error::Error,
    conn::get_database_conn
};
use futures::executor::block_on;

use clap::{Parser, Subcommand};

#[derive(Parser)]
struct Cli {
    #[command(subcommand)]
    command: CliCommand,
}

#[derive(Subcommand)]
enum CliCommand {
    GetItems,
    GetItem{
        slug: String,
    },
    CreateItem{
        name: String,
        item_type: String,
        properties: String,
    },
}

fn main() -> Result<(), Error> {
    let conn = block_on(get_database_conn())?;

    let cli = Cli::parse();
    match cli.command {
        CliCommand::GetItems => {
            let items = block_on(get_items(&conn))?;
            println!("{:?}", items);
        },
        CliCommand::GetItem{ slug } => {
            let item = block_on(get_item_by_slug(&conn, &slug))?;
            println!("{:?}", item);
        },
        CliCommand::CreateItem { name, item_type, properties } => {
            let item = block_on(create_item(&conn, &name, &item_type, &properties));
            println!("{:?}", item);
        }
    }
    Ok(())
}
