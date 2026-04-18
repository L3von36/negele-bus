<template>
  <div class="min-h-screen bg-background">

    <!-- Header -->
    <header class="bg-primary border-b border-border px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/favicon.png" alt="Logo" class="rounded-lg w-9 h-9 object-cover border border-white/10" />
          <div>
            <h1 class="text-white font-bold text-base leading-none">NB Transport Authority</h1>
            <p class="text-white/30 text-[9px] uppercase tracking-widest mt-0.5">Ministry Oversight Portal</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="hidden sm:block text-white/40 text-xs">{{ store.userProfile?.full_name || 'Authority Officer' }}</span>
          <button @click="handleSignOut" class="h-9 px-4 flex items-center gap-2 text-white/40 hover:text-white bg-white/5 border border-white/10 rounded-xl transition-colors text-[10px] font-medium uppercase tracking-wide">
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8 space-y-8">

      <!-- System health summary -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
          <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Total Bookings</p>
          <p class="text-3xl font-bold text-text-primary">{{ store.bookings.length }}</p>
        </div>
        <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
          <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Total Revenue</p>
          <p class="text-3xl font-bold text-text-primary">{{ store.totalRevenue.toLocaleString() }}</p>
          <p class="text-xs text-text-secondary">ETB</p>
        </div>
        <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
          <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Active Routes</p>
          <p class="text-3xl font-bold text-text-primary">{{ store.routes.filter(r => r.active).length }}</p>
        </div>
        <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
          <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Fleet Size</p>
          <p class="text-3xl font-bold text-text-primary">{{ store.buses.length }}</p>
        </div>
      </div>

      <!-- Compliance flags -->
      <div class="bg-card rounded-xl border border-border shadow-soft p-6">
        <h2 class="text-lg font-bold text-text-primary mb-4">Compliance Overview</h2>
        <div class="grid sm:grid-cols-3 gap-4">
          <div class="flex items-center gap-3 p-4 rounded-xl" :class="unassignedBuses > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'">
            <div :class="unassignedBuses > 0 ? 'text-red-600' : 'text-green-600'">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-wide" :class="unassignedBuses > 0 ? 'text-red-600' : 'text-green-700'">Unassigned Buses</p>
              <p class="text-2xl font-black" :class="unassignedBuses > 0 ? 'text-red-700' : 'text-green-700'">{{ unassignedBuses }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 p-4 rounded-xl" :class="maintenanceBuses > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'">
            <div :class="maintenanceBuses > 0 ? 'text-yellow-600' : 'text-green-600'">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-wide" :class="maintenanceBuses > 0 ? 'text-yellow-700' : 'text-green-700'">In Maintenance</p>
              <p class="text-2xl font-black" :class="maintenanceBuses > 0 ? 'text-yellow-700' : 'text-green-700'">{{ maintenanceBuses }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 p-4 rounded-xl" :class="cancelRate > 10 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'">
            <div :class="cancelRate > 10 ? 'text-red-600' : 'text-green-600'">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-wide" :class="cancelRate > 10 ? 'text-red-600' : 'text-green-700'">Cancellation Rate</p>
              <p class="text-2xl font-black" :class="cancelRate > 10 ? 'text-red-700' : 'text-green-700'">{{ cancelRate }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Routes table -->
      <div class="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
        <div class="px-6 py-4 border-b border-border">
          <h2 class="text-lg font-bold text-text-primary">Registered Routes</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left min-w-[600px]">
            <thead>
              <tr class="bg-primary-100/50 border-b border-border">
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Route</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Distance</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Ticket Price</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Buses</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-if="store.routes.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-sm text-text-secondary">No routes registered.</td>
              </tr>
              <tr v-for="r in store.routes" :key="r.id" class="hover:bg-primary-100/20 transition-colors">
                <td class="px-6 py-4 text-sm font-bold text-text-primary">{{ r.from }} → {{ r.to }}</td>
                <td class="px-6 py-4 text-sm text-text-secondary">{{ r.distance || '—' }}</td>
                <td class="px-6 py-4 text-sm text-text-secondary font-medium">{{ r.price }} ETB</td>
                <td class="px-6 py-4 text-sm text-text-secondary">{{ busesOnRoute(r.id) }}</td>
                <td class="px-6 py-4">
                  <span :class="r.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'"
                    class="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase">{{ r.active ? 'Active' : 'Inactive' }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'

const router = useRouter()

const unassignedBuses  = computed(() => store.buses.filter(b => !b.route_id && b.status !== 'Maintenance').length)
const maintenanceBuses = computed(() => store.buses.filter(b => b.status === 'Maintenance').length)
const cancelRate = computed(() => {
  const total = store.bookings.length
  if (!total) return 0
  return Math.round((store.bookings.filter(b => b.status === 'Canceled').length / total) * 100)
})

function busesOnRoute(routeId) {
  return store.buses.filter(b => b.route_id === routeId).length
}

async function handleSignOut() {
  await store.signOut()
  router.push('/login')
}
</script>
