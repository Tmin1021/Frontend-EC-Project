import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'

function Product_Quantity({quantity, setQuantity}) {
  const tmp_max=5

  return (
    <div className='flex w-full justify-between items-center'>
        <p className='font-semibold'>QUANTITY</p>
        <div className='flex justify-between items-center gap-4'>
            <Minus onClick={()=>setQuantity(Math.max(1, quantity-1))}/>

              <div className='max-w-[40px] h-[50px] overflow-hidden'>
                <div className="flex flex-col items-center gap-6 py-3 pl-10 duration-500 ease-in-out" style={{ transform: `translateY(-${quantity/20* 100}%)` }}>
                  {Array.from({length: 20}, (_, i) => (
                    <p key={i} className='font-light text-xl w-[50px] aspect-square flex-none'>{i}</p>
                  ))}
                </div>
              </div>

            <Plus onClick={()=>setQuantity(Math.min(tmp_max, quantity+1))}/>
        </div>
        <p className='font-semibold text-2xl'>180.000</p>
    </div>
  )
}

export default Product_Quantity