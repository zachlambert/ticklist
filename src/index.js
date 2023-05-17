
import { App } from './app.js'
import { createRoot } from 'react-dom/client';
import "./style.css"
import "./favicon.ico"

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />)
