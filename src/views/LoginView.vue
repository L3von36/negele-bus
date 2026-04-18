<template>
  <div class="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
    <div class="w-full max-w-sm">

      <!-- Brand -->
      <div class="text-center mb-8">
        <img src="/favicon.png" alt="Logo" class="w-12 h-12 mx-auto rounded-xl border border-white/10 mb-4 object-cover" />
        <h1 class="text-white font-bold text-xl tracking-tight">{{ t('brand_name') }}</h1>
        <p class="text-white/30 text-sm mt-1 uppercase tracking-widest text-[10px]">Staff Portal</p>
      </div>

      <!-- Card -->
      <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-7">

        <!-- Error -->
        <div v-if="authError" class="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
          <svg class="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <p class="text-red-400 text-sm">{{ authError }}</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1.5">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="staff@negele.bus"
              required
              autocomplete="username"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-accent/60 focus:border-accent/40 transition-all"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1.5">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                autocomplete="current-password"
                class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-accent/60 focus:border-accent/40 transition-all pr-11"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
              >
                <svg v-if="!showPassword" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-accent hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <span>{{ isLoading ? 'Signing in…' : 'Sign In' }}</span>
          </button>
        </form>

        <!-- Quick Fill — dev only, never shown in production -->
        <div v-if="isDev" class="mt-6 pt-5 border-t border-white/10">
          <p class="text-white/20 text-[10px] font-semibold uppercase tracking-widest text-center mb-3">Dev Quick Fill</p>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="fillDemo('admin')"
              type="button"
              :disabled="isLoading"
              class="flex flex-col items-center gap-1.5 py-3 px-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-xl transition-all disabled:opacity-40"
            >
              <svg class="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              <span class="text-white/60 text-[10px] font-semibold uppercase tracking-wide">Admin</span>
            </button>
            <button
              @click="fillDemo('driver')"
              type="button"
              :disabled="isLoading"
              class="flex flex-col items-center gap-1.5 py-3 px-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-xl transition-all disabled:opacity-40"
            >
              <svg class="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
              <span class="text-white/60 text-[10px] font-semibold uppercase tracking-wide">Driver</span>
            </button>
          </div>
        </div>
      </div>

      <p class="text-white/20 text-[10px] text-center mt-6 uppercase tracking-widest">
        © 2026 NB Transport Authority · Authorized Access Only
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store, t } from '../store.js'

const router = useRouter()
const isDev = computed(() => import.meta.env.DEV)
const isLoading = ref(false)
const authError = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

async function handleSubmit() {
  isLoading.value = true
  authError.value = ''
  try {
    await store.signIn(email.value, password.value)
    redirectByRole()
  } catch (err) {
    authError.value = mapError(err)
  } finally {
    isLoading.value = false
  }
}

// Just pre-fills the form — user still clicks Sign In
function fillDemo(role) {
  authError.value = ''
  if (role === 'admin') {
    email.value = 'admin@negele.bus'
    password.value = 'admin123'
  } else {
    email.value = 'ahmed@easyride.et'
    password.value = 'driver123'
  }
}

function mapError(err) {
  const msg = err?.message || ''
  if (msg.includes('Invalid login credentials')) return 'Incorrect email or password.'
  if (msg.includes('Email not confirmed')) return 'Please confirm your email before signing in.'
  if (msg.includes('setup incomplete')) return msg
  if (msg.includes('Legacy API') || err?.status === 401) {
    return 'Service configuration error. Check your Supabase API key.'
  }
  return msg || 'Sign in failed. Please try again.'
}

async function loginAsDemo(role) {
  isLoading.value = true
  authError.value = ''
  try {
    fillDemo(role)
    await store.signIn(email.value, password.value)
    redirectByRole()
  } catch (err) {
    authError.value = mapError(err)
  } finally {
    isLoading.value = false
  }
}

function redirectByRole() {
  const role = store.userProfile?.role
  const dest = {
    admin:          '/admin',
    driver:         '/driver',
    station_master: '/station',
    finance:        '/finance',
    authority:      '/authority',
    inspector:      '/inspector',
  }[role] || '/'
  router.push(dest)
}
</script>
