import React from 'react'
import {products} from '../../../data/dummy'
import { useNavigate, useParams } from 'react-router-dom'

export function Bestselling_Item({product}) {
    const findStartingPrice = () => product.type==='flower' ? (Math.min(...product.flower_details.options.map(option => option.price))) : product.price

    return (
        <div className="min-w-[170px] bg-white dark:bg-black">
            <div className='w-full aspect-square overflow-hidden'>
                <img src={product?.image_url[0]} className='w-full h-full object-cover'/>
            </div>
            <p className='font-bold text-sm md:text-base pt-3'>{product.name}</p>
            <p className='font-light text-sm py-1'>from <span className='font-bold text-lg'>${findStartingPrice()}</span></p>
        </div>

    )
}

const Dashboard_Bestselling = () => {
      const navigate = useNavigate()

      const handleClick = (productID) => {
        navigate(`flower/${productID}`)
      }
  
      return (
          <div className="flex flex-col gap-4 w-full px-4 md:px-10 lg:px-32 py-4 md:pt-10">
            {/* Title */}
            <p className='font-semibold text-2xl mx-auto'>Best-selling Hoa.</p>

            {/* Items */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 lg:gap-8 scroll-smooth">
            {products.filter(product=>product.type==='flower').slice(0, 4).map((product) => (
                <div key={product.product_id} className="cursor-pointer" onClick={() => handleClick(product.product_id)}>
                    <Bestselling_Item product={product} />
                </div>
            ))}
            </div>

            {/* Button */}
            <div className="w-[250px] min-w-[80px] flex items-center justify-between mx-auto cursor-pointer bg-green-700 hover:bg-green-900 transition-all py-2 px-6 rounded-sm" 
                 onClick={()=>navigate("/flower")}>
                <p className="text-sm md:text-base mx-auto font-bold text-white">SHOP ALL BEST SELLERS</p>
            </div>
          </div>
      )
}

export default Dashboard_Bestselling