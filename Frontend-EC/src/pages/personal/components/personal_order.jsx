import React, {useState} from 'react'
import { order_items_2, orders, products } from '../../../data/dummy'
import { Admin_Universal_Order_Status, order_status } from '../../../admin/components/admin_universal'
import { AnimatePresence, motion } from "framer-motion";

const Product_Preview = ({product}) => {

    return (
        <div></div>
    )
}

const Order_Preview = ({order}) => {
    const userProducts = order_items_2.find(order_item => order_item.order_id===order.order_id).products
    const candidateProduct = userProducts[0].product

    return (
        <div className='flex flex-col gap-2 p-2 md:p-4 bg-white dark:bg-black shadow-sm rounded-sm hover:shadow-lg hover:rounded-lg transition-all'>
            {/* Preview Item */}
            <div className='h-[100px] w-full md:h-[120px] flex gap-4'>
                <img src={candidateProduct.image_url[0]} className='h-full aspect-square object-cover rounded-sm'/>

                <div className='flex flex-col justify-between w-full'>
                    <div className='w-full flex justify-between'>
                        {/* Name */}
                        <p className='text-base md:text-lg'>{candidateProduct.name}</p>
                        {/* Status */}
                        <div className='flex justify-end'>
                            <p className={`text-base p-1 rounded-sm ${order_status[order.status][1]} ${order_status[order.status][3]} font-semibold`}>{order.status}</p>
                        </div>
                    </div>
  
                    {/* Option */}
                    {candidateProduct.option && <div className='flex gap-2'>
                        <div className='text-xs font-semibold text-gray-500 bg-gray-100 p-1 rounded-sm w-fit'>{candidateProduct?.option?.name}</div>
                        <div className='text-xs font-semibold text-gray-500 bg-gray-100 p-1 rounded-sm w-fit'>{candidateProduct?.option?.stems} stems</div>
                    </div>}

                    {/* Total Quantity and Price */}
                    <div className='flex gap-2 items-center'>
                        <p className='text-sm font-extralight'>Quantity: <span className='text-base font-semibold'>2</span></p>
                        <p className='text-2xl'>|</p>
                        <p className='text-sm font-extralight'>Total: <span className='text-base font-semibold'>200</span></p>
                    </div>

                </div>
            </div>

            <div className="w-full" style={{ borderBottom: '0.5px solid #e0e0e0' }} />
            
            {/* Detail Button */}
            <div className='mx-auto text-blue-500'>See more</div>
        </div>

    )
}

function Personal_Order() {
  const [statusChosen, setStatusChosen] = useState('All')
  const [userOrders, setUserOrder] = useState(orders.filter(order => order.user_id===1))

  const filterStatus = (status) => {
    setUserOrder(userOrders.filter(order => order.status === status))
  }
  

  return (
    <div className='flex flex-col gap-4'>
        <p className='text-2xl font-semibold'>Purchased Orders</p>
        <Admin_Universal_Order_Status statusChosen={statusChosen} setStatusChosen={setStatusChosen} filterStatus={filterStatus}/>

        <Order_Preview order={orders[0]}/>

    </div>

  )
}

export default Personal_Order