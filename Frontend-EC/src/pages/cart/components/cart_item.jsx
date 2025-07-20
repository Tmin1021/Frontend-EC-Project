import { TicketPercent, Truck, Plus, Minus } from 'lucide-react'
import React, { useState } from 'react'
import { useCart } from '../../../context/CartContext'


const Cart_Item = ({product, product_cart}) => {
    const {updateCart} = useCart()

    return (
        <div className='w-full h-[120px] bg-amber-400 flex'>
            <img src={product.image_url[0]} className='w-[120px] h-[120px] p-[5px]'/>

            <div className='flex flex-col justify-between pl-2'>
                <p className='text-lg'>{product.name}</p>
                <div className='flex items-center gap-4'>
                    <p className='text-red-500 font-semibold text-lg'>{product_cart.quantity * 55.000}</p>
                    <div className='flex items-center gap-1'>
                        <TicketPercent className='text-blue-500'/>
                        <p className='line-through text-sm '>300.000</p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <Truck/>
                    <p>Deliver on {`${String(product_cart.delivery_date.Day).padStart(2, '0')}/${String(product_cart.delivery_date.Month + 1).padStart(2, '0')}/${product_cart.delivery_date.Year}`}</p>
                </div>

                <div className=' w-[46%] flex items-center justify-between'>
                    <Minus className='w-4 h-4' onClick={()=>updateCart(product_cart.product_id, Math.max(1, product_cart.quantity-1))}/>
                    <p className=''> {product_cart.quantity} </p>
                    <Plus className='w-4 h-4' onClick={()=>updateCart(product_cart.product_id, Math.min(5, product_cart.quantity+1))}/>
                </div>
            </div>
        
        </div>
    )
}

export default Cart_Item