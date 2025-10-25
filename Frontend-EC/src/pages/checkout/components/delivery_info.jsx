import React, { useState } from 'react'
import { Text_Item, Text_Item_2 } from '../../../admin/components/admin_inventory'
import { useAuth } from '../../../context/AuthContext'
import { useCheckout } from '../../../context/CheckoutContext'

function Delivery_Info() {
const {user} = useAuth()
const {message, shipping_address, setShippingAddress, setMessage} = useCheckout()

  return (
    <div className='flex flex-col gap-2 bg-white px-2 md:px-4 py-4 shadow-sm border-1 border-gray-100 rounded-lg overflow-auto'>
        <p className='text-sm font-semibold mb-4'>Delivery Infomation</p>

        <div className='grid grid-cols-2 gap-2'>
            <Text_Item name='Full name' content={user?.name} placeholder='Taylor Swift'/>
            <Text_Item_2 type={'tel'} name='Phone Number' content={user?.phone} setterButton={false} placeholder='0901234567'/>
        </div>

        <Text_Item name='Delivery Address' content={shipping_address} setter={(name, value) => setShippingAddress(value)} placeholder='1 Dinh Tien Hoang, District 1'/>
        <Text_Item name='Other Message (optional)' content={message} setter={(name, value) => setMessage(value)} placeholder='e.g. Place the package in front of the building ' rows={3}/>

    </div>
  )
}

export default Delivery_Info