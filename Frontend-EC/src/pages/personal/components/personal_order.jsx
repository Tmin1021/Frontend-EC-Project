import React, {useState} from 'react'
import { products } from '../../../data/dummy'

const Order_Preview = ({product=products[0]}) => {

    return (
        <div className='flex flex-col gap-2 p-2 md:p-4 bg-white dark:bg-black shadow-sm rounded-sm hover:shadow-lg hover:rounded-lg transition-all'>
            {/* ID - Status */}
            <div className='flex justify-between'>
                <p className='text-base md:text-lg'>Order #<span className='text-pink-500 font-bold'>1234567</span></p>
                <p className='text-base md:text-lg text-green-600 font-semibold'>Delivered</p>
            </div>

            {/* Preview Item */}
            <div className='h-[100px] w-full md:h-[120px] flex gap-4'>
                <img src={product.image_url[0]} className='h-full aspect-square object-cover'/>

                <div className='flex flex-col justify-between w-full'>
                    {/* Name */}
                    <p className='text-base md:text-lg'>{product.name}</p>
                    {/* Price */}
                    <p className='text-sm font-extralight'>Total: <span className='text-base font-semibold'>200</span></p>
                </div>
            </div>

            <div className="w-full" style={{ borderBottom: '0.5px solid #e0e0e0' }} />
            {/* Detail Button */}
            <div className='mx-auto text-blue-500'>See more</div>
        </div>

    )
}

function Personal_Order() {
    const order_status = {
      "All": ['bg-white dark:bg-black', 'text-black dark:text-white'],
      "Required": ['bg-blue-100', 'text-blue-400'],
      "Confirmed": ['bg-green-100', 'text-green-400'],
      "Canceled": ['bg-red-100', 'text-red-400'], 
      "Pended": ['bg-gray-100', 'text-gray-400'], 
      "Delivering": ['bg-yellow-100', 'text-yellow-400'], 
      "Done": ['bg-purple-100', 'text-purple-400']}
    const [statusChosen, setStatusChosen] = useState('All')

  return (
    <div className='flex flex-col gap-4'>
        <p className='text-2xl font-semibold'>Purchased Orders</p>
        <div className='flex overflow-x-auto no-scrollbar gap-4'>
            {Object.keys(order_status).map((key)=> (
              <div key={key} className={`${order_status[key][0]} ${order_status[key][1]} ${statusChosen===key? 'border-2':'border-0'}  font-semibold p-2 rounded-lg`}
                   onClick={()=>{if (statusChosen!==key) {setStatusChosen(key)}}}>{key}</div>
            ))}
          </div>

        <Order_Preview/>
    </div>

  )
}

export default Personal_Order