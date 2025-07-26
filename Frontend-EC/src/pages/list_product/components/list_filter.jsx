import React, {useState, useEffect, useRef } from 'react'
import { useProduct } from '../../../context/ProductContext';
import { Check, ChevronDown, Funnel, Plus, Minus, ArrowUpDown } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from 'react-dom';

const filter_types = {
  "Flower Type": ["Anemones", "Dried Flowers", "Hydrangeas", "Lilies", "Orchids", "Peonies", "Ranunculus", "Roses", "Succulents", "Sunflowers", "Tropical"],
  "Occassions": ["Birthday", "Sympathy", "Just Because", "Anniversary", "Housewarming", "Get Well", "Congrats", "I'm sorry", "New Baby", "Thank you", "Party Boxes"],
  "Colors": ["Pink Flowers", "Red Flowers", "White Flowers", "Yellow Flowers"],
  "Sort": ["Best Sellers", "Featured", "Price: Low to High", "Price: High to Low", "First Available"]
}

function Filter_Option({type, whichOption, onHandleClick}) {

  return (
    <div className={`${type==="Sort"? 'flex flex-col gap-0 absolute right-0 w-[150px] h-[125px] py-2 px-4 overflow-auto rounded-lg bg-white shadow-sm' : 'grid grid-cols-2 gap-2 h-full'} 
                    md:flex md:flex-col md:gap-0 md:absolute md:right-0 md:translate-x-1/4 md:w-[150px] md:h-[125px] md:py-2 md:px-4 md:overflow-auto no-scrollbar md:rounded-lg md:bg-white md:shadow-sm`}>
      {filter_types[type].map((option, index) => (
        <div key={option} className={`${type==='Sort'? '': (whichOption[index]? 'border-3 border-green-700' : 'border-1 border-gray-200')} md:border-0 md:w-full flex items-center justify-between`} onClick={() => onHandleClick(type, option, index)}>
          <p className={`${whichOption[index]? 'font-semibold':'font-light'} text-sm md:font-light py-2 mx-auto md:mx-0`}>{option}</p>
          <div className='hidden md:flex'>
            {whichOption[index] && <Check/> }
          </div>
        </div>
      ))}
    </div>
  )
}

export function Filter({name='Sort', isOpenFilter=false, onHandleClick=()=>{}}) {
  const [whichOption, setWhichOption] = useState(Array(filter_types[name].length).fill(false))
  const {filterProduct} = useProduct()

  const handleOption = (type, value, index) => {
    const newWhichOption = whichOption.slice()
    newWhichOption[index] = !newWhichOption[index]
    
    filterProduct({type: type, value: value, isChosen: newWhichOption[index]})
    setWhichOption(newWhichOption)
}

  // click Filter_Option will propagate that click to the parent --> trigger onHandleClick --> had better to separate or stopPropagation
  return (
    <div className=' md:relative' >
      {/* Title */}
      <div className='w-full flex items-center justify-between 
                      md:border-1 md:py-1 md:px-2' onClick={onHandleClick}>

        <ArrowUpDown className={`${name==='Sort'? '': 'hidden'} md-hidden`}/>
        <p className={`${name==='Sort'? 'hidden':''} font-extralight`}>{name}</p>
        <ChevronDown className={`transition-transform duration-500 ${isOpenFilter ? 'rotate-[-180deg]' : ''} hidden md:flex`}/>
        <div className={`${name==='Sort'? 'opacity-0 w-1 h-1':''} md:hidden`}>{isOpenFilter? <Minus/> : <Plus/>}</div>

      </div>

      {/* Dropdown box */}
      <AnimatePresence>
        {isOpenFilter && (
        <motion.div  initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }} 
              onClick={(e) => e.stopPropagation()}>
            <Filter_Option type={name} whichOption={whichOption} onHandleClick={handleOption} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

function List_Filter() {
  const [isOpenFilters, setIsOpenFilters] = useState(Array(4).fill(false))
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (index) => {
    const current_index = !isOpenFilters[index]
    const newIsOpenFilters = Array(4).fill(false)
    newIsOpenFilters[index] = current_index

    setIsOpenFilters(newIsOpenFilters)
  }

  return (
    <div className='w-full flex items-center justify-between'>
      {/* Filter */}
      <div >
        <div className='flex gap-1 items-center md:hidden' onClick={()=>setIsOpen(true)}>
          <Funnel/>
          <p className='font-semibold'>FILTER BY</p>
        </div>
        {/* Mobile */}
        <List_Filter_Mobile isOpen={isOpen} closeFilter={()=>setIsOpen(false)}>
          <p className='font-semibold'>FILTER BY</p>
          <Filter name={"Flower Type"} isOpenFilter={isOpenFilters[0]} onHandleClick={() => handleClick(0)}/>
          <Filter name={"Occassions"} isOpenFilter={isOpenFilters[1]} onHandleClick={() => handleClick(1)}/>
          <Filter name={"Colors"} isOpenFilter={isOpenFilters[2]} onHandleClick={() => handleClick(2)}/>
        </List_Filter_Mobile>

        {/* Desktop */}
        <div className='hidden md:bg-transparent md:relative md:w-full md:flex md:flex-row md:items-center md:gap-2 lg:gap-4'>
          <p className='font-semibold'>FILTER BY</p>
          <Filter name={"Flower Type"} isOpenFilter={isOpenFilters[0]} onHandleClick={() => handleClick(0)}/>
          <Filter name={"Occassions"} isOpenFilter={isOpenFilters[1]} onHandleClick={() => handleClick(1)}/>
          <Filter name={"Colors"} isOpenFilter={isOpenFilters[2]} onHandleClick={() => handleClick(2)}/>
        </div>
      </div>

      {/* Sort */}
      <div className='flex items-center gap-1 md:gap-2 lg:gap-4'>
          <p className='font-semibold'>SORT</p>
          <Filter name={"Sort"} isOpenFilter={isOpenFilters[3]} onHandleClick={() => handleClick(3)}/>
      </div>
    </div>
  )
}

export default List_Filter

function List_Filter_Mobile({children, isOpen, closeFilter}) {

    // handle scrolling 
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  
    return () => {
      document.body.style.overflow = 'auto'; 
      };
    }, []);
  
  return createPortal(
    <AnimatePresence>
      {isOpen &&  
      <motion.div className="md:hidden fixed inset-0 z-50 flex justify-end">
          {/* Blur background */}
          <motion.div initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                      onClick={closeFilter}/>

          {/* Slide-in white panel*/}
          <motion.div initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'tween' }}
                      className="relative w-3/4 bg-white h-full shadow-lg p-4 flex flex-col overflow-auto gap-2">{children}</motion.div>
      </motion.div>}
    </AnimatePresence>,
    document.body
  )
}