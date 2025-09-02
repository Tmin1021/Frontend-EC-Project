import { ChevronLeft, ChevronRight } from 'lucide-react';
import {useState} from 'react'
import { assets, demo_1 } from '../../../data/dummy';

function Preview_Slide({images, setIndex}) {
  const [indexSlide, setIndexSlide] = useState(0)

  const nextImage = () => {
    if (indexSlide+3>=images.length) setIndexSlide(0)
    else setIndexSlide(indexSlide+3)
  }

  const prevImage = () => {
    if (indexSlide===0) setIndexSlide(Math.floor((images.length-1)/3)*3)
    else setIndexSlide(indexSlide-3)
  }

  return (
    <div className='w-full flex justify-center gap-4 items-center'>

      <div className={`${images.length<=3? 'hidden':''} rounded-full bg-gray-100 shadow-gray-400 shadow-sm hover:shadow-md transition-all`} onClick={prevImage}><ChevronLeft className="w-10 h-10"/></div>

      <div className="w-[198px] overflow-hidden mx-auto">
        <div className="flex gap-2 duration-500 ease-in-out" style={{ transform: `translateX(-${indexSlide/3 * 100}%)` }}>
        {images.map((image, i) => (
          <div key ={i} className="flex-none" onClick={(()=>setIndex(i))}>
            <img src={assets[image] ?? demo_1} className='w-[60px] h-[60px] object-cover'/>
          </div>
        ))}
        </div>
      </div>

      <div className={`${images.length<=3? 'hidden':''} rounded-full bg-gray-100 shadow-gray-400 shadow-sm hover:shadow-md transition-all`} onClick={nextImage}><ChevronRight className="w-10 h-10"/></div>
    </div>

  )
}

function Product_Preview({images}) {
 const [index, setIndex] = useState(0)

 return (
  <div className='flex flex-col gap-4 items-center'>
    {/* Main images */}
    <div className='max-w-[600px] md:min-w-full overflow-hidden'>
      <div
        className="flex duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((img, i) => (
          <div key={i} className='min-w-full aspect-square'>
              <img src={assets[img] ?? demo_1} className="w-full h-full object-cover rounded-lg"/>
          </div>
        ))}
      </div>
    </div>
          
    {images.length>=3 && <Preview_Slide images={images} setIndex={setIndex}/>}
  </div>

  );
}


export default Product_Preview