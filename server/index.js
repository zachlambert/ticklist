
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'api',
  password: 'admin',
  port: 5432
});

const app = express(); // create express app

app.use('/', express.static(path.join(__dirname, '../dist')));

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
