<template>
  <div class="min-h-screen bg-background">

    <!-- Header -->
    <header class="bg-primary border-b border-border">
      <div class="flex justify-between items-center px-4 sm:px-6 py-4 max-w-7xl mx-auto">
        <div class="flex items-center space-x-3 cursor-pointer" @click="$router.push('/')">
          <div class="bg-accent rounded-lg w-9 h-9 flex items-center justify-center flex-shrink-0 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17l4-4m0 0l4-4m-4 4V3m0 14a9 9 0 110-18 9 9 0 010 18z" />
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
            <option value="en" class="text-black">EN</option>
            <option value="am" class="text-black">አማ</option>
            <option value="om" class="text-black">Orom</option>
          </select>
          <button class="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-2xl mx-auto px-4 sm:px-6 py-6">

      <!-- Route Summary Card -->
      <div class="bg-card rounded-xl border border-border shadow-soft overflow-hidden mb-4 animate-fade-in">
        <div class="p-4 sm:p-5">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-2">
              <!-- Departure -->
              <div class="flex items-center gap-2">
                <svg class="h-4 w-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-text-primary font-bold text-sm sm:text-base">{{ (routeQuery.query.from ? t('cities.' + routeQuery.query.from) : null) || from }}</span>
              </div>
              <!-- Line connector -->
              <div class="flex items-center gap-2 ml-[9px]">
                <div class="w-px h-4 bg-border"></div>
              </div>
              <!-- Destination -->
              <div class="flex items-center gap-2">
                <svg class="h-4 w-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-text-primary font-bold text-sm sm:text-base">{{ (routeQuery.query.to ? t('cities.' + routeQuery.query.to) : null) || to }}</span>
              </div>
            </div>
            <!-- Distance + Duration -->
            <div class="text-right flex-shrink-0" v-if="matchingRoute">
              <p class="text-text-secondary text-xs font-medium">{{ matchingRoute.distance }}</p>
              <p class="text-text-secondary text-xs mt-1 font-medium">{{ matchingRoute.duration }}</p>
            </div>
          </div>
        </div>
        <!-- Date row -->
        <div class="bg-primary-100 border-t border-border px-4 sm:px-5 py-2.5 flex items-center gap-2">
          <svg class="h-3.5 w-3.5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <span class="text-text-secondary text-xs font-semibold uppercase tracking-wider">{{ date }}</span>
        </div>
      </div>

      <!-- Results count -->
      <p class="text-xs text-text-secondary mb-4">{{ buses.length }} {{ t('buses_available') }}</p>

      <!-- Bus Cards -->
      <div class="space-y-4">
        <div v-for="bus in buses" :key="bus.name"
          class="bg-card rounded-xl border border-border shadow-soft p-4 sm:p-5 hover:shadow-medium hover:-translate-y-1 hover:border-text-primary transition-all duration-300 group animate-fade-in relative overflow-hidden">
          
          <!-- Top row: name + price -->
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="font-extrabold text-text-primary text-base sm:text-lg">{{ bus.name }}</h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs font-medium text-text-secondary border border-border px-2 py-0.5 rounded-full">{{ bus.seats }} {{ t('seats_available') }}</span>
                <span v-if="bus.type === 'VIP'" class="bg-primary-100 text-text-primary border border-text-primary text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">VIP</span>
              </div>
            </div>
            <div class="text-right flex-shrink-0">
              <span class="text-2xl font-extrabold text-text-primary">{{ bus.price }}</span>
              <span class="text-xs font-bold text-text-secondary ml-1">ETB</span>
            </div>
          </div>

          <!-- Timeline -->
          <div class="flex items-center gap-3 my-6">
            <div class="text-center w-14">
              <p class="text-lg font-bold text-text-primary bg-primary-100 rounded-md py-1">{{ bus.depart }}</p>
              <p class="text-[10px] uppercase tracking-wider font-bold text-text-secondary mt-1">{{ t('depart_label') }}</p>
            </div>
            <div class="flex-1 flex items-center relative h-1.5 bg-primary-100 rounded-full mx-2">
              <div class="absolute left-0 w-1/2 h-full bg-border rounded-l-full"></div>
              <div class="absolute left-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 bg-white border-2 border-border shadow-sm rounded-full"></div>
            </div>
            <div class="text-center w-14">
              <p class="text-lg font-bold text-text-primary bg-primary-100 rounded-md py-1">{{ bus.arrive }}</p>
              <p class="text-[10px] uppercase tracking-wider font-bold text-text-secondary mt-1">{{ t('arrive_label') }}</p>
            </div>
          </div>

          <!-- CTA -->
          <button
            @click="selectBus(bus)"
            class="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-black active:scale-95 hover:shadow-medium transition-all duration-200 text-sm">
            {{ t('select_seat') }} →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store, t } from '../store.js'

const router = useRouter()
const routeQuery = useRoute()

const from = computed(() => routeQuery.query.from || 'Addis Ababa')
const to   = computed(() => routeQuery.query.to   || 'Hawassa')
const date = computed(() => routeQuery.query.date || 'Today')

// Find the matching route in our store
const matchingRoute = computed(() => {
  // Try finding route by slugs first if possible, then fall back to name matching
  const fromVal = routeQuery.query.from || ''
  const toVal   = routeQuery.query.to   || ''
  
  return store.routes.find(r => {
    // Check if the input is a slug (key in our cities dict)
    const isFromId = Object.keys(store.translations.en.cities).includes(fromVal)
    const isToId   = Object.keys(store.translations.en.cities).includes(toVal)
    
    // Normalize r.from/r.to to slugs for comparison
    const rFromSlug = Object.keys(store.translations.en.cities).find(k => store.translations.en.cities[k] === r.from)
    const rToSlug   = Object.keys(store.translations.en.cities).find(k => store.translations.en.cities[k] === r.to)

    const fromMatch = isFromId ? fromVal === rFromSlug : fromVal.toLowerCase() === r.from.toLowerCase()
    const toMatch   = isToId   ? toVal   === rToSlug   : toVal.toLowerCase()   === r.to.toLowerCase()
    
    return fromMatch && toMatch
  }) || store.routes[1] // Fallback to Negele -> Addis for demo if no match
})

// Create "Buses" mock search results based on the route found
const buses = computed(() => {
  if (!matchingRoute.value) return []
  
  // We'll generate a few mock trips for this route
  return [
    { name: 'Negele Express', type: 'Standard', seats: 44, price: matchingRoute.value.price, depart: '06:00', arrive: '10:30', id: 'B1' },
    { name: 'Sky Bus', type: 'VIP', seats: 32, price: Math.round(matchingRoute.value.price * 1.25), depart: '08:30', arrive: '13:00', id: 'B2' },
    { name: 'Selam Bus', type: 'Standard', seats: 44, price: matchingRoute.value.price, depart: '14:00', arrive: '18:30', id: 'B3' }
  ]
})

function selectBus(bus) {
  router.push({
    path: '/seat-selector',
    query: { 
      bus: bus.name, 
      price: bus.price, 
      from: from.value, 
      to: to.value, 
      depart: bus.depart, 
      arrive: bus.arrive, 
      date: date.value,
      routeId: matchingRoute.value?.id
    }
  })
}
</script>

<style scoped></style>