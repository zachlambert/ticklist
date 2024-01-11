
import { createRoot } from 'react-dom/client';

// import "bootstrap/dist/css/bootstrap.min.css"
import "./public/style/reset.css"
import "./public/style/style.scss"
import "./public/favicon.ico"
import { Browse } from './pages/browse.js'

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<Browse/>)
