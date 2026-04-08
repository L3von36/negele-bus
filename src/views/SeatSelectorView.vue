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
            <p class="text-sm font-bold text-text-primary leading-tight">Negele Borena</p>
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

      <!-- Bus info -->
      <div class="text-center mb-6">
        <h2 class="text-lg sm:text-xl font-bold text-text-primary">{{ busName }}</h2>
        <p class="text-text-secondary text-sm mt-1">
          {{ t('cities.' + route.query.from) || from }} → {{ t('cities.' + route.query.to) || to }}
        </p>
        <p class="text-text-secondary text-xs mt-0.5">{{ totalSeats }} {{ t('seats_available') }}</p>
      </div>

      <!-- Legend -->
      <div class="flex items-center justify-center gap-5 mb-6">
        <div class="flex items-center gap-1.5">
          <div class="w-7 h-7 rounded-lg border-2 border-gray-200 bg-white"></div>
          <span class="text-xs text-text-secondary">{{ t('open') }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-7 h-7 rounded-lg bg-accent"></div>
          <span class="text-xs text-text-secondary">{{ t('yours') }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200"></div>
          <span class="text-xs text-text-secondary">{{ t('taken') }}</span>
        </div>
      </div>

      <!-- Seat Map -->
      <div class="bg-card rounded-2xl border border-border shadow-soft p-5 sm:p-6 animate-fade-in">
        <!-- Front label -->
        <div class="flex justify-center mb-5">
          <div class="bg-primary-100 text-text-primary border border-border text-xs font-bold px-5 py-1.5 rounded-full flex items-center gap-1.5">
            <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-6a1 1 0 00-.293-.707l-3-3A1 1 0 0016 4H3z"/>
            </svg>
            {{ t('front') }}
          </div>
        </div>

        <!-- Seats grid: pairs left | aisle | pairs right -->
        <div class="space-y-2">
          <template v-for="row in seatRows" :key="row[0]">
            <div class="flex items-center justify-center gap-1.5 sm:gap-2">
              <!-- Left pair -->
              <button
                v-for="n in row.slice(0,2)" :key="n"
                @click="selectSeat(n)"
                :disabled="takenSeats.includes(n)"
                :class="seatClass(n)"
                class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-sm font-semibold transition-all active:scale-95">
                {{ n }}
              </button>
              <!-- Aisle -->
              <div class="w-4 sm:w-6"></div>
              <!-- Right pair -->
              <button
                v-for="n in row.slice(2,4)" :key="n"
                @click="selectSeat(n)"
                :disabled="takenSeats.includes(n)"
                :class="seatClass(n)"
                class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-sm font-semibold transition-all active:scale-95">
                {{ n }}
              </button>
            </div>
          </template>
          <!-- Last single seat if odd -->
          <div v-if="lastSeat" class="flex justify-center">
            <button
              @click="selectSeat(lastSeat)"
              :disabled="takenSeats.includes(lastSeat)"
              :class="seatClass(lastSeat)"
              class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-sm font-semibold transition-all active:scale-95">
              {{ lastSeat }}
            </button>
          </div>
        </div>
      </div>

      <!-- Continue button -->
      <div class="mt-6 sticky bottom-4">
          <button
            @click="confirmSeat"
            :disabled="!selectedSeat"
            :class="selectedSeat ? 'bg-accent text-white hover:bg-black hover:shadow-medium active:scale-95' : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-border'"
            class="w-full font-bold py-4 rounded-xl transition-all duration-200 text-sm">
            {{ selectedSeat ? `${t('confirm_booking')} — #${selectedSeat}` : t('select_seat') }}
          </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store, t } from '../store.js'

const router = useRouter()
const route  = useRoute()

const busName   = computed(() => route.query.bus    || 'Ethio Bus')
const price     = computed(() => route.query.price  || 300)
const from      = computed(() => route.query.from   || 'Negele Borena')
const to        = computed(() => route.query.to     || 'Hawassa')
const depart    = computed(() => route.query.depart || '06:00')
const arrive    = computed(() => route.query.arrive || '11:45')
const date      = computed(() => route.query.date   || t('date'))
const routeId   = computed(() => route.query.routeId || 'R2')
const totalSeats = 44

// Get taken seats from store (admin blocked) + some mock stable taken seats
const takenSeats = computed(() => {
  const baseTaken = [3, 7, 19, 30, 41]
  if (!routeId.value) return baseTaken
  
  const targetRoute = store.routes.find(r => r.id === routeId.value)
  if (!targetRoute || !targetRoute.blockedSeats) return baseTaken
  
  // Combine mock taken with actual admin-blocked seats
  return [...new Set([...baseTaken, ...targetRoute.blockedSeats])]
})

const selectedSeat = ref(null)

// Build rows of 4 seats each
const allSeats = Array.from({ length: totalSeats }, (_, i) => i + 1)
const seatRows = computed(() => {
  const rows = []
  for (let i = 0; i < allSeats.length - (allSeats.length % 4 !== 0 ? allSeats.length % 4 : 0); i += 4) {
    rows.push(allSeats.slice(i, i + 4))
  }
  return rows
})
const lastSeat = computed(() => {
  const rem = allSeats.length % 4
  return rem === 1 ? allSeats[allSeats.length - 1] : null
})

function seatClass(n) {
  if (n === selectedSeat.value)         return 'bg-accent text-white border-accent shadow-sm scale-110 z-10'
  if (takenSeats.value.includes(n))      return 'bg-primary-100 text-text-secondary opacity-60 cursor-not-allowed border border-border'
  return 'bg-card border border-border text-text-primary hover:border-text-primary hover:shadow-sm'
}

function selectSeat(n) {
  if (takenSeats.value.includes(n)) return
  selectedSeat.value = selectedSeat.value === n ? null : n
}

function confirmSeat() {
  if (!selectedSeat.value) return
  router.push({
    path: '/booking',
    query: {
      bus: busName.value, price: price.value, from: from.value,
      to: to.value, depart: depart.value, seat: selectedSeat.value, date: date.value
    }
  })
}
</script>

<style scoped></style>
