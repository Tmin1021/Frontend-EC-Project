import { useNavigate } from "react-router-dom"
import { useAdmin } from "../../context/AdminContext"
import { Check } from "lucide-react"
import React, { useState } from 'react'

export default function Admin_Universal_Item({which, info=null, header=0}) {
  const {sortUniversal} = useAdmin() 
  const main_infos = {
    inventory:  {product_id: ["Product ID", info?.product_id], name: ["Name", info?.name], type: ['Type', info?.type], 
                stock: ['Stock', info?.stock], available: ['Available', info?.available]},
    user:      {user_id: ["User ID", info?.user_id], name: ["Name", info?.name], mail: ["Mail", info?.mail],
                phone: ['Phone', info?.phone], address: ['Address', info?.address]},
    order_item: {product_id: ['Product ID', info?.product_id], option: ['Option', info?.option?.name], price: ['Base price', info?.option?.price ?? info?.price],
                quantity: ['Quantity', info?.quantity], off_price: ['Off price', info?.off_price], total: ['Total',  ((info?.option?.price ?? info?.price) - info?.off_price) * info?.quantity]
    }          
    }

  const main_info = main_infos[which]
   
  return (
     <div className='flex justify-between gap-1 px-1 py-2'>
      {Object.keys(main_info).map((key)=> (
        <div key={key} className={`${header ? 'text-lg font-semibold text-gray-800 hover:text-green-600' : 'text-base font-light text-gray-700'}
                                  min-w-[150px] transition-all cursor-pointer`} 
                       onClick={() => {if(header) sortUniversal(which, key)}}>

          {key==='available' && !header ?  
          <div>{main_info[key][1]? <Check/> : <div></div>}</div>
          : <p >{main_info[key][header? 0:1]}</p>}

        </div>
      ))}
     </div>
  )
}

export function Admin_Universal_Search({name}) {
  const [input, setInput] = useState('')
  const {searchUniversal} = useAdmin()

  return (
    <input 
            type="text" 
            placeholder='Search'
            value={input}
            onChange={(e)=>{setInput(e.target.value); searchUniversal(name.toLowerCase(), e.target.value)}}
            className='text-lg font-light border-1 px-2 py-1 border-gray-300 rounded-lg'
      /> 
  )
}

export function Admin_Universal_Page({name}) {
    const {currentUser, currentInventory, currentOrder} = useAdmin()
    const navigate = useNavigate()
    const mapping = {
        "User": ['user', 'user_id', currentUser],
        "Inventory": ['inventory', 'product_id', currentInventory], 
        "Order": ['order', 'order_id', currentOrder]}

    const [type, primaryKey, dataList] = mapping[name];

    return (
      <div className='flex flex-col overflow-y-auto px-4 md:px-8 lg:px-16 gap-4'>
        {/* Page name */}
        <p className='font-bold text-4xl'>{name}</p>

        {/* Search */}
        <Admin_Universal_Search name={name}/>

        <div className='flex flex-col gap-2'>
          {/* Header title */}
          <Admin_Universal_Item key={-1} which={type} header={1}/>

          {/* Rows */}
          {dataList.map((info, i) => (
            <div key={info[primaryKey]} className={`${i%2===0?  'bg-gray-100':''} `} onClick={()=>navigate(`/admin/${type}/${info[primaryKey]}`)}>
                <Admin_Universal_Item which={type} info={info} header={0}/>
            </div>
          ))}
        </div>
      </div>
    )
}