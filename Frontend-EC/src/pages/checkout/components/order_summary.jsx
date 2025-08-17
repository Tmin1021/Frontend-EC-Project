import React from 'react'
import { carts } from '../../../data/dummy'
import { Gift } from 'lucide-react'
import {createPayment} from '../../../../service/Payment'

const Order_Summary_Item = ({title, price}) => {
    
    return (
        <div className='flex justify-between'>
            <p className='text-gray-400 text-sm font-semibold'>{title}</p>
            <p className='text-sm font-semibold'>{price}</p>
        </div>
    )
}


function Order_Summary() {
  const cart = carts[0]
  const subtotal = Math.round(cart.products.reduce((acc, cur) => acc + (cur.option?.stems ?? 1)*cur.product.price*cur.quantity, 0)*100, 2)/100
  const off_price = cart.products.reduce((acc, cur) => acc + cur.off_price, 0)
  const shipping = subtotal > 50 ? 0 : 10

  return (
    <div className='flex flex-col gap-2 bg-white px-2 md:px-4 py-4 shadow-sm border-1 border-gray-100 rounded-lg'>
        <p className='text-sm font-semibold'>Order Summary</p>
        <Order_Summary_Item title='Subtotal' price={subtotal}/>
        <Order_Summary_Item title='Delivery' price={shipping === 0 ? 'FREE' : shipping}/>
        <Order_Summary_Item title='Discount' price={-off_price}/>
        
        <div className='w-[70%] md:w-full mx-auto flex justify-center items-center gap-2 py-1 bg-pink-50 rounded-md p-1'>
            <Gift className='text-pink-700/80 w-5 h-5'/>
            <p className='text-pink-700/80 text-xs font-medium'>Buy over $50 to get a freeship!</p>
        </div>

        <div className='border-1 w-full border-gray-100'></div>

        <Order_Summary_Item title='Total' price={subtotal+shipping-off_price}/>

        <div className='flex justify-center bg-pink-700/70 rounded-lg text-white font-semibold text-sm w-full p-2 hover:shadow-lg hover:shadow-gray-300 hover:bg-pink-700/90 transition-all'
             onClick={()=>{createPayment(subtotal+shipping-off_price)}}>
            Order
        </div>
    </div>
  )
}

export default Order_Summary