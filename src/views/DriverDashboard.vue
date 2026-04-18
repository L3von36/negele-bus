<template>
  <div class="min-h-screen bg-[#0F172A] overflow-x-hidden">

    <!-- Navigation -->
    <nav class="sticky top-0 z-50 px-6 py-4 bg-[#0F172A] border-b border-white/10">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-1.5">
            <img src="/favicon.png" alt="Logo" class="w-full h-full object-contain" />
          </div>
          <div class="hidden sm:block">
            <h1 class="text-white font-bold text-sm tracking-tight leading-none">{{ t('brand_name') }}</h1>
            <p class="text-white/30 text-[10px] font-medium uppercase tracking-widest mt-0.5">Driver Portal</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div v-if="store.userProfile?.full_name" class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
            <div class="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
              <span class="text-accent text-[8px] font-bold">{{ store.userProfile.full_name.charAt(0) }}</span>
            </div>
            <span class="text-white/50 text-[10px] font-medium">{{ store.userProfile.full_name }}</span>
          </div>
          <div class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            <span class="text-white/50 text-[10px] font-medium uppercase tracking-wide">{{ formatEthiopian(new Date(), store, t) }}</span>
          </div>
          <button @click="handleSignOut" class="h-9 px-4 flex items-center justify-center gap-2 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl">
            <span class="text-[10px] font-medium uppercase tracking-wide">Sign Out</span>
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="!store.isInitialized" class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-4 space-y-4">
          <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-6 animate-pulse">
            <div class="h-4 bg-white/10 rounded w-24 mb-4"></div>
            <div class="h-10 bg-white/10 rounded w-32 mb-6"></div>
            <div class="h-20 bg-white/5 rounded-xl"></div>
          </div>
          <div class="bg-white/[0.04] border border-white/10 rounded-2xl p-6 animate-pulse">
            <div class="h-12 bg-white/10 rounded-xl mb-3"></div>
            <div class="grid grid-cols-2 gap-3">
              <div class="h-20 bg-white/5 rounded-xl"></div>
              <div class="h-20 bg-white/5 rounded-xl"></div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-8">
          <div class="bg-white/[0.04] border border-white/10 rounded-2xl h-[500px] animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main v-else class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        <!-- LEFT: Trip Info & Actions -->
        <div class="lg:col-span-4 space-y-4 lg:sticky lg:top-24">

          <!-- No Bus Assigned -->
          <section v-if="!store.driverBus" class="bg-white/[0.04] border border-white/10 rounded-2xl p-8 text-center">
            <div class="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <h3 class="text-white/50 text-sm font-semibold">No Bus Assigned</h3>
            <p class="text-white/25 text-xs mt-2 leading-relaxed">Contact dispatch to get assigned to a bus and route.</p>
          </section>

          <!-- Trip Summary Card -->
          <section v-if="store.driverBus" class="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
            <div class="flex justify-between items-start mb-6">
              <div>
                <p class="text-white/40 text-[10px] font-medium uppercase tracking-widest mb-1">Assigned Bus</p>
                <h2 class="text-white text-3xl font-bold tracking-tight">{{ store.driverBus.plate }}</h2>
                <p v-if="store.driverBus.capacity" class="text-white/30 text-xs mt-1">{{ store.driverBus.capacity }} seats total</p>
              </div>
              <div :class="tripStatusClass" class="text-[10px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                {{ tripStatusText }}
              </div>
            </div>

            <!-- Boarding Progress -->
            <div class="bg-black/20 rounded-xl p-4 border border-white/5 space-y-3">
              <div class="flex justify-between items-end">
                <div>
                  <p class="text-white/40 text-[10px] font-medium uppercase tracking-widest mb-1">Boarding Progress</p>
                  <p class="text-white text-xl font-bold">
                    {{ boardedCount }}
                    <span class="text-white/30 text-sm font-medium"> / {{ manifestoCount }}</span>
                  </p>
                </div>
                <p class="text-accent text-base font-bold">{{ boardingPercentage }}%</p>
              </div>
              <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-accent rounded-full transition-all duration-700" :style="{ width: boardingPercentage + '%' }"></div>
              </div>
              <p v-if="noShowCount > 0 && busStatus === 'On Route'" class="text-yellow-400/60 text-[10px]">
                {{ noShowCount }} no-show{{ noShowCount > 1 ? 's' : '' }}
              </p>
            </div>

            <!-- Route -->
            <div v-if="assignedRoute" class="mt-5 flex items-center justify-between">
              <div>
                <p class="text-white/40 text-[10px] font-medium uppercase tracking-widest mb-1">{{ t('departure') }}</p>
                <p class="text-white text-sm font-semibold">{{ assignedRoute.from_city }}</p>
              </div>
              <svg class="w-4 h-4 text-white/20 mx-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              <div class="text-right">
                <p class="text-white/40 text-[10px] font-medium uppercase tracking-widest mb-1">{{ t('destination') }}</p>
                <p class="text-white text-sm font-semibold">{{ assignedRoute.to_city }}</p>
              </div>
            </div>
            <div v-else class="mt-5 flex items-center gap-2 p-3 bg-white/[0.03] border border-white/5 rounded-xl">
              <svg class="w-4 h-4 text-white/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              <p class="text-white/30 text-xs">No route assigned yet</p>
            </div>
          </section>

          <!-- Action Buttons -->
          <section v-if="store.driverBus" class="grid grid-cols-2 gap-3">
            <!-- Scan Ticket -->
            <button @click="isScannerOpen = true" class="col-span-2 flex items-center justify-center gap-2 p-4 bg-accent hover:bg-orange-600 text-white rounded-2xl transition-colors active:scale-[0.98]">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 8h12m4 12h2" /></svg>
              <span class="text-sm font-bold uppercase tracking-wide">Scan Ticket</span>
            </button>

            <!-- Depart / Arrived toggle -->
            <button
              v-if="busStatus !== 'On Route' && busStatus !== 'Arrived'"
              @click="isDepartConfirmOpen = true"
              :disabled="!assignedRoute"
              class="driver-btn group"
            >
              <svg class="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/></svg>
              <span class="text-white/40 group-hover:text-white/70 text-[11px] font-medium uppercase tracking-wide transition-colors">Depart</span>
            </button>
            <button
              v-else-if="busStatus === 'On Route'"
              @click="endTrip"
              class="driver-btn group border-green-500/20 hover:bg-green-500/10 hover:border-green-500/30"
            >
              <svg class="w-4 h-4 text-green-400/50 group-hover:text-green-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-green-400/50 group-hover:text-green-400 text-[11px] font-medium uppercase tracking-wide transition-colors">Arrived</span>
            </button>
            <div v-else class="driver-btn opacity-30 cursor-not-allowed">
              <svg class="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              <span class="text-white/30 text-[11px] font-medium uppercase tracking-wide">Completed</span>
            </div>

            <button @click="openChat" class="driver-btn group">
              <svg class="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              <span class="text-white/40 group-hover:text-white/70 text-[11px] font-medium uppercase tracking-wide transition-colors">Hub Chat</span>
            </button>

            <button @click="triggerSOS" class="col-span-2 driver-btn group border-red-500/20 hover:bg-red-500/10 hover:border-red-500/30">
              <svg class="w-4 h-4 text-red-500/50 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span class="text-red-500/50 group-hover:text-red-400 text-[11px] font-medium uppercase tracking-wide transition-colors">Emergency SOS</span>
            </button>
          </section>
        </div>

        <!-- RIGHT: Passenger Manifest -->
        <div class="lg:col-span-8 space-y-4">
          <div class="flex items-center justify-between px-1">
            <h3 class="text-white/40 font-medium text-xs uppercase tracking-widest">Passenger Manifest</h3>
            <div class="flex items-center gap-3">
              <span v-if="manifestoCount > 0" class="text-white/30 text-xs">
                {{ boardedCount }}/{{ manifestoCount }} boarded
              </span>
              <div class="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span class="text-white/30 text-[10px] font-medium uppercase tracking-wide">Live</span>
              </div>
            </div>
          </div>

          <div class="border border-white/10 rounded-2xl overflow-hidden min-h-[500px]">
            <PassengerManifest
              v-if="assignedRoute"
              :initial-route="assignedRouteText"
              :show-route-filter="false"
              :show-stats="false"
              :compact="true"
            />
            <div v-else class="flex flex-col items-center justify-center py-24 text-center px-6">
              <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg class="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <h4 class="text-white/40 text-sm font-semibold uppercase tracking-widest">Awaiting Assignment</h4>
              <p class="text-white/20 text-xs mt-2 max-w-xs">The passenger manifest will appear once a route is assigned to your bus.</p>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Depart Confirmation Modal -->
    <div v-if="isDepartConfirmOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6">
      <div class="bg-[#1E293B] border border-white/10 rounded-2xl p-7 text-center space-y-5 max-w-sm w-full">
        <div class="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl mx-auto flex items-center justify-center">
          <svg class="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z"/></svg>
        </div>
        <div>
          <h2 class="text-white text-lg font-bold">Confirm Departure</h2>
          <p class="text-white/40 text-sm mt-1">
            {{ boardedCount }} of {{ manifestoCount }} passengers boarded
          </p>
          <p v-if="noShowCount > 0" class="text-yellow-400/80 text-sm mt-1">
            ⚠ {{ noShowCount }} passenger{{ noShowCount > 1 ? 's' : '' }} not yet boarded
          </p>
        </div>
        <div v-if="assignedRoute" class="flex items-center justify-center gap-3 py-2.5 px-4 bg-white/5 rounded-xl border border-white/5">
          <span class="text-white/60 text-sm font-medium">{{ assignedRoute.from_city }}</span>
          <svg class="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          <span class="text-white/60 text-sm font-medium">{{ assignedRoute.to_city }}</span>
        </div>
        <div class="grid grid-cols-2 gap-3 pt-1">
          <button @click="isDepartConfirmOpen = false" class="bg-white/10 hover:bg-white/15 text-white py-3 rounded-xl font-medium text-sm transition-colors">
            Cancel
          </button>
          <button @click="startTrip" class="bg-accent hover:bg-orange-600 text-white py-3 rounded-xl font-bold text-sm transition-colors uppercase tracking-wide">
            Depart
          </button>
        </div>
      </div>
    </div>

    <!-- SOS Countdown Modal -->
    <div v-if="sosCountdown > 0" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6">
      <div class="bg-[#1E293B] border border-red-500/30 rounded-2xl p-8 text-center space-y-6 max-w-sm w-full">
        <div class="w-24 h-24 bg-red-500/10 border-2 border-red-500/30 rounded-full mx-auto flex items-center justify-center">
          <span class="text-red-400 text-5xl font-bold tabular-nums">{{ sosCountdown }}</span>
        </div>
        <div>
          <h2 class="text-white text-xl font-bold uppercase tracking-tight">Emergency SOS</h2>
          <p class="text-white/40 text-sm mt-2">Emergency signal sends to dispatch in {{ sosCountdown }} second{{ sosCountdown !== 1 ? 's' : '' }}.</p>
          <p class="text-white/25 text-xs mt-1">Stay calm. Help is on the way once sent.</p>
        </div>
        <button @click="cancelSOS" class="w-full bg-white/10 hover:bg-white/20 text-white py-3.5 rounded-xl font-semibold uppercase tracking-wide transition-colors">
          Cancel SOS
        </button>
      </div>
    </div>

    <!-- SOS Sent Confirmation -->
    <div v-if="sosSent" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6">
      <div class="bg-[#1E293B] border border-red-500/40 rounded-2xl p-8 text-center space-y-5 max-w-sm w-full">
        <div class="w-16 h-16 bg-red-500/20 rounded-full mx-auto flex items-center justify-center">
          <svg class="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        </div>
        <div>
          <h2 class="text-white text-xl font-bold">SOS Sent</h2>
          <p class="text-white/50 text-sm mt-1">Dispatch and emergency services have been alerted. Stay at your current location.</p>
        </div>
        <button @click="sosSent = false" class="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-colors">
          Dismiss
        </button>
      </div>
    </div>

    <!-- Hub Chat Sidebar -->
    <div
      :class="isChatOpen ? 'translate-x-0' : 'translate-x-full'"
      class="fixed top-0 right-0 h-full w-full sm:w-[380px] z-[100] bg-[#0F172A] border-l border-white/10 transition-transform duration-300 ease-in-out flex flex-col"
    >
      <div class="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <svg class="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
          </div>
          <div>
            <h3 class="text-white font-semibold text-sm leading-none">Dispatch Hub</h3>
            <span class="text-green-400 text-[10px] font-medium uppercase tracking-wide">Connected</span>
          </div>
        </div>
        <button @click="isChatOpen = false" class="text-white/30 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <div ref="chatScrollRef" class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
        <div v-for="msg in chatMessages" :key="msg.id" :class="msg.isMe ? 'items-end' : 'items-start'" class="flex flex-col gap-1">
          <span class="text-[10px] font-medium text-white/30 uppercase tracking-wide">{{ msg.sender }}</span>
          <div :class="msg.isMe ? 'bg-accent/10 border-accent/20' : 'bg-white/5 border-white/10'" class="max-w-[80%] px-4 py-3 rounded-xl border">
            <p class="text-white/70 text-sm leading-relaxed">{{ msg.text }}</p>
          </div>
          <span class="text-[10px] text-white/20">{{ msg.time }}</span>
        </div>
        <div ref="chatEndRef"></div>
      </div>

      <div class="p-5 border-t border-white/10 shrink-0">
        <div class="relative">
          <input
            v-model="newMessage"
            @keydown.enter.prevent="sendMessage"
            type="text"
            placeholder="Message dispatch…"
            class="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/30"
          />
          <button
            @click="sendMessage"
            :disabled="!newMessage.trim()"
            class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white hover:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Scanner Modal -->
    <QRScannerModal
      :is-open="isScannerOpen"
      :scan-result="scanResult"
      @close="isScannerOpen = false; scanResult = null"
      @scanned="onTicketScanned"
    />

  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store, t } from '../store.js'
