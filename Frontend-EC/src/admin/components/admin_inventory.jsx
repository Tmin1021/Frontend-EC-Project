import { useEffect, useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { Check, ChevronDown, ChevronUp, Ellipsis } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { filter_types } from '../../pages/list_product/components/list_filter'
import { AnimatePresence, motion } from "framer-motion";
import Admin_Universal_Item, { Admin_Universal_Page } from './admin_universal'
import GlobalApi from '../../../service/GlobalApi'
import { products } from '../../data/dummy'

export const Text_Item = ({name='', content='', setter={}, placeholder='', rows=1, isEditable=true}) => {
  const types = ['flower', 'vase', 'ribbon']
  const [isTypeClicked, setIsTypeClicked] = useState(false)

  return (
    <div className='flex flex-col justify-between gap-1'>
      <p className='font-semibold text-xs'>{name}</p>

      {name==='type' ?
        <div className='relative flex items-center pl-4 pr-2 border-1 border-gray-300 rounded-sm resize-none h-full'>
          <div className='flex justify-between gap-4 items-center w-full' onClick={()=>setIsTypeClicked(!isTypeClicked)}>
            <p className='text-sm font-light'>{content}</p>
            <ChevronDown className={`${isTypeClicked ? 'rotate-[-180deg]' : ''} transition-all`}/>
          </div>

          {isTypeClicked && <div className='absolute left-0 -bottom-20 bg-gray-100 shadow-lg rounded-lg w-[150px] py-2 px-4 overflow-auto z-50'>
            {types.map((type) => (
              <div key={type} className='cursor-pointer text-sm font-light' onClick={()=>{setter(name, type); setIsTypeClicked(!isTypeClicked)}}>{type}</div>
            ))}

          </div>}
        </div>
        
      : <textarea 
            type="text" 
            placeholder={placeholder}
            value={content}
            readOnly={!isEditable}
            onChange={(e)=>{setter(name, e.target.value)}}
            className={`bg-white text-sm font-light border-1 border-gray-200 rounded-sm pl-4 py-2 resize-none focus:outline-purple-500 transtion-all ${isEditable? '':'border-none'}`}
            rows={rows}
      /> }
    </div>
  )
}

const Bool_Item = ({name, content, setter}) => {

  return (
    <div className='flex flex-col justify-between gap-1'>
      <p className='text-xs font-semibold'>{name}</p>

      <div className='h-full grid grid-cols-2 p-1 bg-gray-100 text-gray-700 text-xs font-semibold border-gray-300 border-1 rounded-sm'>
        <div className={`${content===true ? '':'bg-white border-1 border-gray-300 rounded-sm text-red-700'} flex items-center justify-center cursor-pointer`} onClick={()=>setter(name, false)}>FALSE</div>
        <div className={`${content===false ? '':'bg-white border-1 border-gray-300 rounded-sm text-blue-700'} flex items-center justify-center cursor-pointer`} onClick={()=>setter(name, true)}>TRUE</div>
      </div>
    </div>
  )
}

export const Number_Item = ({name, content, setter, decimal=true, setterButton=true, isEditable=true}) => {

  return (
    <div className='flex flex-col justify-between gap-1'>
      <p className='text-xs font-semibold'>{name}</p>

      <div className='flex justify-between items-center pl-4 pr-2 bg-white border-1 border-gray-200 rounded-sm h-full'>
        <textarea
            type="text" 
            placeholder={name}
            value={content}
            readOnly={!isEditable}
            onChange={(e)=>{const val = e.target.value; if (/^\d*\.?\d*$/.test(val)) setter(name, parseFloat(val));}}
            className={`text-sm font-light resize-none focus:outline-none w-full ${isEditable? '':'border-none'}`}
            rows={1}/>

        <div className={`flex flex-col justify-between items-center ${setterButton===1 ? '':'opacity-0 pointer-events-none'}`}>
          <ChevronUp className='w-4 h-4' onClick={()=> {decimal ? setter(name, Math.round((content+0.01)*100,2)/100) : setter(name, content+1)}}/>
          <ChevronDown className='w-4 h-4' onClick={()=> {decimal ? setter(name, Math.round((content-0.01)*100,2)/100) : setter(name, content-1)}}/>
        </div>
      </div>
    </div>
  )
}

export function Confirm_Box({getSave=1, getDelete=1}) {

  return (
    <div className='w-full lg:w-[25%] h-full flex flex-col gap-2 bg-white px-4 py-4 shadow-lg border-1 border-gray-100 rounded-sm'>
      <p className='text-xs font-semibold text-gray-500'>ENTRY</p>
 
      {getSave===1 && <div className='w-full flex items-center justify-center py-2 bg-purple-50 text-xs text-purple-700 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all'>Save</div>}
      {getDelete===1 && <div className='w-full flex items-center justify-center py-2 bg-red-50 text-xs text-red-700 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all'>Delete</div>}
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
  const [options, setOptions] = useState([])

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
      setOptions(product.flower_details.options || [])
    } else {
      setFlowerType('')
      setOccasion([])
      setColor([])
      setOptions([])
    }
  }, [product])

  if (!product) return <div>ERROR</div>

  const mapping = {
    'name': [name, setName],
    'description': [description, setDescription],
    'stock': [stock, setStock],
    'type': [type, setType],
    'price': [price, setPrice],
    'available': [available, setAvailable],
  }

  const mapping_flower = {
    'Flower Type': [flower_type, setFlowerType],
    'Occassions': [occasion, setOccasion],
    'Colors': [color, setColor],
  }

  // handle type, text, bool, number
  const handleEdit = (name, content) => {
    mapping[name][1](content)
  }

  const handleFlower = (name, value, setter, option) => {
    if (name === 'Flower Type') {setter(option)}
    else {setter(value.includes(option) ? value.filter(item => item!==option) : [...value, option])}
  }

  const handleFlowerOption = (option_name, key, value) => {
    setOptions(prevOptions => {
      const exists = prevOptions.some(option => option.name === option_name)

      if (exists) {
        return prevOptions.map(option =>
          option.name === option_name
            ? { ...option, [key]: value}
            : option
        )
      } else {
        return [...prevOptions, { [key]: value }]
      }
    })
  }

  return (
    <div className='flex gap-4 py-4 px-2 md:px-8 flex-col lg:flex-row'>
      {/* Main info */}
      <div className='w-full lg:w-[75%] flex flex-col gap-6 bg-white px-3 md:px-6 py-6 shadow-lg border-1 border-gray-100 rounded-sm'>
        <div className='grid grid-cols-2 gap-1 md:gap-4'>
          <Text_Item name={'type'} content={type} setter={handleEdit}/>
          <Text_Item name={'name'} content={name} placeholder='Taylor Swift'/>
        </div>

        <div className='grid grid-cols-3 gap-1 md:gap-4'>
          <Number_Item name={'price'} content={price} setter={handleEdit} placeholder='1.00'/>
          <Number_Item name={'stock'} content={stock} setter={handleEdit} placeholder='10'/>
          <Bool_Item name={'available'} content={available} setter={handleEdit}/>
        </div>

        <div className='grid grid-cols-2 gap-1 md:gap-4'>
          <Text_Item name={'description'} content={description} setter={handleEdit} rows={3} placeholder='Assorted stems of seasonal roses.'/>

        </div>

      {/* Flower Option && Detail */}
      <AnimatePresence>
        {type==='flower' && <motion.div  initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring", stiffness: 450, damping: 35}} 
                      className='flex flex-col gap-4'>
        
        {/* Option */}
        <div className='flex flex-col gap-1'>
          <p className='text-xs font-semibold'>flower options</p>

          <div className='flex flex-col gap-2 bg-gray-100 border-1 border-gray-300 rounded-sm px-4 py-2'>
              {options.map((option, i) => (
                <div key={i} className='grid grid-cols-2 gap-1 md:gap-4'>
                  <Text_Item name='name' content={option.name} setter={(key, value) => handleFlowerOption(option.name, key, value)}/>
                  <Number_Item name='stems' content={option.stems} decimal={false} setter={(key, value) => handleFlowerOption(option.name, key, value)}/>
                </div>
              ))}
          </div>
        </div>


        {/* Detail */}
        <div className='flex flex-col gap-4'>
          {Object.entries(mapping_flower).map(([key, [value, setter]]) => (
            <div key={key} className='flex flex-col justify-between gap-1'>
              {/* Title */}
              <p className='font-semibold text-xs'>{key.toLowerCase()}</p>
              {/* Details */}
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


function Admin_Inventory() {

  return (
    <Admin_Universal_Page name={'Inventory'}/>
  )
}

export default Admin_Inventory
