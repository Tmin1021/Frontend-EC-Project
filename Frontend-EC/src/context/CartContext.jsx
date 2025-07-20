import { createContext, useContext, useState} from "react";

const CartContext = createContext()

//children is the component the CartProvider wraps
export function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const [isCartOpen, setIsCardOpen] = useState(false)

    const addCart = product => {
        setCart((prevCart) => [...prevCart, product])
    }

    const updateCart = (id, quantity) => {
        const updatedCart = cart.map(cart_item =>
            cart_item.product_id === id
            ? { ...cart_item, quantity: quantity } 
            : cart_item 
        )

        setCart(updatedCart)
    }

    const removeCart = product => {
        setCart((prevCart) => prevCart.filter(item => item!== product))
    }

    const openCart = () =>  setIsCardOpen(true)

    const closeCart = () => setIsCardOpen(false)

    return (
        <CartContext.Provider value={{cart, setCart, addCart, updateCart, removeCart, isCartOpen, openCart, closeCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

