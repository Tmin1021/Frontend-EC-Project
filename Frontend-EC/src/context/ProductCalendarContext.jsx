import React, { createContext, useContext, useState } from 'react'

const ProductCalendarContext = createContext()

export function ProductCalendarProvider({children}) {
  const [date, setDate] = useState({Year: 2025, Month: 0, Day: 1})

  const updateDate = (year, month, day) => {
    const new_date = {
      Year: year,
      Month: month,
      Day: day };
    
    setDate(new_date)
  }

  return (
    <ProductCalendarContext.Provider value={{date, updateDate}}>
        {children}
    </ProductCalendarContext.Provider>
  )
}

export const useProductCalendar = () => useContext(ProductCalendarContext)