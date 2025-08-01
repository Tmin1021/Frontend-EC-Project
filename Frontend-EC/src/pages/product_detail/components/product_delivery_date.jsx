import React, { useState } from 'react';
import { useProductCalendar } from '../../../context/ProductCalendarContext';
import { CalendarDays } from 'lucide-react';

const number_of_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function My_Day({day, isActive}) {

  return (
    isActive ?
    (<div className="flex items-center w-[35px] h-[45px] rounded-sm hover:bg-gray-200 transition-all duration:400">
      <p className='text-black text-sm font-semibold mx-auto'>{day}</p>
    </div>)
    :  
    (<div className="flex items-center w-[35px] h-[45px]">
      <p className='text-gray-200 text-sm font-semibold mx-auto'>{day}</p>
    </div>)
  )
}

function My_Month({date, updateDate}) {
  const today = new Date()
  const firstPosition = (new Date(date.getFullYear(), date.getMonth(), 1)).getDay()

  return (
    <div className='flex flex-col'>
      {/* MONTH YEAR */}
      <p className='text-black font-semibold text-lg mx-auto'>{date.toLocaleString('default', { month: 'long' }).toUpperCase()} {date.getFullYear()}</p>

      {/* SU MO TU WE TH FR SA */}
      <div className='flex gap-2 p-4'>
        {days.map((day) => (
          <p key={day} className='font-semibold text-black text-sm mx-auto'>{day.substring(0,2).toUpperCase()}</p>
        ))}
      </div>

      {/* 1 2 3 ...*/}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({length: number_of_days[date.getMonth()] + firstPosition}).map((_, i) => (
          <div key={i} onClick={i<firstPosition? undefined : () => updateDate(date.getFullYear(), date.getMonth()+1, i+1-firstPosition)}>
              <My_Day day={i<firstPosition? "" : (i+1-firstPosition).toString()} isActive={i>=firstPosition && today <= new Date(date.getFullYear(), date.getMonth(), i-firstPosition)}/>
          </div>
        ))}
      </div>
    </div>
  )
}

// padStart(2, '0'): If input has 1 digit, pad 0
function Product_Delivery_Date({date, updateDate}) {
  const now = new Date()
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)

  return (
    <div className="relative py-5">
      <div className='flex justify-between items-center'>
        <p className="font-semibold">DELIVERY DATE</p>
        <div className='flex w-[60%] justify-between items-center border-1 px-4 py-2'>
          {date.Month ? `${String(date.Day).padStart(2, '0')}/${String(date.Month).padStart(2, '0')}/${date.Year}` :'Select a Date'}
          <div onClick={() => setIsOpenCalendar(!isOpenCalendar)}>
            <CalendarDays/>
          </div>
        </div>
      </div>

      {isOpenCalendar &&
      <div className='absolute z-100 w-[140%] bg-white shadow-lg top-20 right-0 translate-x-1/4 flex px-5 py-10 gap-5'>
        <My_Month date={now} updateDate={updateDate}/>
        <My_Month date={new Date(now.getFullYear(), now.getMonth()+1, 1)} updateDate={updateDate}/>
      </div>}
    </div>
)
}

export default Product_Delivery_Date