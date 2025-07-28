import Header from './components/custom/header'
import { useCart } from './context/CartContext'
import Cart from './pages/cart'
import Dashboard from './pages/dashboard'
import List_Product from './pages/list_product'
import Personal from './pages/personal'
import Product_Detail from './pages/product_detail'
import {BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import SupportPage from './pages/support'
import Login from './pages/login'
import Signup from './pages/signup/components/signup'
import BlogDetail from './pages/blog_detail';
import Search_Page from './pages/search'
import { ProductProvider } from './context/ProductContext'
import { ProductDetailProvider } from './context/ProductDetailContext'
import Admin from './admin'
import Admin_Order, { Admin_Order_Detail } from './admin/components/admin_order'
import Admin_User from './admin/components/admin_user'
import Admin_Inventory, { Admin_Inventory_Detail } from './admin/components/admin_inventory'

const UserLayout = () => {

  return(
    <>
      <Header />
      <Outlet />
      <Cart />
    </>
  )
}

function App() {

  return (
      <div className='max-w-screen-xl min-w-[320px]'>
        <Router>
          <Routes>
            <Route element={<UserLayout/>}>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/product/:id" element={<ProductDetailProvider ><Product_Detail/></ProductDetailProvider>}/>
              <Route path="/flowers" element={<List_Product/>}/>
              <Route path="/personal" element={<Personal/>}/>
              <Route path='/search' element={<ProductProvider><Search_Page/></ProductProvider>} />
              <Route path="/support" element={<SupportPage/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/blog/:slug" element={<BlogDetail />} />
           </Route>

            <Route path="/admin" element={<Admin />}>
              <Route index element={<Admin_User />} />
              <Route path="user" element={<Admin_User />} />
              <Route path="inventory" element={<Admin_Inventory/>} />
              <Route path="inventory/:id" element={<Admin_Inventory_Detail/>} />
              <Route path="order" element={<Admin_Order />} />
              <Route path="order/:id" element={<Admin_Order_Detail />} />
            </Route>
          </Routes>
        </Router>
      </div>
  )
}

export default App
