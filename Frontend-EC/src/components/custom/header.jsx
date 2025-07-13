import React from "react";

function Header() {
    return (
        <div className='fixed z-10 top-10 left-1/2 -translate-x-1/2 flex justify-between items-center w-[1000px] bg-amber-200 rounded-4xl p-4'>
            <p>Logo</p>
            <p>All flowers</p>
            <p>Store</p>
            <p>Cart</p>
            <p>Info</p>
            <p>Search</p>
        </div>
    )
}

export default Header