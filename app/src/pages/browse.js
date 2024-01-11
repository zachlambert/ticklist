import { useState } from 'react';

const server_url = 'http://localhost:5000'

function Header() {
  return (
    <div className='header'>
      <div className='header-item'>
        <a href='/browse'/>
      </div>
      <div className='header-item'>
        <a href='/list'/>
      </div>
    </div>
  )
}

function Item({idx, item}) {
  return (
    <div key={idx} className='list-item'>
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
                idx={idx}
                item={item}
              />
            )
          })
        }
        <div className='list-item-dummy'></div>
        <div className='list-item-dummy'></div>
      </div>
    </div>
  );
}

function Browse() {
  return (
    <div className='content'>
      <Header />
      <List />
    </div>
  );
}

export { Browse }
