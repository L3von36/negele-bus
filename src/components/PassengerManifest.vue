<template>
  <div class="flex flex-col h-full bg-[#020617]/40 backdrop-blur-xl">
    <!-- Header / Search -->
    <div :class="compact ? 'px-4 py-3' : 'px-6 py-5'" class="border-b border-white/5 space-y-3">
      <div v-if="showStats" class="grid grid-cols-2 gap-3 mb-2">
        <div class="bg-white/5 rounded-2xl p-4 border border-white/10">
          <p class="text-white/30 text-[8px] font-black uppercase tracking-widest">{{ t('passenger') }}s</p>
          <p class="text-white text-lg font-black mt-1">{{ stats.boarded }}<span class="text-white/20 text-xs italic">/{{ stats.total }}</span></p>
        </div>
        <div class="bg-green-500/10 rounded-2xl p-4 border border-green-500/20">
          <p class="text-green-500/40 text-[8px] font-black uppercase tracking-widest">Efficiency</p>
          <p class="text-green-500 text-lg font-black mt-1">{{ stats.percentage }}%</p>
        </div>
      </div>

      <div class="relative group">
        <div class="absolute inset-0 bg-accent/5 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Filter by Name, ID, or Phone..." 
          class="relative w-full pl-5 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white text-xs placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all font-medium"
        />
        <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      </div>

      <div v-if="showRouteFilter" class="flex gap-2 pb-1 overflow-x-auto no-scrollbar">
         <button 
           @click="routeFilter = ''"
           :class="!routeFilter ? 'bg-accent text-white border-accent' : 'bg-white/5 text-white/40 border-white/10'"
           class="px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
         >
           All Trips
         </button>
         <button 
           v-for="r in store.routes" :key="r.id"
           @click="routeFilter = r.from_city + ' → ' + r.to_city"
           :class="routeFilter === r.from_city + ' → ' + r.to_city ? 'bg-accent text-white border-accent' : 'bg-white/5 text-white/40 border-white/10'"
           class="px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
         >
           {{ r.to_city }}
         </button>
      </div>
    </div>

    <!-- Passenger Cards List -->
    <div :class="compact ? 'p-3 space-y-2 pb-6' : 'p-6 space-y-3 pb-24'" class="flex-1 overflow-y-auto custom-scrollbar">
      <div v-for="(booking, index) in manifestList" :key="booking.id"
        class="relative group animate-slide-up"
        :style="{ animationDelay: (index * 50) + 'ms' }"
      >
        <div 
          @click="store.toggleBoarding(booking.id)"
          :class="[
            booking.boarded 
              ? 'bg-green-500/[0.08] border-green-500/20 shadow-lg shadow-green-500/5' 
              : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
          ]"
          class="flex items-center justify-between p-4 rounded-3xl border transition-all cursor-pointer backdrop-blur-md active:scale-[0.98]"
        >
          <div class="flex items-center gap-4">
            <!-- Seat Index -->
            <div 
              :class="booking.boarded ? 'bg-green-500 text-white shadow-green-500/40' : 'bg-white/5 text-white/40'"
              class="w-11 h-11 rounded-2xl flex flex-col items-center justify-center border border-white/5 flex-shrink-0 transition-all duration-500 shadow-xl"
            >
              <span class="text-[8px] font-black uppercase tracking-tight opacity-50 -mb-1">Seat</span>
              <span class="text-sm font-black italic">{{ booking.seat_number || '?' }}</span>
            </div>

            <div>
              <h4 class="text-white font-black text-sm tracking-tight leading-none mb-1.5 group-hover:text-accent transition-colors">{{ booking.name }}</h4>
              <div class="flex items-center gap-2">
                <span class="text-white/20 text-[9px] font-black uppercase tracking-widest">{{ booking.id.slice(0, 8) }}</span>
                <span class="w-1 h-1 rounded-full bg-white/10"></span>
                <span class="text-white/40 text-[9px] font-bold">{{ booking.phone }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4">
             <!-- Call Action -->
             <a 
               v-if="booking.phone"
               :href="normalizedTel(booking.phone)"
               @click.stop
               class="w-9 h-9 rounded-xl flex items-center justify-center text-white/30 hover:bg-accent/20 hover:text-accent transition-all border border-white/5"
             >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
             </a>

             <!-- Compact Toggle -->
             <div 
               :class="booking.boarded ? 'bg-green-500 border-green-400' : 'bg-white/5 border-white/10'"
               class="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 shadow-lg"
             >
                <svg v-if="booking.boarded" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                <div v-else class="w-1.5 h-1.5 rounded-full bg-white/20"></div>
             </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="manifestList.length === 0" class="flex flex-col items-center justify-center py-20 animate-fade-in">
         <div class="w-20 h-20 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-white/10 mb-6">
            <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
         </div>
         <p class="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">No Passengers Found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { store, t } from '../store.js'

const props = defineProps({
  showStats: { type: Boolean, default: true },
  showRouteFilter: { type: Boolean, default: true },
  initialRoute: { type: String, default: '' },
  compact: { type: Boolean, default: false }
})

const searchQuery = ref('')
const debouncedQuery = ref('')
const routeFilter = ref(props.initialRoute)
let searchTimer = null

watch(() => props.initialRoute, (newVal) => {
  routeFilter.value = newVal
})

watch(searchQuery, (val) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { debouncedQuery.value = val }, 250)
})

function normalizedTel(phone) {
  if (!phone) return ''
  const digits = String(phone).replace(/[\s\-()]/g, '')
  if (digits.startsWith('09') || digits.startsWith('07')) {
    return 'tel:+251' + digits.slice(1)
  }
  return 'tel:' + digits
}

const manifestList = computed(() => {
  let list = store.bookings.filter(b => b.status === 'Confirmed')
  if (routeFilter.value) list = list.filter(b => b.route === routeFilter.value)
  const q = debouncedQuery.value.toLowerCase().replace(/[\s\-]/g, '')
  if (q) {
    list = list.filter(b =>
      b.name.toLowerCase().includes(debouncedQuery.value.toLowerCase()) ||
      b.id.toLowerCase().includes(q) ||
      (b.phone && b.phone.replace(/[\s\-]/g, '').includes(q))
    )
  }
  return list.sort((a, b) => (Number(a.seat_number) || 0) - (Number(b.seat_number) || 0))
})

const stats = computed(() => {
  const relevanceList = routeFilter.value 
    ? store.bookings.filter(b => b.status === 'Confirmed' && b.route === routeFilter.value)
    : store.bookings.filter(b => b.status === 'Confirmed')
  const total = relevanceList.length
  const boarded = relevanceList.filter(b => b.boarded).length
  const pending = total - boarded
  const percentage = total === 0 ? 0 : Math.round((boarded / total) * 100)
  return { total, boarded, pending, percentage }
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
</style>
