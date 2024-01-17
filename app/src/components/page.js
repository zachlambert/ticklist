import { Link } from 'react-router-dom';

function HeaderLink({to, children}) {
  return (
    <Link
      to={to}
      className='pl-4 pr-4 hover:text-slate-400'
    >
      {children}
    </Link>
  )
}

function Header() {
  return (
    <div className='
        h-16
        bg-gray-200
        flex flex-row flex-nowrap
        items-center
      '>
      <HeaderLink to={'/'}>Browse</HeaderLink>
      <HeaderLink to={'/list'}>List</HeaderLink>
    </div>
  )
}

export function Page({children}) {
  const padding = (
    <div className='
      bg-gray-400
      grow-0
      xl:grow'/>
  );
  return (
    <div className='flex flex-row flex-nowrap min-h-screen'>
      {padding}
      <div className='grow xl:grow-0 xl:w-[1280px]'>
        <Header/>
        {children}
      </div>
      {padding}
    </div>
  );
}
