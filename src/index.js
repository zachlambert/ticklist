
import { createRoot } from 'react-dom/client';

import "./style.css"
import "./favicon.ico"
import { App } from './app.js'

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />)
