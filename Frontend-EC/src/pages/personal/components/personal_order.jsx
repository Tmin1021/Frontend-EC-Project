import React, {useEffect, useState} from 'react'
import { order_items, orders, users } from '../../../data/dummy'
import { Admin_Universal_Order_Status, order_status } from '../../../admin/components/admin_universal'
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from 'react-router-dom';
import { Text_Item } from '../../../admin/components/admin_inventory';
 

export const Order_Product_Preview = () => {
    const {orderID} = useParams()
    const products = order_items.find(order_item => order_item.order_id.toString()===orderID)?.products
    const orderInfo = orders.find(order=>order.order_id.toString()===orderID)
    const userInfo = users.find(user=>user.user_id===orderInfo.user_id)

    const info = {name: ["Name", userInfo?.name], mail: ["Mail", userInfo?.mail], phone: ['Phone', userInfo?.phone], 
                order_date: ['Order date', orderInfo?.order_date], shipping_address: ['Shipping address', orderInfo?.shipping_address], 
                order_message: ['Message', orderInfo?.shipping_address]}

    return (
        <AnimatePresence>
        <div className='flex flex-col gap-2 p-2 md:p-4 bg-gray-50 h-screen'>
            <motion.div initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.4 }}
                        className='flex gap-4'>
                {/* Basic Info */}
                <div className='w-full lg:w-[75%] flex flex-col gap-6 px-3 md:px-6 py-6 bg-white shadow-lg border-1 border-gray-100 rounded-sm'>
                    <div className='grid grid-cols-2 gap-1 md:gap-4'>
                    {Object.keys(info).map((key) => (
                        <Text_Item key={key} name={info[key][0]} content={info[key][1]} isEditable={false} rows={['Shipping address', 'Message'].includes(info[key][0])? 3:1}/>
                    ))}
                    </div>
                </div>
        
                {/* Status */}
                <div className='hidden lg:flex w-full lg:w-[25%] h-[100px] flex-col gap-2 bg-white px-4 py-4 shadow-lg border-1 border-gray-100 rounded-sm'>
                    <p className='text-xs font-semibold text-gray-500'>Status</p>
                    <div className='w-full flex items-center justify-center py-2 bg-purple-50 text-xs text-purple-700 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all'>{orderInfo?.status}</div>
                </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.4 }} 
                        className='flex flex-col gap-6 px-3 md:px-6 py-6 bg-white shadow-lg border-1 border-gray-100 rounded-sm'>
                <div className='lg:hidden w-[100px] flex justify-center py-2 bg-purple-50 text-xs text-purple-700 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all'>{orderInfo?.status}</div>
                {products?.map((product, i) => (
                <div key={i}>
                    {/* Preview Item */}
                    <div className='h-[100px] w-full md:h-[120px] flex gap-4 mb-2'>
                        <img src={product.product.image_url[0]} className='h-full aspect-square object-cover rounded-sm'/>

                        <div className='flex flex-col justify-between w-full'>
                            {/* Name */}
                            <p className='text-base md:text-lg'>{product.product.name}</p>
        
                            {/* Option */}
                            {product.option && <div className='flex gap-2'>
                                <div className='text-xs font-semibold text-gray-500 bg-gray-100 p-1 rounded-sm w-fit'>{product.option.name}</div>
                                <div className='text-xs font-semibold text-gray-500 bg-gray-100 p-1 rounded-sm w-fit'>{product.option.stems} stems</div>
                            </div>}

                            {/* Total Quantity and Price */}
                            <div className='flex gap-2 items-center'>
                                <p className='text-sm font-extralight'>Quantity: <span className='text-base font-semibold'>{product.quantity}</span></p>
                                <p className='text-2xl'>|</p>
                                <p className='text-sm font-extralight'>Total: <span className='text-base font-semibold'>{product.price - product.off_price}</span></p>
                                {product.off_price >0  &&  <p className='text-sm font-extralight'><span className='text-base text-gray-400 font-semibold line-through'>{product.price}</span></p>}
                            </div>

                        </div>
                    </div>

                    <div className="w-full" style={{ borderBottom: '0.5px solid #e0e0e0' }} />
                    </div>))}
            </motion.div>
        
        </div>
        </AnimatePresence>
)
}

const Order_Preview = ({order}) => {
    const userProducts = order_items.find(order_item => order_item.order_id===order.order_id)?.products
    const navigate = useNavigate()
    if (!userProducts) return <div></div>

    const candidateProduct = userProducts[0]?.product

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
                            <p className={`text-sm p-1 rounded-sm ${order_status[order.status][1]} ${order_status[order.status][3]} font-semibold`}>{order.status}</p>
                        </div>
                    </div>
  
                    {/* Option */}
                    {candidateProduct.option && <div className='flex gap-2'>
                        <div className='text-xs font-semibold text-gray-500 bg-gray-100 p-1 rounded-sm w-fit'>{candidateProduct?.option?.name}</div>
                        <div className='text-xs font-semibold text-gray-500 bg-gray-100 p-1 rounded-sm w-fit'>{candidateProduct?.option?.stems} stems</div>
                    </div>}

                    {/* Total Quantity and Price */}
                    <div className='flex gap-2 items-center'>
                        <p className='text-sm font-extralight'>Quantity: <span className='text-base font-semibold'>{userProducts.length}</span></p>
                        <p className='text-2xl'>|</p>
                        <p className='text-sm font-extralight'>Total: <span className='text-base font-semibold'>{order.total_amount-order.off_price}</span></p>
                    </div>

                </div>
            </div>

            <div className="w-full" style={{ borderBottom: '0.5px solid #e0e0e0' }} />
            
            {/* Detail Button */}
            <div className='mx-auto text-blue-500 cursor-pointer' onClick={()=>navigate(`/personal/${order.order_id}`)}>See more</div>
        </div>

    )
}

function Personal_Order() {
  const [statusChosen, setStatusChosen] = useState('All')
  const userOrders =  orders.filter(order => order.user_id===1)
  const [currentUserOrders, setCurrentUserOrder] = useState(userOrders)
  
  useEffect(() => {
    setCurrentUserOrder(orders.filter(order => order.user_id===1))
  }, [])

  const filterStatus = (status) => {
    if (status === 'All') setCurrentUserOrder(userOrders)
    else setCurrentUserOrder(userOrders.filter(order => order.status === status))
  }
  
  return (
    <div className='flex flex-col gap-4'>
        <p className='text-2xl font-semibold'>Purchased Orders</p>
        <Admin_Universal_Order_Status statusChosen={statusChosen} setStatusChosen={setStatusChosen} filterStatus={filterStatus}/>

        {currentUserOrders.map((order) => (
            <Order_Preview key={order.order_id} order={order}/>
        ))}

    </div>

  )
}

export default Personal_Order