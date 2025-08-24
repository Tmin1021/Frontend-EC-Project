import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { order_status } from "../admin/components/admin_universal";
import GlobalApi from "../../service/GlobalApi";
import { toast } from "sonner";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutContext = createContext()

export function CheckoutProvider({children}) {
    const {user} = useAuth()
    const {cart, cartId, setCart} = useCart()
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [shipping_address, setShippingAddress] = useState(user.address)
    const [whichPayment, setwhichPayment] = useState('Cash on Delivery')
    const navigate = useNavigate()

    const createOrder = async (total_price, off_price) => {
        const dataOrder = {
            data: {
                user_id: user.user_id,
                order_date: new Date(),
                shipping_address: shipping_address,
                order_status: 'Required',
                payment_method: whichPayment,
                total_amount: total_price,
                off_price: off_price
            }
        }

        // decrement stock in db and remove in cart
        //let error_products = new Set()
        let success_products =  []

        const promises = cart.map( async (item) => {
            if (!item.isSelected) return
            // pull
            try {
                const res = await GlobalApi.ProductApi.getById(item.product_id)
                
                if (!res) return
                const info = res.data.data
                const data = {
                    data: {
                        stock: info?.stock - (item?.option?.stems ?? 1)*item?.quantity
                    }} 
                // push db
                await GlobalApi.ProductApi.update(item.product_id, data).then(resp => {
                    success_products.push([item.product_id, item.option?.name])
                }, () => {
                    console.error('Decrease stock failed.')
                })

            } catch (err) {
                console.error('Fetch product failed.')
            }
        })

        await Promise.all(promises)
        if (success_products.size === 0) { navigate("/failure", {replace:true }); return}

        // create order then order item. If order success but order item fail => cascade rollback
        GlobalApi.OrderApi.create(dataOrder).then(resp => {
            const orderId = resp.data.data.documentId;
            
            const dataItem= {
                data: {
                    order_id: orderId,
                    products: cart.filter(item => item.isSelected && success_products.some(([id, optName]) =>
                        id === item.product_id && optName === item.option?.name
                    )).map(item => ({product_id: item.product_id, price: item.total_price, quantity: item.quantity, off_price: item.off_price, ...(item?.option != null && { option: item.option })}))
                }
            }
            
            GlobalApi.OrderItemApi.create(dataItem).then(resp => {
                // push cart
                /*
                const newCart = {
                    data: {
                        products: cart.filter(item => !success_products.has(item))
                    }
                }
                console.log(cartId)
                GlobalApi.CartApi.update(cartId, newCart).then(resp => {
                }, ()=>{console.log('Error: Push cart.')})*/

                setCart(cart.filter(item =>
                    !success_products.some(([id, optName]) =>
                        id === item.product_id && optName === item.option?.name
                    )
                ))

                navigate("/success", { replace: true })
            }, async () => {
                console.log("Cascade rollback: order is not successful.")

                try {
                    await GlobalApi.OrderApi.delete(orderId);
                } catch (err) {
                    console.error("Rollback failed", err);
                }

                navigate("/failure", {replace: true })
        })})
    }

    return (
        <CheckoutContext.Provider value={{createOrder, message, setMessage, name, setName, shipping_address, setShippingAddress, whichPayment, setwhichPayment}}>
            {children}
        </CheckoutContext.Provider>
    )
}

export const useCheckout = () => useContext(CheckoutContext)