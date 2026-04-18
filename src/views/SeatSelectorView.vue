<template>
  <div class="min-h-screen bg-background">

    <!-- Header -->
    <MainHeader showBack />

    <div class="max-w-md mx-auto px-4 sm:px-6 py-8">

      <!-- Bus info -->
      <div class="text-center mb-6">
        <h2 class="text-lg sm:text-xl font-bold text-text-primary">{{ busName }}</h2>
        <p class="text-text-secondary text-sm mt-1">{{ fromDisplay }} → {{ toDisplay }}</p>
        <p class="text-text-secondary text-xs mt-0.5">{{ capacity }} {{ t('seats_available') }}</p>
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
          <AppButton
            fullWidth
            @click="confirmSeat"
            :disabled="!selectedSeat"
          >
            {{ selectedSeat ? `${t('confirm_booking')} — #${selectedSeat}` : t('select_seat') }}
          </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store, t } from '../store.js'
import MainHeader from '../components/MainHeader.vue'
import AppButton from '../components/AppButton.vue'
import { formatEthiopian } from '../lib/ethiopianCalendar.js'

const router = useRouter()
const route  = useRoute()

const busName  = computed(() => route.query.bus     || 'Ethio Bus')
const price    = computed(() => route.query.price   || 300)
const from     = computed(() => route.query.from    || 'negele-borena')
const to       = computed(() => route.query.to      || 'hawassa')
const depart   = computed(() => route.query.depart  || '06:00')
const arrive   = computed(() => route.query.arrive  || '—')
const routeId  = computed(() => route.query.routeId || '')
const capacity = computed(() => Number(route.query.capacity) || 44)

// Dates — SearchResultsView now sends both dateRaw (Gregorian) and dateDisplay (Ethiopian)
const dateRaw     = computed(() => route.query.date     || new Date().toISOString().split('T')[0])
const dateDisplay = computed(() => route.query.dateDisplay || formatEthiopian(new Date(dateRaw.value), store, t))
const date        = dateDisplay

// Route string uses display names so it matches what BookingView stores
const fromDisplay = computed(() => t('cities.' + from.value) || from.value)
const toDisplay   = computed(() => t('cities.' + to.value)   || to.value)

// Get taken seats from live bookings (real-time from Supabase) + admin-blocked seats
const takenSeats = computed(() => {
  const routeStr   = `${fromDisplay.value} → ${toDisplay.value}`
  // BookingView stores: dateRaw + ', ' + depart — match exactly so seats from a
  // different departure time on the same day don't bleed through.
  const dateDepart = dateRaw.value + ', ' + depart.value

  const bookedSeats = store.bookings
    .filter(b =>
      b.status === 'Confirmed' &&
      b.route === routeStr &&
      b.date === dateDepart
    )
    .map(b => Number(b.seat_number))
    .filter(Boolean)

  const targetRoute = store.routes.find(r => r.id === routeId.value)
  const adminBlocked = targetRoute?.blockedSeats || []

  return [...new Set([...bookedSeats, ...adminBlocked])]
})

const selectedSeat = ref(null)

// Seat grid — driven by real bus capacity
const allSeats = computed(() => Array.from({ length: capacity.value }, (_, i) => i + 1))
const seatRows = computed(() => {
  const rows = []
  const seats = allSeats.value
  for (let i = 0; i < seats.length - (seats.length % 4 !== 0 ? seats.length % 4 : 0); i += 4) {
    rows.push(seats.slice(i, i + 4))
  }
  return rows
})
const lastSeat = computed(() => {
  const rem = allSeats.value.length % 4
  return rem === 1 ? allSeats.value[allSeats.value.length - 1] : null
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
      bus: busName.value,
      price: price.value,
      from: from.value,
      to: to.value,
      depart: depart.value,
      seat: selectedSeat.value,
      date: dateRaw.value,        // Gregorian date — stored in DB
      dateDisplay: dateDisplay.value, // Ethiopian date — for display only
      routeId: routeId.value,
    }
  })
}
</script>

<style scoped></style>
