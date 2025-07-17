import React from 'react'
import { useProduct } from '../../../context/ProductContext'
import { useNavigate } from 'react-router-dom'
import { Bestselling_Item } from '../../dashboard/components/dashboard_bestselling'

/*
function List_Item({product}) {
    return (
        <div>
            <div className='w-[450px] h-[450px] bg-white'>
                <img src={product.image_url[0]} className='w-full'/>
            </div>
            <p className='font-bold'>{product.name}</p>
            <p>from <span >${product.price}</span></p>
        </div>

    )
}
    */

function List_View() {
  const {current_product} = useProduct()
  const navigate = useNavigate()

  const handleClick = (productID) => {
    navigate(`/product/${productID}`)
  }

  return (
    <div className='grid grid-cols-3 gap-8 pt-8'>
    {current_product.map((product, i) => (
        <div key={i} onClick={() => handleClick(product.product_id)}>
            <Bestselling_Item product={product}/>
        </div>
    ))}
    </div>
  )
}

export default List_View