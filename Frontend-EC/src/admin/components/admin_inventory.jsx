import { useEffect, useState } from 'react'
import { useAdmin } from '../../context/AdminContext'
import { Check, ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { filter_types } from '../../pages/list_product/components/list_filter'
import { AnimatePresence, motion } from "framer-motion";
import Admin_Universal_Item, { Admin_Universal_Page } from './admin_universal'
import { assets, demo_1, productPlaceHolder } from '../../data/dummy'
import { toast } from 'sonner'
import Product_Delivery_Date from '../../pages/product_detail/components/product_delivery_date'
import BEApi from '../../../service/BEApi'

export const Text_Item = ({name='', content='', setter={}, placeholder='', isEditable=true, rows=1}) => {

  return (
    <div className='flex flex-col justify-between gap-1'>
      <p className='font-semibold text-xs'>{name}</p>
        
      <textarea 
            type='text'
            placeholder={placeholder}
            value={content}
            readOnly={!isEditable}
            required
            onChange={(e)=>{if (typeof setter === "function") {setter(name, e.target.value.trim())}}}
            className={`bg-white text-sm font-light border-1 border-gray-200 rounded-sm pl-4 py-2 resize-none focus:outline-purple-500 transtion-all ${isEditable? '':'border-none'}`}
            rows={rows}
      /> 
    </div>
  )
}

export const Text_Item_2 = ({name='', content='', setter={}, type='text', placeholder='', isEditable=true}) => {

  return (
    <div className='flex flex-col justify-between gap-1'>
      <p className='font-semibold text-xs'>{name}</p>
        
      <input 
            type={type}
            placeholder={placeholder}
            value={content}
            readOnly={!isEditable}
            required
            onChange={(e)=>{if (typeof setter === "function") {setter(name, e.target.value.trim())}}}
            className={`bg-white text-sm font-light border-1 border-gray-200 rounded-sm pl-4 py-2 resize-none focus:outline-purple-500 transtion-all ${isEditable? '':'border-none'}`}
      /> 
    </div>
  )
}

const Select_Item = ({name, content, setter}) => {
  const types = ['flower', 'vase', 'ribbon']
  const [isTypeClicked, setIsTypeClicked] = useState(false)

  return (
    <div className='flex flex-col justify-between gap-1'>
      <p className='font-semibold text-xs'>{name}</p>

        <div className='relative flex items-center pl-4 pr-2 border-1 border-gray-300 rounded-sm resize-none h-full'>
          <div className='flex justify-between gap-4 items-center w-full' onClick={()=>setIsTypeClicked(!isTypeClicked)}>
            <p className='text-sm font-light'>{content}</p>
            <ChevronDown className={`${isTypeClicked ? 'rotate-[-180deg]' : ''} transition-all`}/>
          </div>

          {isTypeClicked && 
          <div className='absolute left-0 -bottom-20 bg-gray-100 shadow-lg rounded-lg w-[150px] py-2 px-4 overflow-auto z-50'>
            {types.map((type) => (
              <div key={type} className='cursor-pointer text-sm font-light' onClick={()=>{setter(name, type); setIsTypeClicked(!isTypeClicked)}}>{type}</div>
            ))}
          </div>}
        </div>

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

export const Number_Item = ({name, content, setter, decimal=true, setterButton=true, isEditable=true, min=0, max=50}) => {

  return (
    <div className='flex flex-col justify-between gap-1'>
      <p className='text-xs font-semibold'>{name}</p>

      <div className='flex justify-between items-center pl-4 pr-2 bg-white border-1 border-gray-200 rounded-sm h-full'>
        <textarea
            type="text" 
            min={min}
            max={max}
            placeholder={name}
            value={content}
            readOnly={!isEditable}
            onChange={(e)=>{const val = e.target.value; if (/^\d*\.?\d*$/.test(val)) setter(name, val==='' ? '' : parseFloat(val))}}
            className={`text-sm font-light resize-none focus:outline-none w-full ${isEditable? '':'border-none'}`}
            rows={1}/>

        <div className={`flex flex-col justify-between items-center ${setterButton===true ? '':'opacity-0 pointer-events-none'}`}>
          <ChevronUp className='w-4 h-4' onClick={()=> {decimal ? setter(name, Math.round((content+0.01)*100,2)/100) : setter(name, Math.max(min, content+1))}}/>
          <ChevronDown className='w-4 h-4' onClick={()=> {decimal ? setter(name, Math.round((content-0.01)*100,2)/100) : setter(name, Math.min(max, content-1))}}/>
        </div>
      </div>
    </div>
  )
}

export function Confirm_Box({getSave=true, getDelete=false, saveSetter={}, deleteSetter={}}) {

  return (
    <div className='w-full lg:w-[25%] h-full flex flex-col gap-2 bg-white px-4 py-4 shadow-lg border-1 border-gray-100 rounded-sm'>
      <p className='text-xs font-semibold text-gray-500'>ENTRY</p>
 
      {getSave && <div className='cursor-pointer w-full flex items-center justify-center py-2 bg-purple-50 text-xs text-purple-700 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all' onClick={saveSetter}>Save</div>}
      {getDelete && <div className='cursor-pointer w-full flex items-center justify-center py-2 bg-red-50 text-xs text-red-700 font-semibold rounded-sm border-1 border-gray-200 hover:bg-white transition-all' onClick={deleteSetter}>Delete</div>}
    </div>
  )
}

export function AlbumSelect({selectedImages=[], setSelectedImages=()=>{}, isAlbumClick, setIsAlbumClick}) {

  return (
    <div className={` ${isAlbumClick? 'fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm':''} transition-all`} onClick={()=>setIsAlbumClick(false)}>
        <div className={`${isAlbumClick ? 'w-[90%] md:w-[60%] bg-white/80 max-h-[80vh] overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 no-scrollbar':'bg-gray-100'} p-4 rounded-lg duration-500 ease-in-out`} 
             onClick={(e)=> e.stopPropagation()}>

          {!isAlbumClick && 
          <div className='flex justify-between items-center gap-2'>
              <div className='w-full aspect-square overflow-hidden rounded-md hover:shadow-lg hover:shadow-gray-300'>
                <img src={selectedImages[0] ? assets[selectedImages[0]] : demo_1} className='w-full h-full object-cover'/>
              </div>
              <div className='rounded-md p-2 bg-gray-200' onClick={()=>setIsAlbumClick(true)}><Plus className='w-6 h-6 text-gray-700/80'/></div>
          </div>}
          
          {isAlbumClick && Object.entries(assets).map(([key, image]) => (
            <div key={key} className={`${selectedImages.includes(key)? 'border-3 border-purple-500/70' : ''} 
                                        w-full aspect-square overflow-hidden rounded-md hover:shadow-lg hover:shadow-gray-300`}
                              onClick={()=>{!selectedImages.includes(key) ? setSelectedImages([...selectedImages, key]) 
                                            : selectedImages.length >1 && setSelectedImages(selectedImages.filter(img => img!==key))}}>
              <img src={image} className='w-full h-full object-cover'/>
            </div>
          ))}
        </div>
    </div>
  )
}

export const Admin_Inventory_Detail = ({isCreate=false}) => {
  const {id} = useParams()
  const { currentInventory, handleGetFresh } = useAdmin()
  const [isAlbumClick, setIsAlbumClick] = useState(false)
  const navigate = useNavigate()
  let product = isCreate? productPlaceHolder : currentInventory.find(p => p._id === id)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.0)
  const [stock, setStock] = useState(0)
  const [available, setAvailable] = useState(true)
  const [stems, setStems] = useState(0)
  const [description, setDescription] = useState('')
  const [fill_stock_date, setFillStockDate] = useState(new Date())
  const [flower_type, setFlowerType] = useState('')
  const [occasions, setOccasions] = useState([])
  const [colors, setColors] = useState([])
  const [selectedImages, setSelectedImages] = useState([])

  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const today = new Date()

  const handleUpdate = () => {
    // Check if any field is blank
    if (!name || !price || !stock) {
      toast.error("All fields are required.");
      return;
    }

    if (price < 0 || price > 50) {
      toast.error("Price must be in range 0-50");
      return;
    }

    if (stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    if (stems < 0) {
      toast.error("Stems cannot be negative");
      return;
    }

    const data = {
        name,
        price,
        description,
        stock,
        available,
        fill_stock_date,
        flower_type,   
        occasions,   
        colors,     
        image_url: selectedImages 
      }

    BEApi.ProductApi.update(id, data).then(resp=>{
      toast.success("Updated successfully")
      handleGetFresh()
    }, (err)=>{
      toast.error(err.response?.data?.error || "Failed to update product");
    }
    )
  };

  const handleCreate = () => {
    const data = {
        name,
        price,
        description,
        //image_url: [demo_1],
        stock,
        stems,
        available,
        fill_stock_date,
        flower_type,   
        occasions,   
        colors,   
    }

    BEApi.ProductApi.create(data).then(()=>{
      toast.success("Created successfully")
      handleGetFresh()
      navigate('/admin/inventory', { replace: true })
    }, (err)=>{
      toast.error(err.response?.data?.error || "Failed to create product");
    }
    )
  };

  const handleDelete = () => {
    BEApi.ProductApi.delete(id).then(()=>{
      toast.success("Deleted successfully")
      navigate('/admin/inventory', { replace: true })
      handleGetFresh()
    }, (err)=>{
      toast.error(err.response?.data?.error || "Failed to delete product");
    }
    )
  };

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
      setStems(product.stems)
      setStock(product.stock)
      setAvailable(product.available)
      setFillStockDate(product.fill_stock_date ?? `${String(today.getFullYear())}-${String(today.getMonth()+1).padStart(2, '0')}-${String(today.getDate()).padStart(2,'0')}`)
      setFlowerType(product.flower_type || '')
      setOccasions(product.occasions || [])
      setColors(product.colors || [])
      setSelectedImages(product.image_url || [demo_1])
    }
    console.log(product)
  }, [product])

  if (!product && !isCreate) return <div>ERROR</div>

  const mapping = {
    'name': [name, setName],
    'description': [description, setDescription],
    'stock': [stock, setStock],
    'stems': [stems, setStems],
    'price': [price, setPrice],
    'available': [available, setAvailable],
  }

  const mapping_flower = {
    'Flower Type': [flower_type, setFlowerType],
    'Occassions': [occasions, setOccasions],
    'Colors': [colors, setColors],
  }

  // handle type, text, bool, number
  const handleEdit = (name, content) => {
    mapping[name][1](content)
  }

  const handleFlower = (name, value, setter, option) => {
    if (name === 'Flower Type') {setter(option)}
    else {setter(value.includes(option) ? value.filter(item => item!==option) : [...value, option])}
  }


  return (
    <div className='flex gap-4 py-4 px-2 md:px-8 flex-col lg:flex-row' onClick={()=>setIsOpenCalendar(false)}>
      {/* Main info */}
      <div className='w-full lg:w-[75%] flex flex-col gap-6 bg-white px-2 md:px-6 py-6 shadow-lg border-1 border-gray-100 rounded-sm'>
        <div className='grid grid-cols-3 gap-1 md:gap-4'>
          <Text_Item name={'name'} content={name} setter={handleEdit} placeholder='Taylor Swift'/>
          <Number_Item name={'stems'} content={stems} setter={handleEdit} placeholder='5' decimal={false}/>
          <Bool_Item name={'available'} content={available} setter={handleEdit}/>
        </div>

        <div className='grid grid-cols-3 gap-1 md:gap-4'>
          <Number_Item name={'price'} content={price} setter={handleEdit} placeholder='1.00'/>
          <Number_Item name={'stock'} content={stock} setter={handleEdit} placeholder='10' decimal={false} min={1} max={20}/>
          <div className='relative' onClick={(e)=>{e.stopPropagation(); setIsOpenCalendar(true)}}>
              <Text_Item name={'fill stock date'} content={fill_stock_date.toString().slice(0,10)} placeholder='2025-01-01'/>  
              <Product_Delivery_Date date={new Date(fill_stock_date)} setDate={setFillStockDate} isOpenCalendar={isOpenCalendar}/>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-1 md:gap-4'>
          <Text_Item name={'description'} content={description} setter={handleEdit} rows={4} placeholder='Assorted stems of seasonal roses.'/>
          <AlbumSelect selectedImages={selectedImages} setSelectedImages={setSelectedImages} isAlbumClick={isAlbumClick} setIsAlbumClick={setIsAlbumClick}/>
        </div>

      {/* Flower Option && Detail */}
      <AnimatePresence>
        <motion.div  initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring", stiffness: 450, damping: 35}} 
                      className='flex flex-col gap-4'>


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

        </motion.div>
      </AnimatePresence>

      </div>

      <Confirm_Box saveSetter={isCreate? handleCreate : handleUpdate} deleteSetter={handleDelete} getDelete={!isCreate}/>

    </div>
  )
}


function Admin_Inventory() {

  return (
    <Admin_Universal_Page name={'Inventory'}/>
  )
}

export default Admin_Inventory