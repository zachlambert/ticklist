import { serverUrl } from '../data.js';

import { useEffect, useState } from 'react';
import { Item } from './item.js'


export function List({title}) {

  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(serverUrl + '/items')
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
                <Item item={item}/>
              </div>
            )
          })
        }
        {dummyItems}
      </div>
    </div>
  );
}
