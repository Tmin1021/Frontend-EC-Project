import { TicketPercent, Truck, Plus, Minus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useCart } from '../../../context/CartContext'
import GlobalApi from '../../../../service/GlobalApi'
import { assets, demo_1, isDummy } from '../../../data/dummy'
import { fetchProduct, getRoundPrice } from '../../../components/functions/product_functions'
import { useDynamicPricing } from '../../../context/DynamicPricingContext'

const BASE_URL = 'http://localhost:1337';

const Cart_Item = ({product}) => {
    const {updateCart} = useCart()
    const [productInfo, setProductInfo] = useState()  
    const {condition_mapping} = useDynamicPricing()

    useEffect(() => {
        fetchProduct(product.product_id, setProductInfo)
    }, [])

    return (
        <div className='h-[100px] w-full md:h-[120px] px-1 md:p-4 flex gap-2'>
            <img src={assets[productInfo?.image_url?.[0]] ?? demo_1} className='h-full p-2 md:p-0 aspect-square object-cover rounded-sm'/>

            <div className='flex flex-col justify-between w-full'>
                {/* Name and Option*/}
                <div className='flex gap-2 justify-between w-full'>
                    <p className='text-sm md:w-[42%] md:text-base whitespace-nowrap overflow-hidden text-ellipsis'>{productInfo?.name}</p>
                    <div className='gap-1 justify-end hidden md:flex'>
                        <p className={`${condition_mapping[productInfo?.condition]} w-fit h-fit text-xs font-semibold p-1 text-white rounded-sm cursor-pointer hover:px-2 transition-all`}>{productInfo?.condition}</p>
                        <div className='text-xs font-semibold text-gray-500/80 backdrop-blur-xs bg-gray-100 p-1 rounded-sm h-fit cursor-pointer'>{productInfo?.stems} stems</div>
                    </div>
                </div>
                <div className='flex gap-1 justify-start md:hidden'>
                    <p className={`${condition_mapping[productInfo?.condition]} w-fit h-fit text-xs font-semibold p-1 text-white rounded-sm cursor-pointer hover:px-2 transition-all`}>{productInfo?.condition}</p>
                    <div className='text-xs font-semibold text-gray-500/80 backdrop-blur-xs bg-gray-100 p-1 rounded-sm h-fit cursor-pointer'>{productInfo?.stems} stems</div>
             </div>

                {/* Price */}
                <div className='flex items-center gap-4 w-full'>
                    <p className='text-red-400/90 font-semibold tetx-base md:text-lg w-[50px] md:w-[80px]'>${getRoundPrice(product.subtotal)}</p>
                    {productInfo?.dynamicPrice < productInfo?.price && <div className='flex items-center gap-1'>
                        <TicketPercent className='text-blue-500'/>
                        <p className='line-through text-sm font-medium text-gray-500 '>${getRoundPrice(product.quantity*productInfo?.price)}</p>
                    </div>}
                </div>
                

                {/* Modify quantity */}
                <div className=' w-[50%] md:w-[25%] flex items-center justify-between gap-2 cursor-pointer'>
                    <div className={`p-1 rounded-full ${product.quantity===1 ? 'bg-gray-200/40 pointer-events-none':'bg-gray-200/80'} backdrop-blur-xs shadow-gray-400 shadow-sm hover:shadow-md transition-all`}
                         onClick={()=>updateCart(productInfo, Math.max(1, product.quantity-1))}>
                        <Minus className='w-3 h-3 md:w-4 md:h-4 text-gray-700' />
                    </div>
                    <p className='text-lg pr-1 font-semibold'> {product.quantity} </p>
                    <div className={`p-1 rounded-full ${product.quantity===productInfo?.stock ? 'bg-gray-200/40 pointer-events-none':'bg-green-400/60'} backdrop-blur-xs shadow-gray-400 shadow-sm hover:shadow-md transition-all`}
                         onClick={()=>updateCart(productInfo, Math.min(productInfo?.stock, product.quantity+1))}>
                        <Plus className='w-3 h-3 md:w-4 md:h-4 text-white' />
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Cart_Item