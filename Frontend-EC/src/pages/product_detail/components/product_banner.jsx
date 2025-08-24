import { Star } from 'lucide-react'
import React from 'react'
import { useDynamicPricing } from '../../../context/DynamicPricingContext'

function Product_Banner() {
  const {getHoliday} = useDynamicPricing()
  const holiday = getHoliday()

  return (
    <div className='cursor-pointer flex gap-2 p-2 items-center bg-red-600/80 rounded-lg w-full shadow-gray-300 shadow-sm hover:rounded-xl hover:bg-red-600 hover:shadow-lg hover:px-8 transition-all'>
      <Star fill='currentColor' className='text-yellow-400 w-6 h-6'/>
      <p className='text-white font-semibold text-lg'>{holiday} is coming</p>
    </div>
  )
}

export default Product_Banner