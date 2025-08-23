import React, { useEffect, useState } from 'react'
import {products, isDummy, demo_1} from '../../../data/dummy'
import { useNavigate, useParams } from 'react-router-dom'
import GlobalApi from '../../../../service/GlobalApi'
import { useDynamicPricing } from '../../../context/DynamicPricingContext'

const BASE_URL = 'http://localhost:1337';

export function Bestselling_Item({product}) {
    const {getDynamicPrice} = useDynamicPricing()
    const findStartingPrice = () => product.type==='flower' ? (Math.round(Math.min(...product.flower_details.options.map(option => option.stems))*product.price*100, 2)/100) : product.price

    return (
        <div className="min-w-[170px] bg-white dark:bg-black">
            <div className='w-full aspect-square overflow-hidden rounded-sm'>
                <img src={product?.image_url[0]} className='w-full h-full object-cover'/>
            </div>
            <p className='font-bold text-sm md:text-base pt-3'>{product.name}</p>
            <p className='font-light text-sm py-1'>from <span className='font-bold text-lg'>${getDynamicPrice(findStartingPrice())}</span></p>
        </div>

    )
}

const Dashboard_Bestselling = () => {
    const navigate = useNavigate()
    const {getDynamicPrice} = useDynamicPricing()
    const [bestsellingProducts, setBestsellingProducts] = useState(products.filter(item=>item.type==='flower'))

    const handleClick = (productID) => {
        navigate(`flower/${productID}`)
      }

    useEffect(() => {
        if (isDummy) return

        async function fetchProducts() {
            try {
                const res = await GlobalApi.ProductApi.getAll()
                console.log(res.data.data)
                const data = res.data.data.map(item => ({
                    ...item,
                    product_id: item?.documentId,
                    dynamic_price: getDynamicPrice(item?.price),
                    image_url: item?.image_url.map(image => BASE_URL+image.url), 

            }))
            console.log(data)

            let new_data = data.filter(item=>item.type==='flower')
            setBestsellingProducts(new_data)

            } catch (err) {
                console.error("Failed to fetch products", err);
            }
        
        }

        fetchProducts()
    }, [])
   
  
      return (
          <div className="flex flex-col gap-4 w-full px-4 md:px-8 lg:px-16 py-4 md:pt-10">
            {/* Title */}
            <p className='font-semibold text-xl md:text-2xl lg:text-4xl'>Best-selling <span className='text-pink-500'>Hoa</span>.</p>

            {/* Items */}
            <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 scroll-smooth">
            {bestsellingProducts.filter(product=>product.type==='flower').slice(0, 4).map((product) => (
                <div key={product.product_id} className="cursor-pointer flex-none" onClick={() => handleClick(product.product_id)}>
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