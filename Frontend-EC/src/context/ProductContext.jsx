import React, { createContext, useContext, useState, useEffect } from 'react'
import { products } from '../data/dummy'

const ProductContext = createContext()

export function ProductProvider({children, initialProduct=products}) {
  const [currentProduct, setCurrentProduct] = useState(initialProduct)
  const [currentValues, setCurrentValues] = useState({"Flower Type": new Set([""]), "Occassions": new Set([""]), "Colors": new Set([""]), "Sort": new Set([""])})

  useEffect(() => {
    setCurrentProduct(initialProduct)
  }, [initialProduct]) 

  const filterProduct = ({type, value, isChosen}) => { 
    let new_product = initialProduct
    let new_values = currentValues

    isChosen ? new_values[type].add(value) : new_values[type].delete(value)
    new_product = (new_values["Flower Type"]?.size!==1 ? initialProduct.filter((product) => new_values["Flower Type"].has(product.flower_details.flower_type)) : new_product)
    new_product = (new_values["Occassions"]?.size!==1 ? new_product.filter((product) => product.flower_details.occasion.some(i=>new_values["Occassions"].has(i))): new_product)
    new_product = (new_values["Colors"]?.size!==1? new_product.filter((product) => product.flower_details.color.some(i=>new_values["Colors"].has(i))) : new_product)
    
    setCurrentValues(new_values)
    setCurrentProduct(new_product)
  }

  const searchProduct = (input) => {
    const new_input = input.toLowerCase()
    const matches = [
      ...products.filter(product => product.name.toLowerCase().includes(new_input)),
      ...products.filter(product => product.type === 'flower' && product.flower_details.flower_type.toLowerCase().includes(new_input)),
      ...products.filter(product => product.type === 'flower' && product.flower_details.occasion.some(i => i.toLowerCase().includes(new_input))),
      ...products.filter(product => product.type === 'flower' && product.flower_details.color.some(i => i.toLowerCase().includes(new_input))),
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
        if (name.toLowerCase().split(" ").includes((input+remaining).split(" ")[0])) {predictions.push(remaining)}
      }
    })

    return predictions[0]
  }


  return (
    <ProductContext.Provider value={{currentProduct, setCurrentProduct, filterProduct, searchProduct, searchPrediction}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)