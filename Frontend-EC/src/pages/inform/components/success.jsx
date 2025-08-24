import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Clover, Leaf, Shrub } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate()
    
  return (
    <motion.div
      className="h-screen w-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(270deg, #00C9FF, #92FE9D, #ff6ec4, #7873f5)",
        backgroundSize: "800% 800%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],  // [x y]
      }}
      transition={{
        duration: 15,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      <motion.div
        className="flex flex-col gap-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}>
            <div className='cursor-pointer flex items-center gap-4 text-white/60 text-lg md:text-4xl font-bold px-6 py-3 rounded-2xl shadow-lg bg-white/20 backdrop-blur-2xl hover:bg-white/40 hover:text-white/90 hoer:shadow-xl transition-all'>
                <div className='flex justify-center items-center group transition-all w-[80px] duration-300'>
                        <Shrub className="w-6 h-6 md:w-8 md:h-8 text-green-700 group-hover:text-green-500 transition-all"/>
                        <Clover className="w-6 h-6 md:w-8 md:h-8 text-pink-700 group-hover:text-pink-500 transition-all"/> 
                        <Leaf className="w-6 h-6 md:w-8 md:h-8 text-amber-700 group-hover:text-amber-500 transition-all"/>
                </div>
                Thanks for choosing us
            </div>

            <div className='group cursor-pointer mx-auto flex justify-center items-center w-fit bg-white/20 backdrop-blur-2xl p-2 rounded-lg shadow-md text-white/60 font-semibold hover:bg-white/40 hover:text-white/90 hover:shadow-xl hover:px-4 transition-all'
                 onClick={()=>navigate('/', { replace: true })}>
                <p>Continue shopping</p>
            </div>
      
      </motion.div>
    </motion.div>
  );
}

export default Success;
