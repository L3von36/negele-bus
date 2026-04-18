import { createApp } from 'vue'
import * as Sentry from '@sentry/vue'
import posthog from 'posthog-js'
import './style.css'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { toast } from './lib/toast'
import { registerSW } from 'virtual:pwa-register'

// Register PWA Service Worker
registerSW({ immediate: true })

const app = createApp(App)

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

// Top-level error boundary: a component that throws during render shouldn't
// white-screen the whole app. Capture to Sentry and show the user a toast.
app.config.errorHandler = (err, instance, info) => {
  console.error('[vue.errorHandler]', err, info)
  try { Sentry.captureException(err, { extra: { info } }) } catch (_) {}
  toast.error('Something went wrong. The team has been notified.')
}

window.addEventListener('unhandledrejection', (event) => {
  try { Sentry.captureException(event.reason) } catch (_) {}
})

// Online/offline indicator. The PWA was registered above but the app had no
// way to surface connectivity loss to the user.
window.addEventListener('offline', () => toast.error('You are offline. Bookings may fail until you reconnect.', { timeout: 0 }))
window.addEventListener('online',  () => toast.success('Back online.'))

// Initialize Supabase data and subscriptions
store.init()

app.use(router).mount('#app')