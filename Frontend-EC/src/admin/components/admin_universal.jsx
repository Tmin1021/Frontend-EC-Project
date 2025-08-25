import { useNavigate } from "react-router-dom"
import { useAdmin } from "../../context/AdminContext"
import { Check, ListFilter, Search, Settings, Plus, ChevronDown, Package, ShoppingCart, CalendarCheck, CircleX, TruckElectric, PackageCheck } from "lucide-react"
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";

export const order_status = {
  "All": ['bg-black dark:bg-white', 'bg-black dark:bg-white', 'text-white dark:text-black', 'text-white dark:text-black', <Package/>],
  "Required": ['bg-blue-400', 'bg-blue-100', 'text-white', 'text-blue-500', <ShoppingCart/>],
  "Confirmed": ['bg-green-400', 'bg-green-100', 'text-white', 'text-green-500', <CalendarCheck/>],
  "Canceled": ['bg-red-400', 'bg-red-100', 'text-white', 'text-red-500', <CircleX/>], 
  "Delivering": ['bg-yellow-400', 'bg-yellow-100','text-white', 'text-yellow-500', <TruckElectric/>], 
  "Done": ['bg-purple-400', 'bg-purple-100', 'text-white', 'text-purple-500', <PackageCheck/>]}

export default function Admin_Universal_Item({which, info=null, header=0, lastRow=false}) {
  const {sortUniversal} = useAdmin() 

  const main_infos = {
    inventory:  {product_id: ["Product ID", info?.product_id], name: ["Name", info?.name], type: ['Type', info?.type], price: ['Price', info?.price],
                 stock: ['Stock', info?.stock], available: ['Status', info?.available]},
    user:       {user_id: ["User ID", info?.user_id], name: ["Name", info?.name], mail: ["Mail", info?.mail],
                 phone: ['Phone', info?.phone], address: ['Address', info?.address]},
    order:      {order_id: ['Order ID', info?.order_id], user_id: ['User ID', info?.user_id], order_date: ['Order date', (info?.order_date)],
                 shipping_address: ['Shipping adress', info?.shipping_address], total_amount: ['Total amount', info?.total_amount], status: ['Status', info?.status]}, 
    order_item: {product_id: ['Product ID', info?.product_id], option: ['Option', info?.option?.name], price: ['Base price', Math.round(100*(info?.option?.price ?? info?.price), 2)/100],
                 quantity: ['Quantity', info?.quantity], off_price: ['Off price', info?.off_price], total: ['Total',  Math.round(100*((info?.option?.price ?? info?.price) - info?.off_price) * info?.quantity, 2)/100]
    },
    order_item_lastRow: {product_id: ['Product ID', ''], option: ['Option', ''], price: ['Base price', ''],
                 quantity: ['Quantity', ''], off_price: ['Off price', ''], total: ['Total',  info?.total_amount-info?.off_price]}          
    }

  const realToNormID = (attribute, defaultValue) => {
    if (attribute.includes('date')) return defaultValue.split('T')[0]
    if (!attribute.includes('id') || (attribute==='user_id' && which==='order')) return defaultValue
    return info?.norm_id
  }

  const main_info = main_infos[which]
  const colCount = Object.keys(main_info).length;

  const [clickedHeader, setClickedHeader] = useState('')
  const [isAscending, setIsAscending] = useState(true)

  const handleClickedHeader = (by) => {
    if (by===clickedHeader) {
      setIsAscending(!isAscending)
      sortUniversal(which, by, !isAscending)
    }
    else {
      setClickedHeader(by)
      setIsAscending(true)
      sortUniversal(which, by, true)
    }
  }

  return (
    <div className='flex flex-col gap-4 justify-between min-w-xl overflow-auto'>
      <div className={`grid gap-2 my-auto`} style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`}}>
        {Object.keys(main_info).map((key)=> (
          <div key={key} className={`${header ? 'text-xs font-medium text-gray-500' : 'text-sm'} transition-all cursor-pointer overflow-hidden`} 
                        onClick={() => {if(header) handleClickedHeader(key)}}>
            
            {/* format for available and status */}
            {(key==='available' && !header) ?  
            <div>{main_info[key][1]? 
                                    <div className='flex justify-center py-1 items-center bg-green-100 border-1 border-green-200 rounded-sm text-sm font-semibold text-green-700'>Published</div>
                                    : <div className='flex justify-center py-1 items-center bg-red-100 border-1 border-red-200 rounded-sm text-sm font-semibold text-red-700'>Unpublished</div>}</div>
            
            : (key==='status' && !header) ?
              <div className={`flex justify-center py-2 items-center ${order_status[main_info[key][1]][1]} ${order_status[main_info[key][1]][3]} rounded-sm text-sm font-semibold `}>{main_info[key][1]}</div>

            : 
            <div className='flex items-center gap-2 transition-all'>
              <p>{header ? main_info[key][0].toString().toUpperCase() : realToNormID(key, main_info[key][1])}</p>
              {header===1 && key===clickedHeader && (<ChevronDown className={`w-4 h-4 ${isAscending ? 'rotate-180' : ''} transition-transform`} />)}
            </div>}

          </div>
        ))}
      </div>
      {!lastRow && <div className='border-1 border-gray-100'></div>}
     </div>
  )
}

export function Admin_Universal_Search({name, isSearch, setIsSearch}) {
  const [input, setInput] = useState('')
  const {searchUniversal} = useAdmin()
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, [isSearch]);

  return (
    <AnimatePresence mode='wait'>
      {!isSearch && 
      <motion.div key='icon'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className='w-[32px] aspect-square flex items-center justify-center bg-white border-1 border-gray-300 rounded-sm hover:bg-gray-100 transition-all'
                  onClick={()=>setIsSearch(!isSearch)}>
        <Search className='w-4 h-4 text-gray-500'/>
      </motion.div>}

      {isSearch&& 
      <motion.div key='input'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}>
        <input  
                ref={inputRef}
                type="text" 
                placeholder='Search'
                value={input}
                onChange={(e)=>{setInput(e.target.value); searchUniversal(name.toLowerCase(), e.target.value)}}
                className='font-light bg-white px-2 py-1 rounded-lg border-gray-300 border-1 focus:border-purple-500 focus:border-2 focus:outline-none transition-all duration-200'
          /> 
      </motion.div>}
    </AnimatePresence>
  )
}

export function Admin_Universal_Filter() {

  return (
    <div className='w-[100px] h-[32px] flex items-center justify-between px-4 bg-white border-1 border-gray-300 rounded-sm'>
      <ListFilter className='w-4 h-4 text-gray-700'/>
      <p className='font-bold text-xs'>Filters</p>
    </div>
  )
}

export function Admin_Universal_Setting() {

  return (
    <div className='relative w-[32px] aspect-square flex items-center justify-center bg-white border-1 border-gray-300 rounded-sm hover:bg-gray-100 transition-all'>
      <Settings className='w-4 h-4 text-gray-700'/>

      
    </div>
  )
}

export function Admin_Universal_Create() {
  const navigate = useNavigate()

  return (
    <div className='cursor-pointer w-[160px] h-[32px] flex items-center justify-between font-bold text-white bg-purple-400 px-4 border-1 border-gray-300 rounded-sm hover:bg-purple-600 hover:shadow-gray-200 hover:shadow-md transition-all'
         onClick={()=>navigate(`create`)}>
      <Plus className='w-4 h-4'/>
      <p className='text-xs'>Create new entry</p>
    </div>
  )
}

export function Admin_Universal_Order_Status({statusChosen='All', setStatusChosen={}, filterStatus={}}) {

  return (
    <AnimatePresence mode="wait">
    <motion.div className='flex gap-2 md:gap-4 transition-all'>
      {Object.keys(order_status).map((key)=> (
        <motion.div key={key} 
                    className={`${order_status[key][2]} ${statusChosen===key? order_status[key][0]: 'bg-gray-200 text-gray-800'} flex gap-2 justify-between items-center shadow font-semibold p-2 rounded-lg transition-all`}
                    onClick={()=>{if (statusChosen!==key) {setStatusChosen(key)} filterStatus(key)}}>
          
          {order_status[key][4]}
          {statusChosen===key && <motion.div 
                      key="label"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.6 }}> {key}</motion.div>}
          
        </motion.div>
      ))}
    </motion.div>
  </AnimatePresence>
  )
}

export function Admin_Universal_Page({name}) {
    const {currentUser, currentInventory, currentOrder, filterStatus} = useAdmin()
    const navigate = useNavigate()
    const [isSearch, setIsSearch] = useState(false)
    const mapping = {
        "User": ['user', 'user_id', currentUser],
        "Inventory": ['inventory', 'product_id', currentInventory], 
        "Order": ['order', 'order_id', currentOrder]}

    const [statusChosen, setStatusChosen] = useState('All')

    const [type, primaryKey, dataList] = mapping[name];
    const dataListLength = dataList.length

    return (
      <AnimatePresence>
        <div className='flex flex-col overflow-y-auto px-2 md:px-4 lg:px-8 gap-4' onClick={()=>setIsSearch(false)}>
          {/* Page name and Create button*/}
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-semibold text-3xl'>{name}</p>
              <p className='text-gray-500'>{dataListLength>1 ? dataListLength + ' entries found' : dataListLength===1 ? dataListLength + ' entries found' : 'No entry found'}</p>
            </div>
            <Admin_Universal_Create />
          </div>

          {/* Search */}
          <div className='h-[40px] flex items-center justify-between' onClick={(e)=>e.stopPropagation()}>
            <Admin_Universal_Search name={name} isSearch={isSearch} setIsSearch={setIsSearch}/>
            <Admin_Universal_Setting/>
          </div>

          {/* For order only */}
          {name==='Order' && 
          <Admin_Universal_Order_Status statusChosen={statusChosen} setStatusChosen={setStatusChosen} filterStatus={filterStatus}/>}

          <div className='flex flex-col gap-4 bg-white px-8 py-4 shadow-lg border-1 border-gray-100 rounded-sm min-w-lg overflow-auto' onClick={(e)=>e.stopPropagation()}>
            {/* Header title */}
            <Admin_Universal_Item key={-1} which={type} header={1}/>

            {/* Rows */}
            {dataList.map((info, i) => (
              <div key={info[primaryKey]}  onClick={()=>{if(type!=='user') navigate(`/admin/${type}/${info[primaryKey]}`)}}>
                  <Admin_Universal_Item which={type} info={info} header={0} lastRow={i===dataList.length-1} />
              </div>
            ))}
          </div>
        </div>
      </AnimatePresence>
    )
}