<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-md bg-card p-8 rounded-2xl shadow-soft border border-border">
      
      <!-- Core Logo / Identity -->
      <div class="text-center mb-8">
        <div class="bg-accent rounded-xl w-14 h-14 mx-auto flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16l-4-4m8 0l-4 4m0-4V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-text-primary tracking-tight">
          {{ isSignUp ? 'Create Staff Account' : 'Portal Login' }}
        </h1>
        <p class="text-sm text-text-secondary mt-1">
          {{ isSignUp ? 'Register a new administrator or driver' : 'Sign in to manage transportation ops' }}
        </p>
      </div>

      <!-- Auth Logic Feedback -->
      <div v-if="authError" class="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg text-center border border-red-100">
        {{ authError }}
      </div>
      <div v-if="successMsg" class="mb-4 p-3 bg-green-50 text-green-600 text-sm font-medium rounded-lg text-center border border-green-100">
        {{ successMsg }}
      </div>

      <!-- Login / SignUp Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-if="isSignUp">
          <label class="block text-sm font-medium text-text-primary mb-1.5">Full Name</label>
          <input 
            v-model="fullName" 
            type="text" 
            class="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent" 
            placeholder="E.g. Abebe Balcha"
            required
          />
        </div>

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
            <a v-if="!isSignUp" href="#" class="text-xs text-accent hover:underline">Forgot?</a>
          </div>
          <input 
            v-model="password" 
            type="password" 
            class="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent" 
            placeholder="••••••••"
            required
          />
        </div>

        <!-- Role Select (Sign Up Only) -->
        <div v-if="isSignUp">
          <label class="block text-sm font-medium text-text-primary mb-1.5">Assigned Role</label>
          <select v-model="role" class="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent custom-select">
            <option value="driver">Driver (Manifests Only)</option>
            <option value="admin">Administrator (Full Access)</option>
          </select>
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
          <span v-else>{{ isSignUp ? 'Create Staff ID' : 'Sign In' }}</span>
        </button>
      </form>

      <!-- Toggle Mode -->
      <div class="mt-6 text-center">
        <button @click="isSignUp = !isSignUp" class="text-xs text-accent font-bold hover:underline">
          {{ isSignUp ? 'Already have an account? Log In' : 'Need a new staff account? Sign Up' }}
        </button>
      </div>

      <div class="mt-8 text-center text-[10px] text-text-secondary uppercase tracking-widest font-black opacity-50">
        &copy; 2026 NB Transport Authority. Restricted.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'
import { supabase } from '../lib/supabase.js'

const router = useRouter()
const isSignUp = ref(false)
const isLoading = ref(false)
const authError = ref('')
const successMsg = ref('')

const email = ref('')
const password = ref('')
const fullName = ref('')
const role = ref('driver')

const handleSubmit = async () => {
  isLoading.value = true
  authError.value = ''
  successMsg.value = ''
  
  try {
    if (isSignUp.value) {
      // Sign Up Logic
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            full_name: fullName.value,
            role: role.value
          }
        }
      })
      if (error) throw error
      successMsg.value = 'Account created! Please verify your email or log in.'
      isSignUp.value = false
    } else {
      // Login Logic
      await store.signIn(email.value, password.value)
      
      // Navigate based on role (after store.init/authChange)
      setTimeout(() => {
        if (store.userProfile?.role === 'admin') router.push('/admin')
        else router.push('/driver')
      }, 500)
    }
  } catch (err) {
    authError.value = err.message || 'Authentication failed.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
