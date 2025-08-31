import React, { useEffect, useState } from 'react'
import { Send, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useProductDetail } from '../../../context/ProductDetailContext'
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'sonner'
import BEApi from '../../../../service/BEApi'

function Comment_Item({comment}) {
  return (
    <div className='flex flex-col gap-4 w-full p-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-xl hover:bg-gray-200 transition-all'>
        {/* title */}
        <div className="flex justify-between">
            <p className='text-md font-semibold'>{comment.user.name}</p>
            <p className='text-gray-400'>{comment.createdAt.slice(0,10)}</p>
        </div>

        {/* rating */}
        <div className='flex'>
          {Array.from({length: comment.star}).map((_,i) => (
            <Star key={i} fill="currentColor" className="text-yellow-500" />
          ))}
          {Array.from({length: 5-comment.star}).map((_, i) => (
            <Star key={i} className="text-yellow-500" />
          ))}
        </div>

        {/* content */}
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
  const {isAuthenticated, user, handleGetFresh} = useAuth()
  const [commentContent, setCommentContent] = useState('')
  const [whichStar, setWhichStar] = useState(4)
  const {product} = useProductDetail()

  const handleCommit = async () => {
    const data = {
        user_id: user.id,
        product_id: product._id,
        content: commentContent,
        star: whichStar+1,
    }
    BEApi.CommentApi.create(data).then(resp=> {
      // refresh 
      setCommentContent('')
      setWhichStar(4)
      toast.success('Thank for your sharing.')
      setTimeout(()=>{
        handleGetFresh()
      }, 200)
    }, () => {
      toast.error('Error. Please try again.')
    }) 
  }

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
    <div className='my-4 flex flex-col gap-4'>
        <p className='font-bold text-2xl'>Ratings & Reviews</p>
        {/* Rating */}
        <Product_Rating comments={comments}/>

        {/* Comment input & rating */}
        {isAuthenticated && 
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex w-[140px]'>
            {Array.from({length: 5}).map((_, i) => (
              <Star key={i} fill={`${i<=whichStar ? 'currentColor' : 'none'}`} onClick={()=>setWhichStar(i)} className={`text-yellow-500 w-6 h-6`} />
            ))}
          </div>

          <div className='flex justify-between items-center gap-2'>
            <textarea 
              type="text" 
              placeholder={"Comment on this product..."}
              value={commentContent}
              onChange={(e)=>{setCommentContent(e.target.value)}}
              className={`w-full text-sm font-light resize-none border-1 border-gray-100 rounded-lg pl-4 py-2 shadow-sm hover:shadow-lg transtion-all focus:outline-purple-300 `}
              rows={2}/>       

            <div className='' onClick={handleCommit}>
              <Send className='text-pink-300 hover:text-pink-500 w-6 h-6'/>
            </div>        
          </div>
        </div>}
        
        {/* All comments */}
        <div className={` ${isViewMore? 'fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm':''} transition-all`} onClick={()=>setIsViewMore(false)}>
          <div className={`${isViewMore ? 'w-[90%] md:w-[60%] bg-white/80 p-4 rounded-lg max-h-[80vh] overflow-y-auto':''} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 duration-500 ease-in-out`}
               onClick={(e)=> e.stopPropagation()}>
              {comments.slice(0,visibleCount).map((comment, i) => (<Comment_Item key={i} comment={comment}/>))}
          </div>
        </div>


        <div className='w-fit mx-auto font-semibold text-blue-500 p-2 cursor-pointer rounded-sm hover:text-white hover:bg-blue-500/80 hover:shadow-lg hover:shadow-gray-300 transition-all'
             onClick={()=>setIsViewMore(!isViewMore)}>
          View more
        </div>
    </div>

  )
}

export default Product_Comment