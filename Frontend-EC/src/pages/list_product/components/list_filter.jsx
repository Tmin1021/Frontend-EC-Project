import React, {useState } from 'react'
import { useProduct } from '../../../context/ProductContext';
import { ChevronDown } from 'lucide-react';

const filter_types = {
  "Flower Type": ["Anemones", "Dried Flowers", "Hydrangeas", "Lilies", "Orchids", "Peonies", "Ranunculus", "Roses", "Succulents", "Sunflowers", "Tropical"],
  "Occassions": ["Birthday", "Sympathy", "Just Because", "Anniversary", "Housewarming", "Get Well", "Congrats", "I'm sorry", "New Baby", "Thank you", "Party Boxes"],
  "Colors": ["Pink Flowers", "Red Flowers", "White Flowers", "Yellow Flowers"],
  "Sort": ["Best Sellers", "Featured", "Price: Low to High", "Price: High to Low", "First Available"]
}

function Filter_Option({type}) {
  const {filterProduct} = useProduct()

  return (
    <div className='absolute top-10 right-0 w-[140px] h-[130px] py-2 px-4 rounded-lg overflow-y-auto no-scrollbar dark:bg-white dark:text-black'>
      {filter_types[type].map((option) => (
        <div key={option} onClick={() => filterProduct({type: type, value: option})}>
          <p className='text-sm font-light'>{option}</p>
        </div>
      ))}
    </div>
  )
}

function Filter({name, isOpenFilter, onHandleClick}) {

  return (
    <div className='relative flex gap-4 border-1 py-1 px-2' onClick={onHandleClick}>
      <p className='font-extralight'>{name}</p>
      <ChevronDown className={`transition-transform duration-500 ${isOpenFilter ? 'rotate-[-180deg]' : ''}`}/>
      {isOpenFilter && <Filter_Option type={name}/>}
    </div>
  )
}

function List_Filter() {
  const [isOpenFilter, setIsOpenFilter] = useState(Array(3).fill(false))

  const handleClick = (index) => {
    const newIsOpenFilter = Array(4).fill(false)
    newIsOpenFilter[index] = true
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