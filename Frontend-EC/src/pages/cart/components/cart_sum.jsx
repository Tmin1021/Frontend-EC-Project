import React from 'react'
import { useCart } from '../../../context/CartContext'

function Cart_Sum() {
  const {getTotal, getTotalOff} = useCart()
  const [count, total] = getTotal()
  const totalOff = getTotalOff()

  return (
    <div className='absolute bottom-0 right-0 md:relative w-5/6 md:w-[500px] px-2 py-4 flex flex-col bg-white/90 backdrop-blur-lg rounded-b-lg z-60' onClick={(e) =>e .stopPropagation()}>
        <p className='font-light'>{count>0 ? `Total (${count} ${count === 1 ? 'product' : 'products'})`: ""}</p>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            {count ?  <p className='text-red-500 text-2xl font-semibold'>{total}</p>
            : <p>Please selected items</p>}
            {totalOff>0 && <p className='text-green-500 font-light'>Saving {totalOff}</p>}
          </div>

            <div className='w-[140px] h-[40px] bg-red-500 flex items-center'>
                <p className='text-white mx-auto'>Order</p>
            </div>
        </div>
    </div>
  )
}

export default Cart_Sum