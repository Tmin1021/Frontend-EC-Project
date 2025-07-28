import { createContext, useCallback, useContext, useState} from "react";
import { accessories, products } from "../data/dummy";

const CartContext = createContext()

//children is the component the CartProvider wraps
export function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const [isCartOpen, setIsCardOpen] = useState(false)
    const [selectedItems, setSelectedItems] = useState(Array(cart.length).fill(false))  
    const [selectedAll, setSelectedAll] = useState(false)

    // format: (product, option, quantity)
    const addCart = product => {
        setCart((prevCart) => [...prevCart, product])
        setSelectedItems([...selectedItems, false])
    }

    const updateCart = (product, quantity) => {
        const updatedCart = cart.map(item =>
            item === product
            ? { ...item, quantity: quantity } 
            : item 
        )

        setCart(updatedCart)
    }

    const removeCart = () => {
        const newCart = []
        for (let i=0; i<cart.length; i++) {
            if (!selectedItems[i]) newCart.push(cart[i])
        }
        
        setCart(newCart)
        setSelectedItems(Array(cart.length).fill(false))
    }

    const openCart = () =>  setIsCardOpen(true)

    const closeCart = () => setIsCardOpen(false)

    const handleSelectedItems = index => {
        const newSelectedItems = selectedItems.slice()
        newSelectedItems[index] = !newSelectedItems[index]
        const number_of_selected_items = newSelectedItems.filter(Boolean).length
        if (number_of_selected_items === newSelectedItems.length) setSelectedAll(true)
        else setSelectedAll(false)

        setSelectedItems(newSelectedItems)
    }

    const getTotal = useCallback(() => {
        const number_of_selected_items = selectedItems.filter(Boolean).length
        const total = Math.round(selectedItems.map((isSelected, index) => isSelected? ((cart[index].option?.price ?? cart[index].product.price)*cart[index].quantity) : 0).reduce((acc, cur)=> acc+cur, 0)*100)/100

        return [number_of_selected_items, total]
    }, [cart, selectedItems])

    return (
        <CartContext.Provider value={{cart, setCart, addCart, updateCart, removeCart, isCartOpen, openCart, closeCart, handleSelectedItems, selectedItems, selectedAll, setSelectedItems, getTotal, setSelectedAll}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

