import { TicketPercent, Truck, Plus, Minus } from 'lucide-react'
import React, { useState } from 'react'
import { useCart } from '../../../context/CartContext'


const Cart_Item = ({product}) => {
    const {updateCart} = useCart()

    return (
        <div className='h-[100px] w-full md:h-[120px] px-1 md:p-4 flex gap-2'>
            <img src={product.product.image_url[0]} className='h-full aspect-square object-cover'/>

            <div className='flex flex-col justify-between w-full'>
                {/* Name and Option*/}
                <div className='flex gap-2'>
                    <p className='text-base'>{product.product.name}</p>
                    {product.option && <div className='text-xs font-semibold text-gray-500/80 backdrop-blur-xs bg-gray-100 p-1 rounded-sm w-fit h-fit'>{product?.option?.name}</div>}
                    {product.option && <div className='text-xs font-semibold text-gray-500/80 backdrop-blur-xs bg-gray-100 p-1 rounded-sm w-fit h-fit'>{product?.option?.stems} stems</div>}
                </div>

                {/* Price */}
                <div className='flex items-center gap-4 w-full'>
                    <p className='text-red-500/80 font-semibold text-lg w-[50px] md:w-[80px]'>{Math.round(100*(product.product.price * product.quantity - product.off_price))/100}</p>
                    {product.off_price!==0 && <div className='flex items-center gap-1'>
                        <TicketPercent className='text-blue-500'/>
                        <p className='line-through text-sm font-medium text-gray-500 '>{Math.round(100*(product.product.price* product.quantity))/100}</p>
                    </div>}
                </div>
                
                {/* Date 
                <div className='flex items-center gap-2'>
                    <Truck/>
                    <p>Deliver on {`${String(product_cart.delivery_date.Day).padStart(2, '0')}/${String(product_cart.delivery_date.Month + 1).padStart(2, '0')}/${product_cart.delivery_date.Year}`}</p>
                </div>*/}

                {/* Modify quantity */}
                <div className=' w-[50%] md:w-[25%] flex items-center justify-between gap-2 cursor-pointer'>
                    <div className='p-1 rounded-full bg-gray-200/60 backdrop-blur-xs shadow-gray-400 shadow-sm hover:shadow-md transition-all'>
                        <Minus className='w-4 h-4 text-gray-700' onClick={()=>updateCart(product, Math.max(1, product.quantity-1))}/>
                    </div>
                    <p className='text-lg pr-1 font-semibold'> {product.quantity} </p>
                    <div className='p-1 rounded-full bg-green-400/60 backdrop-blur-xs shadow-gray-400 shadow-sm hover:shadow-md transition-all'>
                        <Plus className='w-4 h-4 text-white' onClick={()=>updateCart(product, Math.min(product.product.stock, product.quantity+1))}/>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Cart_Item