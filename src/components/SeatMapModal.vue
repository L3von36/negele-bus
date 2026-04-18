<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
    <div class="bg-card w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">

      <!-- Header -->
      <div class="px-6 py-4 border-b border-border flex justify-between items-center bg-primary">
        <div>
          <h2 class="text-xl font-bold text-text-primary">Seat Allocation</h2>
          <p class="text-xs text-text-secondary mt-0.5" v-if="route">{{ route.from }} → {{ route.to }}</p>
        </div>
        <button @click="$emit('close')" aria-label="Close" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Loading state -->
      <div v-if="!route" class="flex-1 flex items-center justify-center py-16">
        <p class="text-text-secondary text-sm">Loading route data…</p>
      </div>

      <!-- Body / Map -->
      <div v-else class="p-6 overflow-y-auto flex-1 bg-background flex flex-col items-center">

        <div class="mb-6 flex space-x-6 text-sm font-medium">
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 rounded bg-white border-2 border-border"></div>
            <span class="text-text-secondary">Available</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 rounded bg-red-100 border-2 border-red-500"></div>
            <span class="text-text-secondary">Blocked / Reserved</span>
          </div>
        </div>

        <!-- Bus Layout -->
        <div class="w-64 bg-white border border-border p-6 rounded-[2rem] shadow-sm relative">
          <!-- Driver Area Indicator -->
          <div class="w-full flex justify-between items-center mb-10 pb-6 border-b border-dashed border-gray-300">
            <div class="text-xs font-bold text-gray-400 tracking-widest uppercase">Door</div>
            <div class="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
          </div>

          <!-- Seats Grid -->
          <div class="grid grid-cols-4 gap-x-2 gap-y-4">
            <template v-for="seat in routeCapacity" :key="seat">
              <button
                @click="store.toggleSeat(routeId, seat)"
                :aria-label="isBlocked(seat) ? `Seat ${seat} — blocked. Click to unblock` : `Seat ${seat} — available. Click to block`"
                :class="[
                  'h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all border-2',
                  isBlocked(seat) ? 'bg-red-50 border-red-500 text-red-700 hover:bg-red-100' : 'bg-white border-border text-text-primary hover:border-accent hover:text-accent',
                  (seat % 4 === 3) ? 'ml-6' : ''
                ]"
              >
                {{ seat }}
              </button>
            </template>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../store.js'

const props = defineProps({
  isOpen: Boolean,
  routeId: String
})

defineEmits(['close'])

const route = computed(() => store.routes.find(r => r.id === props.routeId) ?? null)

// Use the capacity of the first bus assigned to this route; fallback to 40
const routeCapacity = computed(() => {
  const bus = store.buses.find(b => b.route_id === props.routeId)
  return bus?.capacity || 40
})

function isBlocked(seatNumber) {
  return (route.value?.blockedSeats || []).includes(seatNumber)
}
</script>
