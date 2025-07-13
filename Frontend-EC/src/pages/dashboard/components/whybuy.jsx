import React from 'react'

function CardItem() {
    return (
        <div className='w-[400px] h-[300px] rounded-3xl bg-white'>
        </div>
    )
}

const Whybuy = () => {
  return (
    <div>
        <h1 className='font-extrabold text-9xl pt-40 pb-20'>Why Hoa is the best <br/> place to buy flower.</h1>            
          <div className="overflow-x-auto no-scrollbar">
              <div className='flex gap-10'>
                  {Array.from({length: 5}).map((_, i) => (
                      <div key={i} > 
                          <CardItem/>
                      </div>
                  ))
                  }
              </div>
          </div>
    </div>
  )
}

export default Whybuy