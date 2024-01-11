import { useState } from 'react';

const server_url = 'http://localhost:5000'

function List() {

  const [items, setItems] = useState([])
  fetch(server_url + '/item')
    .then(response => response.json())
    .then(items => {
      setItems(items);
    });

  return (
    <div className='list-container'>
      {
        items.map((item, idx) => {
          return (
            <div key={idx} className='list-item'>
              { item.name }
            </div>
          );
        })
      }
      <div className='list-item list-item-dummy'></div>
      <div className='list-item list-item-dummy'></div>
    </div>
  );
}

function Browse() {
  return (
    <div className='content'>
      <h2>Browse</h2>
      <List />
    </div>
  );
}

export { Browse }
