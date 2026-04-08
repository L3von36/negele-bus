<template>
  <div class="min-h-screen bg-background">

    <!-- Header -->
    <header class="bg-primary border-b border-border">
      <div class="flex justify-between items-center px-4 sm:px-6 py-4 max-w-7xl mx-auto">
        <div class="flex items-center space-x-3 cursor-pointer" @click="$router.back()">
          <div class="bg-accent rounded-lg w-9 h-9 flex items-center justify-center flex-shrink-0 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-bold text-text-primary leading-tight">{{ t('brand_name') }}</p>
            <p class="text-xs text-text-secondary">{{ t('brand_subtitle') }}</p>
          </div>
        </div>
        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Language Switcher -->
          <select 
            :value="store.activeLang" 
            @change="(e) => store.setLanguage(e.target.value)"
            class="custom-select bg-white text-text-primary text-xs rounded-lg px-2 py-1.5 border border-border focus:ring-0 outline-none hover:bg-gray-50 transition-colors"
          >
            <option value="en" class="text-black text-sm">EN</option>
            <option value="am" class="text-black text-sm">አማ</option>
            <option value="om" class="text-black text-sm">Orom</option>
          </select>
          <button class="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-md mx-auto px-4 sm:px-6 py-8">

      <!-- Page title -->
      <div class="text-center mb-6">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">{{ t('almost_there') }}</h2>
        <p class="text-text-secondary text-sm mt-1 font-medium">{{ t('sub_almost') }}</p>
      </div>

      <!-- Bus summary card -->
      <div class="bg-card rounded-xl border border-border shadow-soft p-4 sm:p-5 mb-5 animate-fade-in">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-bold text-text-primary text-sm">{{ busName }}</h3>
            <div class="flex items-center gap-1.5 mt-1.5 text-xs text-text-secondary">
              <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span>{{ t('cities.' + route.query.from) || from }} → {{ t('cities.' + route.query.to) || to }}</span>
            </div>
            <div class="flex items-center gap-3 mt-1 text-xs text-text-secondary">
              <div class="flex items-center gap-1">
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ depart }}
              </div>
              <span>·</span>
              <span>{{ t('seat') }} #{{ seat }}</span>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <span class="text-2xl font-bold text-accent">{{ price }}</span>
            <span class="text-xs text-text-secondary ml-0.5">ETB</span>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="space-y-4 mb-5 animate-fade-in">
        <div>
          <label class="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">{{ t('passenger') }}</label>
          <input 
            v-model="fullName" 
            type="text" 
            :placeholder="t('name_placeholder')"
            class="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>
        <div>
          <label class="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">{{ t('phone') }}</label>
          <input 
            v-model="phone" 
            type="tel" 
            :placeholder="t('phone_placeholder')"
            class="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
        </div>
      </div>

      <!-- Confirm button -->
      <button
        @click="confirmBooking"
        :disabled="!isFormValid"
        :class="isFormValid ? 'bg-accent text-white hover:bg-black hover:shadow-medium active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-border'"
        class="w-full font-bold py-4 rounded-xl transition-all duration-200 text-sm shadow-soft">
        {{ t('confirm_booking') }} — {{ price }} {{ t('etb_label') }}
      </button>

      <!-- Terms -->
      <p class="text-center text-xs text-text-secondary mt-4">
        {{ t('terms_agreement') }} <span class="underline cursor-pointer">{{ t('terms_of_service') }}</span>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store, t } from '../store.js'

const router = useRouter()
const route  = useRoute()

const busName = computed(() => route.query.bus    || 'Ethio Bus')
const price   = computed(() => route.query.price  || 300)
const from    = computed(() => route.query.from   || 'Negele Borena')
const to      = computed(() => route.query.to     || 'Hawassa')
const depart  = computed(() => route.query.depart || '06:00')
const seat    = computed(() => route.query.seat   || 1)
const date    = computed(() => route.query.date   || 'Tuesday, April 7')

const fullName = ref('')
const phone    = ref('')

const isFormValid = computed(() => {
  return fullName.value.trim().length > 0 && phone.value.trim().length > 0
})

function confirmBooking() {
  if (!fullName.value || !phone.value) return
  
  // Create booking record in store
  const newBookingId = String(1000 + store.bookings.length + 1)
  store.bookings.unshift({
    id: newBookingId,
    name: fullName.value,
    route: `${from.value} → ${to.value}`,
    date: date.value + ', ' + depart.value,
    amount: Number(price.value),
    status: 'Confirmed'
  })

  router.push({
    path: '/confirmation',
    query: {
      bus: busName.value, price: price.value, from: from.value,
      to: to.value, depart: depart.value, seat: seat.value,
      date: date.value, name: fullName.value, phone: phone.value,
      id: newBookingId
    }
  })
}
</script>

<style scoped></style>
