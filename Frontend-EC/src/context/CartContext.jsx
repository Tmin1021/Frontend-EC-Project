import { createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {useAuth} from "../context/AuthContext"
import { toast } from "sonner";
import BEApi from "../../service/BEApi";
import { getRoundPrice } from "../components/functions/product_functions";

const CartContext = createContext()

export function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const [cartId, setCartId] = useState('')
    const [isCartOpen, setIsCardOpen] = useState(false)
    const [selectedAll, setSelectedAll] = useState(false)
    //const [bonus, setBonus] = useState([])
    const {user, isAuthenticated} = useAuth()
    const prevIsCartOpen = useRef(isCartOpen)       // useRef avoid reload

    useEffect(() => {
        if (isAuthenticated && user?.role==='user') fetchCart()

    }, [user, isAuthenticated, isCartOpen]) 


    useEffect(() => {
        // When cart changes from open -> closed
        if (prevIsCartOpen.current === true && isCartOpen === false)  pushCart()

        prevIsCartOpen.current = isCartOpen

    }, [isCartOpen]);

    // a
    async function addCart(product) {
        // format: product = (product, quantity)
        // 3 cases: (1) same product, different option; (2) same product, same option (reupdate that item); (3) new item
        let newCart
        setCart((prevCart) => {
            let found = false

            const updatedCart = prevCart.map(item => {
                const isSameProduct = (item.product_id === product.product.product_id)

                if (isSameProduct) {
                    found = true
                    const newQuantity = Math.min(item.quantity + product.quantity, product.product.stock)
                    return { ...item, subtotal: newQuantity*product.product.dynamicPrice, quantity: newQuantity }
                }
                return item
            })

            if (!found) { 
                newCart =  [...updatedCart, {product_id: product.product.product_id, product_name: product.product.name, quantity: product.quantity, subtotal: product.quantity*product.product.dynamicPrice, off_price: 0, isSelected: false}]

                return newCart
            } 

            newCart = updatedCart
            
            return updatedCart
        })

        // update db
        if (!isAuthenticated) return

        const data = {
            items: newCart
        }

        BEApi.CartApi.update(cartId, data).then(resp=>{
            toast.success( `${product.product.name} is added to cart.`)
            }, ()=>{
            toast.error('Error. Please try again.')
        })
    }

    // c
    const closeCart = () => setIsCardOpen(false)

    // f
    async function fetchCart() {

        try {
            const res = await BEApi.CartApi.getByUserId(user.id)
            const item = res.data

       
            // user has cart already
            if (item) {
                const data = {
                    user_id: user.user_id,
                    items: item.items ?? []
                }
                
                const newCart = await preprocessCart(data.items)

                setCart(newCart)
                setCartId(item._id)
                setSelectedAll(newCart.length > 0 && newCart.every(item => item.isSelected))
            }
            // create cart for the first-time user
            else {
                const data = {
                    user_id: user.user_id,
                    items: []
                }
                await BEApi.CartApi.create(data);
            }

        } catch (err) {
            console.error("Failed to fetch cart or create cart", err);
        }
    }

    // g
    const getOptimizedPromotions = (cartOverride) => {
        const flowerCounts = {}
        const accessoryCounts = {}

        // 1. Count selected items
        cartOverride.forEach((item) => {
            if (!item.isSelected) return
            const id = item.product_id
            const type = item?.option
            if (type) {
            flowerCounts[id] = (flowerCounts[id] || 0) + item.quantity
            } else {
            accessoryCounts[id] = (accessoryCounts[id] || 0) + item.quantity
            }
        })


        // 2. Generate all possible matching combinations from bonus_gifts
        let matches = []
        bonus.forEach(bonus => {
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
            off_prices[item.product_id] 
            ? {...item, off_price: off_prices[item.product_id]}
            : {...item, off_price: 0}
        )
   
        setCart(newCart)
        const data = {
            data: {
                products: newCart
        }
        }

        GlobalApi.CartApi.update(cartId, data).then(resp=> {          
            }, ()=>{
            toast.error('Error. Please reload page and try again.')
        })
    }

    const getTotal = useCallback(() => {
        // useCallBack to force it to update based on watching change of cart and selectedItems
        const number_of_selected_items = cart.map(item=> item.isSelected).filter(Boolean).length
        const total = getRoundPrice(cart.map((item) => item.isSelected? (item.subtotal) : 0).reduce((acc, cur)=> acc+cur, 0))

        return [number_of_selected_items, total]
    }, [cart])

    const getTotalOff = () => {
        return getRoundPrice(cart.reduce((acc, item) => acc+item.off_price,0))
    }

    // h
    const handleSelectedItems = index => {
        const newCart = cart.slice()
        newCart[index].isSelected = !newCart[index].isSelected

        if (newCart.map(item => item.isSelected).filter(Boolean).length === newCart.length) setSelectedAll(true)
        else setSelectedAll(false)

        //getOptimizedPromotions(cart)
        setCart(newCart)
    }

    const handleSelectedAll = () => {
        const newCart = cart.map(item => ({...item, isSelected: !selectedAll}))
        setSelectedAll(!selectedAll)

        //getOptimizedPromotions(newCart)
        setCart(newCart)
    }

    // o
    const openCart = () =>  setIsCardOpen(true)

    // p
    const preprocessCart = async (tmpCart) => {
        // this function aim to remove product that out of stock; update the correct quantity or price (specially at checkout)
        let updatedCart = []

        for (const item of tmpCart) {
            try {
            // fetch product info from API
            const res = await BEApi.ProductApi.getById(item.product_id)
            const product = res.data

            // product not found or out of stock or not available => discard
            if (!product || product.stock===0 || !product.available || item.quantity > product.stock) {continue}
            const newQuantity = Math.min(product.stock, item.quantity)
            
            // update price
            const updatedItem = {
                ...item,
                product_name: product.name,
                quantity: newQuantity,  
                subtotal: newQuantity*product.dynamicPrice,          
                off_price: 0, 
            }

            updatedCart.push(updatedItem);
            } catch (err) {
            console.error(`Error fetching product ${item.product_id}:`, err)
            }
        }

        return updatedCart
    }

    const pushCart = async () => {
        const newCart = cart.map((item) => ({
            ...item,
            isSelected: item.isSelected || false
        }))

        const data = {
            items: newCart
        }

        BEApi.CartApi.update(cartId, data).then(resp=> {          
            }, ()=>{
            toast.error('Error. Please reload page and try again.')
        }) 
    }

    // r
    const removeCart = () => {
        // create new cart
        const newCart = []
        for (let i=0; i<cart.length; i++) {
            if (!cart[i].isSelected) newCart.push(cart[i])
        }

        // update to db
        const data = {
            items: newCart
        }

        BEApi.CartApi.update(cartId, data).then(resp=> {  
            // update current cart
            setCart(newCart)        
            }, ()=>{
            toast.error('Error. Please reload page and try again.')
        }) 

    }

    // u
    const updateCart = (product, quantity) => {
        // the reason why not update cart directly here is because the promotion use the old data before it get the new one
        // could use other option: useCallBack like the getTotal()
        // create new cart
        console.log(quantity)

        // the caller has managed the quantity compare already
        const updatedCart = cart.map(item =>
                item.product_id === product.product_id
                ? { ...item, subtotal: getRoundPrice(product.dynamicPrice*quantity), quantity: quantity }
                : item
        )

        setCart(updatedCart)
        // calculate the bonus
        //getOptimizedPromotions(updatedCart)
        
    }

    return (
        <CartContext.Provider value={{addCart, cart, closeCart, fetchCart, getTotal, getTotalOff, handleSelectedAll, handleSelectedItems, isCartOpen, openCart, removeCart, setCart, selectedAll, setSelectedAll, updateCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

