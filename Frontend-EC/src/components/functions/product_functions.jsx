import BEApi from "../../../service/BEApi"
import {demo_1, demo_3} from "../../data/dummy"

function createProductParams({search='', flowerTypes=[], occasions=[], colors=[], sort='Best Seller', page=1, limit=12} = {}) {
    return new URLSearchParams({
                search,
                flowerTypes: flowerTypes.join(","),
                occasions: occasions.join(","),
                colors: colors.join(","),
                sort,
                page,
                limit
            });
}

async function fetchProducts(setter = () => {}, params) {
    if (typeof setter != 'function') return
    
    try {
        const res = await BEApi.ProductApi.getAll(params)
        const data = res.data.products
        console.log(data)
        if (data && data.length>0) {
            const newData = res.data.products.map(item => ({
                ...item,
                product_id: item?._id,
                image_url: [demo_1, demo_3],
            })).filter(item => item.available)

            setter(newData)
        }

        else {
            console.warn("No product found")
            setter([])        
        }
    
    } catch (err) {
        console.error("Failed to fetch products", err);
    }
}

async function fetchSearchPreview(params) {
    try {
        const res = await BEApi.ProductApi.getAll(params)
        const data = res.data.products
        
        if (data && data.length>0) {
            const newData = res.data.products.map(item => ({
                ...item,
                product_id: item?._id,
                image_url: [demo_1, demo_3],
            })).filter(item => item.available)

            return newData
        }

        else {
            console.warn("No product found")    
            return ([])
        }
    

    } catch (err) {
        console.error("Failed to fetch products", err);
    }
}

async function fetchProduct(product_id, setter = () => {}, setDefaultOption = () => {}) {
    if (typeof setter !== "function") return 

    try {
        const res = await BEApi.ProductApi.getById(product_id)
        const item = res.data

        if (item) {
            const data = {
                ...item,
                product_id: item?._id,
                image_url: [demo_1, demo_3],
            }

            setter(data)
            //if (typeof setDefaultOption === 'function') setDefaultOption(getDefaultOption(data))
        } 
        
        else {
            console.warn("No product found for", product_id)
            setter({})
        }
        
    } catch (error) {
        console.error("Failed to fetch product:", error);
    }
}

function getRoundPrice(price) {
    return Math.round(100*price, 2)/100
}

export {fetchProducts, fetchProduct, fetchSearchPreview, createProductParams, getRoundPrice}