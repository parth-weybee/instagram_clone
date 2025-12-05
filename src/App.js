import Header from './Components/Header';
import { Outlet } from 'react-router-dom';
import PostContainer from './Components/PostContainer';
import { useSelector } from 'react-redux';
import Search from './Components/Search';

function App() {
  const showPostContainer = useSelector(store => store.CreatePost.showPostContainer);
  const showSearchContainer = useSelector(store => store.searchUserName.showSearchContainer);
  return (
    <div className='flex flex-row bg-black '>
      <div className='w-2/12 h-screen hidden | lg:inline-block'></div>
      <Header/>
{showPostContainer && <PostContainer/>}
{showSearchContainer && <Search/>}
      <Outlet/>
    </div>
  );
}

export default App;
