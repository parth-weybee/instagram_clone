import { useDispatch } from 'react-redux'
import { setSearchText, toggleShowSearch } from '../redux/searchSlice';

const Search = () => {
    const dispatch = useDispatch();
  return (
    <>
    <div className='w-full fixed h-screen bg-black opacity-70 z-30' onClick={()=> dispatch(toggleShowSearch(false))}></div>
        <div className={`h-screen py-10 px-10 border-l border-r fixed z-40 w-full bg-black | md:left-[8%] md:w-4/12 | lg:left-[16%] lg:w-3/12`}>
            <h1 className='text-2xl text-white font-semibold py-4'>Search</h1>
            <input type="text" className='px-4 py-3 w-full bg-[#262626] text-gray-300 rounded-3xl' placeholder='Search' onChange={(e)=>dispatch(setSearchText(e.target.value))}/>  
            <hr className='mt-10'/>
        </div>
  </>
  )
}

export default Search