import { useState, useEffect } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { useNavigate, useParams } from 'react-router-dom'
import Admin_Universal_Item, {Admin_Universal_Page, order_status} from './admin_universal'
import { Text_Item } from './admin_inventory'
import { toast } from 'sonner'
import BEApi from '../../../service/BEApi'
import { getFormatDate } from '../../components/functions/product_functions'


export const Admin_Order_Detail = () => {
  const status = ["Required", "Confirmed", "Canceled", "Delivering", "Done"]

  const {id} = useParams()
  const {handleGetFresh} = useAdmin()
  const [orderInfo, setOrderInfo] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  const handleUpdate = (new_status) => {
    const data = {status: new_status}

    BEApi.OrderApi.update(id, data).then(resp=>{
      toast.success("Updated successfully")
      handleGetFresh()
    }, (err)=>{
      toast.error(err.response?.data?.error || "Failed to update status");
    }
    )
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Order Info
        const resOrder = await BEApi.OrderApi.getById(id)
        const order = resOrder.data

        if (order) {
          const orderData = {
            ...order,
            order_id: order?._id}

          setOrderInfo(orderData)

          // 2. User Info
          if (order.user_id) {
            const resUser = await BEApi.UserApi.getById(order.user_id);
            const user = resUser.data;
            if (user) {
              setUserInfo({
                ...user,
                user_id: user._id})
            }
          }
        } 
      }
      catch (error) {
        console.error("Error fetching data", error);
      }
    }
      fetchData()

  }, [id])

  if (!orderInfo) return <p>ERROR</p>

  const info = {name: ["Name", userInfo?.name], mail: ["Mail", userInfo?.email], phone: ['Phone', userInfo?.phone], 
                order_date: ['Order date', getFormatDate(orderInfo?.createdAt)], shipping_address: ['Shipping address', orderInfo?.shipping_address], 
                order_message: ['Message', orderInfo?.message ?? ""]}

  return (
    <div className='flex flex-col gap-4 py-4 px-2 md:px-8'>    
      <div className='flex justify-between'>
        {/* Title */}
        <div className='flex flex-col '>
          <p className='font-semibold text-sm md:text-xl'>Order #<span className="font-bold text-purple-600">{id}</span></p>
          <p className='font-semibold text-sm md:text-xl'>User #<span className="font-bold text-purple-600">{userInfo?._id}</span></p>
        </div>
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
        {orderInfo?.items.map((item) => (
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