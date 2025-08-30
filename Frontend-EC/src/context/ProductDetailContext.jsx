import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../service/GlobalApi";
import { useDynamicPricing } from "./DynamicPricingContext";
import { fetchProduct } from "../components/functions/product_functions";

const ProductDetailContext = createContext()

export function ProductDetailProvider({children}) {
    const {id} = useParams()
    const {getCondition, getDynamicPrice} = useDynamicPricing()

    const [product, setProduct] = useState(null)
    const [extra, setExtra] = useState([])
    const [selectedExtra, setSelectedExtra] = useState(null)
    const [quantity, setQuantity] = useState(1)      // quantity chosen (buyer), not stock
    const [comments, setComments] = useState([])
    
    useEffect(() => {
        // use 'id' as dependency array to allow it auto update when access by id on url
        fetchProduct(id, setProduct)
        //fetchComment()
        //fetchExtra()
    }, [id]);

    // f
    const fetchComment = async () => {
        try {
            const res = await GlobalApi.CommentApi.getAll()
            const item = res.data.data

            if (item) {
                const data = item.filter(i => i.product_id === id)

                const resUser = await GlobalApi.UserApi.getById(data[0]?.user_id)        
                data.map(i => i.user_id = resUser.data.data?.name)

                setComments(data)
            } else {
            console.warn("No comment found for", id)
            }
        } catch (error) {
            console.error("Failed to fetch comment:", error)
        }
    }

    const fetchExtra = async () => {
        try {
            const res = await GlobalApi.BonusApi.getAll()
            const item = res.data.data

            if (item) {
                setExtra(item)
            } else {
            console.warn("No bonus found for", id)
            }
        } catch (error) {
            console.error("Failed to fetch bonus:", error)
        }
    }

    return (
        <ProductDetailContext.Provider value={{comments, extra, product, selectedExtra, setSelectedExtra, quantity, setQuantity}}>
            {children}
        </ProductDetailContext.Provider>
    )
}

export const useProductDetail = () => useContext(ProductDetailContext)