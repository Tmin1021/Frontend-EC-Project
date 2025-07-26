import React from 'react'
import { useCart } from '../../../context/CartContext'

function Cart_Sum() {
  const {getTotal} = useCart()
  const [count, total] = getTotal()

  return (
    <div className='absolute bottom-0 right-0 md:relative w-5/6 md:w-[500px] h-[80px] px-2 pb-4 flex flex-col bg-white' onClick={(e) =>e .stopPropagation()}>
        <p className='font-light'>{count>0 ? `Total (${count} ${count === 1 ? 'product' : 'products'})`: ""}</p>
        <div className='flex items-center justify-between'>
            {count ?  <p className='text-red-500 text-2xl font-semibold'>{total}</p>
            : <p>Please selected items</p>}
            <div className='w-[140px] h-[40px] bg-red-500 flex items-center'>
                <p className='text-white mx-auto'>Order</p>
            </div>
        </div>
    </div>
  )
}

export default Cart_Sum