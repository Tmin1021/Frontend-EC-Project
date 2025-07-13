import React from "react";
import Dashboard_Banner from "./components/dashboard_banner";
import Dashboard_Bestselling from "./components/dashboard_bestselling";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const {openCart} = useCart()
    const navigate = useNavigate()

    return (
        <div className="p-30">
            <div className='w-[100px] h-[100px] bg-amber-300' onClick={openCart}>Cart</div>
            <div className='w-[100px] h-[100px] bg-amber-300' onClick={()=>navigate("/flowers")}>Shop</div>
            <Dashboard_Banner/>
            <Dashboard_Bestselling/>
        </div>
    )
}

export default Dashboard

