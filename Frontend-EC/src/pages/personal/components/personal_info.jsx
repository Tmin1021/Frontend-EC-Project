import React, {useState} from 'react'
import { users } from '../../../data/dummy'
import { Filter } from '../../list_product/components/list_filter'
import { ChevronDown, SquarePen } from 'lucide-react'


const Personal_Info_Item = ({name, info, isEdit, onHandleInput}) => {

    return (
        <div className='flex justify-between'>
            <p className='font-semibold text-lg w-[20%]'>{name}</p>
            <input 
              type="text" 
              placeholder={name}
              value={info}
              onChange={(e)=>{onHandleInput(e.target.value)}}
              readOnly={!isEdit}
              className={`text-lg font-light border-1 px-2 w-[60%] resize-none ${isEdit? 'border-gray-300 rounded-xs' : 'focus:outline-none border-none'}`}/>
        </div>
    )
}


function Personal_Info() {
  const user = users[0] 
  const [isEdit, setIsEdit] = useState(false)
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const mapping = {
    'Name': [name, setName],
    'Mail': [mail, setMail],
    'Phone': [phone, setPhone]
  }


  return (
    <div className='flex flex-col gap-8'>
      {/* Edit */}
      <div className='cursor-pointer' onClick={()=>setIsEdit(!isEdit)}>
        {isEdit 
        ? <p className='text-red-500 font-semibold'>Done</p> 
        : <div className='flex gap-2'>
            <SquarePen className='text-blue-500'/>
            <p className='text-blue-500 font-semibold'>Edit</p>
        </div>}
      </div>

      {/* Name, email,... */}
      <div className='bg-white dark:bg-black shadow-sm hover:shadow-lg p-4 roundedsm hover:rounded-xl transition-all'>
        <p className='text-2xl pb-4'>Personal Information</p>
        <div className='flex flex-col gap-2'>
          {Object.keys(mapping).map((key) => (
            <Personal_Info_Item key={key} name={key} info={mapping[key][0]} isEdit={isEdit} onHandleInput={mapping[key][1]}/>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className='flex flex-col gap-4 bg-white dark:bg-black shadow-sm hover:shadow-lg p-4 roundedsm hover:rounded-xl transition-all'>
        <p className='text-2xl'>Saved Order Address</p>

        {/* House number, street... */}
        <div className='flex flex-col'>
          <input type='text' 
                 placeholder='Address, Street...' 
                 value={address} 
                 readOnly={!isEdit}
                 onChange={(e)=>setAddress(e.target.value)}
                 className={`text-lg font-light border-1 px-2 w-[60%] resize-none ${isEdit? 'border-gray-300 rounded-xs' : 'focus:outline-none border-none'}`}/>
        </div>
      </div>

    </div>

  )
}

export default Personal_Info