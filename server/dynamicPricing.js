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

function computeBaseAndMultiplier() {
  const today = new Date()
  const hour = today.getHours()
  let base = 1

  // holiday adjustment (within 10 days)
  for (const [_, hDate] of holidays) {
    const diffDays = (new Date(hDate) - today) / (1000 * 60 * 60 * 24)
    if (diffDays >= 0 && diffDays <= 10) {
      base *= 1 + 0.02 * (10 - Math.floor(diffDays))
      break
    }
  }

  // weekend rule (if not in holiday)
  if (base === 1) {
    const weekday = today.getDay()
    if (weekday === 0 || weekday === 6) base *= 1.2
  }

  // hourly multiplier
  let multiplier = 1
  if (hour >= 8 && hour < 12) {
    multiplier = 1 + 0.1 * ((hour - 8) / 4)
  } else if (hour >= 12 && hour < 16) {
    multiplier = 1.1 - 0.1 * ((hour - 12) / 4)
  } else if (hour >= 16 && hour < 24) {
    multiplier = 1 - 0.1 * ((hour - 16) / 8)
  } else {
    multiplier = 0.9 + 0.1 * (hour / 8)
  }

  return { base, multiplier }
}

function getDiffDays(date) {
  return (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
}

function getCondition(fillStockDate) {
  const diff = getDiffDays(fillStockDate)
  if (diff < 5) return "New arrive"
  if (diff < 10) return "Fresh"
  if (diff < 15) return "Hot deal"
  return "Old"
}

function getDynamicPrice(price, fillStockDate) {
  const { base, multiplier } = computeBaseAndMultiplier()
  const diff = getDiffDays(fillStockDate)

  let stockFactor = 1
  if (diff < 5) stockFactor = 1 + 0.2 * (4 - diff) / 4
  else if (diff < 10) stockFactor = 1 - 0.2 * (10 - diff) / 5
  else stockFactor = 1 - 0.5 * (14 - diff) / 14

  return Math.round(price * base * multiplier * stockFactor * 100) / 100
}

module.exports = { getDynamicPrice, getCondition }
