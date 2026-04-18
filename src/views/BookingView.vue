<template>
  <div class="min-h-screen bg-background">

    <!-- Header -->
    <MainHeader showBack />

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
                  <svg class="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  {{ dateDisplay }}
                </div>
                <span>·</span>
                <div class="flex items-center gap-1">
                  <svg class="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      <!-- Error -->
      <div v-if="bookingError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
        {{ bookingError }}
      </div>

      <!-- Confirm button -->
      <AppButton
        @click="confirmBooking"
        :disabled="!isFormValid || isBooking"
        fullWidth
        class="shadow-soft"
      >
        <span v-if="isBooking" class="flex items-center justify-center gap-2">
          <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          Securing your seat…
        </span>
        <span v-else>{{ t('confirm_booking') }} — {{ price }} {{ t('etb_label') }}</span>
      </AppButton>

      <!-- Terms -->
      <p class="text-center text-xs text-text-secondary mt-4">
        {{ t('terms_agreement') }} <span class="underline cursor-pointer">{{ t('terms_of_service') }}</span>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store, t } from '../store.js'
import { useMeta } from '../lib/useMeta.js'
import MainHeader from '../components/MainHeader.vue'
import AppButton from '../components/AppButton.vue'
import { formatEthiopian } from '../lib/ethiopianCalendar.js'

const router = useRouter()
const route  = useRoute()
const { setMeta } = useMeta()

onMounted(() => {
  setMeta('Secure Booking', 'Finalize your bus ticket booking. Enter passenger details to secure your seat instantly.')
})

const busName = computed(() => route.query.bus    || 'Ethio Bus')
const price   = computed(() => route.query.price  || 300)
const from    = computed(() => route.query.from   || 'negele-borena')
const to      = computed(() => route.query.to     || 'hawassa')
const depart  = computed(() => route.query.depart || '06:00')
const seat    = computed(() => route.query.seat   || 1)

// date = Gregorian (from SeatSelectorView), used to store in DB and filter seats
const dateRaw     = computed(() => route.query.date        || new Date().toISOString().split('T')[0])
// dateDisplay = Ethiopian, for showing to the user
const dateDisplay = computed(() => route.query.dateDisplay || formatEthiopian(new Date(dateRaw.value), store, t))

const fullName   = ref('')
const phone      = ref('')
const isBooking  = ref(false)
const bookingError = ref('')

const isFormValid = computed(() => fullName.value.trim().length > 0 && phone.value.trim().length > 0)

async function confirmBooking() {
  if (!isFormValid.value || isBooking.value) return
  isBooking.value  = true
  bookingError.value = ''

  // Use human-readable city names so route strings are consistent across the app
  const fromDisplay = t('cities.' + from.value) || from.value
  const toDisplay   = t('cities.' + to.value)   || to.value
  const routeStr    = `${fromDisplay} → ${toDisplay}`

  const booking = await store.addBooking({
    id: crypto.randomUUID(),        // Proper UUID — no more 4-digit collision risk
    name: fullName.value.trim(),
    phone: phone.value.trim(),
    route: routeStr,                // e.g. "Negele Borena → Hawassa"
    date: dateRaw.value + ', ' + depart.value, // "2026-04-18, 06:00" — Gregorian for filtering
    amount: Number(price.value),
    seat_number: Number(seat.value),
    status: 'Confirmed',
    boarded: false,
  })

  isBooking.value = false

  if (!booking) {
    bookingError.value = 'Booking failed. This seat may already be taken — go back and choose another.'
    return
  }

  router.push({
    path: '/confirmation',
    query: {
      bus: busName.value, price: price.value,
      from: from.value, to: to.value,
      depart: depart.value, seat: seat.value,
      date: dateRaw.value, dateDisplay: dateDisplay.value,
      name: fullName.value, phone: phone.value,
      id: booking.id,
    }
  })
}
</script>

<style scoped></style>
