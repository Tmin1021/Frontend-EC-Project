import React from 'react'

const Cart_Item = ({product}) => {

    return (
        <div className='w-full h-[120px] bg-amber-400 flex'>
            <img src={product.image_url[0]} className='w-[120px] h-[120px] p-[5px]'/>
            <div>
                <p className='font-semibold text-lg'>{product.name}</p>
            </div>
        
        </div>
    )
}

export default Cart_Item