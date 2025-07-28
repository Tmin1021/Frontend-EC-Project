import React from 'react'
import { useAdmin } from '../../context/AdminContext'
import { Universal_Admin_Item } from './admin_inventory'

function Admin_User() {
  const {currentUser} = useAdmin()

  return (
    <div className='flex flex-col gap-4 overflow-y-auto px-4 md:px-10 lg:px-32'>
      <h1 className='font-extrabold'>User</h1>
      <Universal_Admin_Item key={-1} which={'users'} header={1}/>
      {currentUser.map((info) => (
        <Universal_Admin_Item key={info.user_id} which={'users'} info={info} header={0}/>
      ))}
    </div>
  )
}

export default Admin_User