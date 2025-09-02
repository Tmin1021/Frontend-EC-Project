import React, { useEffect, useRef, useState } from "react";
import Dashboard_Banner from "./components/dashboard_banner";
import Dashboard_Bestselling from "./components/dashboard_bestselling";
import Dashboard_Why from "./components/dashboard_why";
import Dashboard_Blog from "./components/dashborad_blog";
import Dashboard_Recommend from "./components/dashboard_recommend";
import ShopInfo from "../support/components/shop_info";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

function Dashboard_Section({children, y_position}) {
  const ref = useRef(null);
  const { scrollY } = useScroll(); 

  // Opacity + Scale (slower)
  const rawOpacity = useTransform(scrollY, [y_position - 200, y_position, y_position + 200], [0, 1, 1]) // useTransform (src, range_of_src, value_ofthat_range)
  const rawScale   = useTransform(scrollY, [y_position - 200, y_position, y_position + 200], [0.5, 1, 1])

  // Blur effect: starts blurred (20px) → clear (0px)
  const rawBlur    = useTransform(scrollY, [y_position - 200, y_position, y_position + 200], [20, 0, 0])

  // Optional: smooth all with spring
    const opacity = useSpring(rawOpacity, { duration: 0.8 });
    const scale   = useSpring(rawScale,   { duration: 0.8 });
    const blur    = useSpring(rawBlur,    { duration: 0.8 });
    const filter  = useTransform(blur, (b) => `blur(${b}px)`);
 
return (
    <motion.div
        ref={ref}
        style={{opacity, scale, filter, willChange: "opacity, transform, filter" }}
        className="transition-all"
        >
        {children}
    </motion.div>
    )
}

function Dashboard() {
    const {user} = useAuth()

    return ( 
        <div className="flex flex-col w-full">
            <Dashboard_Banner/>
            <Dashboard_Section y_position={200}> <Dashboard_Bestselling/> </Dashboard_Section>
            <Dashboard_Section y_position={700}> <Dashboard_Blog/> </Dashboard_Section>
            {user?.id && <Dashboard_Section y_position={1200}> <Dashboard_Recommend/> </Dashboard_Section>}
            <ShopInfo />
        </div>
    )
}

export default Dashboard

