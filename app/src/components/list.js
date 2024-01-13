import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const server_url = 'http://localhost:5000'


function ListItem({item}) {
  return (
    <div className='list-item'>
      <div className='list-item-header'>
        <div><Link to={`item/${item.slug}`}>{item.name}</Link></div>
        <div className='list-item-header-fill'></div>
        <div className='list-item-header-type'><span style={{backgroundColor: '#ff9999'}}>{ item.item_type }</span></div>
      </div>
      <div className='list-item-content'>
        <img src='https://myframeworks.org/wp-content/uploads/2020/07/square-placeholder.jpg'/>
      </div>
    </div>
  )
}

function List({title}) {

  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(server_url + '/items')
      .then(response => response.json())
      .then(items => {
        setItems(items);
      });
  }, []);

  return (
    <div className='list-container'>
      <div className='list-header'>
        <h2>{title}</h2>
      </div>
      <div className='list-content'>
        {
          items.map((item, idx) => {
            return (
              <ListItem
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

export { List, ListItem }
