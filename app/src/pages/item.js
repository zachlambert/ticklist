import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../components/header.js';
import { TagList } from '../components/tag.js';
import { ItemProperties } from '../components/item.js';

// TODO: Import from somewhere
const server_url = 'http://localhost:5000'


export function Item() {
  const [item, setItem] = useState(null);
  const [tags, setTags] = useState([]);
  const [itemType, setItemType] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    fetch(server_url + `/item/${slug}`)
      .then(response => response.json())
      .then(item => {
        setItem(item);
        fetch(server_url + `/item/${item.id}/tags`)
          .then(response => response.json())
          .then(setTags);
        fetch(server_url + `/item-type/${item.item_type}`)
          .then(response => response.json())
          .then(setItemType);
      });
  }, []);

  if (!item) {
    return (
      <div className='content'>
        <Header />
      </div>
    );
  }

  return (
    <div className='content'>
      <Header />
      <div className='item-content'>
        <div className='item-summary'>
          <div className='item-summary-left'>
            <h2>{item.name}</h2>
            <img src='https://myframeworks.org/wp-content/uploads/2020/07/square-placeholder.jpg'/>
          </div>
          <div className='item-summary-right'>
            <TagList tags={tags}/>
            <ItemProperties item={item} item_type={itemType}/>
          </div>
        </div>
        <div className='item-details'>
        </div>
      </div>
    </div>
  );
}
