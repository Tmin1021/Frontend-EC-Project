import { FileUser, LogOut, ShoppingBag } from 'lucide-react'
import React, { useState } from 'react'
import Personal_Info from './components/personal_info'
import Personal_Order from './components/personal_order'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

function Personal({page}) {
  const mapping = {
    'Information': [<FileUser/>, <Personal_Info/>],
    'Orders': [<ShoppingBag/>, <Personal_Order/>]
  }

  //const whichPage = page
  const {logout} = useAuth()
  const navigate = useNavigate()

  //if(!isAuthenticated || user.role!='user') navigate('/login')

  return (
    <div className='flex flex-col md:flex-row h-screen relative bg-gray-100 p-2 md:p-4 lg:p-8 md:gap-4 lg:gap-8'>

      {/* Sidebar */}
      <div className="flex flex-row justify-center items-center px-2 rounded-4xl w-fit mx-auto 
                      md:py-2 md:ml-4 md:flex-col md:w-1/4 lg:w-1/5 md:rounded-lg md:h-fit md:justify-start bg-white shadow-gray-100 shadow-lg border-1 border-gray-100 hover:shadow-gray-200 transition-all">
          {Object.keys(mapping).map((key) => (
            <div key={key} onClick={() => key==="Information" ? navigate('/personal') : navigate(`/personal/order`)} 
                 className={`${page===key? 'bg-purple-100 text-purple-600 font-semibold shadow-lg py-3':'py-2'} rounded-full md:rounded-sm text-base font-extralight md:w-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 px-4 backdrop-blur-xs cursor-pointer transition-all`}>
              {mapping[key][0]}<span className='hidden md:inline'>{key}</span></div>
          ))}

          <div className='flex items-center gap-2 md:w-full px-4 text-red-500 mt-4 h-full mb-4  cursor-pointer' onClick={()=>logout(navigate)}>
            <LogOut/>
            <p className='hidden md:inline'>Sign Out</p>
          </div>
      </div>

      {/* Content */}
      <div className="flex-1 mt-4 md:mt-0 overflow-auto bg-gray-100">{mapping[page][1]}</div>

    </div>
  )
}

export default Personal