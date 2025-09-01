import { Minus, Plus } from 'lucide-react' 
import { useProductDetail } from '../../../context/ProductDetailContext'
import { getRoundPrice } from '../../../components/functions/product_functions'

function Product_Quantity() {
  const {product, quantity, setQuantity} = useProductDetail()

  return (
    <div className='flex flex-col w-full items-end'>

      <div className='flex w-full justify-between items-center'>
          {/* setter */ }
          <div className='flex justify-between items-center gap-4'>
            <div className={`p-1 rounded-full ${quantity===1 ? 'bg-gray-200/40 pointer-events-none':'bg-gray-200/60'} backdrop-blur-xs shadow-gray-400 shadow-sm hover:shadow-md transition-all`}
                onClick={()=>setQuantity(Math.max(1, quantity-1))}>
                <Minus className='w-5 h-5 text-gray-500'/>
              </div>

                <div className='w-[50px] h-[50px] overflow-hidden'>
                  <div className="flex flex-col items-center justify-between gap-2 pt-2 duration-500 ease-in-out" style={{ transform: `translateY(-${quantity*100/(product.stock+1)}%)` }}>
                    {Array.from({length: product.stock+1}, (_, i) => (
                      <div key={i} className='min-h-full min-w-full'>
                        <p className='font-light text-2xl w-full h-full text-center'>{i}</p>
                      </div>
                    ))}
                  </div>
                </div>

              <div className={`p-1 rounded-full ${quantity===product.stock ? 'bg-gray-200/40 pointer-events-none':'bg-green-400/60'} backdrop-blur-xs shadow-gray-400 shadow-sm hover:shadow-md transition-all`}
                   onClick={()=>setQuantity(Math.min(product.stock, quantity+1))}>
                <Plus className='w-5 h-5 text-white'/>
              </div>
          </div>
        
          {/* Subtotal */}
          <p className='font-semibold text-2xl'>${getRoundPrice(quantity*product.dynamicPrice)}</p>
      </div>
        
       {/* Base price - if lower */} 
      {product.dynamicPrice < product.price && <p className='font-semibold text-lg line-through text-gray-400' >${getRoundPrice(quantity*product.price)}</p>}

    </div>
  )
}

export default Product_Quantity