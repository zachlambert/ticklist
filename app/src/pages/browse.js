import { useState } from 'react';
import { Header } from './header.js'
import { List } from './list.js'

function Browse() {
  return (
    <div className='content'>
      <Header />
      <List />
    </div>
  );
}

export { Browse }
