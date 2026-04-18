<template>
  <div class="min-h-screen bg-[#0F172A] overflow-x-hidden">

    <!-- Nav -->
    <nav class="sticky top-0 z-50 px-6 py-4 bg-[#0F172A] border-b border-white/10">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-1.5">
            <img src="/favicon.png" alt="Logo" class="w-full h-full object-contain" />
          </div>
          <div class="hidden sm:block">
            <h1 class="text-white font-bold text-sm tracking-tight leading-none">Negele Borena</h1>
            <p class="text-white/30 text-[10px] font-medium uppercase tracking-widest mt-0.5">Station Master</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            <span class="text-white/50 text-[10px] font-medium">{{ store.userProfile?.full_name || 'Station Master' }}</span>
          </div>
          <button @click="handleSignOut" class="h-9 px-4 flex items-center gap-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
            <span class="text-[10px] font-medium uppercase tracking-wide">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-6 py-8 space-y-8">

      <!-- Stats row -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
          <p class="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">Today's Buses</p>
          <p class="text-white text-3xl font-black">{{ activeBuses.length }}</p>
        </div>
        <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
          <p class="text-white/30 text-[9px] font-black uppercase tracking-widest mb-1">Total Passengers</p>
          <p class="text-white text-3xl font-black">{{ todayConfirmed }}</p>
        </div>
        <div class="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
          <p class="text-green-400/50 text-[9px] font-black uppercase tracking-widest mb-1">Boarded</p>
          <p class="text-green-400 text-3xl font-black">{{ todayBoarded }}</p>
        </div>
        <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5">
          <p class="text-yellow-400/50 text-[9px] font-black uppercase tracking-widest mb-1">Pending</p>
          <p class="text-yellow-400 text-3xl font-black">{{ todayPending }}</p>
        </div>
      </div>

      <!-- Buses on duty today -->
      <div class="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden">
        <div class="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 class="text-white font-bold">Buses on Duty</h2>
          <button @click="isScannerOpen = true" class="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 8h12m4 12h2"/></svg>
            Scan Ticket
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left min-w-[600px]">
            <thead>
              <tr class="border-b border-white/5">
                <th class="px-6 py-3 text-[10px] text-white/30 font-black uppercase tracking-wider">Plate</th>
                <th class="px-6 py-3 text-[10px] text-white/30 font-black uppercase tracking-wider">Route</th>
                <th class="px-6 py-3 text-[10px] text-white/30 font-black uppercase tracking-wider">Depart</th>
                <th class="px-6 py-3 text-[10px] text-white/30 font-black uppercase tracking-wider">Capacity</th>
                <th class="px-6 py-3 text-[10px] text-white/30 font-black uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr v-if="activeBuses.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-white/30 text-sm">No buses on duty today.</td>
              </tr>
              <tr v-for="bus in activeBuses" :key="bus.id" class="hover:bg-white/[0.02] transition-colors">
                <td class="px-6 py-4 text-white font-bold text-sm">{{ bus.plate }}</td>
                <td class="px-6 py-4 text-white/50 text-sm">{{ busRoute(bus) }}</td>
                <td class="px-6 py-4 text-white/50 text-sm font-mono">{{ bus.depart_time || '—' }}</td>
                <td class="px-6 py-4 text-white/50 text-sm">{{ bus.capacity }}</td>
                <td class="px-6 py-4">
                  <span :class="busStatusClass(bus.status)" class="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {{ bus.status || 'Active' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Passenger Manifest -->
      <div class="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden min-h-[400px]">
        <div class="px-6 py-4 border-b border-white/10">
          <h2 class="text-white font-bold">Passenger Manifest</h2>
        </div>
        <PassengerManifest :show-route-filter="true" :show-stats="true" />
      </div>

    </main>

    <!-- QR Scanner -->
    <QRScannerModal
      :is-open="isScannerOpen"
      :scan-result="scanResult"
      @close="isScannerOpen = false; scanResult = null"
      @scanned="onTicketScanned"
    />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'
import { toast } from '../lib/toast.js'
import PassengerManifest from '../components/PassengerManifest.vue'
import QRScannerModal from '../components/QRScannerModal.vue'

const router = useRouter()
const isScannerOpen = ref(false)
const scanResult = ref(null)

const activeBuses = computed(() => store.buses.filter(b => b.status !== 'Maintenance'))

const todayConfirmed = computed(() => store.bookings.filter(b => b.status === 'Confirmed').length)
const todayBoarded   = computed(() => store.bookings.filter(b => b.status === 'Confirmed' && b.boarded).length)
const todayPending   = computed(() => todayConfirmed.value - todayBoarded.value)

function busRoute(bus) {
  const route = store.routes.find(r => r.id === bus.route_id)
  return route ? `${route.from} → ${route.to}` : '—'
}

function busStatusClass(status) {
  if (status === 'On Route') return 'bg-green-500/20 text-green-400'
  if (status === 'Arrived')  return 'bg-blue-500/20 text-blue-400'
  if (status === 'Maintenance') return 'bg-red-500/20 text-red-400'
  return 'bg-white/10 text-white/50'
}

function onTicketScanned(rawId) {
  const booking = store.bookings.find(b => b.id === rawId)
  if (!booking) {
    scanResult.value = { type: 'error', message: 'Ticket not found in system' }
    toast.error('Ticket not found')
    return
  }
  if (booking.status !== 'Confirmed') {
    const msg = `Booking is ${booking.status.toLowerCase()}`
    scanResult.value = { type: 'error', message: msg }
    toast.error(msg)
    return
  }
  if (booking.boarded) {
    const msg = `${booking.name} already boarded (Seat ${booking.seat_number})`
    scanResult.value = { type: 'warning', message: msg }
    toast.info(msg)
    return
  }
  store.toggleBoarding(rawId)
  const msg = `${booking.name} — Seat ${booking.seat_number}`
  scanResult.value = { type: 'success', message: msg }
  toast.success(`Boarded: ${msg}`)
}

async function handleSignOut() {
  await store.signOut()
  router.push('/login')
}
</script>
