<template>
  <div class="min-h-screen bg-background flex flex-col md:flex-row">

    <!-- Sidebar -->
    <aside class="w-full md:w-56 bg-primary border-r border-border flex-shrink-0 flex flex-col">
      <div class="h-16 flex items-center px-6 border-b border-border gap-3">
        <img src="/favicon.png" alt="Logo" class="rounded-lg w-8 h-8 object-cover border border-white/10" />
        <div>
          <p class="text-white font-bold text-sm leading-none">Finance</p>
          <p class="text-white/30 text-[9px] uppercase tracking-wider mt-0.5">Read Only</p>
        </div>
      </div>
      <nav class="flex-1 px-4 py-6 space-y-1">
        <button
          v-for="tab in tabs" :key="tab"
          @click="currentTab = tab"
          :aria-current="currentTab === tab ? 'page' : undefined"
          :class="['w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors', currentTab === tab ? 'bg-accent/10 text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-black/5']"
        >{{ tab }}</button>
      </nav>
      <div class="px-4 py-6 border-t border-border">
        <p class="text-[10px] font-black text-white/40 uppercase tracking-widest px-3 mb-2">Logged in as</p>
        <p class="text-white font-bold text-sm px-3 truncate">{{ store.userProfile?.full_name || 'Finance Officer' }}</p>
        <button @click="handleSignOut" class="mt-4 w-full flex items-center px-3 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-bold">
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Sign out
        </button>
      </div>
    </aside>

    <!-- Main -->
    <main class="flex-1 overflow-y-auto bg-background p-6">

      <!-- Overview -->
      <div v-if="currentTab === 'Overview'" class="space-y-6 animate-fade-in">
        <h2 class="text-xl font-bold text-text-primary">Revenue Overview</h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
            <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Total Revenue</p>
            <p class="text-2xl font-bold text-text-primary">{{ store.totalRevenue.toLocaleString() }}</p>
            <p class="text-xs text-text-secondary mt-0.5">ETB</p>
          </div>
          <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
            <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Confirmed Bookings</p>
            <p class="text-2xl font-bold text-text-primary">{{ confirmedCount }}</p>
          </div>
          <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
            <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Avg. Ticket</p>
            <p class="text-2xl font-bold text-text-primary">{{ avgTicket.toLocaleString() }}</p>
            <p class="text-xs text-text-secondary mt-0.5">ETB</p>
          </div>
          <div class="bg-card p-5 rounded-xl border border-border shadow-soft">
            <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Canceled</p>
            <p class="text-2xl font-bold text-red-600">{{ canceledCount }}</p>
          </div>
        </div>
        <AdminReports />
      </div>

      <!-- By Route -->
      <div v-if="currentTab === 'By Route'" class="animate-fade-in space-y-6">
        <h2 class="text-xl font-bold text-text-primary">Revenue by Route</h2>
        <div class="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-primary-100/50 border-b border-border">
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Route</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Bookings</th>
                <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Revenue (ETB)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-if="routeStats.length === 0">
                <td colspan="3" class="px-6 py-12 text-center text-sm text-text-secondary">No data yet.</td>
              </tr>
              <tr v-for="r in routeStats" :key="r.name" class="hover:bg-primary-100/20 transition-colors">
                <td class="px-6 py-4 text-sm font-medium text-text-primary">{{ r.name }}</td>
                <td class="px-6 py-4 text-sm text-text-secondary text-right">{{ r.count }}</td>
                <td class="px-6 py-4 text-sm font-bold text-text-primary text-right">{{ r.revenue.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Transactions -->
      <div v-if="currentTab === 'Transactions'" class="animate-fade-in space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-text-primary">Transaction Log</h2>
          <button @click="exportCSV" class="flex items-center gap-1.5 px-3 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-accent transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"/></svg>
            Export CSV
          </button>
        </div>
        <div class="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left min-w-[600px]">
              <thead>
                <tr class="bg-primary-100/50 border-b border-border">
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Passenger</th>
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Route</th>
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                <tr v-if="confirmedBookings.length === 0">
                  <td colspan="5" class="px-6 py-12 text-center text-sm text-text-secondary">No transactions yet.</td>
                </tr>
                <tr v-for="b in confirmedBookings" :key="b.id" class="hover:bg-primary-100/20 transition-colors">
                  <td class="px-6 py-4 text-xs font-mono text-text-secondary">#{{ b.id.slice(0, 8) }}</td>
                  <td class="px-6 py-4 text-sm text-text-primary font-medium">{{ b.name }}</td>
                  <td class="px-6 py-4 text-sm text-text-secondary">{{ b.route }}</td>
                  <td class="px-6 py-4">
                    <span :class="b.status === 'Confirmed' ? 'bg-green-100 text-green-800' : b.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'"
                      class="px-2 py-0.5 text-[10px] font-bold rounded-full uppercase">{{ b.status }}</span>
                  </td>
                  <td class="px-6 py-4 text-sm font-bold text-text-primary text-right">{{ b.amount || '—' }} ETB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'
import AdminReports from '../components/AdminReports.vue'

const router = useRouter()
const tabs = ['Overview', 'By Route', 'Transactions']
const currentTab = ref('Overview')

const confirmedBookings = computed(() => store.bookings.filter(b => b.status !== 'Canceled'))
const confirmedCount    = computed(() => store.bookings.filter(b => b.status === 'Confirmed').length)
const canceledCount     = computed(() => store.bookings.filter(b => b.status === 'Canceled').length)
const avgTicket         = computed(() => {
  const c = confirmedBookings.value.filter(b => b.amount)
  if (!c.length) return 0
  return Math.round(c.reduce((s, b) => s + Number(b.amount), 0) / c.length)
})

const routeStats = computed(() => {
  const map = {}
  confirmedBookings.value.forEach(b => {
    if (!b.route) return
    if (!map[b.route]) map[b.route] = { name: b.route, count: 0, revenue: 0 }
    map[b.route].count++
    map[b.route].revenue += Number(b.amount || 0)
  })
  return Object.values(map).sort((a, b) => b.revenue - a.revenue)
})

function csvEscape(val) {
  const str = String(val ?? '')
  return (str.includes(',') || str.includes('"') || str.includes('\n'))
    ? '"' + str.replace(/"/g, '""') + '"'
    : str
}

function exportCSV() {
  const headers = ['ID', 'Passenger', 'Route', 'Status', 'Amount']
  const rows = confirmedBookings.value.map(b => [
    b.id, csvEscape(b.name), csvEscape(b.route), b.status, b.amount || ''
  ])
  const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  const link = document.createElement('a')
  link.setAttribute('href', encodeURI(csv))
  link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

async function handleSignOut() {
  await store.signOut()
  router.push('/login')
}
</script>
