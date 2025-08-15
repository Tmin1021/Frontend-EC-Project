import React, { useState } from 'react'

function Product_Description({description}) {
  //const [isViewMore, setIsViewMore] = useState(false)

  return (
    <div className="flex flex-col">
        <p className="mx-auto text-sm font-light">{description}</p>
        {/*
        <div className={`w-fit mx-auto font-semibold text-blue-500 p-1 cursor-pointer rounded-sm hover:text-white hover:bg-blue-500/60 hover:shadow-lg hover:shadow-gray-300 transition-all
                      ${isViewMore? "line-clamp-none" : "line-clamp-3"}`}
            onClick={()=>setIsViewMore(!isViewMore)}>
            {isViewMore ? "View less" : "View more"}
        </div> */}
    </div>

    )
}

export default Product_Description