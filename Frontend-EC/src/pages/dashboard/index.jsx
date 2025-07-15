import React from "react";
import Dashboard_Banner from "./components/dashboard_banner";
import Dashboard_Bestselling from "./components/dashboard_bestselling";

function Dashboard() {

    return ( 
        <div className="px-30 pt-10">
            <Dashboard_Banner/>
            <Dashboard_Bestselling/>
        </div>
    )
}

export default Dashboard

