import React from 'react'

function Option_Item({option}) {
    return (
    <div className='max-w-[180px] w-full h-[120px] flex flex-col justify-around items-center py-5 border-1'>
       <p className='font-bold text-xl'>${option.price}</p>
        <p className='font-medium text-xs'>{option.name.toUpperCase()}</p>
        <p className='font-extralight text-xs text-gray-500'>{option.stems} stems</p>
    </div>
  )
}

// option: {name_option, price, stems}
function Product_Option({product}) {
  console.log(product.product_id)
  return (
    <div className="flex justify-between gap-2">
        {Object.keys(product.options).map((name) => (
            <Option_Item key={name} option={{name:name, price:product.options[name].price, stems:product.options[name].stems}}/>
        ))}
    </div>
  )
}

export default Product_Option