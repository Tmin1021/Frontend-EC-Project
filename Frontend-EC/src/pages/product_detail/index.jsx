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
        <div className='py-30 px-90'>
            <h1 className='font-extrabold text-9xl pb-20'>{product.name}</h1>

            <div className='flex gap-10'>
                <div>
                    <Product_Preview images={product.image_url}/>
                    <Product_Description product={product}/>
                </div>

                <div>
                    <Product_Delivery_Date/>
                    <Product_Option product={product}/>
                    <Product_Extra product={product}/>
                </div>
            </div>

            <div className='w-[100px] h-[100px] bg-blue-400' onClick={() => addCart(product)}>
                Add to cart
            </div>

            <div>
                <Product_Comment product_id={product.product_id}/>
            </div>
        </div>
    </ProductCalendarProvider>

  );
}

export default Product_Detail