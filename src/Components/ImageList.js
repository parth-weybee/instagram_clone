
import {  useRef  } from 'react'

const ImageList = ({imageList ,showBtns = true}) => {
    const sliderContainer = useRef();
    const image = useRef();
    const handleScroll = (dir)=>
    {
        dir === "left" ?
        sliderContainer.current.scrollLeft += image.current.clientWidth  :
        sliderContainer.current.scrollLeft -= image.current.clientWidth;
    }
  return (
    <div className='relative'>
    <div ref={sliderContainer} className='flex w-10/12 mx-auto overflow-hidden items-center justify-between'>
        {
            imageList.map((img)=>
            {   
                return <img ref={image} className='min-w-full'  key={img} src={img} alt="IMG"/>
            })
        }
    </div>
    {imageList.length > 1 && showBtns && <div className=' bg-black z-10 w-full flex justify-between my-5'>
            <button className='bg-white text-black' onClick={()=> handleScroll()}><i className="fa-solid fa-left-long"></i></button>
            <button className='bg-white text-black' onClick={()=> handleScroll("left")}><i className="fa-solid fa-right-long"></i></button>
        </div>}
    </div>
  )
}

export default ImageList;