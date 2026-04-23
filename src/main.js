import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import * as Sentry from '@sentry/vue'
import posthog from 'posthog-js'
import './style.css'
import App from './App.vue'
import router from './router'
import { useUiStore } from './stores/ui'
import { toast } from './lib/toast'
import { registerSW } from 'virtual:pwa-register'

// Register PWA Service Worker
registerSW({ immediate: true })

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(VueQueryPlugin)

// Initialize Sentry
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}

// Initialize PostHog
if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
    autocapture: true
  })
}

// Top-level error boundary
app.config.errorHandler = (err, instance, info) => {
  console.error('[vue.errorHandler]', err, info)
  try { Sentry.captureException(err, { extra: { info } }) } catch (_) {}
  toast.error('Something went wrong. The team has been notified.')
}

window.addEventListener('unhandledrejection', (event) => {
  try { Sentry.captureException(event.reason) } catch (_) {}
})

window.addEventListener('offline', () => toast.error('You are offline. Bookings may fail until you reconnect.', { timeout: 0 }))
window.addEventListener('online',  () => toast.success('Back online.'))

// Initialize UI Store (Auth check)
const ui = useUiStore()
ui.init()

app.use(router).mount('#app')