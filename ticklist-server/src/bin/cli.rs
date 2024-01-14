use ticklist::{
    item::{get_items, get_item_by_slug},
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
        #[arg(short, long)]
        slug: String,
    },
}


fn main() -> Result<(), String> {
    let conn = block_on(get_database_conn())?;

    let cli = Cli::parse();
    match cli.command {
        CliCommand::GetItems => {
            let items = block_on(get_items(&conn))?;
            println!("{:?}", items);
        },
        CliCommand::GetItem{ slug } => {
            match block_on(get_item_by_slug(&conn, &slug))? {
                Some(item) => println!("{:?}", item),
                None => println!("No item with slug '{:}'", slug),
            }
        },
    }
    Ok(())
}
