<template>
  <div class="relative w-full">
    <!-- Display Field -->
    <div 
      @click="isOpen = true"
      class="w-full px-3 sm:px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer flex items-center justify-between group hover:border-accent"
    >
      <span v-if="modelValue" class="font-bold text-gray-800">{{ formattedSelectedDate }}</span>
      <span v-else class="text-gray-400">{{ placeholder || t('select_date') }}</span>
      
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>

    <!-- Modal Backdrop -->
    <div v-if="isOpen" class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" @click="isOpen = false">
      <!-- Modal Content -->
      <div class="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up" @click.stop>
        
        <!-- Modal Header -->
        <div class="bg-[#0F172A] p-6 text-white text-center relative">
          <button @click="isOpen = false" class="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <p class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">{{ t('date') }} (Ethiopian)</p>
          <div class="flex items-center justify-center gap-4">
             <button @click="prevMonth" class="p-2 hover:bg-white/10 rounded-xl transition-colors">
               <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
             </button>
             <div class="flex flex-col">
               <span class="text-xl font-black">{{ currentMonthName }}</span>
               <span class="text-xs font-bold text-accent">{{ viewYear }}</span>
             </div>
             <button @click="nextMonth" class="p-2 hover:bg-white/10 rounded-xl transition-colors">
               <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
             </button>
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="p-6">
          <div class="grid grid-cols-7 gap-1 mb-4">
            <span v-for="d in 7" :key="d" class="text-center text-[8px] font-black text-gray-400 uppercase tracking-widest">{{ ['S','M','T','W','T','F','S'][d-1] }}</span>
          </div>

          <div class="grid grid-cols-7 gap-2">
            <button 
              v-for="d in daysInMonth" :key="d"
              @click="selectDay(d)"
              :class="[
                'aspect-square rounded-xl text-sm font-bold transition-all flex items-center justify-center border',
                isToday(d) ? 'border-accent text-accent' : 'border-transparent',
                isSelected(d) ? 'bg-accent text-white border-accent shadow-lg scale-110' : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              {{ d }}
            </button>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="px-6 pb-6 pt-2 border-t border-gray-100 flex gap-3">
          <button @click="setToday" class="flex-1 py-3 text-xs font-black uppercase tracking-widest text-[#0F172A] border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Today
          </button>
          <button @click="isOpen = false" class="flex-1 py-3 text-xs font-black uppercase tracking-widest bg-[#0F172A] text-white rounded-xl hover:shadow-lg transition-all">
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useUiStore } from '../stores/ui'
import { toEthiopianDate, toGregorianDate, currentEthiopian } from '../lib/ethiopianCalendar.js'

const props = defineProps(['modelValue', 'placeholder'])
const emit = defineEmits(['update:modelValue'])

const ui = useUiStore()
const { t } = ui
const isOpen = ref(false)
const todayEt = currentEthiopian()

const viewMonth = ref(todayEt.month)
const viewYear = ref(todayEt.year)

// Sync view with modelValue on open
watch(isOpen, (v) => {
  if (v && props.modelValue) {
    const et = toEthiopianDate(new Date(props.modelValue))
    viewMonth.value = et.month
    viewYear.value = et.year
  }
})

const currentMonthName = computed(() => {
  return t(`onboarding.month_${viewMonth.value}`)
})

const daysInMonth = computed(() => {
  if (viewMonth.value <= 12) return 30
  // Pagume
  const nextYearFirstDay = toGregorianDate(viewYear.value + 1, 1, 1)
  const lastPagumeDayGC = new Date(nextYearFirstDay.getTime() - 86400000)
  const et = toEthiopianDate(lastPagumeDayGC)
  return et.day
})

const formattedSelectedDate = computed(() => {
  if (!props.modelValue) return ''
  const et = toEthiopianDate(new Date(props.modelValue))
  const mName = t(`onboarding.month_${et.month}`)
  return `${mName} ${et.day}, ${et.year}`
})

function prevMonth() {
  if (viewMonth.value === 1) {
    viewMonth.value = 13
    viewYear.value--
  } else {
    viewMonth.value--
  }
}

function nextMonth() {
  if (viewMonth.value === 13) {
    viewMonth.value = 1
    viewYear.value++
  } else {
    viewMonth.value++
  }
}

function selectDay(d) {
  const gcDate = toGregorianDate(viewYear.value, viewMonth.value, d)
  emit('update:modelValue', gcDate.toISOString().split('T')[0])
  if (window.innerWidth < 640) isOpen.value = false // Auto close on mobile
}

function isToday(d) {
  return todayEt.day === d && todayEt.month === viewMonth.value && todayEt.year === viewYear.value
}

function isSelected(d) {
  if (!props.modelValue) return false
  const et = toEthiopianDate(new Date(props.modelValue))
  return et.day === d && et.month === viewMonth.value && et.year === viewYear.value
}

function setToday() {
  viewMonth.value = todayEt.month
  viewYear.value = todayEt.year
  selectDay(todayEt.day)
}

</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
.animate-slide-up {
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
