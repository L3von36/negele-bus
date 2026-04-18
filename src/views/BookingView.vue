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
              <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <span>{{ t('cities.' + route.query.from) || from }} → {{ t('cities.' + route.query.to) || to }}</span>
            </div>
            <div class="flex items-center gap-3 mt-1 text-xs text-text-secondary">
              <div class="flex items-center gap-1">
                <svg class="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {{ dateDisplay }}
              </div>
              <span aria-hidden="true">·</span>
              <div class="flex items-center gap-1">
                <svg class="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ depart }}
              </div>
              <span aria-hidden="true">·</span>
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
      <form class="space-y-4 mb-5 animate-fade-in" @submit.prevent="confirmBooking" novalidate>
        <div>
          <label for="booking-name" class="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">
            {{ t('passenger') }}
          </label>
          <input
            id="booking-name"
            v-model="fullName"
            type="text"
            autocomplete="name"
            :placeholder="t('name_placeholder')"
            :aria-invalid="touched.name && !nameValid"
            aria-describedby="name-error"
            class="w-full px-4 py-3.5 bg-white border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            :class="touched.name && !nameValid ? 'border-red-300' : 'border-gray-200'"
            @blur="touched.name = true"
          />
          <p id="name-error" v-if="touched.name && !nameValid" class="text-xs text-red-600 mt-1 ml-1" role="alert">
            {{ t('errors.name_invalid') }}
          </p>
        </div>
        <div>
          <label for="booking-phone" class="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5 ml-1">
            {{ t('phone') }}
          </label>
          <input
            id="booking-phone"
            v-model="phone"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            :placeholder="t('phone_placeholder')"
            :aria-invalid="touched.phone && !phoneValid"
            aria-describedby="phone-error"
            class="w-full px-4 py-3.5 bg-white border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            :class="touched.phone && !phoneValid ? 'border-red-300' : 'border-gray-200'"
            @blur="touched.phone = true"
          />
          <p id="phone-error" v-if="touched.phone && !phoneValid" class="text-xs text-red-600 mt-1 ml-1" role="alert">
            {{ t('errors.phone_invalid') }}
          </p>
        </div>

        <!-- Booking error -->
        <div v-if="bookingError" role="alert" class="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
          {{ bookingError }}
        </div>

        <!-- Confirm button -->
        <AppButton
          type="submit"
          :disabled="!isFormValid || isBooking"
          fullWidth
          class="shadow-soft"
        >
          <span v-if="isBooking" class="flex items-center justify-center gap-2">
            <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ t('securing_seat') }}
          </span>
          <span v-else>{{ t('confirm_booking') }} — {{ price }} {{ t('etb_label') }}</span>
        </AppButton>
      </form>

      <!-- Terms -->
      <p class="text-center text-xs text-text-secondary mt-4">
        {{ t('terms_agreement') }} <span class="underline cursor-pointer">{{ t('terms_of_service') }}</span>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store, t } from '../store.js'
import { useMeta } from '../lib/useMeta.js'
import MainHeader from '../components/MainHeader.vue'
import AppButton from '../components/AppButton.vue'
import { formatEthiopian } from '../lib/ethiopianCalendar.js'
import { validatePhone, validateName, sanitize, BOOKING_STATUS } from '../lib/constants.js'

const router = useRouter()
const route  = useRoute()
const { setMeta } = useMeta()

onMounted(() => {
  setMeta('Secure Booking', 'Finalize your bus ticket booking. Enter passenger details to secure your seat instantly.')
})

const busName = computed(() => route.query.bus     || 'Ethio Bus')
const busId   = computed(() => route.query.busId   || null)
const routeId = computed(() => route.query.routeId || null)
const price   = computed(() => route.query.price   || 300)
const from    = computed(() => route.query.from    || 'negele-borena')
const to      = computed(() => route.query.to      || 'hawassa')
const depart  = computed(() => route.query.depart  || '06:00')
const seat    = computed(() => route.query.seat    || 1)

const dateRaw     = computed(() => route.query.date        || new Date().toISOString().split('T')[0])
const dateDisplay = computed(() => route.query.dateDisplay || formatEthiopian(new Date(dateRaw.value), store, t))

const fullName     = ref('')
const phone        = ref('')
const isBooking    = ref(false)
const bookingError = ref('')
const touched      = reactive({ name: false, phone: false })

const nameValid   = computed(() => validateName(fullName.value))
const phoneValid  = computed(() => validatePhone(phone.value))
const isFormValid = computed(() => nameValid.value && phoneValid.value)

async function confirmBooking() {
  // Force-touch fields so inline errors show up on submit.
  touched.name  = true
  touched.phone = true
  if (!isFormValid.value || isBooking.value) return

  isBooking.value    = true
  bookingError.value = ''

  const fromDisplay = t('cities.' + from.value) || from.value
  const toDisplay   = t('cities.' + to.value)   || to.value
  const routeStr    = `${fromDisplay} → ${toDisplay}`

  const { data: booking, error } = await store.addBooking({
    // id omitted — DB generates via gen_random_uuid() default
    name:        sanitize(fullName.value),
    phone:       sanitize(phone.value),
    route:       routeStr,
    route_id:    routeId.value || null,
    bus_id:      busId.value   || null,
    travel_date: dateRaw.value,
    depart_time: depart.value,
    date:        dateRaw.value + ', ' + depart.value, // legacy column; keep until DB migration applied
    amount:      Number(price.value),
    seat_number: Number(seat.value),
    status:      BOOKING_STATUS.CONFIRMED,
    boarded:     false,
  })

  isBooking.value = false

  if (error) {
    // 23505 = unique_violation: seat was grabbed between UI check and insert
    bookingError.value = error.code === '23505'
      ? t('errors.seat_just_taken')
      : t('errors.booking_failed')
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
