import { TicketPercent, Truck, Plus, Minus } from 'lucide-react'
import React, { useState } from 'react'
import { useCart } from '../../../context/CartContext'


const Cart_Item = ({product}) => {
    const {updateCart} = useCart()

    return (
        <div className='h-[100px] w-full md:h-[120px] px-1 md:p-4 flex gap-2'>
            <img src={product.product.image_url[0]} className='h-full aspect-square object-cover'/>

            <div className='flex flex-col justify-between w-full'>
                {/* Name */}
                <p className='text-base md:text-lg'>{product.product.name}</p>
                {/* Price */}
                <div className='flex items-center gap-4 w-full'>
                    <p className='text-red-500 font-semibold text-lg w-[50px] md:w-[80px]'>{Math.round(100*((product.option?.price ?? product.product.price) * product.quantity-product.off_price))/100}</p>
                    {product.off_price!==0 && <div className='flex items-center gap-1'>
                        <TicketPercent className='text-blue-500'/>
                        <p className='line-through text-sm '>{Math.round(100*((product.option?.price ?? product.product.price) * product.quantity))/100}</p>
                    </div>}
                </div>
                {/* Date 
                <div className='flex items-center gap-2'>
                    <Truck/>
                    <p>Deliver on {`${String(product_cart.delivery_date.Day).padStart(2, '0')}/${String(product_cart.delivery_date.Month + 1).padStart(2, '0')}/${product_cart.delivery_date.Year}`}</p>
                </div>*/}
                {/* Modify quantity */}
                <div className=' w-[25%] flex items-center justify-between'>
                    <Minus className='w-4 h-4' onClick={()=>updateCart(product, Math.max(1, product.quantity-1))}/>
                    <p className='text-lg pr-1'> {product.quantity} </p>
                    <Plus className='w-4 h-4' onClick={()=>updateCart(product, Math.min(product.product.stock, product.quantity+1))}/>
                </div>
            </div>
        
        </div>
    )
}

export default Cart_Item