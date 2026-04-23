/**
 * Simple Ethiopian Calendar Utility for Negele Easy Ride.
 * Hand-rolled logic for GC <-> EC conversion (1900-2100).
 */

const ET_MONTHS_EN = [
  'Meskerem', 'Tekemt', 'Hidar', 'Tahsas', 'Tir', 'Yakatit',
  'Magabit', 'Miyazya', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'
]

/**
 * Returns the Ethiopian date for a given Gregorian Date object.
 */
export function toEthiopianDate(date) {
  const jdn = Math.floor(date.getTime() / 86400000) + 2440588 // Julian Day Number
  
  const era = 1723856 // Ethiopian Epoch JDN
  const r = (jdn - era) % 1461
  const n = (r % 365) + 365 * Math.floor(r / 1460)
  
  const etYear = 4 * Math.floor((jdn - era) / 1461) + Math.floor(r / 365) - Math.floor(r / 1460)
  const etMonth = Math.floor(n / 30) + 1
  const etDay = (n % 30) + 1
  
  return {
    year: etYear,
    month: etMonth,
    day: etDay,
    monthName: ET_MONTHS_EN[etMonth - 1]
  }
}

/**
 * Returns a Gregorian Date object for a given Ethiopian Year, Month (1-13), Day (1-30).
 */
export function toGregorianDate(year, month, day) {
  const era = 1723856
  const jdn = (era + (year - 1) * 365 + Math.floor(year / 4) + (month - 1) * 30 + day - 1)
  
  return new Date((jdn - 2440588) * 86400000)
}

/**
 * Formats an Ethiopian date based on the active language.
 */
export function formatEthiopian(date, t) {
  if (!date) return ''
  const et = toEthiopianDate(new Date(date))
  
  // Try to find localized month name
  const monthKey = `onboarding.month_${et.month}`
  const monthName = t ? t(monthKey) : ET_MONTHS_EN[et.month - 1]
  
  return `${monthName} ${et.day}, ${et.year}`
}

/**
 * Get current Ethiopian Date info
 */
export function currentEthiopian() {
  return toEthiopianDate(new Date())
}

/**
 * Returns an array of formatted Ethiopian dates for the last N days (for charts).
 */
export function getRecentEthiopianDates(days, t) {
  const dates = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    dates.push(formatEthiopian(d, t))
  }
  return dates
}

