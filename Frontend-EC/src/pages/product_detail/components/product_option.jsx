import React from 'react'

function Option_Item({option}) {
    return (
    <div className='flex flex-col justify-around items-center px-8 w-[180px] h-[100px] bg-white text-black'>
        <p className='font-bold text-2xl'>{option.name}</p>
        <p className='font-medium text-sm'>{option.price}</p>
        <p className='font-extralight text-sm text-gray-500'>{option.stems}</p>
    </div>
  )
}

// option: {name_option, price, stems}
function Product_Option({product}) {
  console.log(product.product_id)
  return (
    <div className="flex">
        {Object.keys(product.options).map((name) => (
            <Option_Item key={name} option={{name:name, price:product.options[name].price, stems:product.options[name].stems}}/>
        ))}
    </div>
  )
}

export default Product_Option