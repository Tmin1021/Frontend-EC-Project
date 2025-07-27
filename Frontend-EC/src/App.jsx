//import { useState } from 'react'
import Header from './components/custom/header'
import { useCart } from './context/CartContext'
import Cart from './pages/cart'
import Dashboard from './pages/dashboard'
import List_Product from './pages/list_product'
import Product_Detail from './pages/product_detail'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SupportPage from './pages/support'
import Login from './pages/login'
import Signup from './pages/signup/components/signup'
import BlogDetail from './pages/blog_detail';

function App() {
  const {isCartOpen} = useCart()

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/product/:id" element={<Product_Detail/>}/>
        <Route path="/flowers" element={<List_Product/>}/>
        <Route path="/support" element={<SupportPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Routes>
      {isCartOpen && <Cart/>}
    </Router>
   
  )
}

export default App
