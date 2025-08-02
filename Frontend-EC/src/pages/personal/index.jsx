import { FileUser, ShoppingBag } from 'lucide-react'
import React, { useState } from 'react'
import Personal_Info from './components/personal_info'
import Personal_Order from './components/personal_order'

function Personal() {
    const mapping = {
    'Personal Information': [<FileUser/>, <Personal_Info/>],
    'Purchased Orders': [<ShoppingBag/>, <Personal_Order/>]
  }

  const [which, setWhich] = useState('Personal Information')

  return (
    <div className='flex flex-col md:flex-row h-screen relative bg-gray-50 md:bg-none'>

      {/* Desktop Sidebar */}
      <div className="flex w-full pt-4 px-2 flex-row
                      md:flex-col md:w-1/4 lg:w-1/5 md:h-full \">
          {Object.keys(mapping).map((key) => (
            <div key={key} onClick={() => {setWhich(key)}} 
                 className={`${which===key? 'bg-blue-500 text-white':''} w-full rounded-lg flex flex-col md:flex-row items-center gap-2 px-4 py-4 cursor-pointer transition-all text-xl`}>
              {mapping[key][0]}
              <p className='font-extralight text-base'>{key}</p>
            </div>
          ))}
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-4 md:mt-0 overflow-auto bg-gray-50">
          {mapping[which][1]}
      </div>
    </div>
  )
}

export default Personal