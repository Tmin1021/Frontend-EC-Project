import React, { createContext, useContext, useState } from 'react'
import { products } from '../data/dummy'

const ProductContext = createContext()

export function ProductProvider({children}) {
  const [current_product, setCurrentProduct] = useState(products)
  const [current_values, setCurrentValues] = useState({"Flower Type":"", "Occassions": "", "Colors": "", "Sort": ""})

  const filterProduct = ({type, value}) => { 
    let new_product = products
    let new_values = current_values

    new_values[type] = value
    new_product = (new_values["Flower Type"]!=="" ? products.filter((product) => product.flower_type === new_values["Flower Type"]) : new_product)
    new_product = (new_values["Occassions"]!=="" ? new_product.filter((product) => product.occasion === new_values["Occassions"]) : new_product)
    new_product = (new_values["Colors"]!=="" ? new_product.filter((product) => product.color === new_values["Colors"]) : new_product)

    setCurrentValues(new_values)
    setCurrentProduct(new_product)
    
  }

  return (
    <ProductContext.Provider value={{current_product, filterProduct}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)