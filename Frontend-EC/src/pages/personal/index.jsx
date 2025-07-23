import { FileUser, ShoppingBag } from 'lucide-react'
import React, { useState } from 'react'
import Personal_Info from './components/personal_info'

const Personal_Index = ({name}) => {
  const mapping = {
    'Personal Information': <FileUser/>,
    'Purchased Orders': <ShoppingBag/>
  }

  return (  
    <div className='flex items-center gap-2'>
        {mapping[name]}
        <p className='font-light'>{name}</p>
    </div>
  )
}

function Personal() {
  return (
    <div className='flex px-32 py-16'>
      <div className='w-[40%] flex flex-col gap-2'>
        <Personal_Index name={"Personal Information"}/>
        <Personal_Index name={"Purchased Orders"}/>
      </div>

      <Personal_Info/>
    </div>
  )
}

export default Personal