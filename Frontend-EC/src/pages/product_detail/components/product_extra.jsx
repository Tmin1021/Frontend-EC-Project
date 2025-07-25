import React from 'react'
import { accessories, bonus_gifts } from '../../../data/dummy'

function Extra_Item({extra}) {

  return (
    <div className='flex justify-around items-center min-w-[150px] h-[110px] border-1'>
        <div className='h-[100%] aspect-square overflow-hidden'>
          <img src={extra.image_url} className='w-full h-full object-cover'/>
        </div>
        <div className='flex flex-col px-2'>
          <p className='font-light text-sm'>{extra.name}</p>
          <p className='font-extralight text-sm'>+${extra.price}</p>
        </div>
    </div>
  )
}

function Product_Extra({product}) {
  const matched_accessories_id = bonus_gifts.filter(bonus_gift => bonus_gift.bouquet_id === product.product_id).map(bonus_gift => bonus_gift.accessories_id)
  const extras = accessories.filter(accessory => matched_accessories_id.includes(accessory.product_id))

  return (
    <div className="flex gap-1 py-6 justify-around">
        {extras.map((extra) => (
            <Extra_Item key={extra.product_id} extra={extra}/>
        ))}
    </div>
  )
}

export default Product_Extra