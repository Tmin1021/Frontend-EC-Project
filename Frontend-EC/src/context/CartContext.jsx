import { createContext, useContext, useState} from "react";

const CartContext = createContext()

//children is the component the CartProvider wraps
export function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const [isCartOpen, setIsCardOpen] = useState(false)

    const addCart = product => {
        setCart((prevCart) => [...prevCart, product.product_id])
    }

    const removeCart = product => {
        setCart((prevCart) => prevCart.filter(item => item.product_id !== product.product_id))
    }

    const openCart = () =>  setIsCardOpen(true)

    const closeCart = () => setIsCardOpen(false)

    return (
        <CartContext.Provider value={{cart, addCart, removeCart, isCartOpen, openCart, closeCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

