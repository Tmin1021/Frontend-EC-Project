import { Minus, Plus } from 'lucide-react' 
import { useProductDetail } from '../../../context/ProductDetailContext'

function Product_Quantity() {
  const {product, quantity, setQuantity, selectedOption} = useProductDetail()

  return (
    <div className='flex w-full justify-between items-center'>
        <p className='font-semibold'>QUANTITY</p>
        <div className='flex justify-between items-center gap-4'>
            <Minus className='w-5 h-5' onClick={()=>setQuantity(Math.max(1, quantity-1))}/>

              <div className='w-[50px] h-[50px] overflow-hidden'>
                <div className="flex flex-col items-center justify-between gap-2 pt-2 duration-500 ease-in-out" style={{ transform: `translateY(-${quantity*100/product.stock}%)` }}>
                  {Array.from({length: product.stock}, (_, i) => (
                    <div key={i} className='min-h-full min-w-full'>
                      <p className='font-light text-2xl w-full h-full text-center'>{i}</p>
                    </div>
                  ))}
                </div>
              </div>

            <Plus className='w-5 h-5' onClick={()=>setQuantity(Math.min(product.stock, quantity+1))}/>
        </div>
        <p className='font-semibold text-2xl'>{Math.round(selectedOption.price*quantity*100)/100}</p>
    </div>
  )
}

export default Product_Quantity