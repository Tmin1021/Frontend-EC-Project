import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { createProductParams, fetchProducts, fetchSearchPreview } from '../components/functions/product_functions';
import BEApi from '../../service/BEApi';

const ProductContext = createContext()

export function ProductProvider({children, isSearchPage=false}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState([])
  const [currentValues, setCurrentValues] = useState({
    "Flower Type": new Set(),
    "Occassions": new Set(),
    "Colors": new Set(),
    "Sort": "Best Seller",
    "Search": '',
    "Page": 1
  })

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const search = params.get('search') || ''   // automatically decodes URL encoding
  const flowerTypes = params.get('flowerTypes')?.split(",") || []
  const occasions = params.get('occasions')?.split(",") || []
  const colors = params.get('colors')?.split(",") || []
  const sort = params.get('sort') || ''
  const page = parseInt(params.get('page') || "1")

  useEffect(() => {
    // for search
    const productParams = createProductParams({search: search, flowerTypes: flowerTypes, occasions: occasions, colors: colors, sort: sort, page: page})
    fetchProducts({setter:setProducts, setter2: setPagination, params:productParams}).finally(() => setLoading(false));
    
    setCurrentValues({
      "Flower Type": new Set(flowerTypes),
      "Occassions": new Set(occasions),
      "Colors": new Set(colors),
      "Sort": sort,
      "Search": search,
      "Page": page
   })

  }, [location, isSearchPage]) 

  // f 
  const filterProduct = ({name, value, isChosen}) => { 
    let newValues =    {...currentValues, [name]: new Set(currentValues[name])}
    isChosen ? newValues[name].add(value) : newValues[name].delete(value)
    setLoading(true)

    const productParams = createProductParams({search: newValues.Search, flowerTypes: [...newValues['Flower Type']], occasions: [...newValues.Occassions], colors: [...newValues.Colors], sort: newValues.Sort})
    //fetchProducts(setProducts, productParams)
    
    navigate(`/${isSearchPage ? "search":"flower"}?${productParams.toString()}`, {replace: true})
    setCurrentValues(newValues)
  }

  // g
  /*
  const getTotalSold = product_id => {
    return order_items.reduce((total, order_item) => {
      const product = order_item.products.find(p => p.product_id === product_id)
      return product ? total + product.quantity : total
    }, 0)
  }*/

  // h
  const handlePageChange = async (newPage) => {
      if (newPage < 1 || newPage > pagination.totalPages) return
      const productParams = createProductParams({search: search, flowerTypes: flowerTypes, occasions: occasions, colors: colors, sort: sort, page: newPage})
      setLoading(true)
      fetchProducts({setter: setProducts, setPagination:setPagination, params:productParams}).finally(() => setLoading(false))
  }

  // s
  const searchPrediction = async (input) => {
    const res = await BEApi.ProductApi.getPrediction(input)
    const predictions = res.data
    const newPredictions = []

    predictions.forEach((product) => {
      const name = product.name;
      const index = name.toLowerCase().indexOf(input.toLowerCase())

      if (index !== -1 && index + input.length < name.length) {
        const remaining = name.slice(index + input.length)
        if (name.toLowerCase().split(" ").includes((input+remaining).split(" ")[0])) {newPredictions.push(remaining)}
      }
    })

    return newPredictions[0]
  }

  const searchProduct = async (input='') => {
    const productParams = createProductParams({search: input})
    const searchResults = await fetchSearchPreview(productParams)

    return searchResults
  }

  const sortProduct = value => {
    let newValues = currentValues
    newValues["Sort"] = value
    setLoading(true)

    const productParams = createProductParams({search: newValues.Search, flowerTypes: [...newValues['Flower Type']], occasions: [...newValues.Occassions], colors: [...newValues.Colors], sort: newValues.Sort})
    //fetchProducts(setProducts, productParams).finally(() => setLoading(false));

    navigate(`/${isSearchPage ? "search":"flower"}?${productParams.toString()}`, {replace: true})
    setCurrentValues(newValues)
  }

  return (
    <ProductContext.Provider value={{pagination, setPagination, search, products, loading, filterProduct, handlePageChange, searchProduct, searchPrediction, sortProduct, isSearchPage}}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => useContext(ProductContext)