import React from 'react'
import { useProductDetail } from '../../../context/ProductDetailContext'

function Option_Item({base_price, option}) {
   const {selectedOption, setSelectedOption} = useProductDetail()

    return (
    <div className={`max-w-[200px] w-full h-[120px] flex flex-col justify-around items-center py-5 rounded-sm
                    ${selectedOption.name===option.name? 'border-3 border-green-700' : 'border-1 border-gray-200'}
                    ${option.stock===0? 'pointer-events-none' : ''}`}
         onClick={()=>setSelectedOption(option)}>
        <p className={`font-bold text-xl ${option.stock===0? 'text-gray-300' : ''}`}>{Math.round(100*base_price*option.stems,2)/100}</p>
        <p className={`font-medium text-xs ${option.stock===0? 'text-gray-300' : ''}`}>{option.name.toUpperCase()}</p>
        <p className={`font-extralight text-xs ${option.stock===0? 'text-gray-300' : 'text-gray-500'}`}>{option.stems} stems</p>
    </div>
  )
}

// option: {name_option, price, stems}
function Product_Option() {
  const {product} = useProductDetail()

  return (
    <div className="w-full flex justify-around gap-2">
        {(product.flower_details.options).map((option) => (
            <Option_Item key={option.name} base_price={product.price} option={option}/>
        ))}
    </div>
  )
}

export default Product_Option