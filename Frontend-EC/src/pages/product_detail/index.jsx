import React, { useState } from 'react'
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
//import {ProductCalendarProvider, useProductCalendar} from '../../context/ProductCalendarContext';
import Product_Quantity from './components/product_quantity';


function Product_Detail() {
 const {id} = useParams(); // return a tuple with many info, the first is id in url
 const product = products.find((p) => p.product_id === id) // callback func
 const {addCart} = useCart()
 const [quantity, setQuantity] = useState(1)
 const [option, setOption] = useState("")
 const [extra, setExtra] = useState(null)

 const [date, setDate] = useState({Year: 2025, Month: 0, Day: 1})
 
 const updateDate = (year, month, day) => {
    const new_date = {
    Year: year,
    Month: month,
    Day: day };
    
    setDate(new_date)
 }

 if (!product) return <div>Product not found</div>;

 return (
    <div className='w-[60%] mx-auto'>
        <div className='flex justify-between gap-14'>
            {/* Preview and Description */}
            <div className='w-[55%]'>
                <Product_Preview images={product.image_url}/>
                <Product_Description product={product}/>
            </div>

        {/* Option */}
            <div className='flex flex-col w-[45%]'>
                <p className='font-semibold text-4xl mx-auto'>{product.name}</p>
                <Product_Delivery_Date date={date} updateDate={updateDate}/>
                <Product_Option product={product} whichOption={option} setOption={setOption}/>
                <Product_Extra product={product} whichExtra={extra} setExtra={setExtra}/>
                <Product_Quantity quantity={quantity} setQuantity={setQuantity}/>
                <div className='w-full min-w-[200px] h-[50px] bg-green-700 flex items-center' onClick={() => {if(product.options.length!==0 && option!=="") {addCart({product_id: product.product_id, quantity: quantity, delivery_date: date, option: option}); if(extra) {addCart({product_id: extra.product_id, quantity: 1, delivery_date: date})}} }}>
                    <p className='font-semibold text-lg text-white mx-auto'>ADD TO CART</p>
                </div>
            </div>
        </div>

        <Product_Comment product_id={product.product_id}/>
    </div>

  );
}

export default Product_Detail
