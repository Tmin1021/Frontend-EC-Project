import { createContext, useContext, useState } from "react";
import { products } from "../data/dummy";
import { useParams } from "react-router-dom";

const ProductDetailContext = createContext()

export function ProductDetailProvider({children}) {
    const {id} = useParams()
    const product=products.find((p) => p.product_id === id)
    const initiallOption = Object.keys(product.options)[0]
    const [selectedOption, setSelectedOption] = useState({name: initiallOption, price: product.options[initiallOption].price, stems: product.options[initiallOption].stems })
    const [selectedExtra, setSelectedExtra] = useState(null)
    const [quantity, setQuantity] = useState(1)

    return (
        <ProductDetailContext.Provider value={{product, selectedOption, setSelectedOption, selectedExtra, setSelectedExtra, quantity, setQuantity}}>
            {children}
        </ProductDetailContext.Provider>
    )
}

export const useProductDetail = () => useContext(ProductDetailContext)