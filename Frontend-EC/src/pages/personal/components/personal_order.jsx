import React, {useEffect, useState} from 'react'
import { assets, demo_1, demo_3 } from '../../../data/dummy'
import { Admin_Universal_Order_Status, order_status } from '../../../admin/components/admin_universal'
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from 'react-router-dom';
import { Text_Item } from '../../../admin/components/admin_inventory';
import { useAuth } from '../../../context/AuthContext'
import { fetchProduct, getFormatDate, getProduct, getRoundPrice } from '../../../components/functions/product_functions';
import BEApi from '../../../../service/BEApi';

export const BASE_URL = 'http://localhost:1337';

export const Order_Product_Preview = () => {
    // order detail need: fetch order info (from order id) => fetch user (from order) => fetch all items of order (from order) => fetch product of each item to retrieve img and name
    const {orderID} = useParams()
    const [items, setItems] = useState([])
    const [orderInfo, setOrderInfo] = useState()
    const {user} = useAuth()

    const info = {name: ["Name", orderInfo?.user_name], mail: ["Email", user?.email], phone: ['Phone', user?.phone], 
                order_date: ['Order date', orderInfo?.order_date], shipping_address: ['Shipping address', orderInfo?.shipping_address], 
                message: ['Message', orderInfo?.message]}

    useEffect(() => {
    const fetchOrderAndItems = async () => {
        try {
            // 1. Get order
            const res = await BEApi.OrderApi.getById(orderID);
            const item = res.data;

            const orderData = {
                ...item,
                order_id: item?._id,
                order_date: getFormatDate(item.createdAt),
            };
            setOrderInfo(orderData);

            // 2. Fetch products for each item
            const itemsWithProduct = await Promise.all(
                item.items.map(async (it) => {
                    const productInfo = await getProduct(it.product_id);
                    return {
                        ...it,
                        product_info: productInfo, 
                    };
                    })
            );

            setItems(itemsWithProduct);
            } catch (err) {
            console.error("Failed to fetch order or products", err);
        }
    };

    if (orderID) fetchOrderAndItems();
    }, [orderID]);

    return (
        <AnimatePresence>
        <div className='flex flex-col gap-2 p-2 md:p-4 lg:p-8 bg-gray-50 h-screen'>
            <motion.div initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.4 }}
                        className='flex gap-4'>
                {/* Basic Info */}
                <div className='w-full lg:w-[75%] flex flex-col gap-6 px-3 md:px-6 py-6 bg-white shadow-lg border-1 border-gray-100 rounded-sm'>
                    <div className='grid grid-cols-2 gap-1 md:gap-4'>
                    {Object.keys(info).map((key) => (
                        <Text_Item key={key} name={info[key][0]} content={info[key][1]} isEditable={false} rows={['Shipping address', 'Message'].includes(info[key][0])? 3:2}/>
                    ))}
                    </div>
                </div>
        
                {/* Status and Payment*/}
                <div className='hidden lg:flex w-full lg:w-[25%] h-fit flex-col gap-2 bg-white px-4 py-4 shadow-lg border-1 border-gray-100 rounded-sm'>
                    <p className='text-xs font-semibold text-gray-500'>Status</p>
                    <div className='w-full flex items-center justify-center py-2 bg-purple-50 text-xs text-purple-700 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all'>{orderInfo?.status}</div>
                    <div className='w-full flex items-center justify-center py-2 bg-green-50 text-xs text-green-600 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all'>{orderInfo?.payment_method}</div>
                </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.4 }} 
                        className='flex flex-col gap-6 px-3 md:px-6 py-6 bg-white shadow-lg border-1 border-gray-100 rounded-sm'>
                <div className='flex justify-between lg:hidden'>
                    <div className='w-[100px] flex items-center justify-center py-2 bg-green-50 text-xs text-green-600 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all'>{orderInfo?.payment_method}</div>
                    <div className='w-[100px] flex justify-center py-2 bg-purple-50 text-xs text-purple-700 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all'>{orderInfo?.status}</div>
                </div>
                
                {items?.map((item, i) => (
                <div key={i}>
                    {/* Preview Item */}
                    <div className='h-[100px] w-full md:h-[120px] flex gap-4 mb-2'>
                        <img src={assets[item.product_info?.image_url[0]] ?? demo_1} className='h-full aspect-square object-cover rounded-sm'/>

                        <div className='flex flex-col justify-between w-full'>
                            {/* Name */}
                            <p className='text-base md:text-lg'>{item.product_name}</p>

                            {/* Total Quantity and Price */}
                            <div className='flex gap-2 items-center'>
                                <p className='text-sm font-extralight'>Quantity: <span className='text-base font-semibold'>{item.quantity}</span></p>
                                <p className='text-2xl'>|</p>
                                <p className='text-sm font-extralight'>Total: <span className='text-base font-semibold'>{getRoundPrice(item.subtotal-item.off_price)}</span></p>
                                {item.off_price >0  &&  <p className='text-sm font-extralight'><span className='text-base text-gray-400 font-semibold line-through'>{item.subtotal}</span></p>}
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
    const [candidateProduct, setCandidateProduct] = useState(order?.items[0] ?? [])

    useEffect(() => {
        if (!order) return 
        fetchProduct(order?.items[0].product_id, setCandidateProduct)
    }, [])

    const navigate = useNavigate()
    if (!candidateProduct) return <div></div>

    return (
        <div className='flex flex-col gap-2 p-2 md:p-4 bg-white dark:bg-black shadow-sm rounded-sm hover:shadow-lg hover:rounded-lg transition-all'>
            {/* Preview Item */}
            <div className='h-[100px] w-full md:h-[120px] flex gap-4'>
                <img src={candidateProduct?.image_url?.length > 0 ? assets[candidateProduct.image_url[0]] : demo_1} className='h-full aspect-square object-cover rounded-sm'/>

                <div className='flex flex-col justify-between w-full'>
                    <div className='w-full flex justify-between'>
                        {/* Name */}
                        <p className='text-base md:text-lg'>{candidateProduct?.name}</p>
                        {/* Status */}
                        <div className='flex justify-end'>
                            <p className={`text-sm p-1 rounded-sm ${order_status[order?.status][1]} ${order_status[order?.status][3]} font-semibold`}>{order?.status}</p>
                        </div>
                    </div>

                    {/* Total Quantity and Price */}
                    <div className='flex gap-2 items-center'>
                        <p className='text-sm font-extralight'>Quantity: <span className='text-base font-semibold'>{order?.items?.length}</span></p>
                        <p className='text-2xl'>|</p>
                        <p className='text-sm font-extralight'>Total: <span className='text-base font-semibold'>${getRoundPrice(order?.subtotal - order?.off_price)}</span></p>
                    </div>

                </div>
            </div>

            <div className="w-full" style={{ borderBottom: '0.5px solid #e0e0e0' }} />
            
            {/* Detail Button */}
            <div className='mx-auto text-blue-500 cursor-pointer' onClick={()=>navigate(`/personal/order/${order._id}`)}>See more</div>
        </div>

    )
}

function Personal_Order() {
  const [statusChosen, setStatusChosen] = useState('All')
  const [initialOrder, setInitialOrder] = useState([])
  const [currentOrder, setCurrentOrder] = useState([])
  const {user}= useAuth()

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await BEApi.OrderApi.getByUserId(user.id?? user._id);
                const data = res.data.map(item => ({
                    ...item,
                    order_date: getFormatDate(item.createdAt)
                }))

                setInitialOrder(data)
                setCurrentOrder(data)

            } catch (err) {
            console.error("Failed to fetch order", err);
            }
        }

        fetchOrder()
    }, [user])

  const filterStatus = (status) => {
    if (status === 'All') setCurrentOrder(initialOrder)
    else setCurrentOrder(initialOrder.filter(order => order.status === status))
  }
  
  return (
    <div className='flex flex-col gap-4'>
        <p className='text-2xl font-semibold'>Purchased Orders</p>
        <Admin_Universal_Order_Status statusChosen={statusChosen} setStatusChosen={setStatusChosen} filterStatus={filterStatus}/>

        {currentOrder.map((order) => (
            <Order_Preview key={order._id} order={order}/>
        ))}

    </div>

  )
}

export default Personal_Order
