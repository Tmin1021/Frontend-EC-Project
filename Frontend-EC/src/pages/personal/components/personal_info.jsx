import React, {useState} from 'react'
import { users, isDummy } from '../../../data/dummy'
import { Filter } from '../../list_product/components/list_filter'
import { ChevronDown, SquarePen } from 'lucide-react'
import { Text_Item, Number_Item, Confirm_Box } from '../../../admin/components/admin_inventory'
import { AnimatePresence, motion } from "framer-motion";
import GlobalApi from '../../../../service/GlobalApi'
import { useAuth } from '../../../context/AuthContext'
import { toast } from 'sonner'
import BEApi from '../../../../service/BEApi'

function Personal_Info() {
  const { user, handleGetFresh } = useAuth();

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [address, setAddress] = useState(user.address)
  const [password, setPassword] = useState('')

  const mapping = {
    'name': [name, setName],
    'email': [email, setEmail],
    'phone': [phone, setPhone],
    'change password': [password, setPassword],
    'address': [address, setAddress]
  }

  const handleChange = (name, content) => {
    mapping[name][1](content)
  }

  const handleUpdate = () => {
    const data = {
        name,
        email,
        phone,
        address
      }

    BEApi.UserApi.update(user.id, data).then(resp=>{
      toast.success("Updated successfully")
      handleGetFresh()
    }, (err)=>{
      toast.error(err.response?.data?.error || "Failed to update");
    }
    )
  };

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
            <Text_Item name={'name'} content={name} setter={handleChange}/>
            <Text_Item name={'email'} content={email} setter={handleChange}/>
            <Text_Item name={'change password'} content={password} setter={handleChange}/>
            <Number_Item name={'phone'} content={phone} setterButton={false} setter={handleChange}/>
          </div>

          <Text_Item name={'address'} content={address} setter={handleChange} row={2}/>
        </div>

        <Confirm_Box getDelete={false} saveSetter={handleUpdate}/>
      </motion.div>

    </AnimatePresence>
  )
}

export default Personal_Info