import React, { useEffect, useState } from 'react'
import { isDummy, users } from '../../../data/dummy'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useProductDetail } from '../../../context/ProductDetailContext'


// find return the first matching or undefined, while filter return an array
function Comment_Item({comment}) {
  return (
    <div className='flex flex-col gap-4 w-full p-4 rounded-lg bg-gray-100 shadow-sm hover:shadow-xl hover:bg-gray-200 transition-all'>
        {/* title */}
        <div className="flex justify-between">
            <p className='font-bold'>{comment.title}</p>
            <p>{comment.date}</p>
        </div>

        {/* content */}
        <div className="flex justify-between">
            <div className='flex'>
              {Array.from({length: comment.star}).map((_,i) => (
                <Star key={i} fill="currentColor" className="text-yellow-500" />
              ))}
              {Array.from({length: 5-comment.star}).map((_, i) => (
                <Star key={i} className="text-yellow-500" />
              ))}
            </div>

            <p>{isDummy? users.find(user => user.user_id === comment.user_id)?.name : comment.user_id}</p>
        </div>
        
        <p className='text-sm font-light'> {comment.content}</p>

    </div>
  )
}

function Product_Rating({comments}) {
  const average_rating = comments.length > 0
  ? comments.reduce((acc, curr) => acc + curr.star, 0) / comments.length
  : 0;

  return (
    <div className='flex items-end justify-between'>
      <div className='flex items-end gap-2'>
        <p className='font-extrabold text-6xl md:text-7xl text-gray-500'>{average_rating}</p>
        <p className='font-bold text-sm text-gray-500'>out of 5</p>
      </div>

      <p className='text-sm text-gray-500 hidden md:inline'>{comments.length} Ratings</p>

      <div className='flex flex-col gap-1 items-end'>
        {Array.from({length: 5}).map((_, i) => (
          <div key={i} className='flex gap-2'>

            {/* Stars */}
            <div key ={i} className='flex w-[140px] justify-end'>
              {Array.from({length: 5-i}).map((_, i) => (
                <Star key={i} fill="currentColor" className="text-yellow-500 w-3 h-3" />
              ))}

            </div>
             {/* Bar */}
            <div className='relative h-4 w-full bg-gray-100 rounded-xs'>
              <div className='absolute top-0 left-0 h-4 bg-gray-300' style={{ width: `${comments.filter(comment => comment.star === 5-i).length * 100 / comments.length}%` }}></div>
            </div>
          </div>
        ))}
        <p className='text-sm text-gray-500 md:hidden'>{comments.length} Ratings</p>
      </div>
    </div>
  )
}


function Product_Comment() {
  const [isViewMore, setIsViewMore] = useState(false)
  const {comments} = useProductDetail()
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) { 
        setVisibleCount(6)
      } else {
        setVisibleCount(4)
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <div className='flex flex-col gap-4'>
        <p className='font-bold text-2xl'>Ratings & Reviews</p>
        <Product_Rating comments={comments}/>
        
        <div className={` ${isViewMore? 'fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm':''} transition-all`} onClick={()=>setIsViewMore(false)}>
          <div className={`${isViewMore ? 'w-[90%] md:w-[60%] bg-white/80 p-4 rounded-lg max-h-[80vh] overflow-y-auto':''} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 duration-500 ease-in-out`}
               onClick={(e)=> e.stopPropagation()}>
              {comments.slice(0,visibleCount).map((comment) => (<Comment_Item key={comment.user_id} comment={comment}/>))}
          </div>
        </div>


        <div className='w-fit mx-auto font-semibold text-blue-500 p-2 cursor-pointer rounded-sm hover:text-white hover:bg-blue-500/80 hover:shadow-lg hover:shadow-gray-300 transition-all'
             onClick={()=>setIsViewMore(!isViewMore)}>
          View more</div>
    </div>

  )
}

export default Product_Comment