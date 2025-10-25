import React from 'react'

export function SkeletonOrderPreview() {
  return (
    <div className='flex flex-col gap-2 p-2 md:p-4 bg-white shadow-sm rounded-sm animate-pulse'>
      
      {/* Preview Item */}
      <div className='h-[100px] w-full md:h-[120px] flex gap-4'>
        {/* Image Placeholder */}
        <div className='h-full aspect-square bg-gray-300 rounded-sm'></div>

        {/* Info Placeholder */}
        <div className='flex flex-col justify-between w-full'>
          <div className='w-full flex justify-between'>
            {/* Name */}
            <div className='h-5 w-3/4 bg-gray-300 rounded mb-2'></div>
            {/* Status */}
            <div className='h-5 w-20 bg-gray-300 rounded'></div>
          </div>

          {/* Quantity and Price */}
          <div className='flex gap-2 items-center mt-2'>
            <div className='h-4 w-24 bg-gray-300 rounded'></div>
            <div className='h-4 w-4 bg-gray-300 rounded'></div>
            <div className='h-4 w-24 bg-gray-300 rounded'></div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full" style={{ borderBottom: '0.5px solid #e0e0e0' }} />

      {/* Detail Button */}
      <div className='h-5 w-24 mx-auto bg-gray-300 rounded mt-2'></div>
    </div>
  )
}

// for flower detail page
export function SkeletonDetailLoader() {
  return (
    <div className="flex flex-col gap-4 max-w-screen-xl mx-auto px-4 md:px-10 lg:px-32 mt-4 animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg w-full md:w-1/2 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="p-4 border rounded-lg bg-gray-200 h-48"></div>
        ))}
      </div>
    </div>
  )
}

// for all flower result
function SkeletonLoader({length=12}) {

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 p-4">
        {Array.from({ length: length }).map((_, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 animate-pulse bg-white"
          >
            {/* Image placeholder */}
            <div className="h-40 w-full bg-gray-300 rounded-md mb-4"></div>

            {/* Title placeholder */}
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>

            {/* Subtitle/Price placeholder */}
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
}

export default SkeletonLoader