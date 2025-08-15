import React from 'react'
import { useCart } from '../../../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Cart_Sum() {
  const {getTotal, getTotalOff} = useCart()
  const [count, total] = getTotal()
  const totalOff = getTotalOff()

  const navigate = useNavigate()

  return (
    <div className='absolute bottom-0 right-0 md:relative w-5/6 md:w-[500px] p-4 flex flex-col bg-white/80 backdrop-blur-lg rounded-b-lg z-60' onClick={(e) =>e .stopPropagation()}>
        <p className='text-gray-500/80 font-semibold' >{count>0 ? `Total (${count} ${count === 1 ? 'product' : 'products'})`: ""}</p>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            {count ?  <p className='text-red-500/80 text-2xl font-semibold'>{total}</p>
            : <p>Please selected items</p>}
            {totalOff>0 && <p className='text-green-600/80 font-medium'>Saving {totalOff}</p>}
          </div>

            <div className={`w-[140px] h-[40px] backdrop-blur-sm rounded-sm flex items-center transition-all 
                          ${count===0 ? 'bg-gray-600/80 pointer-events-none' : 'bg-red-500/80 hover:bg-red-500/90 hover:shadow-gray-300 hover:shadow-lg'}`}
                          onClick={()=>navigate('/checkout')}>
                <p className='text-white mx-auto'>Order</p>
            </div>
        </div>
    </div>
  )
}

export default Cart_Sum