import React from 'react'

function Option_Item({option, whichOption}) {

    return (
    <div className={`max-w-[180px] w-full h-[120px] flex flex-col justify-around items-center py-5 ${whichOption===option.name? 'border-3' : 'border-1'}`}>
       <p className='font-bold text-xl'>${option.price}</p>
        <p className='font-medium text-xs'>{option.name.toUpperCase()}</p>
        <p className='font-extralight text-xs text-gray-500'>{option.stems} stems</p>
    </div>
  )
}

// option: {name_option, price, stems}
function Product_Option({product, whichOption, setOption}) {

  return (
    <div className="flex justify-between gap-2">
        {Object.keys(product.options).map((name) => (
            <div className='w-full' key={name} onClick={()=> setOption(name)}>
                <Option_Item option={{name:name, price:product.options[name].price, stems:product.options[name].stems}} whichOption={whichOption}/>
            </div>
        ))}
    </div>
  )
}

export default Product_Option