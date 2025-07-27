import React, {useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {User, Search, ShoppingCart, Menu, X, ChevronRight} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Search_Space from "./search";


function Header_Item({name, onHandleClick}) {
    const iconMap = {
        Search: <Search className="w-6 h-6"/>,
        Personal: <User className="w-6 h-6"/>,
        Cart: <ShoppingCart className="w-6 h-6"/>
    }

    return (
        <div className="flex items-center cursor-pointer group" onClick={onHandleClick}>
            {iconMap[name] || 
            <div className='flex w-full items-center justify-between'>
                <p className="text-2xl font-bold md:text-lg md:font-light hover:font-semibold transition-all">{name}</p>
                <ChevronRight className='md:hidden w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300'/>
            </div>}
        </div>
    )
}

function Header() {
    // fixed z-10 top-10 left-1/2 -translate-x-1/2 
    // mx-auto: place the div in the middle of the space it take
    const header_items = ["All Flowers", "Accessories", "Support", "Search", "Personal", "Cart"]
    const navItems = ["All Flowers", "Accessories", "Support"];
    const iconItems = ["Search", "Personal", "Cart"];

    const [isSearch, setIsSearch] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const {openCart} = useCart()
    const navigate = useNavigate()
    const navigateMap = {
        "All Flowers": "/flowers", 
        "Personal": "/personal"
    }

    const handleClick = (name) => {
        if (name === "Cart") {openCart()}
        if (name == "Search") {setIsSearch(!isSearch)}
        else if (navigateMap[name]) {navigate(navigateMap[name])}
    }
    
    useEffect(() => {
      document.body.style.overflow = isDropdownOpen?'hidden':'auto';

      return () => {
          document.body.style.overflow = 'auto'; 
      };
    }, [isDropdownOpen]);


    const usenavigate = useNavigate();
  
    return (
        <div className='relative w-full'>
            <div className='w-[90%] md:w-[80%] mx-auto py-4'>
                {/* Desktop version*/}
                <div className="hidden md:flex gap-6 items-center justify-between">
                    {header_items.map(header_item => (
                        <Header_Item key={header_item} name={header_item} onHandleClick={()=>handleClick(header_item)}/>
                ))}
                
                </div>
                {/* Mobile: Icons only */}
                <div className="flex md:hidden items-center justify-end gap-6">
                    {iconItems.map((item) => (
                        <Header_Item key={item} name={item} onHandleClick={() => handleClick(item)} />
                    ))}

                    {/* Menu button */}
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <Menu className="w-6 h-6" />
                    </button>
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

        </div>
    )
}

export default Header
