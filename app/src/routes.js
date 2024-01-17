import { BrowsePage } from './pages/browse.js';
import { AccountPage } from './pages/account.js';
import { ItemPage } from './pages/item.js';

export const routes = [
  {
    path: '/',
    element: <BrowsePage/>
  },
  {
    path: '/list',
    element: <AccountPage/>
  },
  {
    path: '/item/:slug',
    element: <ItemPage/>
  }
];
