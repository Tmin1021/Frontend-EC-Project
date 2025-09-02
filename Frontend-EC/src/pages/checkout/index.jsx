import React from 'react'
import CartList from './components/cart_list'
import Cart_Payment from './components/cart_payment'
import Order_Summary from './components/order_summary'
import Delivery_Info from './components/delivery_info'
import Cart_Decor from './components/cart_decor'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

function Checkout() {
  const {user} = useAuth()

  //if (!isAuthenticated) navigate('/login')
  //if (isAuthenticated && (cart.length === 0 || user.role!='user')) navigate('/')

  return (
    <AnimatePresence>
      <div className='flex flex-col gap-4 p-4 md:p-8 lg:p-16 bg-gray-50'>
        {/* Title */}
        <p className='text-3xl text-pink-700/90 font-semibold mx-auto'>The cart of {user?.name}</p>

        <div className='flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-8'>
          {/* Left part or upper part */}
          <motion.div initial={{ opacity: 0, x: -80}}
               animate={{ opacity: 1, x: 0}}
               exit={{ opacity: 0, x: -80 }}
               transition={{ duration: 0.6 }}
               className='flex flex-col w-full lg:w-[75%] gap-2 md:gap-4 lg:gap-8'>
            <Delivery_Info />
            <CartList/>
            <Cart_Payment/>
          </motion.div>

          {/* Right part or bottom part */}
          <motion.div initial={{ opacity: 0, x: 80}}
               animate={{ opacity: 1, x: 0}}
               exit={{ opacity: 0, x: 80 }}
               transition={{ duration: 0.6 }}
               className='flex flex-col w-full lg:w-[25%] gap-2 md:gap-4 lg:gap-8'>
            <Order_Summary/>
            <Cart_Decor/>
          </motion.div>

        </div>
      </div>
    </AnimatePresence>
  )
}

export default Checkout