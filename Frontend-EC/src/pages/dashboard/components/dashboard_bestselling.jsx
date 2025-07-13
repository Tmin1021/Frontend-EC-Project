import React, {useRef} from 'react'
import {products} from '../../../data/dummy'
import { useNavigate } from 'react-router-dom'

function Bestselling_Item({product}) {
    return (
        <div>
            <div className='w-[350px] h-[350px] rounded-3xl bg-white hover:w-[365px] hover:h-[365px] transition-all duration-400'>
                <img src={product.image} className='w-full'/>
            </div>
            <p className='font-bold'>{product.name}</p>
            <p>from <span >${product.price}</span></p>
        </div>

    )
}

const Dashboard_Bestselling = () => {
      const scrollRef = useRef()
      const navigate = useNavigate()
  
      const scrollLeft = () => {
          scrollRef.current.scrollBy({left: -400, behavior: 'smooth'})
      }
  
      const scrollRight = () => {
          scrollRef.current.scrollBy({left: 400, behavior: 'smooth'})
      }

      const handleClick = (productID) => {
        navigate(`/product/${productID}`)
      }
  
      return (
          <div className="relative">
              <h1 className='font-extrabold text-9xl pt-40 pb-20'>Best-selling Hoa.</h1>

              {/* Scrollable content */}
              <div
                  ref={scrollRef}
                  className="overflow-x-auto no-scrollbar pl-30"
                  style={{
                    marginLeft: `-120px`,
                    marginRight: `-120px`,}}>
                  <div className="flex gap-10 w-max">
                  {products.map((product) => (
                      <div key={product.product_id} onClick={() => handleClick(product.product_id)}>
                        <Bestselling_Item product={product} />
                      </div>
                  ))}
                  </div>
              </div>
  
              
              {/* Scroll Buttons */}
              <button
                  onClick={scrollLeft}
                  className="absolute bottom-[-80px] right-[70px] w-10 h-10 bg-white text-gray-400 text-2xl font-extrabold rounded-full">
                  &lt;
              </button>
              <button
                  onClick={scrollRight}
                  className="absolute bottom-[-80px] right-[0px] w-10 h-10 text-gray-400 text-2xl font-extrabold bg-white rounded-full">
                  &gt;
              </button>
          </div>
      )
}

export default Dashboard_Bestselling