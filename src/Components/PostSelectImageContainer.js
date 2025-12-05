
import { UPLOAD_MEDIA_IMG } from '../utils/constant'
import { useRef } from 'react';
import PostContainerHeader from './PostContainerHeader';
import { useDispatch } from 'react-redux';
import { setImagesFiles, setPostImages } from '../redux/createPostSlice';

const PostSelectImageContainer = () => {
    const imageFile = useRef();
    const dispatch = useDispatch();
    const handlePostImages = ()=>
    {
        const files =  [...imageFile.current.files];    
        const imageUrls = files.map((file)=>
        {
            return URL.createObjectURL(file);
        })
        dispatch(setPostImages(imageUrls));
    }
  return (
    <div className='absolute top-[50%] h-[70%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-3xl bg-[#212328] text-center z-50 w-10/12 | lg:w-3/12 '>
        <PostContainerHeader/>
        <div className='flex flex-col h-full justify-center items-center p-5'>
            <img className='w-36 h-36' src={UPLOAD_MEDIA_IMG} alt="Upload Media IMG"/>
            <h1 className='font-bold text-2xl mx-auto text-white py-2'>Drag photos and videos here</h1>
            <button className="px-6 py-2 bg-blue-500 my-4 text-white rounded-lg" onClick={()=> imageFile.current.click()}>Select Photo From Computer</button>
            <input type='file' accept='images/*' hidden ref={imageFile} onChange={handlePostImages} multiple/>
        </div>
    </div>
  )
}

export default PostSelectImageContainer