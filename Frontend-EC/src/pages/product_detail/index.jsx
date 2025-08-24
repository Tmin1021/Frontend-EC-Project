import React, { useState } from 'react'
import Product_Preview from './components/product_preview';
import Product_Option from './components/product_option';
import Product_Extra from './components/product_extra';
import Product_Description from './components/product_description';
import Product_Delivery_Date from './components/product_delivery_date';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Product_Comment from './components/product_comment';
//import {ProductCalendarProvider, useProductCalendar} from '../../context/ProductCalendarContext';
import Product_Quantity from './components/product_quantity';
import { ProductDetailProvider, useProductDetail } from '../../context/ProductDetailContext';
import GlobalApi from '../../../service/GlobalApi';
import { AnimatePresence, motion } from 'framer-motion';
import { useDynamicPricing } from '../../context/DynamicPricingContext';
import Product_Banner from './components/product_banner';


const Fly_To_Cart = ({image, isAllowed, setIsAllowed}) => {

    const curWidth = window.innerWidth/2.8

    return (
        <AnimatePresence>
        {isAllowed && 
        <motion.div initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x: curWidth, y: -500 }}
                    exit={{ opacity: 0, y: -500 }}
                    transition={{ duration: 0.6 }}
                    onAnimationComplete={() => {
                        if (isAllowed) setIsAllowed(false);
                    }}
                    className='absolute'>
            <img src={image} className='w-[30px] aspect-square object-fit rounded-sm'/>
        </motion.div>}
        </AnimatePresence>
    )
}


function Product_Detail() {
 const {product, quantity, selectedOption, selectedExtra, getOptionStock} = useProductDetail()
 const {condition_mapping} = useDynamicPricing()
 const {addCart} = useCart()
 const [isAllowed, setIsAllowed] = useState(false)

 if (!product) return <div>Product not found</div>;
 const stock = product.type === 'flower' ? getOptionStock(selectedOption.stems) : product.stock

 return (
    <AnimatePresence>
    <div className='flex flex-col gap-4 relative max-w-screen-xl mx-auto px-4 md:px-10 lg:px-32 mt-4 '>
        <motion.div initial={{ opacity: 0, y:-30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
                    className='flex flex-col justify-between items-center md:items-start gap-4 md:gap-14 md:flex-row'>
            {/* Preview and Description */}
            <p className='font-semibold text-4xl mx-auto md:hidden'>{product.name}</p>
            <div className='flex flex-col gap-4 w-full'>
                <div className='w-full '><Product_Preview images={product.image_url}/></div>
                <Product_Description description={product.description}/>
            </div>

            {/* Option */}
            <div className='w-full flex flex-col gap-4'>
                <Product_Banner/>
                <p className='font-semibold text-4xl mx-auto hidden md:flex'>{product.name}</p>
                {product.type==='flower' && <Product_Option/>}
                {product.type==='flower' && <Product_Extra/>}
                {stock!=0 && <Product_Quantity curStock={stock}/>}


                {/* Stock and Condition */}
                <div className='flex gap-2'>
                    {stock!=0 && <p className={`${stock<5 ? 'bg-red-600/80':'bg-green-600/80'} font-semibold w-fit p-1 text-white rounded-sm cursor-pointer hover:px-2 hover:bg-red-600-90 transition-all`}>In stock: {stock}</p>}
                    {stock!=0 && product.type==='flower' && <p className={`${condition_mapping[product.condition]} font-semibold w-fit p-1 text-white rounded-sm cursor-pointer hover:px-2 transition-all`}>{product.condition}</p>}
                </div>

                {/* Add to cart */}
                <div className={`relative ${!stock ? 'bg-gray-500/80 hover:bg-gray-500 pointer-events-none': 'bg-green-800/80 hover:bg-green-800'} min-w-[300px] h-[50px] flex items-center rounded-sm hover:shadow-lg shadow-gray-300 transition-all`} 
                     onClick={() => {setIsAllowed(true); addCart({ product: product, option: selectedOption, quantity: quantity});
                     if (selectedExtra) {addCart({ product: selectedExtra, quantity: 1})}}}>
                    <p className='font-semibold text-lg text-white mx-auto cursor-pointer'>{!stock ? 'OUT OF STOCK' : "ADD TO CART"}</p>
                    <Fly_To_Cart image={product.image_url[0]} isAllowed={isAllowed} setIsAllowed={setIsAllowed}/>
                </div>

            </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y:30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4 }}>
            <Product_Comment product_id={product.product_id}/>
        </motion.div>

    </div>
    </AnimatePresence>
  );
}

export default Product_Detail
