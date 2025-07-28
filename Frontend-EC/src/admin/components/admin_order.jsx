import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { order_items } from '../../data/dummy'
import { useNavigate, useParams } from 'react-router-dom'

export const Admin_Order_Detail = ({updateStatusOrder}) => {
  const status = ["Required", "Confirmed", "Canceled", "Pended", "On the way", "Done"]
  const {id} = useParams()
  console.log(order_items)
  const order_item = order_items.find(i => i.order_id.toString()===id)
  if (!order_item) return <p>ERROR</p>

  return (
    <div>
      {order_item.products.map((product) => (
        <p>{product.product_id}</p>
      ))}
      {status.map((i) => (
        <div onClick={()=>{updateStatusOrder(order_item.order_id, i)}}><p>{i}</p></div>
      ))}
    </div>
  )
}

function Admin_Order() {
  const status = ["Required", "Confirmed", "Canceled", "Pended", "On the way", "Done"]
  const {currentOrder} = useAdmin()
  const [currentStatus, setCurrentStatus] = useState(0)
  const navigate = useNavigate() 

  return (
    <div>
      <div className='flex gap-4'>
        {status.map((i, index)=> (
          <div onClick={()=>setCurrentStatus(index)}>
            <p key={i}>{i}</p>
          </div>

        ))}
      </div>

      <div>
        {currentOrder.filter(order=>order.status===status[currentStatus]).map((order)=>(
          <div key={order.order_id} className='bg-amber-300 flex gap-1' onClick={()=>navigate(`/admin/order/${order.order_id}`)}>
            {Object.keys(order).map((i) => (
              <p>{order[i]}</p>
            ))}
            </div>
        ))}
      </div>
    </div>
  )
}

export default Admin_Order