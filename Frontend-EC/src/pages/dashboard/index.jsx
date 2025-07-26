import React from "react";
import Dashboard_Banner from "./components/dashboard_banner";
import Dashboard_Bestselling from "./components/dashboard_bestselling";
import Dashboard_Why from "./components/dashboard_why";

function Dashboard() {

    return ( 
        <div className="flex flex-col items-center w-full">
            <Dashboard_Banner/>
            <Dashboard_Bestselling/>
            {/*<Dashboard_Why/>*/}
        </div>
    )
}

export default Dashboard

