
import { createRoot } from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css"
import "./style.scss"
import "./favicon.ico"
import { App } from './app.js'

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />)
