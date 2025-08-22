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
    const [extra, setExtra] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedExtra, setSelectedExtra] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [comments, setComments] = useState([])
    
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

        function fetchDummy() {
            const new_product = products.find(product => product.product_id===id)
            setProduct(new_product)

            if (new_product.type === 'flower') {
                const new_option = new_product?.flower_details.options.find(option => option.stock>0)
                setSelectedOption(new_option);
            }
        }

        if (isDummy) fetchDummy() 
        else {
            fetchProductDetail()
            fetchComment()
            fetchExtra()
        }

    }, [id]);


    return (
        <ProductDetailContext.Provider value={{comments, extra, product, selectedOption, setSelectedOption, selectedExtra, setSelectedExtra, quantity, setQuantity}}>
            {children}
        </ProductDetailContext.Provider>
    )
}

export const useProductDetail = () => useContext(ProductDetailContext)