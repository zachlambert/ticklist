import { Browse } from './pages/browse.js';
import { Account } from './pages/account.js';
import { Item } from './pages/item.js';
import { Page } from './components/page.js'

export const routes = [
  {
    path: '/',
    element: <Page><Browse/></Page>
  },
  {
    path: '/list',
    element: <Page><Account/></Page>
  },
  {
    path: '/item/:slug',
    element: <Page><Item/></Page>
  }
];
