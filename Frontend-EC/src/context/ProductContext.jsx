import React, { createContext, useContext, useState, useEffect } from 'react'
import { order_items, isDummy, products } from '../data/dummy'
import GlobalApi from '../../service/GlobalApi';
import { useParams } from 'react-router-dom';

const ProductContext = createContext()
const BASE_URL = 'http://localhost:1337';

export function ProductProvider({children, isSearch=false, searchResult=[]}) {
  const {type} = useParams()

  const [currentProduct, setCurrentProduct] = useState([]);
  const [initialProduct, setInitialProduct] = useState([]);
  const [currentValues, setCurrentValues] = useState({
    "Flower Type": new Set([""]),
    "Occassions": new Set([""]),
    "Colors": new Set([""]),
    "Sort": new Set([""]),
  });

  useEffect(() => {
    // Skip API fetch — just use passed-in search results
    if (isSearch) return;
    
    async function fetchProducts() {
    try {
    const res = await GlobalApi.ProductApi.getAll()
    const data = res.data.data.map(item => ({
        product_id: item?.documentId,
        type: item?.type,
        name: item?.name,
        price: item?.price,
        stock: item?.stock,
        available: item?.available,
        description: item?.description,
        image_url: item.image_url.map(image => BASE_URL+image.url),
        flower_details: item?.flower_details
    }))

    let new_data = data
    if (type==='flower') new_data=data.filter(item=>item.type==='flower')
    else if (type==='accessory') new_data=data.filter(item=>item.type!=='flower')
    setCurrentProduct(new_data)
    setInitialProduct(data)
    } catch (err) {
        console.error("Failed to fetch products", err);
    }
  }

    function fetchDummy() {
      let new_data = products
      if (type==='flower') new_data=products.filter(item=>item.type==='flower')
      else if (type==='accessory') new_data=products.filter(item=>item.type!=='flower')
      setCurrentProduct(new_data)
      setInitialProduct(products)
    } 
    
    isDummy? fetchDummy() : fetchProducts()
  }, [type]) 

  useEffect(() => {
    if (isSearch) {
      setCurrentProduct(searchResult)
      setInitialProduct(searchResult)
    }
  }, [searchResult]) 

  // function
  // f 
  const filterProduct = ({type, value, isChosen}) => { 
    let new_product = initialProduct.filter(product => product.type==='flower')
    let new_values = currentValues

    isChosen ? new_values[type].add(value) : new_values[type].delete(value)
    new_product = (new_values["Flower Type"]?.size!==1 ? initialProduct.filter((product) => new_values["Flower Type"].has(product.flower_details?.flower_type)) : new_product)
    new_product = (new_values["Occassions"]?.size!==1 ? new_product.filter((product) => product.flower_details?.occasion.some(i=>new_values["Occassions"].has(i))): new_product)
    new_product = (new_values["Colors"]?.size!==1? new_product.filter((product) => product.flower_details?.color.some(i=>new_values["Colors"].has(i))) : new_product)
    
    setCurrentValues(new_values)
    setCurrentProduct(new_product)
  }

  // g
  const getTotalSold = product_id => {
    return order_items.reduce((total, order_item) => {
      const product = order_item.products.find(p => p.product_id === product_id)
      return product ? total + product.quantity : total
    }, 0)
  }

  // s
  const searchPrediction = (input) => {
    const predictions = []

    initialProduct.forEach((product) => {
      const name = product.name;
      const index = name.toLowerCase().indexOf(input.toLowerCase())

      if (index !== -1 && index + input.length < name.length) {
        const remaining = name.slice(index + input.length)
        if (name.toLowerCase().split(" ").includes((input+remaining).split(" ")[0])) {predictions.push(remaining)}
      }
    })

    return predictions[0]
  }

  const searchProduct = (input) => {
    const new_input = input.toLowerCase()
    const matches = [
      ...initialProduct.filter(product => product.name.toLowerCase().includes(new_input)),
      ...initialProduct.filter(product => product.type === 'flower' && product.flower_details.flower_type.toLowerCase().includes(new_input)),
      ...initialProduct.filter(product => product.type === 'flower' && product.flower_details.occasion.some(i => i.toLowerCase().includes(new_input))),
      ...initialProduct.filter(product => product.type === 'flower' && product.flower_details.color.some(i => i.toLowerCase().includes(new_input))),
    ]

    const uniqueMatches = Array.from(new Set(matches))
    return uniqueMatches
  }

  const sortProduct = value => {
    let new_product = currentProduct.slice()

    if (value === 'Price: Low to High') new_product = new_product.sort((a,b) => a.price-b.price)
    else if (value === 'Price: High to Low') new_product = new_product.sort((a,b) => b.price-a.price)

    else if (value === 'Best Sellers') {
      new_product = new_product
        .map(product => [product, getTotalSold(product.product_id)])
        .sort((a, b) => b[1] - a[1])
        .map(pair => pair[0])
    }

    setCurrentProduct([...new_product])
  }

  return (
    <ProductContext.Provider value={{currentProduct, setCurrentProduct, filterProduct, searchProduct, searchPrediction, sortProduct}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)