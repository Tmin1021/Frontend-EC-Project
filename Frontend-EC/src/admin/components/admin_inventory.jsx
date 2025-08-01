import { useEffect, useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { Check, ChevronDown } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { filter_types } from '../../pages/list_product/components/list_filter'
import { AnimatePresence, motion } from "framer-motion";
import Admin_Universal_Item, { Admin_Universal_Page } from './admin_universal'

const Detail_Item = ({name, content, isEditable, onHandleInput}) => {
  const types = ['flower', 'vase', 'ribbon']
  const [isTypeClicked, setIsTypeClicked] = useState(false)

  return (
    <div className='flex justify-between'>
      <p className='font-semibold text-lg w-[40%]'>{name}</p>

      { name==='Available' ? 
      <div className='relative w-[60%]'>
            <div className='absolute left-2 border-gray-300 border-1 w-[30px] h-[30px] flex justify-center items-center' onClick={()=>{if(isEditable) {onHandleInput(!content)}}}><Check className={`${content? '':'hidden'}`}/></div>
      </div>

      : name==='Type' ?
        <div className='relative w-[60%] px-2 text-lg font-light'>
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
            className={`text-lg font-light border-1 px-2 w-[60%] resize-none ${isEditable? 'border-gray-300 rounded-xs' : 'focus:outline-none border-none'}`}
            rows={2}
      /> }
    </div>
  )
}

export const Admin_Inventory_Detail = () => {
  const { id } = useParams()
  const { currentInventory, updateInventory, removeInventory } = useAdmin()
  const product = currentInventory.find(p => p.product_id === id)
  const [isEditable, setIsEditable] = useState(false)

  const [name, setName] = useState('')
  const [productId, setProductId] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState(0)
  const [available, setAvailable] = useState(true)
  const [flower_type, setFlowerType] = useState('')
  const [occasion, setOccasion] = useState([])
  const [color, setColor] = useState([])

  useEffect(() => {
    if (product) {
      setName(product.name)
      setProductId(product.product_id)
      setType(product.type)
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
    <div className='flex flex-col gap-4 p-1'>
      {/* ID */}
      <p className='font-semibold text-3xl'>Product #<span className="font-bold text-pink-500">{id}</span></p>

      <button onClick={() => {if(isEditable) {updateInventory(product, {...product, name: name, product_id: productId, description: description, stock: stock, available: available})} setIsEditable(!isEditable)}} className="self-start text-blue-500">
          {isEditable ? 'Done' : 'Edit'}
      </button>

      {/* Product detail */}
      <div className='bg-white dark:bg-black rounded-lg shadow-sm p-4 hover:shadow-lg'>
        <p className='font-semibold text-3xl pb-4'>Product detail</p>

        {Object.entries(mapping).map(([key, [value, setter]]) => (
          <Detail_Item
            key={key}
            name={key}
            content={value}
            isEditable={isEditable}
            onHandleInput={setter}
          />
        ))}
      </div>

      {/* Flower Option */}
      <AnimatePresence>
        {type==='flower' && <motion.div  initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring", stiffness: 450, damping: 35}} 
                      className='bg-white dark:bg-black rounded-lg shadow-sm p-4 hover:shadow-lg'>
          {/* Title */}
          <p className='font-semibold text-3xl pb-4'>Flower configuration</p>
          {/* Option */}
          <div className='flex flex-col gap-2'>
            {Object.entries(mapping_flower).map(([key, [value, setter]]) => (
              <div key={key} className='flex justify-between'>
                {/* Title */}
                <p className='font-semibold text-lg w-[40%]'>{key}</p>
                {/* Options */}
                <div className='w-[60%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                  {filter_types[key]?.map((option) => (
                    <div key={option} className={`${value.includes(option)? 'bg-blue-400 text-white' : 'bg-gray-100'} text-sm md:text-base cursor-pointer rounded-lg p-2 flex justify-between items-center font-light transition-all`} onClick={()=>handleFlower(key, value, setter, option)}>{option}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </motion.div>}
      </AnimatePresence>

      {/* Preview */}
      <div className='bg-white dark:bg-black rounded-lg shadow-sm p-4 hover:shadow-lg'>
        <p className='font-semibold text-3xl pb-4'>Preview</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1'>
          {product.image_url.map((image, i) => (
            <div key={i} className='w-full aspect-square overflow-hidden'>
              <img src={image} className='w-full h-full object-cover'/>
            </div>

          ))}
        </div>
      </div>

    </div>
  )
}

function Admin_Inventory() {

  return (
    <Admin_Universal_Page name={'Inventory'}/>
  )
}

export default Admin_Inventory
