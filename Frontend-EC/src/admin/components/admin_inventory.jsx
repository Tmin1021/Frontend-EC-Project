import { useEffect, useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { Check, ChevronDown, Ellipsis } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { filter_types } from '../../pages/list_product/components/list_filter'
import { AnimatePresence, motion } from "framer-motion";
import Admin_Universal_Item, { Admin_Universal_Page } from './admin_universal'
import GlobalApi from '../../../service/GlobalApi'
import { products } from '../../data/dummy'

const Text_Item = ({name, content, isEditable, onHandleInput}) => {
  const types = ['flower', 'vase', 'ribbon']
  const [isTypeClicked, setIsTypeClicked] = useState(false)

  return (
    <div className='flex flex-col justify-between gap-1'>
      <p className='font-semibold text-xs'>{name.toLowerCase()}</p>

      {name==='Type' ?
        <div className='relative px-2 text-lg font-light'>
          <div className='flex gap-4 items-center' onClick={()=>setIsTypeClicked(!isTypeClicked)}><p>{content}</p><ChevronDown className={`${isTypeClicked ? 'rotate-[-180deg]' : ''} transition-all`}/></div>
          {isTypeClicked && <div className='absolute left-0 bg-white shadow-sm rounded-lg w-[150px] py-2 px-4 overflow-auto z-50'>
            {types.map((type) => (
              <div className='cursor-pointer' onClick={()=>{onHandleInput(type); setIsTypeClicked(!isTypeClicked)}}>{type}</div>
            ))}
          </div>}
        </div>
        
      : <textarea 
            type="text" 
            placeholder={name}
            value={content}
            onChange={(e)=>{onHandleInput(e.target.value)}}
            readOnly={!isEditable}
            className={`text-sm font-light border-1 border-gray-300 rounded-sm pl-4 py-2 resize-none focus:outline-none focus:border-purple-500 focus:border-3 transtion-all`}
            rows={1}
      /> }
    </div>
  )
}

export const Admin_Inventory_Detail = () => {
  const { id } = useParams()
  const { currentInventory, updateInventory } = useAdmin()
  let product = currentInventory.find(p => p.product_id.toString() === id)
  const [isEditable, setIsEditable] = useState(false)

  const [name, setName] = useState('')
  const [productId, setProductId] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState(0.0)
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState(0)
  const [available, setAvailable] = useState(true)
  const [flower_type, setFlowerType] = useState('')
  const [occasion, setOccasion] = useState([])
  const [color, setColor] = useState([])

  useEffect(() => {
    if (!product) product = products[0]
    if (product) {
      setName(product.name)
      setProductId(product.product_id)
      setType(product.type)
      setPrice(product.price)
      setDescription(product.description)
      setStock(product.stock)
      setAvailable(product.available)
    }

    if (product.type === 'flower' && product.flower_details) {
      setFlowerType(product.flower_details.flower_type || '')
      setOccasion(product.flower_details.occasion || [])
      setColor(product.flower_details.color || [])
    } else {
      setFlowerType('')
      setOccasion([])
      setColor([])
    }
  }, [product])

  if (!product) return <div>ERROR</div>

  const mapping = {
    'Name': [name, setName],
    'Product ID': [productId, setProductId],
    'Description': [description, setDescription],
    'Stock': [stock, setStock],
    'Type': [type, setType],
    'Price': [price, setPrice],
    'Available': [available, setAvailable],
  }

  const mapping_flower = {
    'Flower Type': [flower_type, setFlowerType],
    'Occassions': [occasion, setOccasion],
    'Colors': [color, setColor],
  }

  const handleFlower = (name, value, setter, option) => {
    if (name === 'Flower Type') {setter(option)}
    else {setter(value.includes(option) ? value.filter(item => item!==option) : [...value, option])}
  }

  return (
    <div className='flex gap-4 py-4 px-8'>
      {/* Main info */}
      <div className='w-[75%] flex flex-col gap-6 bg-white px-6 py-6 shadow-lg border-1 border-gray-100 rounded-sm'>
        <div className='grid grid-cols-2 gap-4'>
          <Text_Item name={'type'} content={type}/>
          <Text_Item name={'name'} content={name}/>
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <Text_Item name={'price'} content={price}/>
          <Text_Item name={'stock'} content={stock}/>
          <Text_Item name={'name'} content={name}/>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <Text_Item name={'description'} content={description}/>
          <Text_Item name={'name'} content={name}/>
        </div>

      {/* Flower Option */}
      <AnimatePresence>
        {type==='flower' && <motion.div  initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring", stiffness: 450, damping: 35}} >
        {/* Option */}
        <div className='flex flex-col gap-2'>
          {Object.entries(mapping_flower).map(([key, [value, setter]]) => (
            <div key={key} className='flex flex-col justify-between gap-1'>
              {/* Title */}
              <p className='font-semibold text-xs'>{key.toLowerCase()}</p>
              {/* Options */}
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                {filter_types[key]?.map((option) => (
                  <div key={option} className={`${value.includes(option)? 'bg-purple-400 text-white font-semibold' : 'bg-gray-50'} text-sm font-light cursor-pointer rounded-lg p-2 flex justify-between items-center overflow-hidden transition-all`} 
                                    onClick={()=>handleFlower(key, value, setter, option)}>{option}</div>
                ))}
              </div>
            </div>
          ))}
          </div>

        </motion.div>}
      </AnimatePresence>

      </div>

      <Confirm_Box/>

    </div>
  )
}

function Confirm_Box() {

  return (
    <div className='w-[25%] h-full flex flex-col gap-2 bg-white px-4 py-4 shadow-lg border-1 border-gray-100 rounded-sm'>
      <p className='text-xs font-semibold text-gray-500'>ENTRY</p>
      <div className='flex justify-between gap-2'>
          <div className='w-full flex items-center justify-center py-2 bg-purple-400 text-xs text-white font-semibold rounded-sm'>Publish</div>
          <div className='flex items-center justify-between h-[32px] aspect-square border-1 border-gray-200 rounded-sm'>
            <Ellipsis className='w-3 h-3 mx-auto'/>
          </div>
      </div>

      <div className='w-full flex items-center justify-center py-2 bg-purple-50 text-xs text-purple-700 font-semibold rounded-sm border-1 border-gray-200'>Save</div>
    </div>
  )
}

function Admin_Inventory() {

  return (
    <Admin_Universal_Page name={'Inventory'}/>
  )
}

export default Admin_Inventory
