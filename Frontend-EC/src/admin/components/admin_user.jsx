import { Admin_Universal_Page } from './admin_universal'
import React, {useState} from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { toast } from 'sonner'
import { Change_Password } from '../../pages/personal/components/personal_info';
import { Text_Item, Text_Item_2, Confirm_Box } from './admin_inventory';
import { useAuth } from '../../context/AuthContext';
import BEApi from '../../../service/BEApi';
import { adminPlaceHolder } from '../../data/dummy';

export function Admin_User_Detail({isCreate=false}) {
  const { user, handleGetFresh } = useAuth()
  let realUser = isCreate ? adminPlaceHolder : user

  const [name, setName] = useState(realUser.name)
  const [email, setEmail] = useState(realUser.email)
  const [phone, setPhone] = useState(realUser.phone)
  const [address, setAddress] = useState(realUser.address)
  const [password, setPassword] = useState(isCreate? '' : '......')
  const [isOpen, setIsOpen] = useState(false)

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
    // Trim values to avoid whitespace-only strings
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();

    // Check if any field is blank
    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedAddress || !password) {
      toast.error("All fields are required.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const data = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      address: trimmedAddress,
      ...(isCreate && { password })
    };

    if (isCreate) {
      BEApi.UserApi.create(data).then(resp=>{
            toast.success("New admin is created successfully")
            handleGetFresh()
          }, (err)=>{
            toast.error(err.response?.data?.error || "Failed to create new admin");
          }
      )
    }
    else {BEApi.UserApi.update(user.id, data).then(resp=>{
      toast.success("Updated successfully")
      handleGetFresh()
    }, (err)=>{
      toast.error(err.response?.data?.error || "Failed to update");
    }
    )
  }
  };

  return (
    <AnimatePresence>
      <p className='font-semibold text-3xl mb-2'>{isCreate ? 'Create admin account' : 'Admin account'}</p>

      <motion.div key={'info'} 
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40, }}
                  transition={{ duration: 0.4 }}
                  className='flex gap-4 flex-col lg:flex-row'>
        <div className='relative w-full lg:w-[75%] flex flex-col gap-4 bg-white px-3 md:px-6 py-6 shadow-lg border-1 border-gray-100 rounded-sm'>
          <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
            <Text_Item name={'name'} content={name} setter={handleChange}/>
            <Text_Item_2 type={'email'} name={'email'} content={email} setter={handleChange}/>
            <div onClick={()=>setIsOpen(true)}><Text_Item_2 name={'change password'} type={"password"} content={password}/></div>
            <Text_Item_2 type={'tel'} name={'phone'} content={phone} setterButton={false} setter={handleChange}/>
          </div>

          <Text_Item name={'address'} content={address} setter={handleChange} row={2}/>
        </div>

        <Change_Password isOpen={isOpen} setIsOpen={setIsOpen} isCreate={isCreate}/>

        <Confirm_Box getDelete={false} saveSetter={handleUpdate}/>
      </motion.div>

    </AnimatePresence>
  )
}


function Admin_User() {

  return (
    <Admin_Universal_Page name={'User'}/>
  )
}

export default Admin_User