import { toast } from '../lib/toast.js'
import PassengerManifest from '../components/PassengerManifest.vue'
import QRScannerModal from '../components/QRScannerModal.vue'
import { formatEthiopian } from '../lib/ethiopianCalendar.js'

const router = useRouter()
const isScannerOpen = ref(false)
const scanResult = ref(null)
const isChatOpen = ref(false)
const isDepartConfirmOpen = ref(false)
const sosCountdown = ref(0)
const sosSent = ref(false)
const newMessage = ref('')
const chatEndRef = ref(null)
const chatScrollRef = ref(null)
let sosTimer = null

// Refresh driver bus data on mount in case it wasn't loaded yet
onMounted(async () => {
  if (store.isAuthenticated && store.userProfile?.role === 'driver' && !store.driverBus) {
    await store.fetchDriverBus().catch(() => {})
  }
})

// Chat
const chatMessages = ref([
  { id: 1, sender: 'Dispatch', text: 'Good morning. Traffic is clear on Route 4. Proceed with scheduled departure.', time: '07:45 AM', isMe: false },
  { id: 2, sender: 'You', text: 'Acknowledged. Vehicle inspection complete. Ready for boarding.', time: '08:02 AM', isMe: true },
])

function sendMessage() {
  const text = newMessage.value.trim()
  if (!text) return
  chatMessages.value.push({
    id: Date.now(),
    sender: 'You',
    text,
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    isMe: true,
  })
  newMessage.value = ''
  nextTick(() => chatEndRef.value?.scrollIntoView({ behavior: 'smooth' }))
}

