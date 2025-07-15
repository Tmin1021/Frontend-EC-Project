import React from 'react'
import { comments } from '../../../data/dummy'

function Comment_Item({comment}) {
  return (
    <div>
        <div className="flex">
            <p>{comment.title}</p>
            <p>{comment.date}</p>
        </div>

        <div className="flex">
            <p>Stars</p>
            <p>{comment.user_id}</p>
        </div>

        <p>
            {comment.content}
        </p>
    </div>
  )
}

function Product_Comment({product_id}) {

  return (
    <div className='bg-blue-300'>
        <p className='text-amber-300'>Ratings & Reviews</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {comments.filter((comment) => comment.product_id == product_id).map((comment) => (
                <Comment_Item comment={comment}/>
            ))}
        </div>
    </div>

  )
}

export default Product_Comment