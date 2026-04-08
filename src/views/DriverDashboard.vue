<template>
  <div class="min-h-screen bg-background pb-20">
    <!-- Driver Header -->
    <header class="bg-primary pt-10 pb-16 px-6 relative overflow-hidden">
      <div class="relative z-10 max-w-2xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
             <div class="bg-accent rounded-lg p-2">
                 <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
             </div>
             <h1 class="text-white font-black text-xl tracking-tight">Driver Portal</h1>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right hidden sm:block">
              <p class="text-[10px] font-black text-white/40 uppercase tracking-widest">Driver</p>
              <p class="text-white font-bold text-sm">{{ store.userProfile?.full_name || 'Staff' }}</p>
            </div>
            <button @click="handleSignOut" class="text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-xl hover:bg-white/20 shadow-inner">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
           <p class="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Assigned Trip</p>
           <h2 class="text-white text-2xl font-black tracking-tight mb-4">
              {{ currentRoute || 'Select a trip to start' }}
           </h2>
           
           <div class="flex items-center gap-4">
             <select v-model="currentRoute" class="flex-1 bg-white/10 border-white/20 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent custom-select">
                <option value="" disabled class="text-black">Select current route...</option>
                <option v-for="r in store.routes" :key="r.id" :value="r.from + ' → ' + r.to" class="text-black">
                   {{ r.from }} → {{ r.to }}
                </option>
             </select>
           </div>
        </div>
      </div>
      
      <!-- Abstract Background Element -->
      <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
    </header>

    <!-- Manifest Content -->
    <main class="max-w-2xl mx-auto px-6 -mt-8 relative z-20">
       <PassengerManifest 
         v-if="currentRoute" 
         :initial-route="currentRoute"
         :show-route-filter="false" 
       />
       
       <!-- Empty Trip State -->
       <div v-else class="bg-card rounded-2xl p-12 text-center border border-border shadow-soft">
          <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
             <svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h3 class="text-xl font-black text-text-primary tracking-tight">Ready to start boarding?</h3>
          <p class="text-text-secondary mt-2 mb-8">Select your trip from the menu above to see your passenger manifest.</p>
          <div class="bg-primary-100/50 p-4 rounded-xl border border-border inline-block">
             <p class="text-xs font-bold text-text-primary uppercase tracking-widest mb-1">Station Tip</p>
             <p class="text-sm text-text-secondary">Verify every passenger's Ticket ID before they enter the bus.</p>
          </div>
       </div>
    </main>

    <!-- Status Bar (Stick Bottom for Trip Info) -->
    <div v-if="currentRoute" class="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 z-50 shadow-large-up flex items-center justify-between">
       <div>
          <p class="text-[10px] font-black text-text-secondary uppercase tracking-widest">Active Manifest</p>
          <p class="text-sm font-bold text-text-primary truncate max-w-[150px]">{{ currentRoute }}</p>
       </div>
       <button 
         class="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-accent transition-all active:scale-95 shadow-md"
         @click="finishTrip"
       >
         Complete Trip
       </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'
import PassengerManifest from '../components/PassengerManifest.vue'

const router = useRouter()
const currentRoute = ref('')

async function handleSignOut() {
  await store.signOut()
  router.push('/admin-login')
}

function finishTrip() {
  if(confirm('Are you sure you want to complete this trip? All boarding statuses will be archived.')) {
    currentRoute.value = ''
  }
}
</script>

<style scoped>
.shadow-large-up {
  box-shadow: 0 -10px 15px -3px rgba(0, 0, 0, 0.05), 0 -4px 6px -2px rgba(0, 0, 0, 0.025);
}
</style>
