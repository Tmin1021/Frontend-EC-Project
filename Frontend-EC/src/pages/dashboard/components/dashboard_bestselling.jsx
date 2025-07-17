import React from 'react'
import {products} from '../../../data/dummy'
import { useNavigate } from 'react-router-dom'

export function Bestselling_Item({product}) {
    const findStartingPrice = () => (Math.min(...Object.values(product.options).map(option => option.price)))

    return (
        <div className="min-w-[200px]">
            <div className='"w-full aspect-square overflow-hidden'>
                <img src={product.image_url[1]} className='w-full h-full object-cover'/>
            </div>
            <p className='font-bold text-base pt-3'>{product.name}</p>
            <p className='font-light text-sm py-1'>from <span className='font-bold text-lg'>${findStartingPrice()}</span></p>
        </div>

    )
}

function BestSelling_Button() {
    const navigate = useNavigate()

    return (
        <div className="w-[250px] min-w-[100px] flex items-center justify-between mx-auto cursor-pointer bg-green-800 hover:bg-green-900 transition-all py-2 px-6 rounded-sm" onClick={()=>navigate("/flowers")}>
            <p className="mx-auto font-bold text-white">SHOP ALL BEST SELLERS</p>
        </div>
    )
}

const Dashboard_Bestselling = () => {
      const navigate = useNavigate()

      const handleClick = (productID) => {
        navigate(`/product/${productID}`)
      }
  
      return (
          <div className="flex flex-col">
            <p className='font-semibold text-2xl pt-12 pb-6 mx-auto'>Best-selling Hoa.</p>

            <div className="flex gap-4 overflow-x-auto w-full">
            {products.slice(0, 4).map((product) => (
                <div key={product.product_id} className="cursor-pointer" onClick={() => handleClick(product.product_id)}>
                    <Bestselling_Item product={product} />
                </div>
            ))}
            </div>

            <div className="pt-6">
               <BestSelling_Button/>
            </div>
          </div>
      )
}

export default Dashboard_Bestselling