import List_Filter from './components/list_filter'
import List_View from './components/list_view'
import { useProduct } from '../../context/ProductContext'
import Pagination from '../../components/custom/pagination'

function List_Product() {
  const {search, isSearchPage, pagination, handlePageChange } = useProduct()
  
  return (
      <div className='max-w-screen-xl mx-auto h-[calc(100vh-80px)] w-full overflow-y-auto no-scrollbar mb-8 pb-8'>
        {(isSearchPage) &&
        <div className=' px-4 md:px-10 lg:px-32 my-4'>
          <p className='text-3xl'>Results for <span className="font-bold text-pink-500">{search}</span></p>
        </div>}

          <div className='flex flex-col gap-4 px-4 md:px-10 lg:px-32 mt-4'>
              <List_Filter/>
              <List_View/>
              <Pagination pagination={pagination} handlePageChange={handlePageChange}/>
          </div> 
      </div>
  )
}

export default List_Product

/*
        {(isSearchPage) &&
        <div className=' px-4 md:px-10 lg:px-32 my-4'>
          {products.length===0? <p className='text-2xl md:text-3xl font-bold'><span className='line-through'>Sorry</span>, <span className= 'text-pink-500'>no matches were found</span>. <br/> Try a new search or use our suggestions.</p>
          : <p className='text-3xl'>Results for <span className="font-bold text-pink-500">{search}</span></p>}
        </div>
        }
*/