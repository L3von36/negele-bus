<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
    <div class="bg-card w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col">

      <!-- Header -->
      <div class="px-6 py-4 border-b border-border flex justify-between items-center bg-primary">
        <h2 class="text-xl font-bold text-text-primary">Edit Route</h2>
        <button @click="$emit('close')" aria-label="Close" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSave" class="p-6 space-y-4" novalidate>
        <p v-if="formError" role="alert" class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {{ formError }}
        </p>
        <div>
          <label for="route-from" class="block text-sm font-medium text-text-primary mb-1">Departure</label>
          <input id="route-from" v-model="formData.from" type="text"
            class="w-full px-4 py-2 border border-border rounded-xl focus:border-accent text-sm focus:outline-none"
            required />
        </div>
        <div>
          <label for="route-to" class="block text-sm font-medium text-text-primary mb-1">Destination</label>
          <input id="route-to" v-model="formData.to" type="text"
            class="w-full px-4 py-2 border border-border rounded-xl focus:border-accent text-sm focus:outline-none"
            required />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="route-price" class="block text-sm font-medium text-text-primary mb-1">Price (ETB)</label>
            <input id="route-price" v-model.number="formData.price" type="number" min="1"
              class="w-full px-4 py-2 border border-border rounded-xl focus:border-accent text-sm focus:outline-none"
              required />
          </div>
          <div>
            <label for="route-distance" class="block text-sm font-medium text-text-primary mb-1">Distance</label>
            <input id="route-distance" v-model="formData.distance" type="text"
              class="w-full px-4 py-2 border border-border rounded-xl focus:border-accent text-sm focus:outline-none" />
          </div>
        </div>
        <div>
          <label for="route-duration" class="block text-sm font-medium text-text-primary mb-1">Duration</label>
          <input id="route-duration" v-model="formData.duration" type="text"
            class="w-full px-4 py-2 border border-border rounded-xl focus:border-accent text-sm focus:outline-none" />
        </div>

        <button type="submit" :disabled="isSaving"
          class="w-full bg-black text-white hover:bg-accent disabled:opacity-50 transition-colors py-3 mt-2 flex justify-center items-center gap-2 rounded-xl text-sm font-bold">
          <svg v-if="isSaving" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ isSaving ? 'Saving…' : 'Save Changes' }}
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { store } from '../store.js'

const props = defineProps({
  isOpen: Boolean,
  routeData: Object
})

const emit = defineEmits(['close'])

const isSaving = ref(false)
const formError = ref('')

const formData = reactive({
  id: '',
  from: '',
  to: '',
  price: 0,
  distance: '',
  duration: ''
})

watch(() => props.routeData, (newVal) => {
  if (newVal) {
    Object.assign(formData, newVal)
    formError.value = ''
  }
}, { immediate: true })

async function handleSave() {
  formError.value = ''
  const from = formData.from.trim()
  const to = formData.to.trim()
  const price = Number(formData.price)

  if (!from || !to) {
    formError.value = 'Departure and destination are required.'
    return
  }
  if (from.toLowerCase() === to.toLowerCase()) {
    formError.value = 'Departure and destination must be different.'
    return
  }
  if (!price || price < 1) {
    formError.value = 'Price must be at least 1 ETB.'
    return
  }

  isSaving.value = true
  try {
    await store.updateRoute(formData.id, { ...formData, from, to, price })
    emit('close')
  } finally {
    isSaving.value = false
  }
}
</script>
