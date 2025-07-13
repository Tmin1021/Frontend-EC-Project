import React from 'react'
import List_Filter from './components/list_filter'
import List_View from './components/list_view'
import { ProductProvider } from '../../context/ProductContext'

function List_Product() {
  return (
    <ProductProvider>
      <div>
          <List_Filter/>
          <List_View/>
      </div>
    </ProductProvider>
  )
}

export default List_Product