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
    <div>
      {
        items.map((item, idx) => {
          return (
            <div key={idx} className='list-item'>
              { item.name }
            </div>
          );
        })
      }
    </div>
  );
}

function Browse() {
  return (
    <div className='container-fluid p-2'>
      <h2>Browse</h2>
      <List />
    </div>
  );
}

export { Browse }
