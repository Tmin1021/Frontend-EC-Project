import React from 'react'
import { useAdmin } from '../../context/AdminContext'
import { Admin_Universal_Page } from './admin_universal'

function Admin_User() {

  return (
    <Admin_Universal_Page name={'User'}/>
  )
}

export default Admin_User