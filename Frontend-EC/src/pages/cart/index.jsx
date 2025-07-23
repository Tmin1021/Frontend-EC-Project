import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { accessories, products } from '../../data/dummy';
import Cart_Item from './components/cart_item';
import { useEffect, useState } from 'react';
import Cart_Sum from "./components/cart_sum";
import Cart_Empty from "./components/cart_empty";
import { Trash2, Check } from "lucide-react";

const Check_Box = ({isChecked, onHandleChecked}) => {

    return (
        <div className={`w-[25px] aspect-square border-1 border-gray-300 dark:border-white flex items-center rounded-sm ${isChecked ? 'bg-pink-400' : ''}`} onClick={onHandleChecked}>
          {isChecked && <Check className="w-full h-full text-white"/>}
        </div>
    )
}

// fixed: not scroll with parent
// inset-0 == top-bottom-left-right: 0
// fixed component has overflow-hidden at default
// the floating div is inside the blur div, so even tap the floating div will also propagate that click to the blur div, use e.stoppropagation()
function Cart() {
  const {cart, setCart, isCartOpen, closeCart} = useCart()
  const isCartEmpty = cart.length === 0
  
  const [isChecked, setIsChecked] = useState(Array(cart.length+1).fill(false))    //last position is for delete all
  const [itemPrice, setItemPrice] = useState(Array(cart.length+1).fill(0))   

  const handleChecked = index => {
      const newIsChecked = isChecked.slice()
      newIsChecked[index] = !newIsChecked[index]

      setIsChecked(newIsChecked)
  }   
  const handleDelete = () => {
    const newCart = []
    for (let i=cart.length-1; i>=0; i--) {
      if (!isChecked[i]) newCart.push(cart[i])
    }
    
    setCart(newCart)
    setIsChecked(Array(cart.length+1).fill(false))
  }

  // Disable background scroll
  // Call the main body and hide overflow. Hidden overflow will hide also the scrollbar
  useEffect(() => {
      document.body.style.overflow = 'auto';

      return () => {
          document.body.style.overflow = 'auto'; 
      };
  }, []);

  // initial: "x:100%" --> set the div to the rightmost (out of the portview)
  // animate: "x:0" --> set the div to the leftmmost (targeted position)
  // exit: set the position when the div is unmounted
  // type: spring (linear+bounce+accelerate) - stiffness (how fast) -- damping (bouncing)
  return (
    <AnimatePresence>
      {isCartOpen && <motion.div  
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed inset-0 z-150 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm" onClick={closeCart}>
      
          <div className="w-[500px] h-[60vh] bg-white shadow-lg overflow-y-auto p-4 no-scrollbar" onClick={(e) =>e .stopPropagation()}>
            {isCartEmpty ? 
            <Cart_Empty/>
            : 
            <div className='w-full h-full'>
              {/* Delete tab */}
                <div className="w-full flex items-center justify-between pb-4">
                  <div className='flex items-center justify-between gap-4'>
                    <Check_Box isChecked={isChecked[isChecked.length-1]} onHandleChecked={()=>setIsChecked(Array(isChecked.length).fill(!isChecked[isChecked.length-1]))} />
                    <p>All</p>
                </div>

                <div onClick={handleDelete}>
                  <Trash2 />
                </div>
              </div>

              {/* Items */}
              {cart.map((cart_item, i) => (
                <div key={i} className='flex items-center justify-between gap-3'>
                  <Check_Box isChecked={isChecked[i]} onHandleChecked={()=>handleChecked(i)}/>
                  <Cart_Item key={cart_item} index={i} setItemPrice={setItemPrice} product={cart_item.product_id.substring(0,1)==='B'? products.find((product_item) => product_item.product_id === cart_item.product_id) : accessories.find((accessory) => accessory.product_id === cart_item.product_id)} product_cart={cart_item}/>
                 </div>
                  
              ))}
            </div>}

          </div>
          {/* Sum */}
          {!isCartEmpty && <Cart_Sum selectedItems={isChecked}/>}

      </motion.div>}
    </AnimatePresence>

  );
}

export default Cart;
