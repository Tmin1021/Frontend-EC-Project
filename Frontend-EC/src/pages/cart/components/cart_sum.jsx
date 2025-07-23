import React from 'react'
import { useCart } from '../../../context/CartContext'
import { accessories, products } from '../../../data/dummy'

function Cart_Sum({selectedItems}) {
  const {cart} = useCart()
  const number_of_selected_items = selectedItems.filter(index=>index===true).length
  const total = Math.round(selectedItems.map((isSelected, index) => isSelected? (cart[index].product_id.substring(0,1)==='B'? products.find(product=>product.product_id===cart[index].product_id).options[cart[index].option].price*cart[index].quantity : accessories.find(accessory=>accessory.product_id===cart[index].product_id).price*cart[index].quantity) :0).reduce((acc, cur)=> acc+cur, 0))

  return (
    <div className='w-[500px] h-[10vh] px-4 py-2 pb-4 flex flex-col bg-white' onClick={(e) =>e .stopPropagation()}>
        <p className='font-light'>{number_of_selected_items>0 ? "Total": ""}</p>
        <div className='flex items-center justify-between'>
            {number_of_selected_items>0 ?  <p className='text-red-500 text-2xl font-semibold'>{total}</p>
            : <p>Please selected items</p>}
            <div className='w-[140px] h-[40px] bg-red-500 flex items-center'>
                <p className='text-white mx-auto'>Order</p>
            </div>
        </div>
    </div>
  )
}

export default Cart_Sum