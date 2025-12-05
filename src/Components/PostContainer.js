
import { useDispatch, useSelector } from 'react-redux'
import { togglePostContainer } from '../redux/createPostSlice';
import PostSelectImageContainer from './PostSelectImageContainer';
import PostUploadContainer from './PostUploadContainer';


const PostContainer = () => {
  const dispatch = useDispatch();   
  const postImages = useSelector(store => store.CreatePost.postImages);
  return (
    <>
    <div onClick={()=> dispatch(togglePostContainer(false))} className='absolute w-full top-0 left-0 h-screen z-40 bg-black bg-opacity-50'>
        
    </div>
        {
            !postImages ? <><PostSelectImageContainer/></> : <><PostUploadContainer/></>
        }
    </>
  )
}

export default PostContainer