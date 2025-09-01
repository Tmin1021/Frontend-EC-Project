import React, {useState} from 'react'
import { Filter } from '../../list_product/components/list_filter'
import { Text_Item, Text_Item_2, Number_Item, Confirm_Box } from '../../../admin/components/admin_inventory'
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from '../../../context/AuthContext'
import { toast } from 'sonner'
import BEApi from '../../../../service/BEApi'

export function Change_Password({isOpen, setIsOpen, setter=()=>{}, isCreate=false}) {
  const [firstPass, setFirstPass] = useState('')
  const [secondPass, setSecondPass] = useState('')
  const {user} = useAuth()

  const handleChange = async () => {
    if (!firstPass || !secondPass) {
      toast.error("Password fields cannot be blank.");
    } else if (firstPass !== secondPass) {
      toast.error("Passwords do not match.");
    } else {

      if (isCreate) {
        if (typeof setter === 'function') setter(firstPass)
        setIsOpen(false)
        return
      }
      const data = {password: firstPass}

      BEApi.UserApi.update(user?._id, data).then(() => {
        toast.success('Password is changed successfully')
        setIsOpen(false)
      }, (err) => {
        toast.error(err.response?.data?.error || "Failed to change password. Try again later.")
      })
      console.log(user)
    }
  };

  return (
    <AnimatePresence>
      {isOpen && <motion.div  
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-150 flex flex-col items-end md:items-center justify-center bg-black/30 backdrop-blur-xs" onClick={()=>setIsOpen(false)}>
        
        <motion.div initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut"}}
                    className="relative w-[400px] h-[260px] flex flex-col p-4 gap-4 bg-white rounded-lg no-scrollbar" onClick={(e) =>e .stopPropagation()}>
                <p className='font-semibold text-lg'>Change password</p>
                <Text_Item_2 name={"New password"} type={'text'} content={firstPass} setter={(name, content) => setFirstPass(content)} placeholder=''/>
                <Text_Item_2 name={"Confirm password"} type={'text'} content={secondPass} setter={(name, content) => setSecondPass(content)} placeholder=' '/>
                <div className='flex justify-center gap-4'>
                  <div className='cursor-pointer rounded-md p-2 bg-blue-300/90 shadow-sm text-white hover:shadow-xl hover:bg-blue-500/90 transition-all w-fit' onClick={handleChange}>Confirm</div>
                  <div className='cursor-pointer rounded-md p-2 bg-red-300/90 shadow-sm text-white hover:shadow-xl hover:bg-red-500/90 transition-all w-fit' onClick={()=>setIsOpen(false)}>Cancel</div>
                </div>
        </motion.div>
        </motion.div>}
      </AnimatePresence>
  )
}

function Personal_Info() {
  const { user, handleGetFresh } = useAuth();

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [address, setAddress] = useState(user.address)
  const [password, setPassword] = useState('......')
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
    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedAddress) {
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
    };

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
        <div className='relative w-full lg:w-[75%] flex flex-col gap-4 bg-white px-3 md:px-6 py-6 shadow-lg border-1 border-gray-100 rounded-sm'>
          <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
            <Text_Item name={'name'} content={name} setter={handleChange}/>
            <Text_Item_2 type={'email'} name={'email'} content={email} setter={handleChange}/>
            <div onClick={()=>setIsOpen(true)}><Text_Item_2 name={'change password'} type={"password"} content={password}/></div>
            <Text_Item_2 type={'tel'} name={'phone'} content={phone} setterButton={false} setter={handleChange}/>
          </div>

          <Text_Item name={'address'} content={address} setter={handleChange} row={2}/>
        </div>

        <Change_Password isOpen={isOpen} setIsOpen={setIsOpen} setter={setPassword}/>

        <Confirm_Box getDelete={false} saveSetter={handleUpdate}/>
      </motion.div>

    </AnimatePresence>
  )
}

export default Personal_Info