function List({name}) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        <li>Item a</li>
        <li>Item b</li>
      </ul>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <h1>Lists</h1>
      <List name="List 1"/>
      <List name="List 2"/>
    </div>
  )
}
