import { useState, useEffect } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { isDummy, order_items, orders, users } from '../../data/dummy'
import { useNavigate, useParams } from 'react-router-dom'
import Admin_Universal_Item, {Admin_Universal_Page} from './admin_universal'
import GlobalApi from '../../../service/GlobalApi'

export const Admin_Order_Detail = () => {
  const status = ["Required", "Confirmed", "Canceled", "Pended", "Delivering", "Done"]

  const {id} = useParams()
  const [orderItem, setOrderItem] = useState(null)
  const [orderInfo, setOrderInfo] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
      const fetchOrderItem = async () => {
        try {
            const res = await GlobalApi.OrderItemApi.getById(id);
            const item = res.data.data;
            console.log(item)
            if (item) {
              const data = {
                order_id: item[0]?.order_id,
                products: item[0]?.products
              }
            
            console.log(data)
            setOrderItem(data);
            } else {
            console.warn("No product found for", id);
            }
        } catch (error) {
            console.error("Failed to fetch product:", error);
        }
      };

      const fetchOrderInfo = async () => {
        try {
            const res = await GlobalApi.OrderApi.getById(id);
            const item = res.data.data;

            if (item) {
                const data = {
                    order_id: item?.documentId,
                    user_id: item?.user_id,
                    order_date: item?.order_date,
                    total_amount: item?.total_amount,
                    off_price: item?.off_price,
                    shipping_address: item?.shipping_address,
                    status: item?.order_status
                }

            setOrderInfo(data);
            } else {
            console.warn("No product found for", id);
            }
        } catch (error) {
            console.error("Failed to fetch product:", error);
        }
      };

      const fetchUserInfo = async () => {
        try {
            const res = await GlobalApi.OrderItemApi.getById(id);
            const item = res.data.data;

            if (item) {
              const data = {
              user_id: item?.documentId,
              name: item?.name,
              mail: item?.mail,
              phone: item?.phone,
              address: item?.address,
              role: item?.role
            }

            setUserInfo(data);
            } else {
            console.warn("No product found for", id);
            }
        } catch (error) {
            console.error("Failed to fetch product:", error);
        }
      };

      if (isDummy) {
        const new_orderItem = order_items.find(order_item => order_item.order_id.toString() === id)
        const new_orderInfo = orders.find(order => order.order_id.toString()===id)
        const new_userInfo = users.find(user=>user.user_id===new_orderInfo?.user_id)

        setOrderItem(new_orderItem)
        setOrderInfo(new_orderInfo)
        setUserInfo(new_userInfo)
      }
      else {
        fetchOrderItem()
        fetchOrderInfo()
        fetchUserInfo()
      }
  }, [id])

  if (!orderItem) return <p>ERROR</p>

  const info = {user_id: ["User ID", userInfo?.user_id], name: ["Name", userInfo?.name], mail: ["Mail", userInfo?.mail],
                     phone: ['Phone', userInfo?.phone], order_date: ['Order date', orderInfo?.order_date], shipping_address: ['Shipping address', orderInfo?.shipping_address]}

  return (
    <div className='flex flex-col gap-2'>
      {/* Title */}
      <p className='font-semibold text-3xl'>Order #<span className="font-bold text-pink-500">{id}</span></p>

      {/* Basic Info */}
      <div className='pl-1'>
        {Object.keys(info).map((key) => (
          <div key={key} className='flex'>
            <p className='w-[50%] font-semibold'>{info[key][0]}</p>
            <p className='font-light'>{info[key][1]}</p>
          </div>
        ))}
      </div>

      {/* Items */}
      <div>
        <Admin_Universal_Item key={-1} which={'order_item'} header={1}/>
        {orderItem.products.map((item, i) => (
          <div key={i} className={`${i%2===0?  'bg-gray-100':''} `}>
            <Admin_Universal_Item key={item.product_id} which={'order_item'} info={item}/>
          </div>
        ))}
      </div>

    </div>
  )
}

function Admin_Order() {

  return (
      <Admin_Universal_Page name={'Order'} />
  )
}

export default Admin_Order