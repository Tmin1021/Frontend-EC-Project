import React, { useState } from 'react'
import { useProductDetail } from '../../../context/ProductDetailContext'

// for type, occasion, color
function Option_Item({name, content}) {
    const [isClick, setIsClick] = useState(false)

    return (
      <div className={` ${isClick? 'z-55 fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm':''} transition-all`} onClick={()=>setIsClick(false)}>
          <div className={`${isClick ? 'w-[60%] md:w-[30%] bg-white/80 p-4 rounded-lg max-h-[80vh] overflow-y-auto':'max-w-[200px] w-full h-[120px]'} cursor-pointer flex flex-col justify-start items-center py-5 rounded-sm shadow-sm border-1 border-gray-300 hover:shadow-lg transition-all`}
               onClick={(e)=> {e.stopPropagation(); if (!isClick) setIsClick(true)}}>

              <p className='font-bold text-md text-gray-500'>{name.toUpperCase()}</p>
              {(isClick ? content : content.slice(0,3)).map((each) => 
              <p key={each} className='font-extralight text-sm text-gray-600'>{each}</p>      
              )}
              {!isClick && content.length > 3 && <p className='font-semibold text-sm text-gray-800'>View More...</p>   }

          </div>
      </div>
  )
}

// option: {name_option, price, stems}
function Product_Option() {
  const {product} = useProductDetail()

  return (
    <div className="w-full grid grid-cols-3 gap-2">
      <Option_Item name={"Type"} content={product.flower_type}/>
      <Option_Item name={"Occasion"} content={product.occasions}/>
      <Option_Item name={"Color"} content={product.colors}/>
    </div>
  )
}

export default Product_Option