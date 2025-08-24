import { createContext, useCallback, useContext, useEffect, useState } from "react";

const DynamicPricingContext = createContext()

const holidays = [
  ["New Year’s Day", "2025-01-01"],
  ["Vietnamese Communist Party Foundation Day", "2025-02-03"],
  ["Tet Holiday (Vietnamese Lunar New Year’s Eve)", "2025-01-28"],
  ["Tet Holiday (Lunar New Year, Day 1)", "2025-01-29"],
  ["Tet Holiday (Day 2)", "2025-01-30"],
  ["Tet Holiday (Day 3)", "2025-01-31"],
  ["Tet Holiday (Day 4)", "2025-02-01"],
  ["Hung Kings Commemoration Day", "2025-04-10"],
  ["Reunification Day", "2025-04-30"],
  ["International Workers’ Day", "2025-05-01"],
  ["Vietnamese Family Day", "2025-06-28"],
  ["War Invalids and Martyrs Day", "2025-07-27"],
  ["August Revolution Commemoration", "2025-08-19"],
  ["National Day", "2025-09-02"],
  ["Vietnamese Women’s Day", "2025-10-20"],
  ["Teachers’ Day", "2025-11-20"],
  ["People’s Army of Vietnam Foundation Day", "2025-12-22"],
  ["Christmas Day", "2025-12-25"],
  ["Mid-Autumn Festival", "2025-09-06"],
  ["Independence Proclamation Anniversary", "2025-09-02"]
]

export function DynamicPricingProvider({children}) {
    // multiplier change by time
    // base change by day
    const [multiplier, setMultiplier] = useState(1)
    const [base, setBase] = useState(1)
    const condition_mapping = {
        'New arrive': 'bg-purple-400/70 hover:bg-purple',
        'Fresh': 'bg-green-400/70 hover:bg-green-400',
        'Hot deal': 'bg-orange-400/70 hover:bg-orange-400',
        'Old': 'hidden'
    }

    useEffect(() => {
        computeDynamicPrice()
    }, [])


    function computeDynamicPrice() {
        // compute for general rule, not include the condition of each product here
        // const day = today.toISOString().split("T")[0] // yyyy-mm-dd
        const today = new Date()
        const hour = (today).getHours()

        // check holiday interval (10 days before)
        let holidayBase = base
        for (const [name, hDate] of holidays) {
            const h = new Date(hDate)
            const diffDays = (h - today) / (1000 * 60 * 60 * 24) // h-today: millisecond => convert to day

            if (diffDays >= 0 && diffDays <= 10) {
                holidayBase = base * (1 + 0.02 * (10 - Math.floor(diffDays)));
                break; // take nearest holiday
            }
        }

        // weekend rule (not apply this when in holiday interval)
        // if holidayBase not change => not in holiday interval
        let effectiveBase = holidayBase
        if (effectiveBase === base) {
            const weekday = today.getDay() // 0=Sun, 6=Sat
            if (weekday === 0 || weekday === 6) effectiveBase *= 1.2;
        }

        // multiplier by time in day
        let newMultiplier = 1
        if (hour >= 8 && hour < 12) {
            newMultiplier = 1 + 0.1 * ((hour - 8) / 4);
        } else if (hour >= 12 && hour < 16) {
            newMultiplier = 1.1 - 0.1 * ((hour - 12) / 4);
        } else if (hour >= 16 && hour < 24) {
            newMultiplier = 1 - 0.1 * ((hour - 16) / 8);
        } else if (hour >= 0 && hour < 8) {
            newMultiplier = 0.9 + 0.1 * (hour / 8);
        }

        setBase(effectiveBase)
        setMultiplier(newMultiplier)
        
    }

    function getDiffDays(date) {
        return (new Date() - new Date(date)) / (1000 * 60 * 60 * 24) 
    }

    function getCondition(fillStockDate) {
        const diffDays = getDiffDays(fillStockDate)
        if (diffDays<5) return 'New arrive'
        if (5<diffDays && diffDays<10) return 'Fresh'
        if (10<diffDays && diffDays<15) return 'Hot deal'
        return 'Old'
    } 

    const getDynamicPrice = useCallback((price, fillStockDate) => {
        const diffDays = getDiffDays(fillStockDate)
        let baseStockDate = 1

        if (diffDays<5) baseStockDate = 1 + 0.2*(4-diffDays)/4
        else if (diffDays>5 && diffDays<10) baseStockDate = 1 - 0.2*(10-diffDays)/5
        else baseStockDate = 1-0.5*(14-diffDays)/14

        return Math.round(100*(price*base*multiplier*baseStockDate),2)/100
    }, [base, multiplier])

    function getHoliday() {
        for (const [name, hDate] of holidays) {
            const h = new Date(hDate)
            const diffDays = (h - new Date()) / (1000 * 60 * 60 * 24) 

            if (diffDays >= 0 && diffDays <= 10) return name
        }
    }

    return(
        <DynamicPricingContext.Provider value={{condition_mapping, getCondition, getDiffDays, getDynamicPrice, getHoliday}}>
            {children}
        </DynamicPricingContext.Provider>
    )
}

export const useDynamicPricing = () => useContext(DynamicPricingContext)

