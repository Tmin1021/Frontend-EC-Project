import React from 'react'
import List_Filter from './components/list_filter'
import List_View from './components/list_view'
import { ProductProvider } from '../../context/ProductContext'
import { products } from '../../data/dummy'

function List_Product({isSearchPage=false, result=[]}) {
  return (
    <ProductProvider initialProduct={isSearchPage? result: products}>
      
    {(!isSearchPage || (isSearchPage&&result.length!==0)) &&
      <div className='px-30'>
          <List_Filter/>
          <List_View/>
      </div> }
    </ProductProvider>
  )
}

export default List_Product