import { createContext, useCallback, useContext, useEffect, useState} from "react";
import {bonus_gifts } from "../data/dummy";

const CartContext = createContext()

//children is the component the CartProvider wraps
export function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const [isCartOpen, setIsCardOpen] = useState(false)
    const [selectedItems, setSelectedItems] = useState(Array(cart?.length ?? 0).fill(false))  
    const [selectedAll, setSelectedAll] = useState(false)


    // format: (product, option, quantity)
    // a
    const addCart = (product) => {
        setCart((prevCart) => {
            let found = false

            const updatedCart = prevCart.map(item => {
                const isSameProduct = item.product.product_id === product.product.product_id
                const isSameOption =
                    (item.option && product.option && item.option.name === product.option.name) ||
                    (!item.option && !product.option)

                if (isSameProduct && isSameOption) {
                    found = true
                    return { ...item, quantity: Math.min(item.quantity + product.quantity, product.product.stock)}
                }
                return item
            })

            if (!found) { 
                setSelectedItems(prev => [...prev, false])
                return [...updatedCart, product]
            } 

            return updatedCart
        })
    }

    // c
    const closeCart = () => setIsCardOpen(false)

    // g
    const getOptimizedPromotions = (cartOverride, selectedItemsOverride) => {
        const flowerCounts = {}
        const accessoryCounts = {}

        // 1. Count selected items
        cartOverride.forEach((item, i) => {
            if (!selectedItemsOverride[i]) return
            const id = item.product.product_id
            const type = item.product.type
            if (type === 'flower') {
            flowerCounts[id] = (flowerCounts[id] || 0) + item.quantity
            } else {
            accessoryCounts[id] = (accessoryCounts[id] || 0) + item.quantity
            }
        })


        // 2. Generate all possible matching combinations from bonus_gifts
        let matches = []
        bonus_gifts.forEach(bonus => {
            const flowerQty = flowerCounts[bonus.flower_id] || 0
            const accessoryQty = accessoryCounts[bonus.accessory_id] || 0
            const possiblePairs = Math.min(flowerQty, accessoryQty)
            if (possiblePairs > 0) {
            matches.push({
                flower_id: bonus.flower_id,
                accessory_id: bonus.accessory_id,
                off_price: bonus.off_price,
                maxPairs: possiblePairs
            })
            }
        })

        // 3. Sort by best discount first
        matches.sort((a, b) => b.off_price - a.off_price)

        // 4. Greedily assign best matches: (1)2-B1 and 5-V1 compare to (2) 5-B2 and 5-V1, if (1) better than (2) changes to: 5-B2 and 3-V1, else B2 no chance
        const off_prices = {}
        matches.forEach(match => {
            const { flower_id, accessory_id, off_price } = match
            const useCount = Math.min(flowerCounts[flower_id] || 0, accessoryCounts[accessory_id] || 0)

            if (useCount > 0) {
                const totalDiscount = useCount * off_price
                off_prices[accessory_id] = (off_prices[accessory_id] || 0) + totalDiscount

                // Reduce used quantities
                flowerCounts[flower_id] -= useCount
                accessoryCounts[accessory_id] -= useCount
            }
        })

        const newCart = cartOverride.map(item => 
            off_prices[item.product.product_id] 
            ? {...item, off_price: off_prices[item.product.product_id]}
            : {...item, off_price: 0}
        )
   
        setCart(newCart)
    }

    const getTotal = useCallback(() => {
        const number_of_selected_items = selectedItems.filter(Boolean).length
        const total = Math.round(selectedItems.map((isSelected, index) => isSelected? (cart[index]?.product.price * cart[index]?.quantity) : 0).reduce((acc, cur)=> acc+cur, 0)*100)/100

        return [number_of_selected_items, total]
    }, [cart, selectedItems])

    const getTotalOff = () => {
        return cart.reduce((acc, item) => acc+item.off_price,0)
    }

    // h
    const handleSelectedItems = index => {
        const newSelectedItems = selectedItems.slice()
        newSelectedItems[index] = !newSelectedItems[index]
        const number_of_selected_items = newSelectedItems.filter(Boolean).length
        if (number_of_selected_items === newSelectedItems.length) setSelectedAll(true)
        else setSelectedAll(false)

        setSelectedItems(newSelectedItems)
        getOptimizedPromotions(cart, newSelectedItems)
    }

    // o
    const openCart = () =>  setIsCardOpen(true)

    // r
    const removeCart = () => {
        const newCart = []
        for (let i=0; i<cart.length; i++) {
            if (!selectedItems[i]) newCart.push(cart[i])
        }
        
        setCart(newCart)
        setSelectedItems(Array(cart.length).fill(false))
    }

    // u
    const updateCart = (product, quantity) => {
        const updatedCart = cart.map(item =>
                item === product
                ? { ...item, quantity: quantity }
                : item
        )

        getOptimizedPromotions(updatedCart, selectedItems)
    }

    return (
        <CartContext.Provider value={{addCart, cart, closeCart, getOptimizedPromotions, getTotal, getTotalOff, handleSelectedItems, isCartOpen, openCart, removeCart, setCart, selectedItems, selectedAll, setSelectedItems, setSelectedAll, updateCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

