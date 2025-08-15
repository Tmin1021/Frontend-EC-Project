import React, { useEffect, useState } from "react";
import Dashboard_Banner from "./components/dashboard_banner";
import Dashboard_Bestselling from "./components/dashboard_bestselling";
import Dashboard_Why from "./components/dashboard_why";
import Dashboard_Blog from "./components/dashborad_blog";
import { AnimatePresence, motion } from "framer-motion";

function Dashboard_Section({children, y_position}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            if (scrollY > y_position) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        handleScroll()
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [y_position]);

    return (
        <AnimatePresence>
            {isVisible && 
            <motion.div initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.4 }}>
                        {children}
            </motion.div>
            }
        </AnimatePresence>
    )

}

function Dashboard() {
    const [scrollY, setScrollY] = useState(0);

    return ( 
        <div className="flex flex-col w-full">
            <Dashboard_Banner/>
            <Dashboard_Section y_position={200}> <Dashboard_Bestselling/> </Dashboard_Section>
            <Dashboard_Section y_position={700}> <Dashboard_Blog/> </Dashboard_Section>
            <div className='h-[400px]'></div>
        </div>
    )
}

export default Dashboard

