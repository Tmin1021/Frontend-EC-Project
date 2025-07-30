import React, {useState} from 'react'
import { users } from '../../../data/dummy'
import { Filter } from '../../list_product/components/list_filter'
import { ChevronDown } from 'lucide-react'


const Personal_Info_Item = ({name, info}) => {

    return (
        <div className='flex gap-56 justify-between'>
            <p className='font-semibold text-lg'>{name}</p>
            <p className='text-lg'>{info}</p>
        </div>
    )
}


function Personal_Info() {
  const user = users[0] 
  const [whichInfo, setWhichInfo] = useState(["", "", ""])

  return (
    <div className='flex flex-col gap-16'>
      {/* Name, email,... */}
      <div>
        <p className='text-2xl pb-4'>Personal Information</p>
        <Personal_Info_Item name={"Name"} info={user.name}/>
        <Personal_Info_Item name={"Mail"} info={user.mail}/> 
        <Personal_Info_Item name={"Phone"} info={user.phone}/>
      </div>

      {/* Address */}
      <div className='flex flex-col gap-4'>
        <p className='text-2xl'>Saved Order Address</p>

        {/* House number, street... */}
        <div className='flex flex-col'>
          <p>Address</p>
          <input type='text' placeholder='Address, Street...' value={whichInfo[0]} onChange={(e)=>{setWhichInfo([e.target.value, ...whichInfo.slice(1,3)])}} className='border border-gray-200 p-2 focus:outline-none'/>
        </div>
      </div>

    </div>

  )
}

export default Personal_Info