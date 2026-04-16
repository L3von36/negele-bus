<script setup>
const routes = [
  {
    from: 'Negele Borena',
    to: 'Addis Ababa',
    distance: '470 km',
    duration: '8h 30m'
  },
  {
    from: 'Negele Borena',
    to: 'Hawassa',
    distance: '320 km',
    duration: '5h 45m'
  },
  {
    from: 'Negele Borena',
    to: 'Moyale',
    distance: '280 km',
    duration: '5h'
  },
  {
    from: 'Negele Borena',
    to: 'Yabello',
    distance: '180 km',
    duration: '3h 15m'
  }
]
</script>

<template>
  <section class="py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold text-center mb-8">Popular Routes</h2>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(route, index) in routes" :key="index" class="bg-card rounded-xl shadow-soft p-6 flex flex-col h-full">
          <div class="flex items-start space-x-3 mb-4">
            <div class="w-8 h-8 bg-primary/90 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9-7-9-7-9 7 9 7z" />
              </svg>
            </div>
            <div>
              <p class="font-medium text-text-primary">{{ route.from }}</p>
              <p class="text-sm text-text-secondary">{{ route.to }}</p>
            </div>
          </div>
          <div class="flex items-center justify-between text-sm text-text-secondary">
            <span>{{ route.distance }}</span>
            <span>{{ route.duration }}</span>
          </div>
          <div class="mt-auto pt-4">
            <div class="flex justify-between">
              <span class="text-xs text-text-secondary">←</span>
              <span class="text-xs text-text-secondary">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
