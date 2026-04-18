<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Summary High-Level Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <div class="bg-card p-6 rounded-2xl border border-border shadow-soft">
          <p class="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Total Revenue</p>
          <h3 class="text-3xl font-black text-text-primary tracking-tight">{{ store.totalRevenue.toLocaleString() }} <span class="text-sm font-bold text-text-secondary ml-1">ETB</span></h3>
          <p class="text-xs text-green-600 font-bold mt-2 flex items-center">
            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/></svg>
            Live from Supabase
          </p>
       </div>
       <div class="bg-card p-6 rounded-2xl border border-border shadow-soft">
          <p class="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Total Bookings</p>
          <h3 class="text-3xl font-black text-text-primary tracking-tight">{{ store.bookings.length }}</h3>
          <p class="text-xs text-text-secondary font-bold mt-2">Active confirmations</p>
       </div>
       <div class="bg-card p-6 rounded-2xl border border-border shadow-soft">
          <p class="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Avg. Ticket Value</p>
          <h3 class="text-3xl font-black text-text-primary tracking-tight">{{ avgTicketValue }} <span class="text-sm font-bold text-text-secondary ml-1">ETB</span></h3>
          <p class="text-xs text-text-secondary font-bold mt-2">Per confirmed head</p>
       </div>
       <div class="bg-card p-6 rounded-2xl border border-border shadow-soft">
          <p class="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Fleet Usage</p>
          <h3 class="text-3xl font-black text-text-primary tracking-tight">{{ occupancyRate }}%</h3>
          <p class="text-xs text-orange-600 font-bold mt-2">Average occupancy</p>
       </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue by Route (Primary Chart) -->
      <div class="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-medium flex flex-col h-[450px]">
        <div class="flex items-center justify-between mb-8">
           <div>
              <h3 class="text-lg font-black text-text-primary tracking-tight">Revenue Distribution</h3>
              <p class="text-xs text-text-secondary font-medium">Earnings split by active transport route</p>
           </div>
           <div class="bg-primary-100 px-3 py-1 rounded-full">
              <span class="text-[10px] font-black text-accent uppercase tracking-widest">Financial Split</span>
           </div>
        </div>
        <div class="flex-1 relative">
          <Bar :data="routeRevenueData" :options="chartOptions" />
        </div>
      </div>

      <!-- Growth Summary / Stats List -->
      <div class="bg-card p-6 rounded-2xl border border-border shadow-medium flex flex-col h-[450px]">
         <h3 class="text-lg font-black text-text-primary tracking-tight mb-6">Top Performing Routes</h3>
         <div class="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="(r, idx) in sortedRouteStats" :key="r.name" class="flex items-center gap-4">
               <div :class="['w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shadow-sm', idx === 0 ? 'bg-accent text-white' : 'bg-primary-100 text-text-secondary']">
                  {{ idx + 1 }}
               </div>
               <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-text-primary truncate">{{ r.name }}</p>
                  <p class="text-[10px] font-black text-text-secondary uppercase tracking-widest mt-0.5">{{ r.count }} Bookings</p>
               </div>
               <div class="text-right">
                  <p class="text-sm font-black text-text-primary">{{ r.revenue.toLocaleString() }}</p>
                  <p class="text-[10px] font-bold text-accent uppercase italic">ETB</p>
               </div>
            </div>
         </div>
         <div class="mt-8 pt-6 border-t border-border">
            <button @click="exportReport" class="w-full bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-accent transition-all active:scale-95 flex items-center justify-center gap-2">
               <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"/></svg>
               Download CSV Report
            </button>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../store.js'
import { currentEthiopian } from '../lib/ethiopianCalendar.js'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Analytics Logic
const avgTicketValue = computed(() => {
  if (store.bookings.length === 0) return 0
  return Math.round(store.totalRevenue / store.bookings.length)
})

const occupancyRate = computed(() => {
  // Rough occupancy calculation: (Bookings / Total possible seats across active buses)
  const confirmed = store.bookings.filter(b => b.status === 'Confirmed').length
  const totalCapacity = store.buses.filter(b => b.status === 'Active').reduce((sum, b) => sum + b.capacity, 0)
  if (totalCapacity === 0) return 0
  return Math.round((confirmed / totalCapacity) * 100)
})

const routeStats = computed(() => {
  const stats = {}
  store.bookings.forEach(b => {
    if (b.status !== 'Confirmed') return
    if (!stats[b.route]) stats[b.route] = { revenue: 0, count: 0 }
    stats[b.route].revenue += Number(b.amount)
    stats[b.route].count += 1
  })
  return Object.entries(stats).map(([name, data]) => ({ name, ...data }))
})

const sortedRouteStats = computed(() => {
  return [...routeStats.value].sort((a, b) => b.revenue - a.revenue)
})

// Chart Configuration
const routeRevenueData = computed(() => {
  return {
    labels: sortedRouteStats.value.map(r => r.name.replace(' → ', '-')),
    datasets: [
      {
        label: 'Revenue (ETB)',
        backgroundColor: '#F97316',
        borderRadius: 8,
        hoverBackgroundColor: '#EA580C',
        data: sortedRouteStats.value.map(r => r.revenue)
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0F172A',
      titleFont: { size: 14, weight: 'bold' },
      padding: 12,
      cornerRadius: 12,
      displayColors: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: '#f3f4f6', drawBorder: false },
      ticks: { font: { size: 10, weight: 'bold' }, color: '#64748b' }
    },
    x: {
      grid: { display: false },
      ticks: { font: { size: 10, weight: 'bold' }, color: '#64748b' }
    }
  }
}

function csvEscape(val) {
  const str = String(val ?? '')
  return (str.includes(',') || str.includes('"') || str.includes('\n'))
    ? '"' + str.replace(/"/g, '""') + '"'
    : str
}

function exportReport() {
  const csvContent = "data:text/csv;charset=utf-8,"
    + "Route,Revenue,Bookings\n"
    + sortedRouteStats.value.map(e => [csvEscape(e.name), e.revenue, e.count].join(',')).join('\n')
  
  const et = currentEthiopian()
  const dateStr = `${et.year}-${String(et.month).padStart(2, '0')}-${String(et.day).padStart(2, '0')}`
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `financial_report_${dateStr}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
