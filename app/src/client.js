import './style.css';
import { routes } from './routes.js';

import ReactDOMClient from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

ReactDOMClient.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </React.StrictMode>
);
