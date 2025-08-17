import React, { useMemo, useState } from 'react'
import List_Filter from './components/list_filter'
import List_View from './components/list_view'
import { ProductProvider } from '../../context/ProductContext'
import { products } from '../../data/dummy'
import { useParams } from 'react-router-dom'

function List_Product({isSearchPage=false, result=[]}) {
  const {type} = useParams()
  const [initialOption, setInitialOption] = useState('flower')

  if (type!='flower' && type!='accessory' && !isSearchPage) return (
    <p className='text-2xl md:text-3xl font-bold px-4 md:px-8 lg:px-12'><span className='line-through'>Sorry</span>, <span className= 'text-pink-500'>no matches were found</span>.</p>
  )
  
  return (
    <ProductProvider isSearch={isSearchPage} searchResult={result.filter(item => initialOption === 'flower' ? item.type===initialOption : item.type!='flower') }>

      <div className='max-w-screen-xl mx-auto w-full'>
        {(isSearchPage&&result.length!==0) &&
        <div className='flex flex-row gap-4 px-4 md:px-10 lg:px-32'>
            <div onClick={()=>setInitialOption('flower')} className={`${'flower'===initialOption? ' bg-purple-500 shadow-gray-100 shadow-md text-white':''} cursor-pointer rounded-3xl p-2`}>Flowers</div>
            <div onClick={()=>setInitialOption('accessory')} className={`${'accessory'===initialOption? 'bg-purple-500 shadow-gray-100 shadow-md text-white':''} cursor-pointer rounded-3xl p-2`}>Accessories</div>
        </div> }

        {(!isSearchPage || (isSearchPage&&result.length!==0)) &&
          <div className='flex flex-col gap-4 px-4 md:px-10 lg:px-32 mt-4'>
              <List_Filter isFlower={initialOption==='flower'&&isSearchPage}/>
              <List_View/>
          </div> }
      </div>

    </ProductProvider>
  )
}

export default List_Product