function openChat() {
  isChatOpen.value = true
  nextTick(() => chatEndRef.value?.scrollIntoView({ behavior: 'instant' }))
}

// Trip data
const assignedRoute = computed(() => store.driverBus?.routes)
const busStatus = computed(() => store.driverBus?.status || 'Active')

const tripStatusText = computed(() => {
  if (busStatus.value === 'On Route') return 'In Transit'
  if (busStatus.value === 'Arrived') return 'Arrived'
  return 'Ready'
})

const tripStatusClass = computed(() => {
  if (busStatus.value === 'On Route') return 'bg-green-500/10 text-green-400 border border-green-500/20'
  if (busStatus.value === 'Arrived') return 'bg-white/10 text-white/40 border border-white/10'
  return 'bg-accent/10 text-accent border border-accent/20'
})

const assignedRouteText = computed(() => {
  if (!assignedRoute.value) return ''
  return `${assignedRoute.value.from_city} → ${assignedRoute.value.to_city}`
})

const manifestoCount = computed(() => {
  if (!assignedRouteText.value) return 0
  return store.bookings.filter(b => b.status === 'Confirmed' && b.route === assignedRouteText.value).length
})

const boardedCount = computed(() => {
  if (!assignedRouteText.value) return 0
  return store.bookings.filter(b => b.status === 'Confirmed' && b.route === assignedRouteText.value && b.boarded).length
})

