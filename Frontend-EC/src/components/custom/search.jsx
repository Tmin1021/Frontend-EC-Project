import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductProvider, useProduct } from "../../context/ProductContext";
import { Search, Flower, Flower2, ExternalLink } from "lucide-react";

function Search_Item({product, isSelected ,closeSearch}) {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)

    return (
        <div className={`flex items-center gap-2 px-1 ${isSelected? 'bg-gray-100 shadow-lg':''}`} onClick={()=> {closeSearch(); navigate(`/product/${product.product_id}`)}} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
            {isHover||isSelected? <Flower2 className='w-4 h-4 text-pink-500'/> : <Flower className='w-4 h-4 text-pink-300'/>}
            <p className={`py-1 font-light hover:font-semibold ${isSelected? 'font-semibold':""}`}>{product.name}</p>
        </div>
    )
}

function Search_Link({name="Demo"}) {
    const navigate = useNavigate()

    const mapping = {
        "Demo": '/product'
    }

    return (
        <div className='flex items-center gap-2 px-1' onClick={()=>navigate(mapping[name])}>
            <ExternalLink className='w-4 h-4'/>
            <p className='font-light hover:font-semibold transition-all'>{name}</p>
        </div>
    )
}

function Search_Result({closeSearch}) {
    const {searchProduct, searchPrediction} = useProduct()
    const [input, setInput] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const searchResults = searchProduct(input)
    const prediction = searchPrediction(input)
    const navigate = useNavigate()
    
    const onHandleInput = (e)=>{
        const value = e.target.value
        setInput(value);
    }

    useEffect(() => {
      {/* handle scrolling */}
      document.body.style.overflow = 'auto';

      return () => {
          document.body.style.overflow = 'auto'; 
      };
  }, []);

  useEffect(()=>{
      {/* handle naviagtion keys */}
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            setSelectedIndex(selectedIndex>0? selectedIndex-1:Math.min(searchResults.length-1, 3))
        }
        else if (e.key === 'ArrowDown') {
            setSelectedIndex(selectedIndex>Math.min(2, searchResults.length-1) ? 0:selectedIndex+1)
        }
        else if (e.key === 'Enter' && selectedIndex!==-1) {
            navigate(`/product/${searchResults[selectedIndex].product_id}`)
            closeSearch()
        }
        else if (e.key === 'Enter') {
            navigate(`/search?query=${encodeURIComponent(input)}`)
            closeSearch()
        }
        else if (e.key === 'ArrowRight') {
            setInput(prediction ? input+prediction:input)
        }
      }
      document.addEventListener('keydown', handleKeyDown)
    
    // since useState won't affect the useEffect in this component, if leave the dependencies array empty here, the listener will capture only first initialized value of selectedIndex,...
    return () => document.removeEventListener('keydown', handleKeyDown);
}, [searchResults, selectedIndex]);

    return (
        <div className="absolute top-15 left-94 w-[40%] px-3 flex flex-col gap-2 z-152">
            {/* Input field */}
            <div className='flex gap-2 w-full items-center'>
                <Search className='w-6 h-6 text-gray-500' />

                <div className='relative min-w-[200px]'>
                    <div className='text-2xl font-medium text-gray-400 dark:text-white'>
                        {input===""? "Search Hoa..." : <p>{input}<b>{prediction}</b></p>}
                    </div>

                    <input 
                            type="text" 
                            placeholder="Search Hoa..." 
                            value={input}
                            onChange={onHandleInput}
                            className="absolute inset-0 bg-transparent flex-1 px-3 py-2 text-2xl text-transparent font-medium focus:outline-none"
                            />
                </div>
            </div>

            {/* Result */}
            <div>
                <p>Quick Links</p>
                <Search_Link/>
                <div className='flex flex-col gap-2'>
                    {searchResults.map((product, i) => (
                        <Search_Item key={i} product={product} isSelected={i===selectedIndex} closeSearch={closeSearch}/>
                    ))}
                </div>
            </div>

        </div>
    )
}

function Search_Space({isSearch, closeSearch}) {

  return (
    <AnimatePresence>
        {isSearch && 
        <motion.div>
            {/* Blur layer */}
            <motion.div className='fixed top-12 left-0 w-full h-full bg-black/10 backdrop-blur-sm z-150 flex items-center justify-center' 
                        onMouseEnter={closeSearch}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
            ></motion.div>
            {/* White/Black layer */}
            <motion.div className='fixed top-12 left-0 w-full h-[300px] bg-white dark:bg-black z-151 flex items-center justify-center'
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.5 }}>
            </motion.div>
            {/* Search */}
            <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}>
                <ProductProvider>
                    <Search_Result closeSearch={closeSearch}/>
                </ProductProvider>
            </motion.div>
           
        </motion.div>}
    </AnimatePresence>
  )
}

export default Search_Space