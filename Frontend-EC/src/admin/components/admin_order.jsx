import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { order_items, orders, users } from '../../data/dummy'
import { useNavigate, useParams } from 'react-router-dom'
import Admin_Universal_Item, {Admin_Universal_Page} from './admin_universal'

export const Admin_Order_Detail = () => {
  const status = ["Required", "Confirmed", "Canceled", "Pended", "Delivering", "Done"]

  const {id} = useParams()
  const order_item = order_items.find(i => i.order_id.toString()===id)
  if (!order_item) return <p>ERROR</p>

  const order_info = orders.find(order => order.order_id === order_item.order_id)
  const user_info = users.find(user => order_info.user_id===user.user_id)
  const info = {user_id: ["User ID", user_info?.user_id], name: ["Name", user_info?.name], mail: ["Mail", user_info?.mail],
                     phone: ['Phone', user_info?.phone], order_date: ['Order date', order_info.order_date], shipping_address: ['Shipping address', order_info?.shipping_address]}

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
        {order_item.products.map((item, i) => (
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