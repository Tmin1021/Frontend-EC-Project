import React, { useEffect, useState } from "react";
import {User, Search, ShoppingCart, Flower, Flower2} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { ProductProvider, useProduct } from "../../context/ProductContext";

function Search_Item({product}) {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)

    return (
        <div className='flex items-center gap-2 px-1 py-2' onClick={()=> navigate(`/product/${product.product_id}`)} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
            {isHover? <Flower2 className='w-4 h-4 text-pink-500'/> : <Flower className='w-4 h-4 text-pink-300'/>}
            <p className='font-light hover:font-semibold transition-all'>{product.name}</p>
        </div>
    )
}

function Search_Result() {
    const {searchProduct, searchPrediction} = useProduct()
    const [input, setInput] = useState("")
    const searchResults = searchProduct(input)
    const prediction = searchPrediction(input)
    
    const onHandleInput = (e)=>{
        const value = e.target.value
        setInput(value);
    }

    return (
        <div className="absolute top-15 left-0 w-full px-3 flex flex-col gap-2 z-52">
            {/* Input field */}
            <div className='flex gap-2 w-full items-center'>
                <Search className='w-6 h-6 text-gray-500' />

                <div className='relative min-w-[200px]'>
                    <div className='text-2xl font-medium text-gray-400 dark:text-white'>
                        {input===""? "Search Hoa..." : <p>{input}<b>{prediction}</b></p>}
                    </div>

                    <input 
                            type="text" 
                            placeholder="Search Hoa..." 
                            value={input}
                            onChange={onHandleInput}
                            className="absolute inset-0 bg-transparent flex-1 px-3 py-2 text-2xl text-transparent font-medium focus:outline-none"
                            />
                </div>
            </div>

            {/* Result */}
            <div>
                {searchResults.map((product, i) => (
                    <Search_Item key={i} product={product}/>
                ))}
            </div>

        </div>
    )
}

function Search_Space({isSearch, closeSearch}) {


   useEffect(() => {
      document.body.style.overflow = 'hidden';

      return () => {
          document.body.style.overflow = 'auto'; 
      };
  }, []);

  return (
    <AnimatePresence>
        {isSearch && 
        <motion.div>
            {/* Blur layer */}
            <motion.div className='fixed top-12 left-0 w-full h-full bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center' 
                        onMouseEnter={closeSearch}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
            ></motion.div>
            {/* White/Black layer */}
            <motion.div className='fixed top-12 left-0 w-full h-[300px] bg-white dark:bg-black z-51 flex items-center justify-center'
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.5 }}>
            </motion.div>
            {/* Search */}
            <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}>
                <ProductProvider>
                    <Search_Result/>
                </ProductProvider>
            </motion.div>
           
        </motion.div>}
    </AnimatePresence>
  )
}

function Header_Item({name}) {
    const iconMap = {
        Search: <Search className="w-5 h-5"/>,
        User: <User className="w-5 h-5"/>,
        Cart: <ShoppingCart className="w-5 h-5"/>
    }

    const {openCart} = useCart()
    const navigate = useNavigate()
    const navigateMap = {
        "All Flowers": "/flowers"
    }

    const handleClick = (name) => {
        if (name === "Cart") {openCart()}
        //if (name == "Search") {}
        else if (navigateMap[name]) { navigate(navigateMap[name])}
    }

    return (
        <div className="flex items-center cursor-pointer" onClick={() => handleClick(name)}>
            {iconMap[name] || <p className="text-sm font-light hover:font-semibold transition-all">{name}</p>}
        </div>
    )
}

function Header() {
    // fixed z-10 top-10 left-1/2 -translate-x-1/2 
    // mx-auto: place the div in the middle of the space it take
    const header_items = ["All Flowers", "Accessories", "Support", "Search", "User", "Cart"]
    const [isSearch, setIsSearch] = useState(false)

    return (
        <div>
            <div className='relative flex justify-between items-center w-[60%] mx-auto p-4'>
                {header_items.map(header_item => (
                    <Header_Item key={header_item} name={header_item}/>
                ))}
                <div onClick={()=>setIsSearch(true)}>
                    Tmp
                </div>
                {isSearch && <Search_Space isSearch={isSearch} closeSearch={()=>setIsSearch(false)}/>}
            </div>

        </div>


    )
}

export default Header