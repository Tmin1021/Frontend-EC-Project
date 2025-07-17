import React from 'react'
import Calendar from "react-calendar";
import Product_Preview from './components/product_preview';
import Product_Option from './components/product_option';
import Product_Extra from './components/product_extra';
import Product_Description from './components/product_description';
import Product_Delivery_Date from './components/product_delivery_date';
import {products, accessories} from  '../../data/dummy';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Product_Comment from './components/product_comment';
import {ProductCalendarProvider} from '../../context/ProductCalendarContext';

function Product_Detail() {
 const {id} = useParams(); // return a tuple with many info, the first is id in url
 const product = products.find((p) => p.product_id === id) // callback func
 const {addCart} = useCart()

 if (!product) return <div>Product not found</div>;

 return (
    <ProductCalendarProvider>
        <div className='w-[60%] mx-auto'>
            <div className='flex justify-between gap-14'>
                <div className='w-[55%]'>
                    <Product_Preview images={product.image_url}/>
                    <Product_Description product={product}/>
                </div>

                <div className='flex flex-col w-[45%]'>
                    <p className='font-semibold text-4xl mx-auto'>{product.name}</p>
                    <Product_Delivery_Date/>
                    <Product_Option product={product}/>
                    <Product_Extra product={product}/>
                    <div className='w-full min-w-[200px] h-[50px] bg-green-700 flex items-center' onClick={() => addCart(product)}>
                        <p className='font-semibold text-lg text-white mx-auto'>ADD TO CART</p>
                    </div>
                </div>
            </div>

            <Product_Comment product_id={product.product_id}/>
        </div>
    </ProductCalendarProvider>

  );
}

export default Product_Detail