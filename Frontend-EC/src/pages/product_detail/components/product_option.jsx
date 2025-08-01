import React from 'react'
import { useProductDetail } from '../../../context/ProductDetailContext'

function Option_Item({option}) {
   const {selectedOption, setSelectedOption} = useProductDetail()

    return (
    <div className={`max-w-[200px] w-full h-[120px] flex flex-col justify-around items-center py-5 ${selectedOption.name===option.name? 'border-3 border-green-700' : 'border-1 border-gray-200'}`}
         onClick={()=>setSelectedOption(option)}>
        <p className='font-bold text-xl'>${option.price}</p>
        <p className='font-medium text-xs'>{option.name.toUpperCase()}</p>
        <p className='font-extralight text-xs text-gray-500'>{option.stems} stems</p>
    </div>
  )
}

// option: {name_option, price, stems}
function Product_Option() {
  const {product} = useProductDetail()

  return (
    <div className="w-full flex justify-around gap-2">
        {(product.flower_details.options).map((option) => (
            <Option_Item key={option.name} option={option}/>
        ))}
    </div>
  )
}

export default Product_Option