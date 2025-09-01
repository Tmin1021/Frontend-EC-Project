import React, { useState } from 'react'
import Admin_Inventory from './components/admin_inventory'
import { AdminProvider } from '../context/AdminContext'
import Admin_User from './components/admin_user'
import Admin_Order from './components/admin_order'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { Menu, PanelRightOpen, User, Store, Box, LayoutDashboard, LogOut, Fingerprint } from 'lucide-react' 
import { AnimatePresence, motion } from 'framer-motion'
import Dashboard from '../pages/dashboard'
import { Toaster } from 'sonner'
import { useAuth } from '../context/AuthContext'

function Admin() {
  const managements = 
  {
   "User": ['user', <User/>],
   "Inventory": ['inventory', <Store/>], 
   "Order": ['order', <Box/>],
   "Dashboard" : ['dashboard', <LayoutDashboard/>],
   "Account": ['account', <Fingerprint/>],
  }

  const {logout} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeKey, setActiveKey] = useState(Object.keys(managements).find(
    (key) => location.pathname.includes(managements[key][0].toLowerCase())
  ) || "User")

  const handleNavigate = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <div className="flex h-screen relative">

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 shadow p-4 flex justify-between items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu/>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }} className="md:hidden fixed inset-0 bg-black/30 z-52">
            <div className="w-1/2 min-w-[300px] flex flex-col bg-white dark:bg-black h-full pr-2">
            
                <div className='relative min-w-ful pt-6 pb-4'>
                  <div className='absolute right-0' onClick={() => setMenuOpen(!menuOpen)}><PanelRightOpen className='w-7 h-7 hover:text-blue-500'/></div>
                </div>

                <p className="pl-4 font-bold text-4xl">Admin</p>

                {Object.keys(managements).map((key) => (
                  <div key={key} onClick={() => handleNavigate(managements[key][0])} className="flex items-center gap-2 pl-4 py-4 bg-white dark:bg-black hover:bg-gray-100 cursor-pointer transition-all text-xl">
                    {managements[key][1]}
                    {key}
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-1/4 lg:w-1/5 pt-4 h-full">
        <div className="relative flex flex-col w-full px-2">
          <p className="font-bold pl-4 pb-4 text-3xl">Admin</p>

          {Object.keys(managements).map((key) => (
            <div key={key} onClick={() => {handleNavigate(managements[key][0]); setActiveKey(key)}} className={`${activeKey===key? 'bg-purple-100 text-purple-600 font-semibold shadow-lg py-4':'py-3'} rounded-lg flex items-center gap-2 px-4 cursor-pointer transition-all text-lg`}>
              {managements[key][1]}
              {key}
            </div>
          ))}

           <div className='absolute bottom-10 w-full flex items-center gap-2 px-4 text-red-500 cursor-pointer hover:text-red-700  transition-all' onClick={()=>logout(navigate)}>
            <LogOut/>
            <p className='hidden md:inline'>Sign Out</p>
          </div>

        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-2 md:p-4 mt-16 md:mt-0 overflow-auto bg-gray-100 ">
        <Outlet />
        <Toaster />
      </div>
    </div>
  )
}

export default Admin