
import { useState } from 'react';

function List({name}) {

  const [items, _] = useState([])
  const [newItem, setNewItem] =useState("")

  return (
    <div className='list'>
      <h2 className='list-title'>{name}</h2>
      <ul className='list-content'>
        {
          items.map((item, idx) => {
            return (<li className='list-item list-item-text' key={idx}>{item}</li>);
          })
        }
        <li className="list-item list-item-input">
          <input type="text" className="list-item" value={newItem}
            onChange={(event) => {
              setNewItem(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key == 'Enter' && newItem.length > 0) {
                console.log(`Add new item: ${newItem}`);
                items.push(newItem);
                setNewItem("");
              }
            }}
          ></input>
        </li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Lists</h1>
      <List name="List 1"/>
      <List name="List 2"/>
    </div>
  )
}

export { App }
