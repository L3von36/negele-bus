<template>
  <div class="min-h-screen bg-background">

    <!-- Header -->
    <MainHeader showBack />

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

      <!-- No buses empty state -->
      <div v-if="matchingRoute && buses.length === 0" class="text-center py-16 animate-fade-in">
        <svg class="w-12 h-12 text-text-secondary/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
        </svg>
        <p class="text-text-primary font-bold mb-1">No buses on this route yet</p>
        <p class="text-text-secondary text-sm">Check back later or try a different date.</p>
      </div>

      <!-- No route match -->
      <div v-if="!matchingRoute" class="text-center py-16 animate-fade-in">
        <p class="text-text-primary font-bold mb-1">Route not found</p>
        <p class="text-text-secondary text-sm">We don't operate on this route yet.</p>
      </div>

      <!-- Bus Cards -->
      <div class="space-y-4">
        <div v-for="bus in buses" :key="bus.id"
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
          <AppButton
            fullWidth
            @click="selectBus(bus)"
          >
            {{ t('select_seat') }} →
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store, t } from '../store.js'
import { useMeta } from '../lib/useMeta.js'
import MainHeader from '../components/MainHeader.vue'
import AppButton from '../components/AppButton.vue'

const router = useRouter()
const routeQuery = useRoute()
const { setMeta } = useMeta()

const from = computed(() => routeQuery.query.from || 'Addis Ababa')
const to   = computed(() => routeQuery.query.to   || 'Hawassa')
const dateInitial = computed(() => routeQuery.query.date || 'Today')

import { formatEthiopian } from '../lib/ethiopianCalendar.js'
const dateDisplay = computed(() => {
  const d = dateInitial.value === 'Today' ? new Date() : new Date(dateInitial.value)
  return formatEthiopian(d, store, t)
})
// For internal logic/meta, we still use the searchable date or its display version where appropriate
const date = dateDisplay // Use display version for the card UI

onMounted(() => {
  const fromName = routeQuery.query.from ? t('cities.' + routeQuery.query.from) : from.value
  const toName = routeQuery.query.to ? t('cities.' + routeQuery.query.to) : to.value
  
  setMeta(
    `Buses from ${fromName} to ${toName}`, 
    `Compare bus prices and schedules from ${fromName} to ${toName} for ${date.value}. Book your seat online with Negele Easy Ride.`
  )
})

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

// Departure time slots — assigned per bus index since schedules aren't in DB yet
const DEPARTURE_SLOTS = ['06:00', '08:30', '12:00', '14:00', '16:30']

function parseDurationToMinutes(str) {
  if (!str || str === '---') return 0
  const h = Number((str.match(/(\d+)\s*h/) || [])[1] || 0)
  const m = Number((str.match(/(\d+)\s*m/) || [])[1] || 0)
  return h * 60 + m
}

function addMinutesToTime(time, minutes) {
  if (!minutes) return '—'
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + minutes
  return `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

// Real buses from DB filtered by route assignment
const buses = computed(() => {
  if (!matchingRoute.value) return []
  const routeBuses = store.buses.filter(b =>
    b.route_id === matchingRoute.value.id && b.status !== 'Maintenance'
  )
  const durationMins = parseDurationToMinutes(matchingRoute.value.duration)
  return routeBuses.map((bus, i) => {
    const depart = DEPARTURE_SLOTS[i % DEPARTURE_SLOTS.length]
    return {
      id: bus.id,
      name: bus.plate,
      type: bus.capacity >= 40 ? 'Standard' : 'Executive',
      seats: bus.capacity,
      price: matchingRoute.value.price,
      depart,
      arrive: addMinutesToTime(depart, durationMins),
      busId: bus.id,
      capacity: bus.capacity,
    }
  })
})

function selectBus(bus) {
  router.push({
    path: '/seat-selector',
    query: {
      bus: bus.name,
      busId: bus.busId,
      capacity: bus.capacity,
      price: bus.price,
      from: from.value,
      to: to.value,
      depart: bus.depart,
      arrive: bus.arrive,
      date: dateInitial.value,   // Gregorian date for filtering
      dateDisplay: date.value,   // Ethiopian date for display
      routeId: matchingRoute.value?.id
    }
  })
}
</script>

<style scoped></style>