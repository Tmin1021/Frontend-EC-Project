import React from 'react'

// option: {name_option, price, stems}
function Product_Option({option}) {
  return (
    <div className='flex flex-col justify-around items-center px-8 w-[180px] h-[100px] bg-white text-black'>
        <p className='font-bold text-2xl'>{option.name}</p>
        <p className='font-medium text-sm'>{option.price}</p>
        <p className='font-extralight text-sm text-gray-500'>{option.stems}</p>
    </div>

)
}

export default Product_Option