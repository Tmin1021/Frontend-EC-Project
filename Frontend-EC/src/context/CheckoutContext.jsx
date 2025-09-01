import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import BEApi from "../../service/BEApi";

const CheckoutContext = createContext()

export function CheckoutProvider({children}) {
    const {user} = useAuth()
    const {cart, cartId, setCart} = useCart()
    const [isSuccess, setIsSuccess] = useState(true)
    const [allowInform, setAllowInform] = useState(false)
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [shipping_address, setShippingAddress] = useState(user?.address ?? '')
    const [whichPayment, setwhichPayment] = useState('COD')

    useState(() => {
        setShippingAddress(user?.address ?? "")
    }, [user])

    const createOrder = async (subtotal, off_price, navigate) => {
        if (!shipping_address) {
            alert("Please field shipping address")
            return
        }

        if (!whichPayment) {
            alert("Please select payment method")
            return
        }

        const data = {
            user_id: user.id,
            user_name: user.name,
            shipping_address: shipping_address ?? user?.address,
            subtotal,
            off_price,
            payment_method: whichPayment,
            message,
            items: cart,
        }

        BEApi.OrderApi.create(data).then(() => {
            setIsSuccess(true)
            navigate("/inform", { replace: true })
            const newCart = cart.map(item => !item.isSelected)
            setCart(newCart) 
            BEApi.CartApi.update(cartId, newCart).then(() => {}, (err) => {console.log(err?.response?.data?.error || "Cart error")})
        }, () => {
            setIsSuccess(false)
            navigate("/inform", { replace: true })
        })
    }

    return (
        <CheckoutContext.Provider value={{createOrder, allowInform, setAllowInform, isSuccess, message, setMessage, name, setName, shipping_address, setShippingAddress, whichPayment, setwhichPayment}}>
            {children}
        </CheckoutContext.Provider>
    )
}

export const useCheckout = () => useContext(CheckoutContext)

