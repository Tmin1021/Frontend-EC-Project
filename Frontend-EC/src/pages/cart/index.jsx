import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { products } from '../../data/dummy';
import Cart_Item from './components/cart_item';
import { useEffect } from 'react';

// fixed: not scroll with parent
// inset-0 == top-bottom-left-right: 0
// fixed component has overflow-hidden at default
// the floating div is inside the blur div, so even tap the floating div will also propagate that click to the blur div, use e.stoppropagation()
function Cart() {
  const {cart, closeCart} = useCart()

  // Disable background scroll
  // Call the main body and hide overflow. Hidden overflow will hide also the scrollbar
  useEffect(() => {
      document.body.style.overflow = 'hidden';

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
      <motion.div  
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={closeCart}>
        <div className="w-[500px] max-h-[80vh] bg-white rounded-xl shadow-lg overflow-y-auto p-4" onClick={(e) =>e .stopPropagation()}>
          {cart.map((cart_item) => (
              <Cart_Item key={cart_item} product={products.find((product_item) => product_item.product_id === cart_item)} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>

  );
}

export default Cart;
