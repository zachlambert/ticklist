
import { useState } from 'react';

const server_url = './'

function List({name}) {

  const [items, _] = useState([])
  const [newItem, setNewItem] =useState("")

  return (
    <div className='constainer list'>
      <h2 className='list-title'>{name}</h2>
      <ul className='container list-item'>
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

function TestContent() {
  const [persons, setPersons] = useState([])
  fetch(server_url + 'users')
    .then(response => response.json())
    .then(persons => {
      setPersons(persons);
    });
  return (
    <div className='container'>
      <h1>Lists</h1>
      <List name="List 1"/>
      <List name="List 2"/>
      <h1>Users</h1>
      {
        persons.map((person, idx) => { return (<li key={idx}>{ person.name }</li>); })
      }
    </div>
  );
}

function Header() {
  return (
    <header className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0'>
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Lists</a>
      <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      </input>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </header>
  );
}

function Sidebar() {
  return (
    <nav className="d-none d-md-block bg-light container-fluid p-0 sidebar">
      <div className="sidebar-sticky p-2">
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          Browse
        </h6>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Top Rated
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Trending
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Genres
            </a>
          </li>
        </ul>
        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          My Lists
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Active
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Backlog
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Complete
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Main() {
  return (
    <div className='container-fluid p-2'>
      <h2>Content</h2>
    </div>
  );
}

function Ads() {
  const adPlaceholderStyle = {
    'height': '300px',
    'background-color': '#55aaff'
  };
  return (
    <div className='container-fluid p-2'>
      <div className="advert mb-2" style={adPlaceholderStyle}>
        Advert 1
      </div>
      <div className="advert mb-2" style={adPlaceholderStyle}>
        Advert 2
      </div>
    </div>
  );
};

function Footer() {
  return (
    <footer className='footer text-center container-fluid'>
      <div>
        Footer
      </div>
    </footer>
  );
}
function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="container-fluid p-0">
        <div className="row p-0">
          <div className='col-md-2 p-0'>
            <Sidebar />
          </div>
          <div className='col-md-8 p-0'>
            <div className='container-fluid'>
              <main className='row p-0'>
                <Main />
              </main>
              <div className='row p-0'>
                <Footer />
              </div>
            </div>
          </div>
          <div className='col-md-2 p-0'>
            <Ads />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export { App }
