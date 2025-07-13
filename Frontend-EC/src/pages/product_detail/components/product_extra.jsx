import React from 'react'

function Product_Extra({product}) {
  return (
    <div className='flex gap-3 items-center w-[240px] h-[100px]  bg-white text-black'>
        <img src={product.image_url}  className='object-cover h-[100px] w-[100px]'/>
        <p className='font-light '>{product.name}</p>
    </div>
  )
}

export default Product_Extra