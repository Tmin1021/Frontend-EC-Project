import React, {useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {User, Search, ShoppingCart, Menu, X, ChevronRight, Clover, Leaf, Shrub} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Search_Space from "./search";
import { useAuth } from '../../context/AuthContext'
import Chatbot from './chatbot';

function Header_Item({name, onHandleClick}) {
    const {cart} = useCart()

    const iconMap = {
        Home: <div className='flex justify-center items-center group-hover:gap-1 transition-all w-[80px] duration-300'>
                <Shrub className="w-5 h-5 text-green-700 group-hover:text-green-500 transition-all"/>
                <Clover className="w-5 h-5 text-pink-700 group-hover:text-pink-500 transition-all"/> 
                <Leaf className="w-5 h-5 text-amber-700 group-hover:text-amber-500 transition-all"/>
             </div>,
        Search: <Search className="w-6 h-6"/>,
        Personal: <User className="w-6 h-6"/>,
        Cart: <div className='relative'>
                    <ShoppingCart className="w-6 h-6"/> 
                    {cart.length >0 && <div className='absolute -right-2 -top-2 flex justify-center items-center w-[20px] aspect-square bg-purple-500 text-xs text-white font-semibold rounded-full shadow-gray-500 shadow-md'>
                        {cart.length}
                    </div>}
                </div>,
    }

    return (
        <div className="flex items-center cursor-pointer group" onClick={onHandleClick}>
            {iconMap[name] || 
            <div className='flex w-full items-center justify-between'>
                <p className="text-2xl font-bold md:text-base md:font-light hover:font-semibold transition-all">{name}</p>
                <ChevronRight className='md:hidden w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity duration-300'/>
            </div>}
        </div>
    )
}


function Header() {
    // fixed z-10 top-10 left-1/2 -translate-x-1/2 
    // mx-auto: place the div in the middle of the space it take
    const header_items = ["Home", "All Flowers", "Accessories", "Support", "Search", "Personal", "Cart"]
    const navItems = ["All Flowers", "Accessories", "Support"];
    const iconItems = ["Search", "Personal", "Cart"];

    const [isSearch, setIsSearch] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const {openCart} = useCart()
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()
    const navigateMap = {
        "Home": "/",
        "All Flowers": "/flower", 
        "Accessories": "/accessory", 
        "Support": '/support',
        "Personal": "/personal"
    }

    const handleClick = (name) => {
        if (name === "Cart") {
            if (!isAuthenticated)  navigate("/login", { state: { from: location.pathname }, replace: true })
            else openCart()
            }
        if (name ===  "Search") {setIsSearch(!isSearch)}
        if (name === "Personal") {navigate(isAuthenticated? '/personal' : '/login')}
        else if (navigateMap[name]) {navigate(navigateMap[name])}
    }
    
    /*
    useEffect(() => {
      document.body.style.overflow = isDropdownOpen?'hidden':'auto';

      return () => {
          document.body.style.overflow = 'auto'; 
      };
    }, [isDropdownOpen]);*/

  
    return (
        <div className='relative flex w-full'>
            <div className='w-full py-4 md:bg-gray-50'>
                {/* Desktop version*/}
                <div className="mx-auto w-[80%] hidden md:flex gap-6 items-center justify-between h-full">
                    {header_items.map(header_item => (
                        <Header_Item key={header_item} name={header_item} onHandleClick={()=>handleClick(header_item)}/>
                ))}
                
                </div>
                {/* Mobile: Icons only */}
                <div className="mx-auto w-[90%] flex md:hidden justify-between items-center">
                    {<Header_Item name='Home' onHandleClick={() => handleClick('Home')}/>}

                    <div className="flex items-center justify-end gap-4">
                        {iconItems.map((item) => (
                            <Header_Item key={item} name={item} onHandleClick={() => handleClick(item)} />
                        ))}

                        {/* Menu button */}
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile dropdown menu */}
            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden absolute left-0 top-0 w-full h-screen bg-white dark:bg-black shadow z-50 px-4 py-2 flex flex-col gap-4">
                        <div className='relative w-full pb-8'>
                            <div className='absolute right-0'><X className='w-8 h-8' onClick={()=>setIsDropdownOpen(false)}/></div>
                        </div>
                        {navItems.map((item) => (
                            <Header_Item key={item} name={item} onHandleClick={() => {
                            handleClick(item);
                            setIsDropdownOpen(false); 
                            }} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Put isSeacrh here will not trigger the exit motion */}
            <Search_Space isSearch={isSearch} closeSearch={()=>setIsSearch(false)}/>
        <Chatbot />
        </div>
    )
}

export default Header
