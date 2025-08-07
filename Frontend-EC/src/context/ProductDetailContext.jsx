import { createContext, useContext, useState, useEffect } from "react";
import { isDummy, products } from "../data/dummy";
import { useParams } from "react-router-dom";
import { useProduct } from "./ProductContext";
import GlobalApi from "../../service/GlobalApi";

const ProductDetailContext = createContext()

const BASE_URL = 'http://localhost:1337';

export function ProductDetailProvider({children}) {
    const {id} = useParams()

    const [product, setProduct] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedExtra, setSelectedExtra] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductDetail = async () => {
        try {
            const res = await GlobalApi.ProductApi.getById(id);
            const item = res.data.data;

            if (item) {
                const data = {
                product_id: item?.documentId,
                type: item?.type,
                name: item?.name,
                price: item?.price,
                stock: item?.stock,
                available: item?.available,
                description: item?.description,
                image_url: item.image_url.map(image => BASE_URL+image.url),
                flower_details: item?.flower_details
            }

            setProduct(data);
            setSelectedOption(data.flower_details?.options[0]);
            } else {
            console.warn("No product found for", id);
            }
        } catch (error) {
            console.error("Failed to fetch product:", error);
        }
        };

        function fetchDummy() {
            const new_product = products.find(product => product.product_id===id)
            setProduct(new_product)

            if (new_product.type === 'flower') {
                console.log(new_product)
                const new_option = new_product?.flower_details.options.find(option => option.stock>0)
                setSelectedOption(new_option);
            }
        }

        isDummy? fetchDummy() : fetchProductDetail();
    }, [id]);


    return (
        <ProductDetailContext.Provider value={{product, selectedOption, setSelectedOption, selectedExtra, setSelectedExtra, quantity, setQuantity}}>
            {children}
        </ProductDetailContext.Provider>
    )
}

export const useProductDetail = () => useContext(ProductDetailContext)