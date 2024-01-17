import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TagList } from './tag.js'

const server_url = 'http://localhost:5000'

function ListItem({item, className}) {

  const [tags, setTags] = useState([]);
  useEffect(() => {
    fetch(server_url + `/item/${item.id}/tags`)
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
            to={`item/${item.slug}`}
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

function List({title}) {

  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(server_url + '/items')
      .then(response => response.json())
      .then(items => {
        setItems(items);
      });
  }, []);

  const padding = 30;
  const itemWidth = 200;

  // Required to have at least (N-1) dummy
  // elements for N = max elements per row
  // such that items on the final row remain
  // the same width as other rows
  let dummyItems = [];
  for (let i = 0; i < 5; i++) {
    dummyItems.push((
      <div key={i} className='
        h-0 grow
        w-[min(100%,theme(dim.listItemWidth))]
      '>
      </div>
    ));
  }

  return (
    <div>
      <div className='p-4'>
        <h2 className='text-3xl'>{title}</h2>
      </div>
      <div className={`
        flex flex-row flex-wrap
        justify-start align-start
        gap-x-[theme(dim.listPadding)]
        pr-[theme(dim.listPadding)]
        pl-[theme(dim.listPadding)]
        pu-[theme(dim.listPadding)]
      `}>
        {
          items.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`
                  w-[min(100%,theme(dim.listItemWidth))]
                  grow
                  mb-[theme(dim.listPadding)]
                `}
              >
                <ListItem item={item}/>
              </div>
            )
          })
        }
        {dummyItems}
      </div>
    </div>
  );
}

export { List, ListItem }
