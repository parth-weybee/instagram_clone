
import {  useRef, useState } from 'react'

const ImageList = ({imageList}) => {
    const sliderContainer = useRef();
    const image = useRef();
    const [isChange,setIsChange] = useState(false);
    const handleScroll = (dir)=>
    {
        console.log("slider called",sliderContainer.current.scrollLeft,image.current.clientWidth);
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
    {imageList.length > 1 && <div className='absolute bg-black z-10 w-full'>
            <button className='bg-white text-black' onClick={()=> handleScroll()}><i class="fa-solid fa-left-long"></i></button>
            <button className='bg-white text-black' onClick={()=> handleScroll("left")}><i class="fa-solid fa-right-long"></i></button>
        </div>}
    </div>
  )
}

export default ImageList