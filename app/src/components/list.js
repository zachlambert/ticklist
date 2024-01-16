import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TagList } from './tag.js'

const server_url = 'http://localhost:5000'

function ListItem({item}) {

  const [tags, setTags] = useState([]);
  useEffect(() => {
    fetch(server_url + `/item/${item.id}/tags`)
      .then(response => response.json())
      .then(tags => {
        setTags(tags);
      });
  }, []);

  return (
    <div className='list-item'>
      <div className='list-item-header'>
        <div><h3><Link to={`item/${item.slug}`}>{item.name}</Link></h3></div>
        <div className='list-item-header-fill'></div>
        <div className='list-item-header-type'><span style={{backgroundColor: '#ff9999'}}>{ item.item_type }</span></div>
      </div>
      <TagList tags={tags} />
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
      <div className='list-header bg-red-900'>
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
