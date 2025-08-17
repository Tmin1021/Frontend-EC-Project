import React from 'react'
import { bonus_gifts, products } from '../../../data/dummy'
import { useProductDetail } from '../../../context/ProductDetailContext'

function Extra_Item({extra}) {
  const {selectedExtra, setSelectedExtra} = useProductDetail()

  return (
    <div className={`cursor-pointer flex flex-row justify-start gap-2 items-center w-full min-w-[120px] h-[110px] rounded-sm
        ${selectedExtra?.product_id===extra.product_id? 'border-3 border-green-700':'border-1 border-gray-200'}
        ${extra.stock===0 ? 'pointer-events-none' : ''}`}
         onClick={()=>{extra.product_id !== selectedExtra?.product_id ? setSelectedExtra(extra) : setSelectedExtra(null)}}>
        <div className='h-full aspect-square overflow-hidden relative'>
          <img src={extra.image_url} className={`w-full h-full object-cover 
                                                ${extra.stock===0 ? 'absolute inset-0 w-full h-full object-contain grayscale mix-blend-multiply' : ''}`}/>
        </div>

        <div className='flex flex-col px-1'>
          <p className={`font-light text-sm ${extra.stock===0 ? 'text-gray-300' : ''}`}>{extra.name}</p>
          <p className={`font-extralight text-sm ${extra.stock===0 ? 'text-gray-300' : ''}`}>+${extra.price}</p>
        </div>
    </div>
  )
}

function Product_Extra() {
  const {product} = useProductDetail()
  const matched_extras_id = bonus_gifts.filter(bonus_gift => bonus_gift.flower_id === product.product_id).map(bonus_gift => bonus_gift.accessory_id)
  const extras = products.filter(product => matched_extras_id.includes(product.product_id))

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        {extras.map((extra, i) => (<Extra_Item key={i} extra={extra}/>))}
    </div>
  )
}

export default Product_Extra