import React, {useState} from 'react'
import { users } from '../../../data/dummy'
import { Filter } from '../../list_product/components/list_filter'
import { ChevronDown, SquarePen } from 'lucide-react'
import { Text_Item, Number_Item, Confirm_Box } from '../../../admin/components/admin_inventory'
import { AnimatePresence, motion } from "framer-motion";

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
    <AnimatePresence>
      <p className='font-semibold text-3xl mb-2'>Personal Information</p>

      <motion.div key={'info'} 
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40, }}
                  transition={{ duration: 0.4 }}
                  className='flex gap-4 flex-col lg:flex-row'>
        <div className='w-full lg:w-[75%] flex flex-col gap-4 bg-white px-3 md:px-6 py-6 shadow-lg border-1 border-gray-100 rounded-sm'>
          <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
            <Text_Item name={'name'} content={name}/>
            <Text_Item name={'mail'} content={mail}/>
            <Text_Item name={'password'} content={mail}/>
            <Number_Item name={'phone'} content={phone} setterButton={false}/>
          </div>

          <Text_Item name={'address'} content={address} />
        </div>

        <Confirm_Box getDelete={0}/>
      </motion.div>

    </AnimatePresence>
  )
}

export default Personal_Info