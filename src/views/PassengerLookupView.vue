<template>
  <div class="min-h-screen bg-background">
    <MainHeader showBack />

    <div class="max-w-lg mx-auto px-4 sm:px-6 py-10">

      <div class="text-center mb-8">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">Find Your Booking</h2>
        <p class="text-text-secondary text-sm mt-2">Enter your booking ID or phone number to retrieve your ticket.</p>
      </div>

      <!-- Search form -->
      <form @submit.prevent="search" class="bg-card rounded-2xl border border-border shadow-soft p-6 mb-6">
        <div class="space-y-4">
          <div>
            <label for="lookup-query" class="block text-sm font-semibold text-text-primary mb-1.5">Booking ID or Phone Number</label>
            <input
              id="lookup-query"
              v-model="query"
              type="text"
              placeholder="e.g. a1b2c3d4 or 0912345678"
              class="w-full px-4 py-3 border border-border rounded-xl text-sm bg-background text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent transition-colors"
              :aria-invalid="!!searchError"
              aria-describedby="lookup-error"
            />
            <p v-if="searchError" id="lookup-error" role="alert" class="mt-1.5 text-xs text-red-600">{{ searchError }}</p>
          </div>
          <AppButton type="submit" fullWidth :disabled="isSearching || !query.trim()">
            <svg v-if="isSearching" class="w-4 h-4 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ isSearching ? 'Searching…' : 'Find Booking' }}
          </AppButton>
        </div>
      </form>

      <!-- Results -->
      <div v-if="results.length > 0" class="space-y-4 animate-fade-in">
        <p class="text-xs text-text-secondary font-semibold uppercase tracking-wider">
          {{ results.length }} booking{{ results.length !== 1 ? 's' : '' }} found
        </p>

        <div v-for="b in results" :key="b.id" class="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
          <!-- Status strip -->
          <div :class="statusStripClass(b.status)" class="px-5 py-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <svg v-if="b.status === 'Confirmed'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
              <svg v-else-if="b.status === 'Completed'" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              <span class="text-xs font-bold uppercase tracking-wider">{{ b.status }}</span>
            </div>
            <span class="text-[10px] font-mono opacity-70">{{ b.id.slice(0, 8) }}</span>
          </div>

          <!-- Details -->
          <div class="px-5 py-4 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-text-secondary text-sm">Passenger</span>
              <span class="text-text-primary text-sm font-semibold">{{ b.name }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-text-secondary text-sm">Route</span>
              <span class="text-text-primary text-sm font-semibold">{{ b.route }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-text-secondary text-sm">Seat</span>
              <span class="text-text-primary text-sm font-semibold">#{{ b.seat_number }}</span>
            </div>
            <div v-if="b.amount" class="flex items-center justify-between">
              <span class="text-text-secondary text-sm">Amount</span>
              <span class="text-text-primary text-sm font-bold">{{ b.amount }} ETB</span>
            </div>
          </div>

          <!-- QR code -->
          <div v-if="b.status === 'Confirmed'" class="border-t border-border px-5 py-4 flex flex-col items-center gap-2">
            <div class="bg-white p-3 rounded-xl shadow-inner border border-border">
              <QrcodeVue :value="b.id" :size="100" level="H" />
            </div>
            <p class="text-[10px] text-text-secondary uppercase tracking-widest font-bold">Show at station</p>
          </div>
        </div>
      </div>

      <!-- No results -->
      <div v-else-if="searched && results.length === 0" class="text-center py-14 animate-fade-in">
        <svg class="w-12 h-12 text-text-secondary/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <p class="text-text-primary font-bold mb-1">No booking found</p>
        <p class="text-text-secondary text-sm">Double-check your booking ID or phone number.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../store.js'
import MainHeader from '../components/MainHeader.vue'
import AppButton from '../components/AppButton.vue'
import QrcodeVue from 'qrcode.vue'

const query = ref('')
const results = ref([])
const isSearching = ref(false)
const searched = ref(false)
const searchError = ref('')

function statusStripClass(status) {
  if (status === 'Confirmed') return 'bg-green-50 text-green-700 border-b border-green-100'
  if (status === 'Completed') return 'bg-blue-50 text-blue-700 border-b border-blue-100'
  return 'bg-red-50 text-red-700 border-b border-red-100'
}

function search() {
  searchError.value = ''
  const q = query.value.trim()
  if (!q) return

  isSearching.value = true
  searched.value = false

  try {
    const lower = q.toLowerCase()
    results.value = store.bookings.filter(b => {
      return b.id.toLowerCase().startsWith(lower) ||
        (b.phone && b.phone.replace(/[\s\-]/g, '') === q.replace(/[\s\-]/g, ''))
    })
    searched.value = true
  } finally {
    isSearching.value = false
  }
}
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
</style>
