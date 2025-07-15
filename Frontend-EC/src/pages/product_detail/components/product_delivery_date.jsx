import React, { useState } from 'react';
import { useProductCalendar } from '../../../context/ProductCalendarContext';

const number_of_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function My_Day({day}) {

  return (
    <div>
      {day}
    </div>
  )
}

function My_Month({date}) {
  const firstPosition = (new Date(date.getFullYear(), date.getMonth(), 1)).getDay()
  const {updateDate} = useProductCalendar()

  return (
    <div>
      {/* MONTH YEAR */}
      <div>{date.toLocaleString('default', { month: 'long' }).toUpperCase()} {date.getFullYear()}</div>

      {/* SU MO TU WE TH FR SA */}
      <div className='flex gap-2 bg-blue-400'>
        {days.map((day) => (
          <p key={day}>{day.substring(0,2).toUpperCase()}</p>
        ))}
      </div>

      {/* 1 2 3 ...*/}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({length: number_of_days[date.getMonth()] + firstPosition}).map((_, i) => (
          <div key={i} onClick={i<firstPosition? undefined : () => updateDate(date.getFullYear(), date.getMonth()+1, i+1-firstPosition)}>
              <My_Day day={i<firstPosition? "" : (i+1-firstPosition).toString()}/>
          </div>
        ))}
      </div>
    </div>
  )
}

// padStart(2, '0'): If input has 1 digit, pad 0
function Product_Delivery_Date() {
  const now = new Date()
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const {date} = useProductCalendar()

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className=' flex border-2'>
        {date.Month ? `${String(date.Day).padStart(2, '0')}/${String(date.Month).padStart(2, '0')}/${date.Year}` :'Select a Date'}
        <div onClick={() => setIsOpenCalendar(!isOpenCalendar)}>
          {'CALENDAR'}
        </div>
      </div>

      {isOpenCalendar &&
      <div className='flex'>
        <My_Month date={now}/>
        <My_Month date={new Date(now.getFullYear(), now.getMonth()+1, 1)}/>
      </div>}
    </div>
)
}

export default Product_Delivery_Date