import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductProvider, useProduct } from "../../context/ProductContext";
import { Search, Flower, X, Box } from "lucide-react";

function Search_Item({product, isSelected, closeSearch}) {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)

    return (
        <div className={`cursor-pointer flex items-center gap-2 px-1 transition-all ${isSelected? 'bg-white shadow-lg rounded-lg':''}`} onClick={()=> {closeSearch(); navigate(`/flower/${product._id}`)}} onMouseEnter={()=>setIsHover(true)} onMouseLeave={()=>setIsHover(false)}>
            <Box className={`w-4 h-4 transition-all ${isHover||isSelected ? 'text-green-600 w-5 h-5' : 'text-green-300'}`}/>
            <p className={`py-1 font-light md:text-sm text-lg hover:font-semibold transition-all ${isSelected? 'font-semibold':""}`}>{product.name}</p>
        </div>
    )
}

function Search_Inner({closeSearch}) {
    const {searchProduct, searchPrediction, products} = useProduct()
    const [input, setInput] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [searchResults, setSearchResults] = useState(products) 
    const [prediction, setPrediction] = useState('') 
    const [click, setClick] = useState(false)
    const navigate = useNavigate()
    
    const onHandleInput = (e)=>{
        const value = e.target.value
        setInput(value);
    }

    // handle scrolling
    useEffect(() => {
        //document.body.style.overflow = 'hidden';
        window.addEventListener('scroll', closeSearch);

        return () => {
            //document.body.style.overflow = 'auto'; 
            window.removeEventListener('scroll', closeSearch);
        }
    }, [])

    // handle search update
    useEffect(() => {
        // if the await function has finish and start to setState but then search is close immediately, make the react error (it cannot find the component)
        // if search is close then isMounted will false immediately
        let isMounted = true

        const fetchSearch = async () => {
            try {
                const results = await searchProduct(input)
                const pred = await searchPrediction(input)

            if (isMounted) {
                setSearchResults(results || []);
                setPrediction(pred || '');
            }
            } catch (err) {
                console.error("Search error:", err);
            }
        };

        if (input.trim()) {
            fetchSearch();
        } else {
            setSearchResults(products);
            setPrediction('');
        }

        return () => {
            isMounted = false
        }
    }, [input, searchProduct, searchPrediction])


    // handle naviagtion keys
    useEffect(()=>{

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') {
                setSelectedIndex(selectedIndex>0? selectedIndex-1:Math.min(searchResults.length-1, 5))
            }
            else if (e.key === 'ArrowDown') {
                setSelectedIndex(selectedIndex>Math.min(4, searchResults.length-1) ? 0:selectedIndex+1)
            }
            else if (e.key === 'Enter' && selectedIndex!==-1) {
                navigate(`/flower/${searchResults[selectedIndex].product_id}`)
                closeSearch()
            }
            else if (e.key === 'Enter') {
                navigate(`/search?search=${encodeURIComponent(input)}`)
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
            <div className='flex gap-2 w-full items-center' onClick={()=>setClick(true)}>
                <Search className={`w-8 h-8 ${click? 'text-gray-500' : 'text-gray-300'} transition-all`}/>

                <div className='relative min-w-[200px]'>
                    <div className={`text-3xl md:text-2xl font-medium ${click? 'text-gray-500' : 'text-gray-200'} transition-all`}>
                        {input===""? "Search Hoa" : <p>{input}<b>{prediction}</b></p>}
                    </div>

                    <input 
                            type="text" 
                            placeholder="Search Hoa" 
                            value={input}
                            onChange={onHandleInput}
                            className="absolute -inset-3 bg-transparent flex-1 px-3 py-2 text-3xl md:text-2xl text-transparent font-medium focus:outline-none"
                            />
                </div>
            </div>

            {/* Result */}
            <div>
                <div className='flex flex-col gap-2'>
                    {searchResults.slice(0, 6).map((product, i) => (
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
                    className="absolute left-0 top-0 md:top-14 w-full h-screen bg-white md:bg-black/10 md:backdrop-blur-sm z-50" onMouseOver={closeSearch}>

                    <div className='md:flex relative w-full bg-gray-50 h-0 md:h-[350px] flex-col gap-2 px-4 md:py-2' onMouseOver={(e)=>e.stopPropagation()}>
                        <div className='md:hidden relative w-full pb-8'>
                            <div className='absolute right-0 top-2' onClick={closeSearch}><X className='w-8 h-8 text-gray-400' /></div>
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