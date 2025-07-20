import React from 'react'
import { users } from '../../../data/dummy'
import { Filter } from '../../list_product/components/list_filter'

const Personal_Info_Item = ({name, info}) => {

    return (
        <div className='flex gap-28 justify-between'>
            <p className='font-semibold'>{name}</p>
            <p>{info}</p>
        </div>
    )
}


function Personal_Info() {
  const user = users[0] 

  return (
    <div>
        <p>Personal Information</p>
        <Personal_Info_Item name={"Name"} info={user.name}/>
        <Personal_Info_Item name={"Mail"} info={user.mail}/> 
        <Personal_Info_Item name={"Phone"} info={user.phone}/>

        <p>Saved Order Address</p>

    </div>

  )
}

export default Personal_Info