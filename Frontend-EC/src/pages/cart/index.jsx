import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { accessories, products } from '../../data/dummy';
import Cart_Item from './components/cart_item';
import { useEffect } from 'react';
import Cart_Sum from "./components/cart_sum";
import Cart_Empty from "./components/cart_empty";
import { Trash2, Check } from "lucide-react";

const Check_Box = ({isSelected, onHandleSelectedItems}) => {

    return (
        <div className={`w-[25px] aspect-square border-1 border-gray-300 dark:border-white flex items-center rounded-sm ${isSelected ? 'bg-pink-400' : ''}`} onClick={onHandleSelectedItems}>
          {isSelected && <Check className="w-full h-full text-white"/>}
        </div>
    )
}

// fixed: not scroll with parent
// inset-0 == top-bottom-left-right: 0
// fixed component has overflow-hidden at default
// the floating div is inside the blur div, so even tap the floating div will also propagate that click to the blur div, use e.stoppropagation()
function Cart() {
  const {cart, isCartOpen, removeCart, closeCart, selectedItems, selectedAll, setSelectedAll, setSelectedItems, handleSelectedItems} = useCart()
  const isCartEmpty = cart.length === 0
  
  // Disable background scroll
  // Call the main body and hide overflow. Hidden overflow will hide also the scrollbar
  useEffect(() => {
      document.body.style.overflow = isCartOpen? 'hidden':'auto';

      return () => {
          document.body.style.overflow = 'auto'; 
      };
  }, [isCartOpen]);

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
      
          <div className="absolute right-0 md:relative w-5/6 h-screen md:w-[500px] md:h-[500px] bg-white shadow-lg overflow-y-auto p-2 md:p-4 no-scrollbar" onClick={(e) =>e .stopPropagation()}>
            {isCartEmpty ? 
            <Cart_Empty/>
            : 
            <div className='w-full h-full'>
              {/* Delete tab */}
                <div className="w-full flex items-center justify-between pb-4">
                  <div className='flex items-center justify-between gap-4'>
                    <Check_Box isSelected={selectedAll} onHandleSelectedItems={()=>{setSelectedItems(Array(cart.length).fill(!selectedAll)); setSelectedAll(!selectedAll)}} />
                    <p>All</p>
                </div>

                <div onClick={removeCart}>
                  <Trash2 />
                </div>
              </div>

              {/* Items */}
              <div className='flex flex-col gap-2'>
              {cart.map((item, i) => (
                <div key={i} className='flex items-center justify-between gap-1 md:gap-4'>
                  <Check_Box isSelected={selectedItems[i]} onHandleSelectedItems={()=>handleSelectedItems(i)}/>
                  <Cart_Item key={i} product={item} />
                </div>))}
              </div>      
              
            </div>}

          </div>

          {/* Sum */}
          {!isCartEmpty && <Cart_Sum/>}

      </motion.div>}
    </AnimatePresence>

  );
}

export default Cart;
