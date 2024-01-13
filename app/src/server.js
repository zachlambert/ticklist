import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'node:fs';

import { Browse } from './pages/browse.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distpath = path.join(__dirname, '../dist/client');

const app = express();

app.get(['/', '/item/:id'], (_req, res) => {
  fs.readFile(path.join(distpath, "index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }

    const app_render = ReactDOMServer.renderToString(<Browse />);
    const result = data.replace(
        '<div id=\'root\'></div>',
        `<div id='root'>${app_render}</div>`
      );

    return res.send(result);
  });
});

app.use(express.static(distpath));

const port = 9000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

