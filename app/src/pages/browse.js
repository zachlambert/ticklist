import { useState } from 'react';

const server_url = 'http://localhost:5000/'

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

function BrowseList() {

  const [items, setItems] = useState([])
  fetch(server_url + 'get_items')
    .then(response => response.json())
    .then(items => {
      setItems(items);
    });

  return (
    <ul className='container list-item'>
      {
        items.map((item, idx) => {
          return (
            <li key={idx}>
              { item.name }
            </li>
          );
        })
      }
    </ul>
  );
}

function Content() {
  return (
    <div className='container-fluid p-2'>
      <h2>Browse</h2>
      <BrowseList />
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
function Browse() {
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
                <Content />
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

export { Browse }
