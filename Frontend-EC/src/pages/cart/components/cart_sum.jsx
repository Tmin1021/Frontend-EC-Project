import React from 'react'

function Cart_Sum() {

  return (
    <div className='w-[500px] h-[10vh] px-4 py-2 pb-4 flex flex-col bg-white'>
        <p className='font-light'>Total</p>
        <div className='flex items-center justify-between'>
            <p className='text-red-500 text-2xl font-semibold'>283.000</p>
            <div className='w-[140px] h-[40px] bg-red-500 flex items-center'>
                <p className='text-white mx-auto'>Order</p>
            </div>
        </div>
    </div>
  )
}

export default Cart_Sum