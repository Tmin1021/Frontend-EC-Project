import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { Check } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

export const Admin_Inventory_Detail = () => {
  const {id} = useParams()
  const {currentInventory} = useAdmin()
  const product = currentInventory.find(product => product.product_id===id)
  if (!product) return <div>ERROR</div>

  return (
    <div className='flex flex-col'>
      <p>name</p>
      <p>image</p>
      <p>description</p>
      <p>quantity</p>
      <p>option</p>
    </div>
  )
}

export const Universal_Admin_Item = ({which, info, header}) => {
  const {sortInfo} = useAdmin() 
  const main_infos = {
    inventory: {product_id: ["Product ID", info?.product_id], name: ["Name", info?.name], type: ['Type', info?.type], 
                stock: ['Stock', info?.stock], available: ['Available', info?.available]},
    users:      {user_id: ["User ID", info?.user_id], name: ["Name", info?.name], mail: ["Mail", info?.mail],
                phone: ['Phone', info?.phone], address: ['Address', info?.address]
    }}
  const main_info = main_infos[which]
   
  return (
     <div className='flex justify-between gap-1 px-1 py-2'>
      {Object.keys(main_info).map((key)=> (
        <div key={key} className={`${header ? 'text-lg font-semibold text-gray-800' : 'text-base font-light text-gray-700'}
                                  w-1/5 min-w-[120px]
                                  ${header ? 'cursor-pointer hover:text-green-600' : ''} transition-all`} 
                       onClick={() => {if(header) sortInfo(which, key)}}>
          {key==='available'&&!header ?  <div>{main_info[key][1]? <Check/> : <div></div>}</div>
          : <p >{main_info[key][header? 0:1]}</p>}
        </div>
      ))}
     </div>
  )
}

function Admin_Inventory() {
  const {currentInventory} = useAdmin()
  const navigate = useNavigate()

  return (
    <div className='flex flex-col overflow-y-auto px-4 md:px-8 lg:px-16'>
      <h1 className='font-bold'>Inventory</h1>
      <Universal_Admin_Item key={-1} which={'inventory'} header={1}/>
      {currentInventory.map((info, i) => (
        <div className={`${i%2===0?  'bg-gray-100':''} `} onClick={()=>navigate(`/admin/inventory/${info.product_id}`)}>
             <Universal_Admin_Item key={info.product_id} which={'inventory'} info={info} header={0}/>
          </div>

      ))}
    </div>
  )
}

export default Admin_Inventory
