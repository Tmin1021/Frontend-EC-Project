import React, { useState } from 'react'
import { comments, users } from '../../../data/dummy'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

// find return the first matching or undefined, while filter return an array
function Comment_Item({comment}) {
  return (
    <div className='flex flex-col gap-4 w-full min-w-[340px] h-[350px] p-4 rounded-lg bg-white shadow-sm hover:shadow-2xl transition-all'>
        <div className="flex justify-between">
            <p className='font-bold'>{comment.title}</p>
            <p>{comment.date}</p>
        </div>

        <div className="flex justify-between">
            <div className='flex'>
              {Array.from({length: comment.star}).map((_,i) => (
                <Star key={i} fill="currentColor" className="text-yellow-500" />
              ))}
              {Array.from({length: 5-comment.star}).map((_, i) => (
                <Star key={i} className="text-yellow-500" />
              ))}
            </div>
            <p>{users.find(user => user.user_id === comment.user_id)?.name}</p>
        </div>
        
        {comment.image[0] ? 
        <div className='relative w-full aspect-square overflow-hidden'>
          <img src={comment.image[0]} className='w-full h-full object-cover'/> 
          <div className='absolute top-0 left-0 w-full h-full flex items-center opacity-0 hover:opacity-100 hover:bg-black/40 hover:backdrop-blur-xs transition-all'>
            <p className="text-white mx-auto px-2"> {comment.content}</p>
          </div>
        </div> : <p> {comment.content}</p>}

    </div>
  )
}

function Product_Rating({comments}) {
  const average_rating = comments.length > 0
  ? comments.reduce((acc, curr) => acc + curr.star, 0) / comments.length
  : 0;

  return (
    <div className='flex items-end justify-between py-2'>
      <div className='flex items-end gap-2'>
        <p className='font-extrabold text-6xl'>{average_rating}</p>
        <p className='font-bold'>out of 5</p>
      </div>

      <p>{comments.length} Ratings</p>

      <div className='flex flex-col gap-1'>
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
      </div>
    </div>
  )
}


function Product_Comment({product_id}) {
  const [index, setIndex] = useState(0)
  const this_product_comments = comments //comments.filter((comment) => comment.product_id == product_id)

  return (
    <div>
        <p className='font-bold text-2xl'>Ratings & Reviews</p>
        <Product_Rating comments={this_product_comments}/>
        
        <div className='flex items-center justify-between'>
          <div onClick={()=>setIndex(Math.max(index-1,0))}><ChevronLeft className="w-10 h-10"/></div>
          <div className='w-full overflow-hidden'>
            <div className="flex gap-6 py-5 px-1 duration-500 ease-in-out" style={{ transform: `translateX(-${index*1.8/this_product_comments.length * 100}%)` }}>
                {this_product_comments.map((comment) => (
                    <Comment_Item key={comment.user_id} comment={comment}/>
                ))}
            </div>
          </div>
          <div onClick={()=>setIndex(Math.min(index+1,this_product_comments.length-2))}><ChevronRight className="w-10 h-10"/></div>
        </div>
    </div>

  )
}

export default Product_Comment