
import express from 'express';
import cors from 'cors';
import pg from 'pg';

const app = express();
const dev_app_url = 'http://localhost:9000'
const db_host = 'localhost';
const db_port = 5432;
const db_name = 'app';


app.use(cors({
  origin: [dev_app_url],
}));

app.use('/items', (_, response) => {
  const pool = new pg.Pool({
    host: db_host,
    port: db_port,
    database: db_name,
    user: 'api_read',
    user: 'api_read'
  });

  const query = `
  select Item.id, Item.name, ItemType.name as type, Item.properties
  from Item join Itemtype on Item.item_type_id = ItemType.id
  `;

  pool.query(query, (error, results) => {
    if (error) {
      throw error;
    }
    return response.status(200).json(results.rows);
  });
  pool.end();
});

app.use('/item/:id', (req, response) => {
  const pool = new pg.Pool({
    host: db_host,
    port: db_port,
    database: db_name,
    user: 'api_read',
    user: 'api_read'
  });

  // TODO: Make secure
  const query = `
  select Item.id, Item.name, ItemType.name as type, Item.properties
  from Item join Itemtype on Item.item_type_id = ItemType.id
  where Item.id=${req.params.id}
  `;

  pool.query(query, (error, results) => {
    if (error) {
      return response.status(500).json({ error: error.message });
      throw error;
    }
    return response.status(200).json(results.rows[0]);
  });
  pool.end();
});

// start express server on port 5000
app.listen(5000, () => {
  console.log('server started on port 5000');
});
