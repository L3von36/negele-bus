<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md bg-card p-8 rounded-2xl shadow-soft border border-border">
      
      <!-- Core Logo / Identity -->
      <div class="text-center mb-8">
        <img src="/favicon.png" alt="Logo" class="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 object-cover border border-border shadow-soft" />
        <h1 class="text-2xl font-bold text-text-primary tracking-tight">Staff Portal</h1>
        <p class="text-sm text-text-secondary mt-1">Sign in to manage transportation operations</p>
      </div>

      <!-- Auth Logic Feedback -->
      <div v-if="authError" class="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg text-center border border-red-100">
        {{ authError }}
      </div>

      <!-- Login Form Only (Account creation restricted to Supabase) -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-text-primary mb-1.5">Work Email</label>
          <input 
            v-model="email" 
            type="email" 
            class="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent" 
            placeholder="staff@negele.bus"
            required
          />
        </div>

        <div>
          <div class="flex justify-between items-center mb-1.5">
            <label class="block text-sm font-medium text-text-primary">Password</label>
            <a href="#" class="text-xs text-accent hover:underline">Forgot?</a>
          </div>
          <input 
            v-model="password" 
            type="password" 
            class="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent" 
            placeholder="••••••••"
            required
          />
        </div>

        <button 
          type="submit" 
          class="w-full bg-text-primary text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity mt-4 flex justify-center items-center h-12"
          :disabled="isLoading"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-else>Secure Sign In</span>
        </button>

        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-border"></div></div>
          <div class="relative flex justify-center text-xs uppercase"><span class="bg-card px-2 text-text-secondary font-bold">Or Demo Mode</span></div>
        </div>

        <button 
          @click="loginAsDemo"
          type="button"
          class="w-full bg-primary-100 text-text-primary font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors border border-border flex justify-center items-center h-12"
        >
          🚀 Instant Admin Demo
        </button>
      </form>

      <div class="mt-8 text-center text-[10px] text-text-secondary uppercase tracking-widest font-black opacity-30">
        &copy; 2026 NB Transport Authority. <br> Access is restricted to authorized staff.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '../stores/ui'

const router = useRouter()
const ui = useUiStore()
const isLoading = ref(false)
const authError = ref('')

const email = ref('')
const password = ref('')

const loginAsDemo = async () => {
  email.value = 'admin@negele.bus'
  password.value = 'admin123'
  await handleSubmit()
}

const handleSubmit = async () => {
  isLoading.value = true
  authError.value = ''
  
  try {
    await ui.signIn(email.value, password.value)
    
    const role = ui.userProfile?.role
    if (role === 'admin') {
      router.push('/admin')
    } else if (role === 'driver') {
      router.push('/driver')
    } else if (role === 'station_master') {
      router.push('/station')
    } else {
      router.push('/')
    }
  } catch (err) {
    authError.value = err.message || 'Authentication failed. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped></style>
