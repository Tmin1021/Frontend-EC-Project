import React from 'react'
import { accessories, bonus_gifts } from '../../../data/dummy'
import { useProductDetail } from '../../../context/ProductDetailContext'

function Extra_Item({extra}) {
  const {selectedExtra, setSelectedExtra} = useProductDetail()

  return (
    <div className={`flex flex-row justify-start gap-2 items-center w-full min-w-[120px] h-[120px] ${selectedExtra?.product_id===extra.product_id? 'border-3 border-green-700':'border-1 border-gray-200'}`}
         onClick={()=>{extra.product_id !== selectedExtra?.product_id ? setSelectedExtra(extra) : setSelectedExtra(null)}}>
        <div className='h-full aspect-square overflow-hidden'>
          <img src={extra.image_url} className='w-full h-full object-cover'/>
        </div>

        <div className='flex flex-col px-1'>
          <p className='font-light text-sm'>{extra.name}</p>
          <p className='font-extralight text-sm'>+${extra.price}</p>
        </div>
    </div>
  )
}

function Product_Extra() {
  const {product} = useProductDetail()
  const matched_accessories_id = bonus_gifts.filter(bonus_gift => bonus_gift.bouquet_id === product.product_id).map(bonus_gift => bonus_gift.accessories_id)
  const extras = accessories.filter(accessory => matched_accessories_id.includes(accessory.product_id))

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        {extras.map((extra, i) => (<Extra_Item key={i} extra={extra}/>))}
    </div>
  )
}

export default Product_Extra