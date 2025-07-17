import React from 'react'

function Why_Item() {
    return (
        <div className='w-[400px] h-[300px] rounded-3xl bg-white'>
        </div>
    )
}

const Dashboard_Why = () => {
  return (
    <div className='flex flex-col'>
        <p className='font-semibold text-2xl pt-12 pb-6 mx-auto'>Why Hoa is the best place to buy flower.</p>            
            <div className='flex gap-10'>
                {Array.from({length: 5}).map((_, i) => (
                    <div key={i} ><Why_Item/></div>
                ))}
          </div>
    </div>
  )
}

export default Dashboard_Why