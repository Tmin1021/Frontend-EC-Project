import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProductParams, fetchProducts } from '../../../components/functions/product_functions'
import Product_Item from '../../../components/custom/product'
import SkeletonLoader from '../../../components/custom/skeleton'

const Dashboard_Bestselling = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [bestsellingProducts, setBestsellingProducts] = useState([])

    const handleClick = (productID) => {
        navigate(`flower/${productID}`)
      }

    useEffect(() => {
        fetchProducts({setter:setBestsellingProducts, params:createProductParams({sort: 'Best Sellers', limit: 4})}).finally(() => setLoading(false));
    }, [])
   
    if (loading) return (<SkeletonLoader length={4}/>)
  
      return (
          <div className="flex flex-col gap-4 w-full px-4 md:px-8 lg:px-16 py-4 md:pt-10">
            {/* Title */}
            <p className='font-semibold text-xl md:text-2xl lg:text-4xl'>Best-selling <span className='text-pink-500'>Hoa</span>.</p>

            {/* Items */}
            <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 scroll-smooth">
            {bestsellingProducts.map((product) => (
                <div key={product.product_id} className="cursor-pointer flex-none" onClick={() => handleClick(product.product_id)}>
                    <Product_Item product={product}/>
                </div>
            ))}
            </div>

            {/* Button */}
            <div className="w-[250px] min-w-[80px] flex items-center justify-between mx-auto cursor-pointer bg-green-700 hover:bg-green-900 transition-all py-2 px-6 rounded-sm" 
                 onClick={()=>navigate("/flower")}>
                <p className="text-sm md:text-base mx-auto font-bold text-white">SHOP ALL BOUQUETS</p>
            </div>
          </div>
      )
}

export default Dashboard_Bestselling