
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon')
const app = express(); // create express app

// app.get('/', (_, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

// app.use(favicon(path.join(__dirname, '../dist/images/favicon.ico')));
app.use('/', express.static(path.join(__dirname, '../dist')));

// start express server on port 5000
app.listen(5000, () => {
  console.log('server started on port 5000');
});
