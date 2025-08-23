import { Minus, Plus } from 'lucide-react' 
import { useProductDetail } from '../../../context/ProductDetailContext'
import { useEffect } from 'react'

function Product_Quantity() {
  const {product, quantity, setQuantity, selectedOption, getOptionStock} = useProductDetail()
  const stock = product.type === 'flower' ? getOptionStock(selectedOption.stems) : product.stock

  useEffect(() => {
    setQuantity(Math.min(stock, quantity))
  }, [selectedOption])

  return (
    <div className='flex w-full justify-between items-center'>
        <p className='font-semibold'>QUANTITY</p>

        {/* setter */ }
        <div className='flex justify-between items-center gap-4'>
           <div className='p-1 rounded-full bg-gray-200/60 backdrop-blur-xs shadow-gray-400 shadow-sm hover:shadow-md transition-all'>
              <Minus className='w-5 h-5 text-gray-500' onClick={()=>setQuantity(Math.max(1, quantity-1))}/>
            </div>

              <div className='w-[50px] h-[50px] overflow-hidden'>
                <div className="flex flex-col items-center justify-between gap-2 pt-2 duration-500 ease-in-out" style={{ transform: `translateY(-${quantity*100/(stock+1)}%)` }}>
                  {Array.from({length: stock+1}, (_, i) => (
                    <div key={i} className='min-h-full min-w-full'>
                      <p className='font-light text-2xl w-full h-full text-center'>{i}</p>
                    </div>
                  ))}
                </div>
              </div>

            <div className='p-1 rounded-full bg-green-400/60 backdrop-blur-xs shadow-gray-400 shadow-sm hover:shadow-md transition-all'>
              <Plus className='w-5 h-5 text-white' onClick={()=>setQuantity(Math.min(stock, quantity+1))}/>
            </div>
        </div>
        
        <p className='font-semibold text-2xl'>{Math.round((product.type==='flower'? selectedOption?.stems * product.price : product.price)*quantity*100)/100}</p>
    </div>
  )
}

export default Product_Quantity