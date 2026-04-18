import { reactive } from 'vue'

// Lightweight global toast store. ToastHost renders from `toasts`; anywhere in
// the app can call `toast.error(...)` / `toast.success(...)` / `toast.info(...)`.
const state = reactive({ toasts: [] })

let nextId = 1
function push(type, message, { timeout = 4000 } = {}) {
  const id = nextId++
  state.toasts.push({ id, type, message })
  if (timeout) setTimeout(() => dismiss(id), timeout)
  return id
}

function dismiss(id) {
  const i = state.toasts.findIndex(t => t.id === id)
  if (i !== -1) state.toasts.splice(i, 1)
}

export const toast = {
  error:   (msg, opts) => push('error',   msg, opts),
  success: (msg, opts) => push('success', msg, opts),
  info:    (msg, opts) => push('info',    msg, opts),
  dismiss,
}

export const toastState = state
