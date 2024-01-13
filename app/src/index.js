import ReactDOMClient from 'react-dom/client';
import "./public/style/reset.css";
import "./public/style/style.scss";
import "./public/favicon.ico";
import { Browse } from './pages/browse.js';
import { Account } from './pages/account.js';
import { Item } from './pages/item.js';


ReactDOMClient.hydrateRoot(document.getElementById('root'), <Browse />);
