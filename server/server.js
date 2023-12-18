
import path from 'path';
import express from 'express';
// const { express } = express_pkg
import pg from 'pg'
import cors from 'cors';

const pool = new pg.Pool({
  user: 'admin',
  host: 'localhost',
  database: 'api',
  password: 'admin',
  port: 5432
});

const app = express(); // create express app

const dev_app_server = 'http://localhost:9000'

app.use(cors({
  origin: [dev_app_server],
}));

app.use('/get_items', (_, response) => {
  return response.status(200).json([
    {
      'name': 'Harry Potter',
      'date_added': '2023-10-01',
      'properties': {
        'genre': 'Fantasy',
        'type': 'Book Series',
        'num_books': 7,
      },
    },
    {
      'name': 'The Hunger Games',
      'date_added': '2023-10-02',
      'properties': {
        'genre': 'Young Adult',
        'type': 'Book Series',
        'num_books': 3,
      },
    },
    {
      'name': 'The Stormlight Archive',
      'date_added': '2023-10-03',
      'properties': {
        'genre': 'Fantasy',
        'type': 'Book Series',
        'num_books': 4,
      }
    },
  ])
});

app.use('/users', (_, response) => {
  return pool.query('select * from Person order by Id asc', (error, results) => {
    if (error) {
      throw error;
    }
    return response.status(200).json(results.rows);
  });
});

// start express server on port 5000
app.listen(5000, () => {
  console.log('server started on port 5000');
});
