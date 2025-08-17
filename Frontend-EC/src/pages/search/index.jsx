import React from 'react'
import List_Product from '../list_product'
import { useLocation } from 'react-router-dom'
import { useProduct } from '../../context/ProductContext'

function Search_Page() {
  // useParams return only the URL, useLocation return an object: path, state, query,...
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('query') || ''
  const result = useProduct().searchProduct(query)

  return (
    <div className='max-w-screen-xl mx-auto w-full flex flex-col gap-8 mt-4'>
        <div className=' px-4 md:px-10 lg:px-32'>
            {result.length===0? <p className='text-2xl md:text-3xl font-bold'><span className='line-through'>Sorry</span>, <span className= 'text-pink-500'>no matches were found</span>. <br/> Try a new search or use our suggestions.</p>
            : <p className='text-3xl'>Results for <span className="font-bold text-pink-500">{query}</span></p>}
        </div>

        <List_Product isSearchPage={true} result={result}/>
    </div>
  )
}

export default Search_Page