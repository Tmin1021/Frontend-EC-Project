import { useState, useEffect } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { isDummy, order_items, orders, users } from '../../data/dummy'
import { useNavigate, useParams } from 'react-router-dom'
import Admin_Universal_Item, {Admin_Universal_Page, order_status} from './admin_universal'
import GlobalApi from '../../../service/GlobalApi'
import { Text_Item } from './admin_inventory'
import { toast } from 'sonner'


export const Admin_Order_Detail = () => {
  const status = ["Required", "Confirmed", "Canceled", "Delivering", "Done"]

  const {id} = useParams()
  const {handleGetFresh} = useAdmin()
  const [orderItem, setOrderItem] = useState(null)
  const [orderInfo, setOrderInfo] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  const handleUpdate = (new_status) => {
    const data = {
      data:{
        order_status: new_status
      }
    };

    GlobalApi.OrderApi.update(id, data).then(resp=>{
      toast.success("Updated successfully")
      handleGetFresh()
    }, ()=>{
      toast.error('Error. Please try again.')
    }
    )
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Order Item
        const resItem = await GlobalApi.OrderItemApi.getById(id);
        const item = resItem.data.data;
        if (item) {
          setOrderItem({
            order_id: item[0]?.order_id,
            products: item[0]?.products
          });
        }

        // 2. Order Info
        const resOrder = await GlobalApi.OrderApi.getById(id);
        const order = resOrder.data.data;

        if (order) {
          const orderData = {
            order_id: order?.documentId,
            user_id: order?.user_id,
            order_date: GlobalApi.formatDate(order?.order_date),
            total_amount: order?.total_amount,
            off_price: order?.off_price,
            shipping_address: order?.shipping_address,
            status: order?.order_status
          };
          setOrderInfo(orderData);

        // 3. User Info
        if (order.user_id) {
          const resUser = await GlobalApi.UserApi.getById(order.user_id);
          const user = resUser.data.data;
          if (user) {
            setUserInfo({
              user_id: user?.documentId,
              name: user?.name,
              mail: user?.mail,
              phone: user?.phone,
              address: user?.address,
              role: user?.role
            });
          }
        }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
        fetchData()
      }
  }, [id])

  if (!orderItem) return <p>ERROR</p>

  const info = {name: ["Name", userInfo?.name], mail: ["Mail", userInfo?.mail], phone: ['Phone', userInfo?.phone], 
                order_date: ['Order date', orderInfo?.order_date], shipping_address: ['Shipping address', orderInfo?.shipping_address], 
                order_message: ['Message', orderInfo?.shipping_address]}

  return (
    <div className='flex flex-col gap-4 py-4 px-2 md:px-8'>    
      <div className='flex justify-between'>
        {/* Title */}
        <p className='font-semibold text-3xl'>Order #<span className="font-bold text-purple-600">{id}</span></p>
        <div className='lg:hidden flex items-center justify-center p-2 bg-purple-50 text-xs text-purple-700 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all'>{orderInfo?.status}</div>
      </div>  


      <div className='flex gap-4'>
        {/* Basic Info */}
        <div className='w-full lg:w-[75%] flex flex-col gap-6 px-3 md:px-6 py-6 bg-white shadow-lg border-1 border-gray-100 rounded-sm'>
          <div className='grid grid-cols-2 gap-1 md:gap-4'>
            {Object.keys(info).map((key) => (
                <Text_Item key={key} name={info[key][0]} content={info[key][1]} isEditable={false} rows={['Shipping address', 'Message'].includes(info[key][0])? 3:1}/>
            ))}
          </div>
        </div>

        {/* Update Status */}
        <div className='hidden lg:flex w-full lg:w-[25%] h-full flex-col gap-2 bg-white px-4 py-4 shadow-lg border-1 border-gray-100 rounded-sm'>
          <p className='text-xs font-semibold text-gray-500'>Update Status</p>
          <select value={orderInfo?.status}
                  onChange={(e) => {setOrderInfo({...orderInfo, status: e.target.value}); handleUpdate(e.target.value)}}
                  className="w-full py-2 bg-purple-50 text-xs text-purple-700 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all focus:outline-none">
                  {status.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
          </select>
        </div>

      </div>

      {/* Items */}
      <div className='flex flex-col gap-4 bg-white px-8 py-4 shadow-lg border-1 border-gray-100 rounded-sm min-w-lg overflow-auto'>
        <Admin_Universal_Item key={-1} which={'order_item'} header={1}/>
        {orderItem.products.map((item) => (
          <Admin_Universal_Item key={item.product_id} which={'order_item'} info={item}/>
        ))}
        <Admin_Universal_Item key={1} which={'order_item_lastRow'} info={orderInfo} lastRow={true}/>
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