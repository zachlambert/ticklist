import { useState } from 'react';

const server_url = 'http://localhost:5000'


function Item({item}) {
  return (
    <div className='list-item'>
      <div className='list-item-header'>
        <div><h3>{ item.name }</h3></div>
        <div className='list-item-header-fill'></div>
        <div className='list-item-header-type'><span style={{backgroundColor: '#ff9999'}}>Type</span></div>
      </div>
      <div className='list-item-content'>
        <img src='https://myframeworks.org/wp-content/uploads/2020/07/square-placeholder.jpg'/>
      </div>
    </div>
  )
}

function List() {

  const [items, setItems] = useState([])
  fetch(server_url + '/item')
    .then(response => response.json())
    .then(items => {
      setItems(items);
    });

  return (
    <div className='list-container'>
      <div className='list-header'>
        <h2>Browse</h2>
      </div>
      <div className='list-content'>
        {
          items.map((item, idx) => {
            return (
              <Item
                key={idx}
                item={item}
              />
            )
          })
        }
        <div key={items.length} className='list-item-dummy'></div>
        <div key={items.length+1} className='list-item-dummy'></div>
      </div>
    </div>
  );
}

export { List }
