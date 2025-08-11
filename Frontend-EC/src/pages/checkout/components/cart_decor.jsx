import { Flower2, History, CalendarCheck } from 'lucide-react'
import React from 'react'


function Cart_Decor() {
  const mapping = {
    'flower': [<Flower2 className='w-6 h-6 text-pink-700/80'/>, "Fresh and eco-friendly gift of nature"],
    'history': [<History className='w-6 h-6 text-green-700/80'/>, "Return or refund in the same delivery day"],
    'calendar': [<CalendarCheck className='w-6 h-6 text-amber-700/80'/>, 'We make it fast to keep it fresh for you']
  }

  return (
    <div className='bg-white px-2 md:px-4 py-4 shadow-sm border-1 border-gray-100 rounded-lg'>
         <p className='text-sm font-semibold mb-4'>Hoa wants you to know</p>

         <div className='flex flex-col gap-2'>
            {Object.keys(mapping).map((key) => (
                <div key={key} className='flex gap-2'>
                    {mapping[key][0]}
                    <p className='text-sm text-gray-400 text-semibold'>{mapping[key][1]}</p>
                </div>
            ))}
         </div>
    </div>
  )
}

export default Cart_Decor