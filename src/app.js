
function List({name}) {
  return (
    <div class='list'>
      <h2 class='list-title'>{name}</h2>
      <ul>
        <li>Item a</li>
        <li>Item b</li>
      </ul>
    </div>
  )
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
