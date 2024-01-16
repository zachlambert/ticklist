import '../style.css';

function Header() {
  return (
    <div className='header bg-red-500'>
      <div className='header-item'>
        <a href='/browse'/>
      </div>
      <div className='header-item'>
        <a href='/list'/>
      </div>
    </div>
  )
}

export { Header };
