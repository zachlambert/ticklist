import { Header } from '../components/header.js'
import { List } from '../components/list.js'

function Browse() {
  return (
    <div className='content'>
      <Header />
      <List
        title={'Browse'}
      />
    </div>
  );
}

export { Browse }