const noShowCount = computed(() => manifestoCount.value - boardedCount.value)

const boardingPercentage = computed(() => {
  if (manifestoCount.value === 0) return 0
  return Math.round((boardedCount.value / manifestoCount.value) * 100)
})

// Ticket scanning — all validation happens here
function onTicketScanned(rawId) {
  const booking = store.bookings.find(b => b.id === rawId)

  if (!booking) {
    const msg = 'Ticket not found in system'
    scanResult.value = { type: 'error', message: msg }
    toast.error(msg)
    return
  }
  if (booking.status === 'Canceled' || booking.status === 'Cancelled') {
    const msg = 'This booking has been cancelled'
    scanResult.value = { type: 'error', message: msg }
    toast.error(msg)
    return
  }
  if (booking.status !== 'Confirmed') {
    const msg = 'Booking is not confirmed'
    scanResult.value = { type: 'error', message: msg }
    toast.error(msg)
    return
  }
  if (assignedRouteText.value && booking.route !== assignedRouteText.value) {
    const msg = `Wrong route — ticket is for: ${booking.route}`
    scanResult.value = { type: 'warning', message: msg }
    toast.info(msg)
    return
  }
  if (booking.boarded) {
    const msg = `${booking.name} — already boarded (Seat ${booking.seat_number || '?'})`
    scanResult.value = { type: 'warning', message: msg }
    toast.info(msg)
    return
  }

  await store.toggleBoarding(rawId)
  const msg = `${booking.name} — Seat ${booking.seat_number || '?'}`
  scanResult.value = { type: 'success', message: msg }
  toast.success(`Boarded: ${msg}`)
}

