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

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/product/:id" element={<Product_Detail/>}/>
        <Route path="/flowers" element={<List_Product/>}/>
        <Route path="/personal" element={<Personal/>}/>
        <Route path='/search' element={<ProductProvider><Search_Page/></ProductProvider>} />
      </Routes>
      <Cart/>
    </Router>
   
  )
}

export default App
