import { Header } from '../components/header.js';
import { useEffect, useState } from 'react';

// TODO: Import from somewhere
const server_url = 'http://localhost:5000'


export function Item() {
  const [item, setItem] = useState(null);
  const id = 2;

  useEffect(() => {
    console.log(`Loading from ${id}`);
    fetch(server_url + `/item/${id}`)
      .then(response => response.json())
      .then(item => {
        console.log(item);
        setItem(item);
      });
  }, []);

  if (!item) {
    return (
      <div className='content'>
        return <Header />
      </div>
    );
  }
  return (
    <div className='content'>
      <Header />
      <h2>{item.name}</h2>
    </div>
  );
}
