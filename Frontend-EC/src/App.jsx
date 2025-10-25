import Header from './components/custom/header'
import Cart from './pages/cart'
import Dashboard from './pages/dashboard'
import List_Product from './pages/list_product'
import Personal from './pages/personal'
import Product_Detail from './pages/product_detail'
import {BrowserRouter as Router, Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import SupportPage from './pages/support'
import Login from './pages/login'
import Signup from './pages/signup/components/signup'
import BlogDetail from './pages/blog_detail';
import { ProductProvider } from './context/ProductContext'
import { ProductDetailProvider } from './context/ProductDetailContext'
import Admin from './admin'
import Admin_Order, { Admin_Order_Detail } from './admin/components/admin_order'
import Admin_User, { Admin_User_Detail } from './admin/components/admin_user'
import Admin_Inventory, { Admin_Inventory_Detail } from './admin/components/admin_inventory'

import { useAuth } from './context/AuthContext'
import Admain_Dashboard from './admin/components/admin_dashboard'
import Checkout from './pages/checkout'
import { Order_Product_Preview } from './pages/personal/components/personal_order'
import DemoAPI from './pages/demoAPI'
import { Toaster } from 'sonner'
import { CheckoutProvider } from './context/CheckoutContext'
import Inform from './pages/inform'
import Accessories from './pages/acessories'
import { useEffect } from 'react'

const UserLayout = () => {

  return(
    <>
      <Header />
      <Outlet />
      <Cart />
      <Toaster />
    </>
  )
}

// if not authenticated => bring back to previous state
// mostly: authenticated is not load yet => bring forward to login (bring the old path name) => login + authenticated loaded => bring back to previous state (always have previous state in this case)
const ProtectAdmin = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Not logged in → go to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role !== "admin") {
    // Logged in but not admin => send them back where they came from (or home)
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  // Logged in AND admin → allow access
  return children;
};

const ProtectPersonal = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Not logged in → go to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in AND not admin → allow access
  return children;
};

// prevent admin from going to user layout
const ProtectFromAdmin = ({children}) => {
  const {user, isAuthenticated} = useAuth()

  return (isAuthenticated && user.role==='admin') ?  <Navigate to="/admin"/> : children
}


function App() {

  return (
      <div className='min-w-[320px]'>
        <Router>
          <Routes>
            <Route path="/demoapi" element={<DemoAPI/>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='/inform' element={<Inform/>}/>

            <Route element={<ProtectFromAdmin><UserLayout/></ProtectFromAdmin>}>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/flower" element={<ProductProvider><List_Product/></ProductProvider>}/>
              <Route path="/flower/:id" element={<ProductDetailProvider ><Product_Detail/></ProductDetailProvider>}/>
              <Route path="/accessory" element={<Accessories/>}/>
              <Route path="/personal" element={<ProtectPersonal><Personal page={"Information"}/></ProtectPersonal>}/>
              <Route path="/personal/order" element={<ProtectPersonal><Personal page={"Orders"}/></ProtectPersonal>}/>
              <Route path="/personal/order/:orderID" element={<Order_Product_Preview/>}/>
              <Route path='/search' element={<ProductProvider isSearchPage={true}><List_Product/></ProductProvider>} />
              <Route path="/support" element={<SupportPage/>}/>    
              <Route path="/blog/:slug" element={<BlogDetail />} />
           </Route>

            <Route path="/admin" element={<ProtectAdmin><Admin/></ProtectAdmin>}>
              <Route index element={<Admin_User />} />
              <Route path="user" element={<Admin_User />} />
              <Route path="account" element={<Admin_User_Detail isCreate={false}/>} />
              <Route path="user/create" element={<Admin_User_Detail isCreate={true}/>} />
              <Route path="create" element={<Admin_User_Detail isCreate={true}/>} />
              <Route path="inventory" element={<Admin_Inventory/>} />
              <Route path="inventory/:id" element={<Admin_Inventory_Detail/>} />
              <Route path="inventory/create" element={<Admin_Inventory_Detail isCreate={true}/>} />
              <Route path="order" element={<Admin_Order />} />
              <Route path="order/:id" element={<Admin_Order_Detail />} />
              <Route path="dashboard" element={<Admain_Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </div>
  )
}

export default App
