import React, { createContext, useContext, useState } from 'react'
import { products } from '../data/dummy'

const ProductContext = createContext()

export function ProductProvider({children}) {
  const [current_product, setCurrentProduct] = useState(products)
  const [current_values, setCurrentValues] = useState({"Flower Type": new Set([""]), "Occassions": new Set([""]), "Colors": new Set([""]), "Sort": new Set([""])})

  const filterProduct = ({type, value, isChosen}) => { 
    let new_product = products
    let new_values = current_values

    isChosen ? new_values[type].add(value) : new_values[type].delete(value)
    new_product = (new_values["Flower Type"].size!==1 ? products.filter((product) => new_values["Flower Type"].has(product.flower_type)) : new_product)
    new_product = (new_values["Occassions"].size!==1 ? new_product.filter((product) => new_values["Occassions"].has(product.occasion)) : new_product)
    new_product = (new_values["Colors"].size!==1? new_product.filter((product) => new_values["Colors"].has(product.color)) : new_product)
    console.log(new_values)
    
    setCurrentValues(new_values)
    setCurrentProduct(new_product)
  }

  const searchProduct = (input) => {
    const matches = [
      ...products.filter(product => product.name.includes(input)),
      ...products.filter(product => product.flower_type.includes(input)),
      ...products.filter(product => product.occasion.includes(input)),
      ...products.filter(product => product.color.includes(input)),
    ]

    const uniqueMatches = Array.from(new Set(matches))
    return uniqueMatches
  }

  const searchPrediction = (input) => {
    const predictions = []

    products.forEach((product) => {
      const name = product.name;
      const index = name.toLowerCase().indexOf(input.toLowerCase())

      if (index !== -1 && index + input.length < name.length) {
        const remaining = name.slice(index + input.length)
        if (name.toLowerCase().split(" ").includes((input+remaining).split(" ")[0])) {predictions.push(remaining.trim())}
      }
    })

    return predictions[0]
  }


  return (
    <ProductContext.Provider value={{current_product, filterProduct, searchProduct, searchPrediction}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)