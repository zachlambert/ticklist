import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { serverUrl } from '../data.js';

import { Page } from '../components/page.js';
import { Item } from '../components/item.js';
import { Properties } from '../components/properties.js';


export function ItemPage() {
  const [item, setItem] = useState(null);
  const [tags, setTags] = useState([]);
  const [itemType, setItemType] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    fetch(serverUrl + `/item/${slug}`)
      .then(response => response.json())
      .then(item => {
        setItem(item);
        fetch(serverUrl + `/item/${item.id}/tags`)
          .then(response => response.json())
          .then(setTags);
        fetch(serverUrl + `/item-type/${item.item_type}`)
          .then(response => response.json())
          .then(setItemType);
      });
  }, []);

  if (!item || !itemType) {
    return <></>;
  }
  const itemProperties = JSON.parse(item.properties);
  const itemTypeSchema = JSON.parse(itemType.schema);

  return (
    <Page>
      <div>
        <div className='flex flex-row'>
          <div className='w-2/5 p-4'>
            <Item item={item} />
          </div>
          <div className='p-4'>
            <Properties properties={itemProperties} schema={itemTypeSchema}/>
          </div>
        </div>
        <div>
          <p>TODO: Details</p>
        </div>
      </div>
    </Page>
  );
}
