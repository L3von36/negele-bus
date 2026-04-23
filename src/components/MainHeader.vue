<template>
  <header 
    :class="[
      'z-[60] border-b transition-all duration-300 relative',
      transparent && !isScrolled ? 'bg-transparent border-transparent' : 'bg-[#0F172A] border-white/10'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
      
      <!-- Left: Logo & Title / Back Button -->
      <div class="flex items-center space-x-2 sm:space-x-3 min-w-0">
        <button
          v-if="showBack"
          @click="$router.back()"
          aria-label="Go back"
          class="mr-1 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div 
          class="flex items-center space-x-2 sm:space-x-3 min-w-0" 
        >
          <img src="/favicon.png" alt="Logo" class="rounded-lg w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 object-cover border border-white/10 shadow-lg" />
          <div class="flex flex-col min-w-0 overflow-hidden">
            <h1 class="text-white font-bold text-xs sm:text-lg leading-tight truncate">{{ t('brand_name') }}</h1>
            <p v-if="!showBack" class="text-[8px] sm:text-[10px] text-white/50 hidden sm:block uppercase tracking-wider font-bold">{{ t('brand_subtitle') }}</p>
          </div>
        </div>
      </div>


      <!-- Right: Language Switcher Dropdown & Mobile Menu Button -->
      <div class="flex items-center space-x-2">
        <!-- Language Switcher Dropdown -->
        <div class="relative">
          <select 
            :value="ui.activeLang" 
            @change="(e) => ui.setLanguage(e.target.value)"
            class="appearance-none bg-white/5 text-white text-[10px] sm:text-xs font-bold uppercase py-2 pl-3 pr-8 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer hover:bg-white/10 transition-all"
          >
            <option value="en" class="bg-[#1E293B] text-white">EN</option>
            <option value="am" class="bg-[#1E293B] text-white">አማ</option>
            <option value="om" class="bg-[#1E293B] text-white">OM</option>
          </select>
          <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <!-- Mobile Hamburger Button -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2 text-white/70 hover:text-white bg-white/5 rounded-xl transition-all border border-white/10"
        >
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="isMenuOpen"
      class="md:hidden fixed inset-0 z-[50] bg-black/60 backdrop-blur-sm animate-fade-in"
      @click="isMenuOpen = false"
    >
      <div 
        class="absolute top-20 left-4 right-4 bg-[#1E293B] rounded-3xl p-6 border border-white/10 shadow-2xl animate-slide-down"
        @click.stop
      >
        <div class="space-y-4">
          <p class="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">{{ t('nav.navigation') }}</p>
          <router-link
            to="/driver"
            @click="isMenuOpen = false"
            class="block text-xl font-bold text-white hover:text-accent transition-colors flex items-center justify-between"
          >
            {{ t('nav.driver_portal') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </router-link>
          <router-link
            to="/admin-login"
            @click="isMenuOpen = false"
            class="block text-xl font-bold text-white hover:text-accent transition-colors flex items-center justify-between"
          >
            {{ t('nav.admin_portal') }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUiStore } from '../stores/ui'

const props = defineProps({
  showBack: { type: Boolean, default: false },
  transparent: { type: Boolean, default: false }
})

const ui = useUiStore()
const { t } = ui
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
.animate-slide-down {
  animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Fix for standard select appearance */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
