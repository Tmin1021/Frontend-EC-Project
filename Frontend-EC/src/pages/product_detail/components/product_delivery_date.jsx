import React, { useState } from 'react';
import { CalendarDays, ChevronRight, ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const number_of_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function formatDate(date) {
  return `${String(date.getFullYear())}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2,'0')}`;
}

function My_Day({day, isActive, isChosen}) {

  return (
    isActive ?
    (<div className={`${isChosen? 'bg-purple-400/90 text-white':'text-black'} cursor-pointer flex items-center w-[20px] h-[25px] rounded-sm hover:bg-gray-200 transition-all duration:400`}>
      <p className='text-xs font-semibold mx-auto'>{day}</p>
    </div>)
    :  
    (<div className="cursor-pointer flex items-center w-[20px] h-[25px] rounded-sm">
      <p className='text-gray-200 text-xs font-semibold mx-auto'>{day}</p>
    </div>)
  )
}

function My_Month({date, setDate}) {
  const today = new Date()
  const [firstPosition, setFirstPosition] = useState(new Date(date.getFullYear(), date.getMonth(), 1))

  return (
    <div className='flex flex-col w-full'>
      {/* MONTH YEAR */}
      <div className='flex justify-between items-center mb-2'>
        <ChevronLeft onClick={()=>setFirstPosition(new Date(firstPosition.getFullYear(), firstPosition.getMonth()-1, 1))}/>
        <p className='text-black font-semibold text-sm mx-auto'>{firstPosition.toLocaleString('default', { month: 'long' }).toUpperCase()} {firstPosition.getFullYear()}</p>
        <ChevronRight onClick={()=>setFirstPosition(new Date(firstPosition.getFullYear(), firstPosition.getMonth()+1, 1))}/>
      </div>


      {/* SU MO TU WE TH FR SA */}
      <div className='grid grid-cols-7 gap-2'>
        {days.map((day) => (
          <p key={day} className='font-light text-gray-700 text-xs mx-auto'>{day.substring(0,2).toUpperCase()}</p>
        ))}
      </div>

      {/* 1 2 3 ...*/}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({length: number_of_days[date.getMonth()] + firstPosition.getDay()}).map((_, i) => (
          <div key={i} onClick={i<firstPosition.getDay()? undefined : () => setDate(formatDate(new Date(date.getFullYear(), date.getMonth(), i+1-firstPosition.getDay())))}>
              <My_Day day={i<firstPosition.getDay()? "" : (i+1-firstPosition.getDay()).toString()} 
                      isActive={i>=firstPosition.getDay() && today >= new Date(firstPosition.getFullYear(), firstPosition.getMonth(), i-firstPosition.getDay())}
                      isChosen={date.getFullYear()===firstPosition.getFullYear() && date.getMonth()===firstPosition.getMonth() && date.getDate()===i+1-firstPosition.getDay()}/>
          </div>
        ))}
      </div>
    </div>
  )
}

// padStart(2, '0'): If input has 1 digit, pad 0
function Product_Delivery_Date({date=new Date(), setDate={}, isOpenCalendar=false}) {
  //const now = new Date()

  return (
    <AnimatePresence>
      {isOpenCalendar &&
      <motion.div initial={{ opacity: 0, y: -20}}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y:-20 }}
                  transition={{ duration: 0.4 }}
                  className='absolute z-50 w-[220px] rounded-lg bg-white shadow-lg top-20 right-0 flex p-4 transition-all'
                  onClick={(e)=>e.stopPropagation()}>
        <My_Month date={date} setDate={setDate}/>
        {/*<My_Month date={new Date(now.getFullYear(), now.getMonth()+1, 1)} updateDate={updateDate}/>*/}
      </motion.div>}
    </AnimatePresence>
)
}

export default Product_Delivery_Date