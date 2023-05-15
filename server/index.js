
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon')
const app = express(); // create express app

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// start express server on port 5000
app.listen(5000, () => {
  console.log('server started on port 5000');
});
