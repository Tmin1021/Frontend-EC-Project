import React, {useState } from 'react'
import { useProduct } from '../../../context/ProductContext';

const filter_types = {
  "Flower Type": ["Anemones", "Dried Flowers", "Hydrangeas", "Lilies", "Orchids", "Peonies", "Ranunculus", "Roses", "Succulents", "Sunflowers", "Tropical"],
  "Occassions": ["Birthday", "Sympathy", "Just Because", "Anniversary", "Housewarming", "Get Well", "Congrats", "I'm sorry", "New Baby", "Thank you", "Party Boxes"],
  "Colors": ["Pink Flowers", "Red Flowers", "White Flowers", "Yellow Flowers"],
  "Sort": ["Best Sellers", "Featured", "Price: Low to High", "Price: High to Low", "First Available"]
}

function Filter_Option({type}) {
  const {filterProduct} = useProduct()

  return (
    <div className='absolute top-4 left-0 w-[120px] h-[100px] bg-amber-300 overflow-y-auto no-scrollbar'>
      {filter_types[type].map((option) => (
        <div key={option} onClick={() => filterProduct({type: type, value: option})}>
          <p>{option}</p>
        </div>
      ))}
    </div>
  )
}

function Filter({name, isOpenFilter, onHandleClick}) {

  return (
    <div className='relative border-4' onClick={onHandleClick}>
      <p>{name}</p>
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
    <div className='flex'>
        <p>FILTER BY</p>
        <Filter name={"Flower Type"} isOpenFilter={isOpenFilter[0]} onHandleClick={() => handleClick(0)}/>
        <Filter name={"Occassions"} isOpenFilter={isOpenFilter[1]} onHandleClick={() => handleClick(1)}/>
        <Filter name={"Colors"} isOpenFilter={isOpenFilter[2]} onHandleClick={() => handleClick(2)}/>

        <p>SORT</p>
        <Filter name={"Sort"} isOpenFilter={isOpenFilter[3]} onHandleClick={() => handleClick(3)}/>
    </div>
  )
}

export default List_Filter