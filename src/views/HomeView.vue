<template>
  <div class="min-h-screen bg-background">

    <!-- Header -->
    <MainHeader />

    <!-- Hero Section -->
    <section class="relative bg-[#0F172A] overflow-hidden pt-12 sm:pt-20 pb-28 sm:pb-36 animate-fade-in border-b border-white/10" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0); background-size: 32px 32px;">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F172A] opacity-80 pointer-events-none"></div>
      <div class="relative px-4 sm:px-6 max-w-4xl mx-auto text-center sm:text-left z-10">
        <span class="inline-block border border-white/20 text-white/80 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-5">
          {{ t('official') }}
        </span>
        <h2 class="text-4xl sm:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
          {{ t('travel') }} <span class="text-accent underline underline-offset-4 decoration-2">{{ t('confidence') }}</span>
        </h2>
        <p class="text-white/80 text-base sm:text-lg mb-4 max-w-xl mx-auto sm:mx-0 font-medium">
          {{ t('subtext') }}
        </p>
      </div>
    </section>

    <!-- Search Card -->
    <section class="relative mt-[-6rem] sm:mt-[-8rem] px-4 sm:px-6 pb-12 sm:pb-16 animate-fade-in z-20">
      <div class="max-w-4xl mx-auto">
        <div class="bg-card rounded-2xl border border-border shadow-medium p-5 sm:p-8">
          <form class="space-y-4" @submit.prevent="search">
            <!-- Row 1: Departure + Destination + Swap -->
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1">
                <label class="block text-xs sm:text-sm font-medium text-text-primary mb-1.5">{{ t('departure') }}</label>
                <select v-model="fromCity" class="custom-select w-full px-3 sm:px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all">
                  <option value="">{{ t('select_departure') }}</option>
                  <option v-for="(name, id) in ui.translations[ui.activeLang].cities" :key="id" :value="id">
                    {{ name }}
                  </option>
                </select>
              </div>
              <!-- Swap button (horizontal on sm, vertical gap on mobile) -->
              <div class="flex sm:items-end justify-center">
                <button type="button" @click="swap" class="w-full sm:w-11 h-11 bg-accent/10 text-accent border border-accent/30 rounded-xl flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 8l-3 3m0 0l3 3m-3-3h8M5 15l-3-3m0 0l3-3m3 6H5" />
                  </svg>
                </button>
              </div>
              <div class="flex-1">
                <label class="block text-xs sm:text-sm font-medium text-text-primary mb-1.5">{{ t('destination') }}</label>
                <select v-model="toCity" class="custom-select w-full px-3 sm:px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all">
                  <option value="">{{ t('select_destination') }}</option>
                  <option v-for="(name, id) in ui.translations[ui.activeLang].cities" :key="id" :value="id">
                    {{ name }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Row 2: Date + Search -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs sm:text-sm font-medium text-text-primary mb-1.5">{{ t('date') }}</label>
                <DatePickerEthiopian v-model="travelDate" />
              </div>
              <div class="flex items-end">
                <AppButton 
                  type="submit" 
                  fullWidth
                  :disabled="!fromCity || !toCity"
                >
                  {{ t('search_buses') }}
                </AppButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Popular Routes -->
    <section class="px-4 sm:px-6 pb-16 max-w-7xl mx-auto animate-fade-in">
      <h3 class="text-lg sm:text-xl font-bold text-text-primary mb-5 sm:mb-8">{{ t('popular_routes') }}</h3>
      <div class="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="route in dynamicRoutes" :key="route.label"
           @click="searchSpecific(route.fromId, route.toId)"
           class="bg-card rounded-xl border border-border shadow-soft p-4 flex items-center space-x-3 hover:border-accent group transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1">
          <div class="bg-background group-hover:bg-accent group-hover:text-white transition-colors duration-200 rounded-lg w-10 h-10 flex items-center justify-center flex-shrink-0 text-text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v8a2 2 0 002 2h6a2 2 0 002-2v-8" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-text-primary text-sm truncate">{{ route.label }}</p>
            <p class="text-xs text-text-secondary">{{ route.meta }}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </section>

    <!-- Animated Onboarding Guide -->
    <OnboardingGuide />

    <!-- Why Choose Us -->
    <section class="px-4 sm:px-6 pb-20 max-w-7xl mx-auto animate-fade-in">
      <h3 class="text-lg sm:text-2xl font-bold text-text-primary mb-6 sm:mb-10 text-center">{{ t('features_title') }}</h3>
      <div class="grid gap-6 sm:grid-cols-3">
        <!-- Feature 1 -->
        <div class="bg-background rounded-2xl p-6 text-center border border-border">
          <div class="w-14 h-14 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
            <svg class="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 class="font-bold text-text-primary mb-2">{{ t('feature_1_title') }}</h4>
          <p class="text-sm text-text-secondary">{{ t('feature_1_desc') }}</p>
        </div>
        <!-- Feature 2 -->
        <div class="bg-background rounded-2xl p-6 text-center border border-border">
          <div class="w-14 h-14 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h4 class="font-bold text-text-primary mb-2">{{ t('feature_2_title') }}</h4>
          <p class="text-sm text-text-secondary">{{ t('feature_2_desc') }}</p>
        </div>
        <!-- Feature 3 -->
        <div class="bg-background rounded-2xl p-6 text-center border border-border">
          <div class="w-14 h-14 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h4 class="font-bold text-text-primary mb-2">{{ t('feature_3_title') }}</h4>
          <p class="text-sm text-text-secondary">{{ t('feature_3_desc') }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-[#0F172A] text-white/70 py-10 mt-auto border-t border-white/10">
      <div class="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
        <p class="text-center text-xs sm:text-sm font-medium">{{ t('copyright') }}</p>
        <div class="flex items-center gap-6 text-xs uppercase tracking-widest font-bold">
          <router-link to="/driver" class="hover:text-accent transition-colors">Driver Portal</router-link>
          <span class="w-1 h-1 bg-white/20 rounded-full"></span>
          <router-link to="/admin-login" class="hover:text-accent transition-colors">Admin Portal</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '../stores/ui'
import { useRoutes } from '../lib/queries'
import { useMeta } from '../lib/useMeta.js'
import MainHeader from '../components/MainHeader.vue'
import AppButton from '../components/AppButton.vue'
import OnboardingGuide from '../components/OnboardingGuide.vue'
import DatePickerEthiopian from '../components/DatePickerEthiopian.vue'

const router = useRouter()
const ui = useUiStore()
const { t } = ui
const { data: routesData } = useRoutes()
const { setMeta } = useMeta()

onMounted(() => {
  setMeta(
    'Home', 
    'The official transport booking portal for Negele Borena. Search buses, verify seats, and book tickets instantly.'
  )
})

const fromCity   = ref('')
const toCity     = ref('')
const travelDate = ref('')

function swap() {
  const tmp = fromCity.value
  fromCity.value = toCity.value
  toCity.value   = tmp
}

const search = () => {
  if (!fromCity.value || !toCity.value) {
    alert("Please select both Departure and Destination cities.");
    return;
  }

  if (fromCity.value === toCity.value) {
    alert("Departure and Destination cannot be the same city. Please choose a different route.");
    return;
  }
  
  router.push({
    path: '/search-results',
    query: {
      from: fromCity.value,
      to:   toCity.value,
      date: travelDate.value || 'Today',
    }
  });
}

const searchSpecific = (from, to) => {
  router.push({
    path: '/search-results',
    query: {
      from,
      to,
      date: 'Today',
    }
  });
}

// Map dynamic popular routes from routes data
const dynamicRoutes = computed(() => {
  const routes = routesData.value || []
  return routes.filter(r => r.active).map(r => {
    // Find city slugs by matching English names from the 'en' dictionary
    const enCities = ui.translations.en.cities
    const fromSlug = Object.keys(enCities).find(k => enCities[k].toLowerCase() === r.from.toLowerCase()) || r.from
    const toSlug   = Object.keys(enCities).find(k => enCities[k].toLowerCase() === r.to.toLowerCase())   || r.to
    
    return {
      label: `${t('cities.' + fromSlug)} → ${t('cities.' + toSlug)}`,
      meta: `${t('from_label')} ${r.price} ${t('etb_label')} • ${r.duration}`,
      fromId: fromSlug,
      toId: toSlug
    }
  }).slice(0, 4)
})


</script>

<style scoped>
/* Component-specific styles */
</style>