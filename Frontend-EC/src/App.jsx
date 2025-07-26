import Header from './components/custom/header'
import { useCart } from './context/CartContext'
import Cart from './pages/cart'
import Dashboard from './pages/dashboard'
import List_Product from './pages/list_product'
import Personal from './pages/personal'
import Product_Detail from './pages/product_detail'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search_Page from './pages/search'
import { ProductProvider } from './context/ProductContext'
import { ProductDetailProvider } from './context/ProductDetailContext'

function App() {

  return (
    <div className='max-w-screen-xl min-w-[320px]'>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/product/:id" element={<ProductDetailProvider ><Product_Detail/></ProductDetailProvider>}/>
          <Route path="/flowers" element={<List_Product/>}/>
          <Route path="/personal" element={<Personal/>}/>
          <Route path='/search' element={<ProductProvider><Search_Page/></ProductProvider>} />
        </Routes>
        <Cart/>
      </Router>
    </div>

  )
}

export default App
