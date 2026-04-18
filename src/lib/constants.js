// Single source of truth for booking status values. One typo here beats a
// typo scattered across eight files.
export const BOOKING_STATUS = Object.freeze({
  CONFIRMED: 'Confirmed',
  CANCELED:  'Canceled',
  COMPLETED: 'Completed',
})

export const BUS_STATUS = Object.freeze({
  ACTIVE:      'Active',
  MAINTENANCE: 'Maintenance',
})

// Ethiopian phone formats: +2519xxxxxxxx, +2517xxxxxxxx, 09xxxxxxxx, 07xxxxxxxx.
const PHONE_RE = /^(?:\+251|0)(?:9|7)\d{8}$/
export const validatePhone = (phone) => PHONE_RE.test(String(phone).replace(/[\s-]/g, ''))

// Name: letters (incl. Amharic/Ge'ez and Latin), spaces, apostrophes, hyphens.
// 2–60 chars. Reject anything that looks like an attempt to inject HTML.
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s'\-.]{1,59}$/u
export const validateName = (name) => NAME_RE.test(String(name).trim())

// Last-line-of-defence sanitiser for values we echo back into the DOM via
// query strings. The real fix is proper escaping; this is belt-and-braces.
export const sanitize = (s) => String(s ?? '').replace(/[<>"]/g, '').trim()
