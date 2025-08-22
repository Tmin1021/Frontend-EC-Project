import React, { useEffect, useState } from 'react'
import { bonus_gifts, demo_3, isDummy, products } from '../../../data/dummy'
import { useProductDetail } from '../../../context/ProductDetailContext'
import { useProduct } from '../../../context/ProductContext'
import GlobalApi from '../../../../service/GlobalApi'


const BASE_URL = 'http://localhost:1337';

function Extra_Item({extra_id}) {
  const {selectedExtra, setSelectedExtra} = useProductDetail()
  const [extra, setExtra] = useState(products[0])

  useEffect(()=>{
    if (isDummy) {
      setExtra(products.find(product => product.product_id === extra_id))
      return
    }

    async function fetchProduct() {
      try {
        const res = await GlobalApi.ProductApi.getById(extra_id)
        const item = res.data.data
        console.log(item)
        const data = {
            product_id: item?.documentId,
            type: item?.type,
            name: item?.name,
            price: item?.price,
            stock: item?.stock,
            available: item?.available,
            description: item?.description,
            image_url: item?.image_url.map(image => BASE_URL+image.url) ?? demo_3,
        }
        console.log(data)

        if (data) {
          setExtra(data)
        }}
     catch (error) { console.error("Failed to fetch bonus:", error)}
  }
  fetchProduct()
}, [])

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
  const {product, extra} = useProductDetail()
  const matched_extras_id = (isDummy ? bonus_gifts : extra).filter(bonus_gift => bonus_gift.flower_id === product.product_id).map(bonus_gift => bonus_gift.accessory_id)
  //const extras = (isDummy? products:initialProduct).filter(product => matched_extras_id.includes(product.product_id))

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        {matched_extras_id.map((extra_id, i) => (<Extra_Item key={i} extra_id={extra_id}/>))}
    </div>
  )
}

export default Product_Extra