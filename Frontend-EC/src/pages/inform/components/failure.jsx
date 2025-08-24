import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Clover, Leaf, Shrub } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Failure() {
  const navigate = useNavigate()
    
  return (
    <motion.div
      className="h-screen w-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(270deg, #ff4e50, #ff6a5c, #ff0000, #b30000)",
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
            <div className='cursor-pointer flex items-center gap-4 text-white/60 text-xl md:text-4xl font-bold px-6 py-3 rounded-2xl shadow-lg bg-white/20 backdrop-blur-2xl hover:bg-white/40 hover:text-white/90 hoer:shadow-xl transition-all'
                 onClick={()=>navigate('/')}>
                Order is not successful. Please try again
            </div>
      
      </motion.div>
    </motion.div>
  );
}

export default Failure;
