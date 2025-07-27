import React from 'react'
import { BaggageClaim } from "lucide-react";
import { products } from '../../../data/dummy';

const Recommend_Product = () => {

  return (
    <div className='flex flex-col gap-2'>
        <p className='font-bold text-lg'>Products that you might be interested in</p>
        <div className='flex gap-2'>
            {products.map((product,i) => (
                <div key={i} className='flex-none w-[120px]'>
                    <div className='w-full aspect-square overflow-hidden'>
                        <img src={product.image_url[0]} className='w-full h-full object-cover'/>
                    </div>
                    <div className='h-[20px] overflow-hidden'>
                        <p className='text-sm'>{product.name.length <16 ? product.name : product.name.substring(0,14)+"..."}</p>
                    </div>
                    <p className='text-xs font-semibold text-red-500'>20.000</p>
                </div>
            ))}
        </div>
    </div>

    )
}

function Cart_Empty() {

  return (
    <div className='flex flex-col h-full justify-between'>
        <div className='flex items-center gap-10 pl-5'>
            <BaggageClaim className='w-20 h-20 text-pink-400'/>
            <div className='flex flex-col'>
                <p className='text-2xl font-semibold'>Cart is empty</p>
                <p>Let's explore other products you might be interested in.</p>
            </div>
        </div>

        <Recommend_Product/>
    </div>
  )

}

export default Cart_Empty