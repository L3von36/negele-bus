<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Revenue Bar Chart -->
    <div class="bg-card p-6 rounded-xl border border-border shadow-soft h-80 flex flex-col">
      <h3 class="text-sm font-semibold text-text-primary mb-4">Revenue Trend (ETB)</h3>
      <div class="flex-1 relative">
        <Bar :data="revenueData" :options="barOptions" />
      </div>
    </div>
    
    <!-- Popularity Doughnut Chart -->
    <div class="bg-card p-6 rounded-xl border border-border shadow-soft h-80 flex flex-col">
      <h3 class="text-sm font-semibold text-text-primary mb-4">Route Popularity</h3>
      <div class="flex-1 relative flex justify-center">
        <Doughnut :data="routeData" :options="pieOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../store.js'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { Bar, Doughnut } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

import { getRecentEthiopianDates } from '../lib/ethiopianCalendar.js'
import { t } from '../store.js'

// Compute dynamic chart data based on store
const revenueData = computed(() => {
  const labels = getRecentEthiopianDates(6, store, t)
  const now = new Date()
  const dayRevenue = Array.from({ length: 6 }, (_, i) => {
    const day = new Date(now)
    day.setDate(day.getDate() - (5 - i))
    const dayStr = day.toISOString().split('T')[0]
    return store.bookings
      .filter(b => {
        if (b.status === 'Canceled') return false
        const bDate = b.travel_date || (b.created_at ? b.created_at.split('T')[0] : '')
        return bDate === dayStr
      })
      .reduce((sum, b) => sum + Number(b.amount || 0), 0)
  })
  return {
    labels,
    datasets: [
      {
        label: 'Revenue (ETB)',
        backgroundColor: '#F97316',
        borderRadius: 4,
        data: dayRevenue
      }
    ]
  }
})

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    y: { beginAtZero: true, grid: { color: '#e4e4e7' } },
    x: { grid: { display: false } }
  }
}

const routeData = computed(() => {
  const counts = {}
  store.bookings.forEach(b => {
    if (b.status === 'Canceled') return
    const key = b.route || 'Other'
    counts[key] = (counts[key] || 0) + 1
  })
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4)
  const labels = entries.map(([name]) => name.split(' → ').map(s => s.split(' ')[0]).join('-'))
  const data = entries.map(([, count]) => count)
  return {
    labels: labels.length ? labels : ['No data'],
    datasets: [
      {
        backgroundColor: ['#F97316', '#3b82f6', '#8b5cf6', '#10b981'],
        data: data.length ? data : [1]
      }
    ]
  }
})

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right' }
  }
}
</script>
