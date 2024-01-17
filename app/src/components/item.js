import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TagList } from './tag.js';
import { serverUrl } from '../data.js';


export function Item({item, className}) {

  const [tags, setTags] = useState([]);
  useEffect(() => {
    fetch(serverUrl + `/item/${item.id}/tags`)
      .then(response => response.json())
      .then(tags => {
        setTags(tags);
      });
  }, []);

  // TODO: Property of the list item type
  const typeColor = '#ff9999';

  return (
    <div className='size-full bg-slate-200'>
      <div className='flex flex-row flex-nowrap items-center'>
        <div className='m-2 text-lg'>
          <Link
            className='hover:text-slate-400'
            to={`/item/${item.slug}`}
          >
            {item.name}
          </Link>
        </div>
        <div className='grow'></div>
        <div className='px-2 py-1 m-2 rounded' style={{backgroundColor: typeColor}}>
          <span>{ item.item_type }</span>
        </div>
      </div>
      <TagList tags={tags} />
      <div className='mh-[theme(dim.listItemWidth)]'>
        <img
          className='w-full'
          src='https://myframeworks.org/wp-content/uploads/2020/07/square-placeholder.jpg'
        />
      </div>
    </div>
  )
}
