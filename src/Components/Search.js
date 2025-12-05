import { useDispatch } from 'react-redux'
import { setSearchText, toggleShowSearch } from '../redux/searchSlice';

const Search = () => {
    const dispatch = useDispatch();
  return (
    <>
    <div className='w-full absolute h-screen bg-black opacity-70 z-40' onClick={()=> dispatch(toggleShowSearch(false))}></div>
        <div className={`w-3/12 left-[16%] h-screen py-10 px-10 border-l border-r absolute z-50 bg-black`}>
            <h1 className='text-2xl text-white font-semibold py-4'>Search</h1>
            <input type="text" className='px-4 py-3 w-full bg-[#262626] text-gray-300 rounded-3xl' placeholder='Search' onChange={(e)=>dispatch(setSearchText(e.target.value))}/>  
            <hr className='mt-10'/>
        </div>
  </>
  )
}

export default Search