import React, {useState, useEffect, useRef } from 'react'
import { useProduct } from '../../../context/ProductContext';
import { Check, ChevronDown } from 'lucide-react';

const filter_types = {
  "Flower Type": ["Anemones", "Dried Flowers", "Hydrangeas", "Lilies", "Orchids", "Peonies", "Ranunculus", "Roses", "Succulents", "Sunflowers", "Tropical"],
  "Occassions": ["Birthday", "Sympathy", "Just Because", "Anniversary", "Housewarming", "Get Well", "Congrats", "I'm sorry", "New Baby", "Thank you", "Party Boxes"],
  "Colors": ["Pink Flowers", "Red Flowers", "White Flowers", "Yellow Flowers"],
  "Sort": ["Best Sellers", "Featured", "Price: Low to High", "Price: High to Low", "First Available"]
}

function Filter_Option({type, whichOption, onHandleClick}) {

  return (
    <div className='absolute top-10 right-0 translate-x-1/4 w-[150px] h-[125px] py-2 px-4 rounded-lg overflow-y-auto no-scrollbar bg-white shadow-sm'>
      {filter_types[type].map((option, index) => (
        <div key={option} className='flex items-center justify-between' onClick={() => onHandleClick(type, option, index)}>
          <p className='text-sm font-light py-2'>{option}</p>
          {whichOption[index] && <Check/> }
        </div>
      ))}
    </div>
  )
}

function Filter({name, isOpenFilter, onHandleClick}) {
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
    <div className='relative ' >
      <div className='flex gap-4 border-1 py-1 px-2' onClick={onHandleClick}>
        <p className='font-extralight'>{name}</p>
        <ChevronDown className={`transition-transform duration-500 ${isOpenFilter ? 'rotate-[-180deg]' : ''}`}/>
      </div>

      {isOpenFilter && (
        <div onClick={(e) => e.stopPropagation()}>
          <Filter_Option type={name} whichOption={whichOption} onHandleClick={handleOption} />
        </div>
      )}
    </div>
  )
}

function List_Filter() {
  const [isOpenFilter, setIsOpenFilter] = useState(Array(4).fill(false))

  const handleClick = (index) => {
    const current_index = !isOpenFilter[index]
    const newIsOpenFilter = Array(4).fill(false)
    newIsOpenFilter[index] = current_index

    setIsOpenFilter(newIsOpenFilter)
  }


  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <p className='font-semibold'>FILTER BY</p>
        <Filter name={"Flower Type"} isOpenFilter={isOpenFilter[0]} onHandleClick={() => handleClick(0)}/>
        <Filter name={"Occassions"} isOpenFilter={isOpenFilter[1]} onHandleClick={() => handleClick(1)}/>
        <Filter name={"Colors"} isOpenFilter={isOpenFilter[2]} onHandleClick={() => handleClick(2)}/>
      </div>

      <div className='flex items-center gap-4'>
          <p className='font-semibold'>SORT</p>
          <Filter name={"Sort"} isOpenFilter={isOpenFilter[3]} onHandleClick={() => handleClick(3)}/>
      </div>
    </div>
  )
}

export default List_Filter