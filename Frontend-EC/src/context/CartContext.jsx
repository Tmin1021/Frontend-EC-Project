import { createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {bonus_gifts, isDummy, products } from "../data/dummy";
import GlobalApi from "../../service/GlobalApi";
import {useAuth} from "../context/AuthContext"
import { toast } from "sonner";
import { useDynamicPricing } from "./DynamicPricingContext";

const CartContext = createContext()

//children is the component the CartProvider wraps
export function CartProvider({children}) {
    const [cart, setCart] = useState([])
    const [cartId, setCartId] = useState('')
    const [isCartOpen, setIsCardOpen] = useState(false)
    const [selectedItems, setSelectedItems] = useState(Array(cart?.length ?? 0).fill(false))  
    const [selectedAll, setSelectedAll] = useState(false)
    const [bonus, setBonus] = useState(bonus_gifts)
    const {user, isAuthenticated} = useAuth()
    const {getDynamicPrice} = useDynamicPricing()

    useEffect(() => {
        if (!isDummy && isAuthenticated && user?.role==='user') {
            fetchCart()
            fetchBonus()
        }

    }, [user, isAuthenticated, isCartOpen]) 

    const prevIsCartOpen = useRef(isCartOpen);

    useEffect(() => {
    // When cart changes from open -> closed
    if (prevIsCartOpen.current === true && isCartOpen === false) {
        pushCart();
    }

        prevIsCartOpen.current = isCartOpen; // update ref
    }, [isCartOpen]);

    // a
    async function addCart(product) {
        // format: product = (product, option, quantity)
        // 3 cases: (1) same product, different option; (2) same product, same option (reupdate that item); (3) new item
        let newCart
        setCart((prevCart) => {
            let found = false

            const updatedCart = prevCart.map(item => {
                const isSameProduct = item.product_id === product.product.product_id
                const isSameOption =
                    (item.option && product.option && item.option.name === product.option.name) ||
                    (!item.option && !product.option)

                if (isSameProduct && isSameOption) {
                    found = true
                    const newQuantity = Math.min(item.quantity + product.quantity, product.product.stock)
                    return { ...item, total_price: newQuantity*(item.option?.stems ?? 1)*product.product.dynamic_price, quantity: newQuantity }
                }
                return item
            })

            if (!found) { 
                setSelectedItems(prev => [...prev, false])
                newCart =  [...updatedCart, {product_id: product.product.product_id, option: product?.option, total_price: Math.round(100*(product.quantity*product.product.dynamic_price*(product?.option?.stems ?? 1)),2)/100, quantity: product.quantity, off_price: 0, isSelected: false}]
                return newCart
            } 

            newCart = updatedCart
            return updatedCart
        })

        // update db
        if (!isAuthenticated || isDummy) return

        const data = {
            data: {
                products: newCart
            }
        }

        GlobalApi.CartApi.update(cartId, data).then(resp=>{
            toast.success( `${product.product.name} is added to cart.`)
            }, ()=>{
            toast.error('Error. Please try again.')
        })
    }

    // c
    const closeCart = () => setIsCardOpen(false)

    // f
    async function fetchBonus() {
        const res = await GlobalApi.BonusApi.getAll()

        if (res) setBonus(res.data.data)
    }

    async function fetchCart() {
        if (!isAuthenticated) return
        try {
            const res = await GlobalApi.CartApi.getByUserId(user?.user_id)
            let data

            // user has cart already
            if (res && res.data.data.length>0) {
                const item = res.data.data

                data = {
                    user_id: user?.user_id,
                    products: item[0]?.products
                }
                
                const newCart = await preprocessCart(data.products)
                setCart(data.products ? newCart : [])
                setCartId(res.data.data[0].documentId)

                const newSelectedItems = newCart.map(item => item.isSelected ?? false)
                setSelectedItems(newSelectedItems)
            }
            // create cart for the first-time user
            else {
                data = {
                    data: {
                        user_id: user.user_id,
                    }
                }
                await GlobalApi.CartApi.create(data)
            }

        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    }

    // g
    const getOptimizedPromotions = (cartOverride, selectedItemsOverride) => {
        const flowerCounts = {}
        const accessoryCounts = {}

        // 1. Count selected items
        cartOverride.forEach((item, i) => {
            if (!selectedItemsOverride[i]) return
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
        const number_of_selected_items = selectedItems.filter(Boolean).length
        const total = Math.round(selectedItems.map((isSelected, index) => isSelected? (cart[index]?.total_price) : 0).reduce((acc, cur)=> acc+cur, 0)*100)/100

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

    // p
    const preprocessCart = async (tmpCart) => {
        // this function aim to remove product that out of stock; update the correct quantity or price (specially at checkout)
        let updatedCart = []

        for (const item of tmpCart) {
    
            try {
            // fetch product info from API
            const res = await GlobalApi.ProductApi.getById(item.product_id)
            const product = res.data.data

            // product not found or out of stock or not available => discard
            if (!product || product.stock===0 || !product.available) {continue}

            // product from db has new change => discard
            if ((item.option && product.type!='flower') || (!item.option && product.type=='flower')) {continue}
            
            // update to the current availale stock
            let stock = Math.min(product.stock, item.quantity)
            if (item.option && product.flower_details?.options) {
                const matchedOption = product.flower_details.options.find(option => option.name === item.option.name)
                // no match option anymore (name or stems)
                if (!matchedOption || matchedOption.stems != item.option.stems) {continue}
                // out of stock
                if (item.quantity*item.option.stems > product.stock) {continue}
                stock = item.quantity
            }

            // update price
            const updatedItem = {
                ...item,
                total_price: stock*(item.option?.stems ?? 1) * (product.type==='flower' ? getDynamicPrice(product.price, product.fill_stock_date):product.price),
                quantity: stock,            
                off_price: 0, 
            };

            updatedCart.push(updatedItem);
            } catch (err) {
            console.error(`Error fetching product ${item.product_id}:`, err)
            }
        }

        return updatedCart
    }

    const pushCart = async () => {
        if (isDummy) return
        const newCart = cart.map((item, i) => ({
            ...item,
            isSelected: selectedItems[i] || false
        }))

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

    // r
    const removeCart = () => {
        // create new cart
        const newCart = []
        for (let i=0; i<cart.length; i++) {
            if (!selectedItems[i]) newCart.push(cart[i])
        }

        // update current cart and selected items
        setCart(newCart)
        setSelectedItems(Array(cart.length).fill(false))

        // update to db
        if (isDummy) return
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

    // u
    const updateCart = (product, quantity) => {
        // the reason why not update cart directly here is because the promotion use the old data before it get the new one
        // could use other option: useCallBack like the getTotal()
        // create new cart

        // the caller has managed the quantity compare already
        const updatedCart = cart.map(item =>
                item === product
                ? { ...item, total_price: item.total_price*quantity/item.quantity , quantity: quantity }
                : item
        )

        // calculate the bonus
        getOptimizedPromotions(updatedCart, selectedItems)

    }

    return (
        <CartContext.Provider value={{addCart, cart, closeCart, fetchCart, getOptimizedPromotions, getTotal, getTotalOff, handleSelectedItems, isCartOpen, openCart, removeCart, setCart, selectedItems, selectedAll, setSelectedItems, setSelectedAll, updateCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)

