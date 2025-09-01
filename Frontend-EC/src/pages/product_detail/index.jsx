import React, { useEffect, useState } from 'react'
import Product_Preview from './components/product_preview';
import Product_Option from './components/product_option';
import Product_Extra from './components/product_extra';
import Product_Description from './components/product_description';
import { useCart } from '../../context/CartContext';
import Product_Comment from './components/product_comment';
import Product_Quantity from './components/product_quantity';
import { useProductDetail } from '../../context/ProductDetailContext';
import { AnimatePresence, motion } from 'framer-motion';
import { useDynamicPricing } from '../../context/DynamicPricingContext';
import Product_Banner from './components/product_banner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Product_Detail() {
 const {product, quantity, isLoading} = useProductDetail()
 const {condition_mapping} = useDynamicPricing()
 const {addCart, setFlyingImage, setAllowFly} = useCart()
 const {isAuthenticated} = useAuth()
 const navigate = useNavigate()

 if (isLoading) return <p className="text-lg text-gray-500">Loading product...</p>

 if (!product) return <p className='text-2xl md:text-3xl font-bold'><span className='line-through'>404</span>, <span className= 'text-pink-500'>product not found</span>.</p>

 const handleFlyCart = (image) => {
    setFlyingImage(image)
    setAllowFly(true)
 } 

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
                <div className='w-full'><Product_Preview images={product.image_url}/></div>
                <Product_Description description={product.description}/>
            </div>

            {/* Option */}
            <div className='w-full flex flex-col gap-4'>
                <Product_Banner/>
                <p className='font-semibold text-4xl mx-auto hidden md:flex'>{product.name}</p>
                <Product_Option />
                {product.stock!=0 && <Product_Quantity/>}

                {/* Stock and Condition */}
                <div className='flex gap-2'>
                    {product.stock!=0 && <p className={`${product.stock<5 ? 'bg-red-600/80':'bg-green-600/80'} font-semibold w-fit p-1 text-white rounded-sm cursor-pointer hover:px-2 hover:bg-red-600-90 transition-all`}>In stock: {product.stock}</p>}
                    {product.stock!=0 && <p className={`bg-pink-400/80 font-semibold w-fit p-1 text-white rounded-sm cursor-pointer hover:px-2 hover:bg-red-600-90 transition-all`}>Stems: {product.stems}</p>}
                    {product.stock!=0 && <p className={`${condition_mapping[product.condition]} font-semibold w-fit p-1 text-white rounded-sm cursor-pointer hover:px-2 transition-all`}>{product.condition}</p>}
                    <p className='bg-gray-500/80 font-semibold w-fit p-1 text-white rounded-sm cursor-pointer hover:px-2 transition-all'>Sold: {product.sales_count}</p>
                </div>

                {/* Add to cart */}
                <div className={`relative ${!product.stock ? 'bg-gray-500/80 hover:bg-gray-500 pointer-events-none': 'bg-green-800/80 hover:bg-green-800'} min-w-[300px] h-[50px] flex items-center rounded-sm hover:shadow-lg shadow-gray-300 transition-all`} 
                     onClick={() => {if (!isAuthenticated) {navigate("/login", { state: { from: location.pathname }, replace: true })}
                                     else {handleFlyCart(product.image_url[0]); addCart({ product: product,  quantity: quantity})}}}>
                    <p className='font-semibold text-lg text-white mx-auto cursor-pointer'>{!product.stock ? 'OUT OF STOCK' : "ADD TO CART"}</p>
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
 