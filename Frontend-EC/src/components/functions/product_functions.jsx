import BEApi from "../../../service/BEApi"
import {assets, demo_1, demo_3} from "../../data/dummy"

function createProductParams({search='', flowerTypes=[], occasions=[], colors=[], sort='Best Sellers', page=1, limit=12} = {}) {
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

        if (data && data.length>0) {
            const newData = res.data.products.map(item => ({
                ...item,
                product_id: item?._id,
                image_url: refreshImageURL(item?.image_url),
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
                image_url: refreshImageURL(item?.image_url),
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

async function getProduct(product_id) {
    try {
        const res = await BEApi.ProductApi.getById(product_id)
        const item = res.data
        
        if (item) {
            const data = {
                ...item,
                product_id: item?._id,
                image_url: refreshImageURL(item?.image_url),
            }

            return data
        }

        else {
            console.warn("No product found")    
            return ([])
        }
    

    } catch (err) {
        console.error("Failed to get products", err);
    }
}

async function fetchProduct(product_id, setter = () => {}) {
    if (typeof setter !== "function") return 

    try {
        const res = await BEApi.ProductApi.getById(product_id)
        const item = res.data

        if (item) {
            const data = {
                ...item,
                product_id: item?._id,
                image_url: refreshImageURL(item?.image_url),
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

async function fetchComment(product_id, setter = () => {}) {
    if (typeof setter !== 'function') return

    try {
        const res = await BEApi.CommentApi.getByProductId(product_id);
        const data = res.data

        if (data && data.length > 0) {
            // Fetch user info for each comment
            const newData = await Promise.all(
                data.map(async (item) => {
                    const userRes = await BEApi.UserApi.getById(item.user_id)
                    return {
                        ...item,
                        user: userRes.data,
                    }
                })
            )

            setter(newData)
        } else {
            console.warn("No comment found for", product_id)
            setter([])
        }
    } catch (error) {
        console.error("Failed to fetch comment:", error)
    }
}

// help func
function getRoundPrice(price) {
    return Math.round(100*price, 2)/100
}

const getFormatDate = (str) => {
  const [date, time] = str.split("T")
  const cleanTime = time.replace("Z", "")

  return (date+ ' at ' +cleanTime.slice(0,8))
}

const refreshImageURL = (image_url=[]) => {
    if (!image_url) return [demo_1]
    const keys = Object.keys(assets)
    const newImageURL = image_url.filter(image => keys.includes(image))
    return newImageURL.length > 0 ? newImageURL : [keys[0]]
}

export {fetchProducts, fetchProduct, fetchSearchPreview, createProductParams, getRoundPrice, getFormatDate, fetchComment, getProduct, refreshImageURL}