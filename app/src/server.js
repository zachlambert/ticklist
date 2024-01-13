import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'node:fs';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server.js';

import { routes } from './routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distpath = path.join(__dirname, '../dist/client');

const index_html = fs.readFileSync(path.join(distpath, 'index.html'), 'utf8');
const staticHandler = createStaticHandler(routes);

const app = express();

function expressReqToFetchReq(req) {
  // https://reactrouter.com/en/main/guides/ssr

  let origin = `${req.protocol}://${req.get("host")}`;
  let url = new URL(req.originalUrl || req.url, origin);

  let controller = new AbortController();
  req.on("close", () => controller.abort());

  let headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  let init = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new Request(url.href, init);
};

export async function renderApp(req) {
  let context = await staticHandler.query(expressReqToFetchReq(req));
  if (context instanceof Response) {
    throw context;
  }
  let router = createStaticRouter(staticHandler.dataRoutes, context);

  const app = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
      />
    </React.StrictMode>
  );

  return app;
}

app.use(express.static(distpath));

app.get('*', (req, res) => {
  renderApp(req).then((app) => {
    res.send(index_html.replace(
      '<div id=\'root\'></div>',
      `<div id='root'>${app}</div>`
    ));
  });
});

const port = 9000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

