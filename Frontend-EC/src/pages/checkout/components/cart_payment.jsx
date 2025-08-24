import React, { useState } from 'react'
import { useCheckout } from '../../../context/CheckoutContext'

const Payment_Item = ({title, color, description , whichPayment, setter}) => {

    return (
        <div className={`flex flex-col border-1 border-gray-100 rounded-lg p-4 transition-all ${whichPayment===title ? 'bg-teal-50 outline-2 outline-teal-400' : ''}`}
             onClick={setter}>
            <div className='flex gap-2'>
                <p className='text-sm font-bold'>{title}</p>
                <div className={`${title==='Cash on Delivery' ? 'hidden' : ''} text-xs text-white font-bold ${color} px-1 rounded-sm flex items-center`}>{title}</div>
            </div>

            <p className='text-xs text-gray-400 font-semibold'>{description}</p>
        </div>
    )
}

function Cart_Payment() {
    const mapping = {
        'Cash on Delivery': ['bg-white', 'Pay when you receive'],
        'PayPal': ['bg-blue-600/70', 'Secure online payment'],
        'VNPAY': ['bg-blue-600/70', 'Vietnamese payment gateway'],
        'MoMo': ['bg-pink-700/70', 'Mobile Wallet payment'],
    }

    const {whichPayment, setwhichPayment} = useCheckout()

  return (
    <div className='bg-white px-2 md:px-4 py-4 shadow-sm border-1 border-gray-100 rounded-lg'>
        <p className='text-sm font-semibold mb-4'>Payment Method</p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {Object.keys(mapping).map((key) => (
                <Payment_Item key={key} title={key} color={mapping[key][0]} description={mapping[key][1]} whichPayment={whichPayment} setter={()=>setwhichPayment(key)}/>
            ))}
        </div>

    </div>
  )
}

export default Cart_Payment