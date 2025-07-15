import React from "react";
import {User, Search, ShoppingCart} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

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
        else if (navigateMap[name]) { navigate(navigateMap[name])}
    }

    return (
        <div className="flex items-center cursor-pointer " onClick={() => handleClick(name)}>
            {iconMap[name] || <p className="text-sm font-light hover:font-semibold transition-all">{name}</p>}
        </div>
    )
}

function Header() {
    // fixed z-10 top-10 left-1/2 -translate-x-1/2 
    // mx-auto: place the div in the middle of the space it take
    const header_items = ["All Flowers", "Accessories", "Support", "Search", "User", "Cart"]

    return (
        <div className='flex justify-between items-center w-[60%] mx-auto p-4'>
            {header_items.map(header_item => (
                <Header_Item key={header_item} name={header_item}/>
            ))}
        </div>
    )
}

export default Header