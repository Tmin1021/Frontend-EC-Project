import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchComment, fetchProduct } from "../components/functions/product_functions";

const ProductDetailContext = createContext()

export function ProductDetailProvider({children}) {
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [selectedExtra, setSelectedExtra] = useState(null)
    const [quantity, setQuantity] = useState(1)      // quantity chosen (buyer), not stock
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (product !== undefined) setLoading(false)
    }, [product])
    
    useEffect(() => {
        // use 'id' as dependency array to allow it auto update when access by id on url
        fetchProduct(id, setProduct)
        fetchComment(id, setComments)
    }, [id]);

    return (
        <ProductDetailContext.Provider value={{loading, comments, product, selectedExtra, setSelectedExtra, quantity, setQuantity}}>
            {children}
        </ProductDetailContext.Provider>
    )
}

export const useProductDetail = () => useContext(ProductDetailContext)