<template>
  <div class="min-h-screen bg-background">

    <!-- Header -->
    <header class="bg-primary border-b border-border px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/favicon.png" alt="Logo" class="rounded-lg w-9 h-9 object-cover border border-white/10" />
          <div>
            <h1 class="text-white font-bold text-base leading-none">Fleet Inspector</h1>
            <p class="text-white/30 text-[9px] uppercase tracking-widest mt-0.5">Bus & Driver Compliance</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="hidden sm:block text-white/40 text-xs">{{ store.userProfile?.full_name || 'Inspector' }}</span>
          <button @click="handleSignOut" class="h-9 px-4 flex items-center gap-2 text-white/40 hover:text-white bg-white/5 border border-white/10 rounded-xl transition-colors text-[10px] font-medium uppercase tracking-wide">
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8 space-y-8">

      <!-- Summary stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
          <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Total Buses</p>
          <p class="text-3xl font-bold text-text-primary">{{ store.buses.length }}</p>
        </div>
        <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
          <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Active</p>
          <p class="text-3xl font-bold text-green-600">{{ activeBuses }}</p>
        </div>
        <div class="bg-yellow-50 border border-yellow-200 p-5 rounded-xl shadow-soft">
          <p class="text-xs font-semibold text-yellow-700 uppercase tracking-wider mb-1">In Maintenance</p>
          <p class="text-3xl font-bold text-yellow-700">{{ maintenanceBuses }}</p>
        </div>
        <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
          <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Drivers Registered</p>
          <p class="text-3xl font-bold text-text-primary">{{ store.drivers.length }}</p>
        </div>
      </div>

      <!-- Buses table -->
      <div class="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
        <div class="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 class="text-lg font-bold text-text-primary">Fleet Status</h2>
          <div class="flex gap-2">
            <button
              v-for="f in ['All', 'Active', 'Maintenance']" :key="f"
              @click="fleetFilter = f"
              :class="fleetFilter === f ? 'bg-accent text-white border-accent' : 'bg-background text-text-secondary border-border hover:bg-primary-100'"
              class="px-3 py-1.5 text-xs font-semibold border rounded-lg transition-colors"
            >{{ f }}</button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left min-w-[700px]">
            <thead>
              <tr class="bg-primary-100/50 border-b border-border">
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Plate</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Capacity</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Assigned Route</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Assigned Driver</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Compliance</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-if="filteredBuses.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-sm text-text-secondary">No buses match the filter.</td>
              </tr>
              <tr v-for="bus in filteredBuses" :key="bus.id" class="hover:bg-primary-100/20 transition-colors">
                <td class="px-6 py-4 text-sm font-bold text-text-primary">{{ bus.plate }}</td>
                <td class="px-6 py-4 text-sm text-text-secondary">{{ bus.capacity }}</td>
                <td class="px-6 py-4 text-sm text-text-secondary">{{ routeName(bus.route_id) }}</td>
                <td class="px-6 py-4 text-sm text-text-secondary">{{ driverName(bus.driver_id) }}</td>
                <td class="px-6 py-4">
                  <span :class="statusClass(bus.status)" class="px-2.5 py-1 text-[10px] font-bold rounded-full uppercase">
                    {{ bus.status || 'Active' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span v-if="!bus.route_id" class="flex items-center gap-1 text-yellow-600 text-xs font-semibold">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01"/></svg>
                    No route
                  </span>
                  <span v-else-if="!bus.driver_id" class="flex items-center gap-1 text-yellow-600 text-xs font-semibold">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01"/></svg>
                    No driver
                  </span>
                  <span v-else class="flex items-center gap-1 text-green-600 text-xs font-semibold">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                    OK
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Drivers table -->
      <div class="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
        <div class="px-6 py-4 border-b border-border">
          <h2 class="text-lg font-bold text-text-primary">Driver Roster</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left min-w-[500px]">
            <thead>
              <tr class="bg-primary-100/50 border-b border-border">
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Phone</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Assigned Bus</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-if="store.drivers.length === 0">
                <td colspan="4" class="px-6 py-12 text-center text-sm text-text-secondary">No drivers registered.</td>
              </tr>
              <tr v-for="d in store.drivers" :key="d.id" class="hover:bg-primary-100/20 transition-colors">
                <td class="px-6 py-4 text-sm font-bold text-text-primary">{{ d.full_name || '—' }}</td>
                <td class="px-6 py-4 text-sm text-text-secondary">{{ d.phone || '—' }}</td>
                <td class="px-6 py-4 text-sm text-text-secondary">{{ assignedBusPlate(d.id) }}</td>
                <td class="px-6 py-4">
                  <span v-if="!assignedBusPlate(d.id)" class="text-yellow-600 text-xs font-semibold">Unassigned</span>
                  <span v-else class="text-green-600 text-xs font-semibold">On duty</span>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'

const router = useRouter()
const fleetFilter = ref('All')

const activeBuses      = computed(() => store.buses.filter(b => b.status !== 'Maintenance').length)
const maintenanceBuses = computed(() => store.buses.filter(b => b.status === 'Maintenance').length)

const filteredBuses = computed(() => {
  if (fleetFilter.value === 'All') return store.buses
  return store.buses.filter(b => b.status === fleetFilter.value)
})

function routeName(routeId) {
  if (!routeId) return '—'
  const r = store.routes.find(r => r.id === routeId)
  return r ? `${r.from} → ${r.to}` : '—'
}

function driverName(driverId) {
  if (!driverId) return '—'
  const d = store.drivers.find(d => d.id === driverId)
  return d?.full_name || d?.email || '—'
}

function assignedBusPlate(driverId) {
  const bus = store.buses.find(b => b.driver_id === driverId)
  return bus?.plate || null
}

function statusClass(status) {
  if (status === 'Active')      return 'bg-green-100 text-green-800'
  if (status === 'On Route')    return 'bg-blue-100 text-blue-800'
  if (status === 'Maintenance') return 'bg-yellow-100 text-yellow-800'
  return 'bg-gray-100 text-gray-700'
}

async function handleSignOut() {
  await store.signOut()
  router.push('/login')
}
</script>
