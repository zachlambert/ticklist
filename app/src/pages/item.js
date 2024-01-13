import { Header } from '../components/header.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// TODO: Import from somewhere
const server_url = 'http://localhost:5000'


export function Item() {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(server_url + `/item/${id}`)
      .then(response => response.json())
      .then(item => {
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
