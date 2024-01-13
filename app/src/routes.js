import { Browse } from './pages/browse.js';
import { Account } from './pages/account.js';
import { Item } from './pages/item.js';

export const routes = [
  {
    path: '/',
    element: <Browse />
  },
  {
    path: '/account',
    element: <Account />
  },
  {
    path: '/item/:slug',
    element: <Item />
  }
];
