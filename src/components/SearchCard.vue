<script setup>
import { ref } from 'vue'

const departure = ref('Negele Borena')
const destination = ref('Hawassa')
const date = ref(new Date().toISOString().split('T')[0])

const cities = [
  'Negele Borena',
  'Addis Ababa',
  'Hawassa',
  'Moyale',
  'Yabello'
]

const handleSwap = () => {
  const temp = departure.value
  departure.value = destination.value
  destination.value = temp
}
</script>

<template>
  <div class="relative z-10 mb-16">
    <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-card rounded-2xl shadow-medium">
        <div class="p-6 sm:p-8">
          <div class="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <!-- Departure -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">From</label>
              <select
                v-model="departure"
                class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              >
                <option v-for="city in cities" :key="city" :value="city">
                  {{ city }}
                </option>
              </select>
            </div>
            
            <!-- Swap -->
            <div class="flex items-center justify-center">
              <button
                @click="handleSwap"
                class="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white hover:bg-accent/90 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            
            <!-- Destination -->
            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">To</label>
              <select
                v-model="destination"
                class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
              >
                <option v-for="city in cities" :key="city" :value="city">
                  {{ city }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="mt-6 sm:mt-0 sm:col-span-3">
            <label class="block text-sm font-medium text-text-secondary mb-1">Date</label>
            <input
              type="date"
              v-model="date"
              class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
            />
          </div>
          
          <div class="mt-8 sm:mt-0 sm:col-span-3">
            <button
              class="w-full bg-accent rounded-xl px-6 py-3 text-white font-medium text-lg hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2"
            >
              Search Buses
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
