import React from 'react'
import { accessories, bonus_gifts } from '../../../data/dummy'

function Extra_Item({extra}) {

  return (
    <div className='flex flex-col justify-around items-center px-8 w-[180px] h-[100px] bg-white text-black'>
        <img src={extra.image_url}/>
        <div className='flex'>
          <p className='font-bold text-2xl'>{extra.name}</p>
          <p className='font-medium text-sm'>{extra.price}</p>
        </div>
    </div>
  )
}

function Product_Extra({product}) {
  const matched_accessories_id = bonus_gifts.filter(bonus_gift => bonus_gift.bouquet_id === product.product_id).map(bonus_gift => bonus_gift.accessories_id)
  const extras = accessories.filter(accessory => matched_accessories_id.includes(accessory.product_id))

  return (
    <div className="flex">
        {extras.map((extra) => (
            <Extra_Item key={extra.product_id} extra={extra}/>
        ))}
    </div>
  )
}

export default Product_Extra