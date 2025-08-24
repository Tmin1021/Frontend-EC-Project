import React from 'react'
import { useProduct } from '../../../context/ProductContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Bestselling_Item } from '../../dashboard/components/dashboard_bestselling'

function List_View() {
  const {currentProduct} = useProduct()
  const {type} = useParams()
  const navigate = useNavigate()
  const handleClick = (productID) => {
    navigate(`/${type}/${productID}`)
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3'>
        {currentProduct.map((product, i) => (
            <div key={i} onClick={() => handleClick(product.product_id)}>
                <Bestselling_Item product={product}/>
            </div>
        ))}
    </div>
  )
}

export default List_View