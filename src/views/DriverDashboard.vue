<template>
  <div class="min-h-screen bg-background pb-20">
    <!-- Driver Header -->
    <header class="bg-primary pt-8 pb-12 px-6 relative overflow-hidden">
      <div class="relative z-10 max-w-2xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-3">
             <img src="/favicon.png" alt="Logo" class="rounded-lg w-10 h-10 flex-shrink-0 object-cover border border-white/10 shadow-lg shadow-accent/20" />
             <div>
                <h1 class="text-white font-black text-lg sm:text-xl tracking-tight leading-none">Driver Portal</h1>
                <p class="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1">Personnel Access</p>
             </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right hidden sm:block">
              <p class="text-white font-bold text-sm">{{ store.userProfile?.full_name || 'Staff' }}</p>
              <p class="text-white/40 text-[10px] font-black uppercase tracking-widest">Active Duty</p>
            </div>
            <button @click="handleSignOut" class="h-10 w-10 flex items-center justify-center text-white/70 hover:text-white transition-all bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 shadow-inner">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>

        <!-- Assignment Information Card -->
        <div class="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl relative overflow-hidden group">
           <div class="relative z-10">
              <div class="flex justify-between items-start mb-6">
                 <div>
                    <p class="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1.5">Official Assignment</p>
                    <h2 class="text-white text-3xl font-black tracking-tighter">
                       {{ store.driverBus?.plate || 'Awaiting Duty' }}
                    </h2>
                 </div>
                 <div v-if="store.driverBus" class="bg-accent text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-accent/40 animate-pulse">
                    On Duty
                 </div>
              </div>

              <!-- Route Path UI -->
              <div v-if="assignedRoute" class="flex items-center gap-3 py-4 border-y border-white/10 my-6">
                 <div class="flex-1 text-center">
                    <p class="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">{{ assignedRoute.from_city }}</p>
                    <p class="text-white text-sm font-black">DEPARTURE</p>
                 </div>
                 <div class="flex flex-col items-center flex-shrink-0">
                    <div class="w-12 h-[1px] bg-white/30 relative">
                       <div class="absolute -top-1.5 left-1/2 -ml-1.5 w-3 h-3 bg-accent rounded-full border-2 border-primary"></div>
                    </div>
                 </div>
                 <div class="flex-1 text-center">
                    <p class="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">{{ assignedRoute.to_city }}</p>
                    <p class="text-white text-sm font-black">DESTINATION</p>
                 </div>
              </div>

              <!-- Boarding Progress -->
              <div v-if="store.driverBus" class="space-y-2">
                 <div class="flex justify-between items-end">
                    <p class="text-white/60 text-[10px] font-black uppercase tracking-widest">Boarding Progress</p>
                    <p class="text-white font-black text-sm">{{ boardingPercentage }}%</p>
                 </div>
                 <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-accent transition-all duration-1000 shadow-[0_0_10px_rgba(249,115,22,0.5)]" :style="{ width: boardingPercentage + '%' }"></div>
                 </div>
                 <p class="text-white/40 text-[10px] font-medium italic">Confirmed: {{ boardedCount }} / {{ manifestoCount }} Passengers</p>
              </div>

              <div v-else class="py-4 text-center">
                 <p class="text-white/70 text-sm font-medium">No bus assigned to your account in Supabase yet.</p>
              </div>
           </div>
           
           <!-- Decorative BG logic -->
           <div class="absolute -right-12 -top-12 w-40 h-40 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-all duration-700"></div>
        </div>
      </div>
    </header>

    <!-- Manifest Content -->
    <main class="max-w-2xl mx-auto px-6 -mt-8 relative z-20">
        <PassengerManifest 
          v-if="assignedRoute" 
          :initial-route="assignedRouteText"
          :show-route-filter="false"
          compact
        />
        
        <!-- Empty Trip State -->
        <div v-else-if="!store.driverBus" class="bg-card rounded-3xl p-12 text-center border border-border shadow-soft animate-fade-in">
           <div class="w-20 h-20 bg-primary-100 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 text-accent shadow-inner">
              <svg class="w-10 h-10 -rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
           </div>
           <h3 class="text-xl font-black text-text-primary tracking-tight">Assignment Pending</h3>
           <p class="text-text-secondary mt-2 mb-8 max-w-sm mx-auto text-sm leading-relaxed">Please contact the Transport Authority Administrator to link your staff profile to a bus plate.</p>
           <div class="bg-primary/5 p-5 rounded-2xl border border-dashed border-border inline-block max-w-xs">
              <p class="text-xs font-black text-text-primary uppercase tracking-widest mb-1.5 border-b border-border pb-1">Required Information</p>
              <p class="text-xs text-text-secondary leading-relaxed">Your User ID: <span class="font-mono text-[10px] break-all text-accent">{{ store.user?.id }}</span></p>
           </div>
        </div>
    </main>

    <!-- Mobile Footer Navigation (Quick Logout/Home) -->
    <div class="fixed bottom-6 left-0 right-0 px-6 flex justify-center sm:hidden z-50">
       <button @click="handleSignOut" class="bg-black text-white px-8 py-3 rounded-2xl font-black text-sm shadow-2xl flex items-center gap-2 border border-white/20">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          LOGOUT
       </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'
import PassengerManifest from '../components/PassengerManifest.vue'

const router = useRouter()

// Personalization Logic
const assignedRoute = computed(() => {
  // Use the bus-route relationship if available, or find the route matching the bus settings
  // For now, we assume driverBus holds a route object as per our new store logic select('*, routes(*)')
  return store.driverBus?.routes
})

const assignedRouteText = computed(() => {
  if (!assignedRoute.value) return ''
  return assignedRoute.value.from_city + ' → ' + assignedRoute.value.to_city
})

const manifestoCount = computed(() => {
  if (!assignedRouteText.value) return 0
  return store.bookings.filter(b => 
    b.status === 'Confirmed' && 
    b.route === assignedRouteText.value
  ).length
})

const boardedCount = computed(() => {
  if (!assignedRouteText.value) return 0
  return store.bookings.filter(b => 
    b.status === 'Confirmed' && 
    b.route === assignedRouteText.value && 
    b.boarded
  ).length
})

const boardingPercentage = computed(() => {
  if (manifestoCount.value === 0) return 0
  return Math.round((boardedCount.value / manifestoCount.value) * 100)
})

async function handleSignOut() {
  await store.signOut()
  router.push('/admin-login')
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
