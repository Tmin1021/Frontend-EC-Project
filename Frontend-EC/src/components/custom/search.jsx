import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductProvider, useProduct } from "../../context/ProductContext";
import { Search, Flower, Flower2, ExternalLink, X } from "lucide-react";

function Search_Item({product, isSelected, closeSearch}) {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)

    return (
        <div className={`flex items-center gap-2 px-1 ${isSelected? 'bg-gray-100 shadow-lg':''}`} onClick={()=> {closeSearch(); navigate(`/product/${product.product_id}`)}} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
            {isHover||isSelected? <Flower2 className='w-4 h-4 text-pink-500'/> : <Flower className='w-4 h-4 text-pink-300'/>}
            <p className={`py-1 font-light md:text-sm text-lg hover:font-semibold ${isSelected? 'font-semibold':""}`}>{product.name}</p>
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

function Search_Inner({closeSearch}) {
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

    // handle scrolling 
    useEffect(() => {
      document.body.style.overflow = 'hidden';

      return () => {
          document.body.style.overflow = 'auto'; 
      };
  }, []);

    // handle naviagtion keys
    useEffect(()=>{

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
        <div className="flex flex-col gap-8 px-4 md:px-10 lg:px-32">
            {/* Input field */}
            <div className='flex gap-2 w-full items-center'>
                <Search className='w-8 h-8 text-gray-500' />

                <div className='relative min-w-[200px]'>
                    <div className='text-3xl md:text-2xl font-medium text-gray-500 dark:text-white'>
                        {input===""? "Search Hoa" : <p>{input}<b>{prediction}</b></p>}
                    </div>

                    <input 
                            type="text" 
                            placeholder="Search Hoa" 
                            value={input}
                            onChange={onHandleInput}
                            className="absolute inset-0 bg-transparent flex-1 px-3 py-2 text-2xl text-transparent font-medium focus:outline-none"
                            />
                </div>
            </div>

            {/* Result */}
            <div>
                <div className='flex flex-col gap-2'>
                    {searchResults.map((product, i) => (
                        <Search_Item key={i} product={product} isSelected={i===selectedIndex} closeSearch={closeSearch}/>
                    ))}
                </div>
            </div>

        </div>
    )
}

export function Search_Space({isSearch, closeSearch}) {

    return (
        <AnimatePresence>
            {isSearch && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-0 md:top-14 w-full h-screen bg-white dark:bg-black md:bg-black/10 md:backdrop-blur-sm z-50">

                    <div className='md:flex relative w-full bg-white dark:bg-black h-[250px] flex-col gap-2 px-4 py-2'>
                        <div className='md:hidden relative w-full pb-8'>
                            <div className='absolute right-0' onClick={closeSearch}><X className='w-8 h-8' /></div>
                        </div>

                        <ProductProvider>
                            <Search_Inner closeSearch={closeSearch}/>
                        </ProductProvider>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Search_Space