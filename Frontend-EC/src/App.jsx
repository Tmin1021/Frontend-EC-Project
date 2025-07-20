import Header from './components/custom/header'
import { useCart } from './context/CartContext'
import Cart from './pages/cart'
import Dashboard from './pages/dashboard'
import List_Product from './pages/list_product'
import Personal from './pages/personal'
import Product_Detail from './pages/product_detail'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const {isCartOpen} = useCart()

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/product/:id" element={<Product_Detail/>}/>
        <Route path="/flowers" element={<List_Product/>}/>
        <Route path="/personal" element={<Personal/>}/>
      </Routes>
      {isCartOpen && <Cart/>}
    </Router>
   
  )
}

export default App
