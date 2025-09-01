import { useProduct } from '../../../context/ProductContext'
import { useNavigate } from 'react-router-dom'
import Product_Item from '../../../components/custom/product'

function List_View() {
  const {products} = useProduct()
  const navigate = useNavigate()
  const handleClick = (productID) => {
    navigate(`/flower/${productID}`)
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3'>
        {products.map((product, i) => (
            <div key={i} onClick={() => handleClick(product._id)}>
                <Product_Item product={product}/>
            </div>
        ))}
    </div>
  )
}

export default List_View