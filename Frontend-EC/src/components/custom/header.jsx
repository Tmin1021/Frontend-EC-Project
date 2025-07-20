import React, {useState } from "react";
import {User, Search, ShoppingCart, Flower, Flower2} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Search_Space from "./search";

function Header_Item({name, onHandleClick}) {
    const iconMap = {
        Search: <Search className="w-5 h-5"/>,
        Personal: <User className="w-5 h-5"/>,
        Cart: <ShoppingCart className="w-5 h-5"/>
    }

    return (
        <div className="flex items-center cursor-pointer" onClick={onHandleClick}>
            {iconMap[name] || <p className="text-sm font-light hover:font-semibold transition-all">{name}</p>}
        </div>
    )
}

function Header() {
    // fixed z-10 top-10 left-1/2 -translate-x-1/2 
    // mx-auto: place the div in the middle of the space it take
    const header_items = ["All Flowers", "Accessories", "Support", "Search", "Personal", "Cart"]
    const [isSearch, setIsSearch] = useState(false)
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

    return (
        <div className='relative w-full'>
            <div className='flex justify-between items-center w-[60%] mx-auto p-4'>
                {header_items.map(header_item => (
                    <Header_Item key={header_item} name={header_item} onHandleClick={()=>handleClick(header_item)}/>
                ))}
            </div>

            {/* Put isSeacrh here will not triiger the exit motion */}
            <Search_Space isSearch={isSearch} closeSearch={()=>setIsSearch(false)}/>

        </div>
    )
}

export default Header
