import React, { useState } from 'react'
import Product_Preview from './components/product_preview';
import Product_Option from './components/product_option';
import Product_Extra from './components/product_extra';
import Product_Description from './components/product_description';
import Product_Delivery_Date from './components/product_delivery_date';
import {products, accessories} from  '../../data/dummy';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Product_Comment from './components/product_comment';
//import {ProductCalendarProvider, useProductCalendar} from '../../context/ProductCalendarContext';
import Product_Quantity from './components/product_quantity';
import { ProductDetailProvider, useProductDetail } from '../../context/ProductDetailContext';


function Product_Detail() {
 const {product, quantity, selectedOption, selectedExtra} = useProductDetail()
 const {addCart} = useCart()

 if (!product) return <div>Product not found</div>;

 return (
    <div className='relative w-full px-4 md:px-10 lg:px-32'>
        <div className='flex flex-col justify-between items-center md:items-start gap-4 md:gap-14 md:flex-row'>
            {/* Preview and Description */}
            <p className='font-semibold text-4xl mx-auto md:hidden'>{product.name}</p>
            <div className='w-full '><Product_Preview images={product.image_url}/></div>

            {/* Option */}
            <div className='w-full flex flex-col gap-4'>
                <p className='font-semibold text-4xl mx-auto hidden md:flex'>{product.name}</p>
                <Product_Option/>
                <Product_Extra/>
                <Product_Quantity/>

                <div className='min-w-[300px] h-[50px] bg-green-800 flex items-center' onClick={() => {{addCart({product: product, option: selectedOption, quantity: quantity})} if (selectedExtra) {addCart({product: selectedExtra, option: null, quantity: 1})}}}>
                    <p className='font-semibold text-lg text-white mx-auto cursor-pointer'>ADD TO CART</p>
                </div>

            </div>
        </div>

        <Product_Comment product_id={product.product_id}/>
    </div>
  );
}

export default Product_Detail
