import { Header } from '../components/header.js'
import { List } from '../components/list.js'

function Account() {
  return (
    <div className='content'>
      <Header />
      <List
        title={'Account'}
      />
    </div>
  );
}

export { Account }