function startTrip() {
  if (!store.driverBus?.id) return
  isDepartConfirmOpen.value = false
  store.updateBusStatus(store.driverBus.id, 'On Route')
  toast.success('Trip started — safe travels!')
}

function endTrip() {
  if (!store.driverBus?.id) return
  store.updateBusStatus(store.driverBus.id, 'Arrived')
  toast.success(`Trip complete — ${boardedCount.value} boarded, ${noShowCount.value} no-show${noShowCount.value !== 1 ? 's' : ''}`)
}

function cancelSOS() {
  clearInterval(sosTimer)
  sosCountdown.value = 0
}

function triggerSOS() {
  if (sosCountdown.value > 0) return
  sosCountdown.value = 5
  sosTimer = setInterval(() => {
    sosCountdown.value--
    if (sosCountdown.value <= 0) {
      clearInterval(sosTimer)
      sosCountdown.value = 0
      sosSent.value = true
    }
  }, 1000)
}

async function handleSignOut() {
  await store.signOut()
  router.push('/')
}
</script>

<style scoped>
.driver-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  transition: all 0.15s;
  cursor: pointer;
}
.driver-btn:hover { background-color: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.15); }
.driver-btn:active { transform: scale(0.98); }
.driver-btn:disabled { opacity: 0.3; cursor: not-allowed; }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

</style>
