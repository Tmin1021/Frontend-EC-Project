import React, { useEffect, useState } from 'react'
import { useCart } from '../../../context/CartContext'
import { carts, products, isDummy , demo_1} from '../../../data/dummy'
import { Minus, Plus, TicketPercent, Trash } from 'lucide-react'
import GlobalApi from '../../../../service/GlobalApi'
import { useNavigate } from "react-router-dom";
import { useDynamicPricing } from '../../../context/DynamicPricingContext'

// product: ..., option:,  total_price: , quantity: ,off_price:

const BASE_URL = 'http://localhost:1337';

const Cart_Item = ({product}) => {
    const [productInfo, setProductInfo] = useState()
    const {getDynamicPrice} = useDynamicPricing()

    useEffect(() => {
        async function fetchProduct(product_id) {
            try {
                const res = await GlobalApi.ProductApi.getById(product_id)
                if (res) {
                    setProductInfo(res.data.data)
                }
            }
            catch (err) {
                console.error("Failed to fetch product", err);
            }       
        }

        fetchProduct(product.product_id)

    }, [])

    return (
        <div className='h-[130px] w-full md:h-[120px] p-1 md:p-4 flex gap-2 md:gap-4 rounded-lg border-1 border-gray-100 hover:shadow-lg hover:shadow-gray-200 transition-all'>
            <img src={productInfo?.image_url?.[0] ? `${BASE_URL}${productInfo.image_url[0].url}` : demo_1} className='h-full aspect-square object-cover rounded-lg'/>

            <div className='flex flex-col justify-between w-full'>
                <div className='flex justify-between'>
                    {/* Name */}
                    <p className='font-semibold text-sm w-[150px] md:w-full'>{productInfo?.name}</p>
                    {/* Base Price */}
                    <p className='font-extrabold text-sm'>{productInfo?.type==='flower' ? getDynamicPrice(productInfo?.price ?? 1, productInfo?.fill_stock_date) : productInfo?.price}</p>
                </div>
                
                {/* Option */}
                {product.option && <div className='flex gap-2'>
                    <div className='text-xs font-semibold text-gray-500 bg-gray-100 p-1 rounded-sm w-fit'>{product?.option?.name}</div>
                    <div className='text-xs font-semibold text-gray-500 bg-gray-100 p-1 rounded-sm w-fit'>{product?.option?.stems} stems</div>
                </div>}

                <div className='flex flex-col md:flex-row justify-between gap-1'>
                    {/* Modify quantity 
                    <div className=' w-[50%] md:w-[25%] flex items-center gap-4 cursor-pointer'>
                        <div className='p-1 rounded-full bg-gray-200/60 backdrop-blur-xs shadow-gray-400 shadow-sm hover:shadow-md transition-all'>
                            <Minus className='w-4 h-4 text-gray-700' onClick={()=>updateCart(product, Math.max(1, product.quantity-1))}/>
                        </div>
                        <p className='text-lg pr-1 font-semibold'> {product.quantity} </p>
                        <div className='p-1 rounded-full bg-green-400/60 backdrop-blur-xs shadow-gray-400 shadow-sm hover:shadow-md transition-all'>
                            <Plus className='w-4 h-4 text-white' onClick={()=>updateCart(product, Math.min(product.product.stock, product.quantity+1))}/>
                        </div>
                    </div>*/}

                    {/* Total and Off Price and Remove button*/}
                    <div className='flex gap-2 items-center justify-between md:justify-end'>
                        <p className='font-bold text-sm'><span className='text-gray-400 font-medium'>Quantity: </span>{product?.quantity}</p>
                        <p className='font-bold text-sm'><span className='text-gray-400 font-medium'>Total: </span>{Math.round(100*(product?.total_price-product?.off_price),2)/100}</p>
                         {product?.off_price>0 && 
                        <div className='flex items-center gap-1'>
                            <TicketPercent className='text-blue-500 w-5 h-5 hidden md:inline'/>
                            <p className='line-through text-sm font-bold text-gray-500'>{product?.total_price}</p>
                        </div>}

                        <div className='hidden bg-pink-500 text-white text-xs p-1 rounded-sm font-medium shadow-gray-400 shadow-sm hover:shadow-md transition-all'>Remove</div>
                        <div className='hidden p-1 rounded-full bg-pink-500/80 backdrop-blur-xs shadow-gray-400 shadow-sm hover:shadow-md transition-all'><Trash className='w-4 h-4 text-white'/></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

function CartList() {
  const {cart, fetchCart, selectedItems} =  useCart()
  const cartLength = cart?.length
  const navigate = useNavigate()
  
  useEffect(() => {
        if (isDummy) return
        fetchCart()
        //console.log(cart)
        if (selectedItems.filter(Boolean).length === 0) return
  },[])

  return (
    <div className='flex flex-col gap-2 bg-white px-2 md:px-4 py-4 shadow-sm border-1 border-gray-100 rounded-lg overflow-auto'>
        <div className='flex justify-between'>
            <p className='text-sm font-semibold'>Selected Cart Items</p>
            <p className='text-sm text-gray-400 font-semibold'>{cartLength>1 ? cartLength + ' items' : cartLength + ' item'}</p>
        </div>

        {cart?.map((product, i) => (
            product.isSelected && <Cart_Item key={i} product={product} />
        ))}
    </div>
  )
}

export default CartList