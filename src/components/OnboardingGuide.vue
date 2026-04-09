<template>
  <section class="relative py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
    <!-- Background glow -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]"></div>
    </div>

    <div class="relative max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-14">
        <span class="inline-block bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">{{ t('onboarding.title') }}</span>
        <h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">
          {{ t('onboarding.subtitle') }}
        </h2>
        <p class="text-white/50 text-sm mt-3 font-medium max-w-sm mx-auto">{{ t('onboarding.intro') }}</p>
      </div>

      <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">

        <!-- LEFT: Steps -->
        <div class="flex flex-col gap-3 w-full lg:w-60 flex-shrink-0 order-2 lg:order-1">
          <button
            v-for="(step, i) in steps" :key="i"
            @click="goToStep(i)"
            :class="[
              'flex items-start gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 text-left group',
              activeStep === i
                ? 'bg-accent border-accent text-white shadow-xl shadow-accent/30 scale-[1.02]'
                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/80'
            ]"
          >
            <div :class="['w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 mt-0.5', activeStep === i ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30']">
              {{ i + 1 }}
            </div>
            <div>
              <p class="text-sm font-bold leading-tight">{{ step.label }}</p>
              <p :class="['text-xs mt-1 leading-relaxed', activeStep === i ? 'text-white/70' : 'text-white/30']">{{ step.desc }}</p>
            </div>
          </button>

          <!-- Dots -->
          <div class="flex items-center justify-center gap-2 pt-2">
            <button v-for="(_, i) in steps" :key="i" @click="goToStep(i)"
              :class="['rounded-full transition-all duration-300', activeStep === i ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-white/20']"
            ></button>
          </div>
        </div>

        <!-- CENTER: Phone Mockup -->
        <div class="flex-1 flex items-center justify-center relative order-1 lg:order-2 w-full">
          <div class="relative w-full max-w-[280px] mx-auto">

            <!-- Phone Shell -->
            <div class="relative bg-[#0a0f1a] rounded-[3.5rem] border-[5px] border-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.7)] overflow-hidden" style="aspect-ratio: 9/19.5;">

              <!-- Screen Content -->
              <transition name="screen" mode="out-in">

                <!-- ====== SCREEN 0: Language Selection ====== -->
                <div v-if="activeStep === 0" key="s-lang" class="absolute inset-0 bg-[#0F172A] flex flex-col items-center justify-center p-6 text-center">
                   <div class="mb-6 animate-pulse">
                     <div class="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent/40">
                       <span class="text-4xl text-accent">🌍</span>
                     </div>
                   </div>
                   <h4 class="text-white font-black text-lg mb-2">{{ t('onboarding.step0_label') }}</h4>
                   <p class="text-white/40 text-[10px] leading-relaxed mb-8">{{ t('onboarding.step0_full') }}</p>
                   
                   <div class="w-full space-y-3">
                     <div v-for="l in ['English', 'አማርኛ', 'Afaan Oromo']" :key="l" 
                       :class="['w-full py-3 rounded-2xl border font-bold text-xs transition-all duration-500 flex items-center justify-center gap-3', highlightEl === l ? 'bg-accent border-accent text-white shadow-lg scale-105' : 'bg-white/5 border-white/10 text-white/40']">
                       {{ l }}
                       <div v-if="highlightEl === l" class="w-2 h-2 rounded-full bg-white animate-ping"></div>
                     </div>
                   </div>

                   <!-- Mock Language Switcher in Header -->
                   <div :class="['absolute top-8 right-4 px-3 py-1.5 rounded-xl border transition-all duration-500 flex items-center gap-2', highlightEl === 'dropdown' ? 'bg-accent border-accent text-white scale-110 shadow-lg' : 'bg-white/5 border-white/10 text-white/40']">
                     <span class="text-[8px] font-black uppercase tracking-widest">{{ store.activeLang }}</span>
                     <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                   </div>
                </div>

                <!-- ====== SCREEN 1: Home Search ====== -->
                <div v-else-if="activeStep === 1" key="s0" class="absolute inset-0 bg-background overflow-hidden">
                  <!-- Mini header -->
                  <div class="bg-[#0F172A] px-4 pt-8 pb-5" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.06) 1px, transparent 0); background-size: 16px 16px;">
                    <div class="flex items-center gap-2 mb-3">
                      <div class="w-5 h-5 rounded-md bg-accent/20 flex-shrink-0"></div>
                      <span class="text-white font-black text-[9px] tracking-tight">{{ t('brand_name') }}</span>
                      <div class="ml-auto bg-white/5 rounded-md px-1.5 py-0.5 text-white/40 text-[6px] font-black uppercase tracking-wider border border-white/10">{{ store.activeLang.toUpperCase() }}</div>
                    </div>
                    <p class="text-white font-black text-[11px] leading-tight">{{ t('travel') }} <span class="text-accent underline">{{ t('confidence') }}</span></p>
                    <p class="text-white/50 text-[7px] mt-0.5">{{ t('subtext') }}</p>
                  </div>

                  <!-- Search card -->
                  <div class="mx-3 -mt-3 bg-white rounded-2xl shadow-xl p-3 border border-gray-100">
                    <!-- From -->
                    <div :class="['rounded-xl p-2.5 border mb-1.5 transition-all duration-500', highlightEl === 'from' ? 'border-orange-400 bg-orange-50 shadow-md shadow-orange-100' : 'border-gray-200 bg-gray-50']">
                      <p class="text-[6px] font-black text-gray-400 uppercase tracking-widest">{{ t('departure') }}</p>
                      <p class="text-[9px] font-bold text-gray-800 mt-0.5">{{ t('cities.negele-borena') }}</p>
                    </div>
                    <!-- Swap -->
                    <div class="flex justify-center my-1">
                      <div class="w-5 h-5 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-center text-orange-500 text-[8px]">⇅</div>
                    </div>
                    <!-- To -->
                    <div :class="['rounded-xl p-2.5 border mb-1.5 transition-all duration-500', highlightEl === 'to' ? 'border-orange-400 bg-orange-50 shadow-md shadow-orange-100' : 'border-gray-200 bg-gray-50']">
                      <p class="text-[6px] font-black text-gray-400 uppercase tracking-widest">{{ t('destination') }}</p>
                      <p class="text-[9px] font-bold text-gray-800 mt-0.5">{{ t('cities.addis-ababa') }}</p>
                    </div>
                    <!-- Date -->
                    <div :class="['rounded-xl p-2.5 border mb-2 transition-all duration-500', highlightEl === 'date' ? 'border-orange-400 bg-orange-50 shadow-md shadow-orange-100' : 'border-gray-200 bg-gray-50']">
                      <p class="text-[6px] font-black text-gray-400 uppercase tracking-widest">{{ t('date') }}</p>
                      <p class="text-[9px] font-bold text-gray-800 mt-0.5">Apr 10, 2026</p>
                    </div>
                    <!-- Search btn -->
                    <div :class="['w-full py-2 rounded-xl text-[8px] font-black uppercase tracking-widest text-center transition-all duration-500', highlightEl === 'search' ? 'bg-accent text-white scale-105 shadow-lg shadow-orange-300' : 'bg-gray-900 text-white']">
                      {{ t('search_buses') }} →
                    </div>
                  </div>

                  <!-- Popular routes preview -->
                  <div class="px-3 mt-3">
                    <p class="text-[7px] font-black text-gray-500 uppercase tracking-widest mb-1.5">{{ t('popular_routes') }}</p>
                    <div class="space-y-1">
                      <div v-for="r in [`${t('cities.negele-borena')} → ${t('cities.hawassa')}`, `${t('cities.negele-borena')} → ${t('cities.moyale')}`]" :key="r" class="bg-white rounded-lg border border-gray-100 px-2.5 py-1.5 flex items-center justify-between">
                        <span class="text-[7px] font-bold text-gray-700">{{ r }}</span>
                        <svg class="w-2.5 h-2.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ====== SCREEN 2: Bus Results + Seat Selector ====== -->
                <div v-else-if="activeStep === 2" key="s1" class="absolute inset-0 bg-background overflow-hidden">
                  <!-- Header -->
                  <div class="bg-[#0F172A] px-3 pt-8 pb-3 flex items-center gap-2">
                    <div class="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center">
                      <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                    </div>
                    <span class="text-white font-black text-[9px]">Negele → Addis Ababa</span>
                  </div>

                  <div class="px-3 py-2 overflow-hidden">
                    <!-- Bus cards -->
                    <p class="text-[6px] font-black text-gray-400 uppercase tracking-widest mb-1.5">3 {{ t('available') }}</p>
                    <div class="space-y-2">
                      <div v-for="(bus, idx) in mockBuses" :key="bus.name"
                        :class="['bg-white rounded-xl border p-2.5 transition-all duration-500', highlightEl === 'bus' + idx ? 'border-orange-400 shadow-md scale-[1.02] shadow-orange-100' : 'border-gray-100']">
                        <div class="flex items-start justify-between mb-1.5">
                          <div>
                            <p class="text-[8px] font-black text-gray-800">{{ bus.name }}</p>
                            <p class="text-[6px] text-gray-400 font-bold">{{ bus.seats }} {{ t('seats_available') }}</p>
                          </div>
                          <div class="text-right">
                            <span class="text-[10px] font-black text-gray-900">{{ bus.price }}</span>
                             <span class="text-[6px] text-gray-400 ml-0.5">{{ t('etb_label') }}</span>
                          </div>
                        </div>
                        <div class="flex items-center gap-1 text-[6px] text-gray-500 font-bold mb-1.5">
                          <span class="bg-gray-100 rounded px-1 py-0.5">{{ bus.depart }}</span>
                          <div class="flex-1 h-px bg-gray-200 relative">
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white border border-gray-300 rounded-full"></div>
                          </div>
                          <span class="bg-gray-100 rounded px-1 py-0.5">{{ bus.arrive }}</span>
                        </div>
                        <div :class="['w-full py-1 rounded-lg text-center text-[6px] font-black uppercase tracking-widest transition-all duration-500', highlightEl === 'bus' + idx ? 'bg-accent text-white' : 'bg-gray-900 text-white']">
                          {{ t('select_seat') }} →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ====== SCREEN 3: Seat Map ====== -->
                <div v-else-if="activeStep === 3" key="s2" class="absolute inset-0 bg-background overflow-hidden">
                  <!-- Header -->
                  <div class="bg-[#0F172A] px-3 pt-8 pb-3 flex items-center gap-2">
                    <div class="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center">
                      <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                    </div>
                    <span class="text-white font-black text-[9px]">{{ t('onboarding.step2_label') }}</span>
                  </div>

                  <div class="px-3 pt-2">
                    <!-- Legend -->
                    <div class="flex items-center justify-center gap-3 mb-2">
                      <div v-for="l in seatLegend" :key="l.label" class="flex items-center gap-1">
                        <div :class="['w-4 h-4 rounded-md border', l.cls]"></div>
                        <span class="text-[6px] text-gray-500 font-bold">{{ l.label }}</span>
                      </div>
                    </div>

                    <!-- Front label -->
                    <div class="flex justify-center mb-2">
                      <div class="bg-gray-100 border border-gray-200 text-gray-500 text-[6px] font-black px-3 py-0.5 rounded-full">🚌 {{ t('front') }}</div>
                    </div>

                    <!-- Seat grid -->
                    <div class="space-y-1 px-1">
                      <div v-for="(row, ri) in seatRows" :key="ri" class="flex items-center justify-center gap-1">
                        <button
                          v-for="n in row.slice(0,2)" :key="n"
                          @click="pickSeat(n)"
                          :class="['w-8 h-8 rounded-lg text-[7px] font-black transition-all duration-300', seatCls(n)]"
                        >{{ n }}</button>
                        <div class="w-3"></div>
                        <button
                          v-for="n in row.slice(2,4)" :key="n"
                          @click="pickSeat(n)"
                          :class="['w-8 h-8 rounded-lg text-[7px] font-black transition-all duration-300', seatCls(n)]"
                        >{{ n }}</button>
                      </div>
                    </div>

                    <!-- Confirm btn -->
                    <div class="px-1 mt-3">
                      <div :class="['w-full py-2 rounded-xl text-[7px] font-black uppercase tracking-widest text-center transition-all duration-500', selectedSeat ? 'bg-accent text-white scale-105 shadow-lg shadow-orange-200' : 'bg-gray-200 text-gray-400']">
                        {{ selectedSeat ? `${t('confirm_booking')} — ${t('seat')} #${selectedSeat}` : t('select_seat') }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- ====== SCREEN 4: Boarding Pass + QR ====== -->
                <div v-else-if="activeStep === 4" key="s3" class="absolute inset-0 bg-background overflow-hidden">
                  <!-- Header -->
                  <div class="bg-[#0F172A] px-3 pt-8 pb-3 flex items-center gap-2">
                    <div class="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center">
                      <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                    </div>
                    <span class="text-white font-black text-[9px]">{{ t('confirmed') }}</span>
                  </div>

                  <div class="px-4 pt-3 flex flex-col items-center">
                    <!-- Success check -->
                    <div :class="['w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-700', showQR ? 'bg-green-500' : 'bg-green-200']">
                      <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <p class="text-gray-900 font-black text-[10px] mb-0.5">{{ t('confirmed') }}!</p>
                    <p class="text-gray-400 text-[7px] font-bold mb-3">ID: #2847</p>

                    <!-- Boarding pass card -->
                    <div class="w-full bg-white rounded-2xl border-t-4 border-accent border border-gray-200 shadow-md overflow-hidden">
                      <!-- Header strip -->
                      <div class="bg-gray-50 px-3 py-2 border-b border-gray-100">
                        <div class="flex items-center gap-1 mb-0.5">
                          <svg class="w-2.5 h-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
                          <p class="text-[6px] text-gray-400 font-black uppercase tracking-wider">{{ t('boarding_pass') }}</p>
                        </div>
                        <p class="text-[8px] font-black text-gray-800">Negele Borena → Addis Ababa</p>
                      </div>
                      <!-- Tear line -->
                      <div class="flex items-center">
                        <div class="w-3 h-3 bg-background border-r border-gray-100 rounded-full -ml-1.5 flex-shrink-0"></div>
                        <div class="flex-1 border-t-2 border-dashed border-gray-200"></div>
                        <div class="w-3 h-3 bg-background border-l border-gray-100 rounded-full -mr-1.5 flex-shrink-0"></div>
                      </div>
                      <!-- Details -->
                      <div class="px-3 py-2 space-y-1">
                        <div v-for="d in ticketDetails" :key="d.label" class="flex items-center justify-between">
                          <span class="text-[6px] text-gray-400">{{ d.label }}</span>
                          <span class="text-[6px] font-bold text-gray-800">{{ d.val }}</span>
                        </div>
                        <div class="pt-1 mt-1 border-t border-gray-100 flex items-center justify-between">
                          <span class="text-[7px] font-black text-gray-800">{{ t('total') }}</span>
                          <span class="text-[10px] font-black text-gray-900">300 <span class="text-[6px] font-bold text-gray-400">{{ t('etb_label') }}</span></span>
                        </div>
                      </div>
                      <!-- QR Section -->
                      <div :class="['bg-gray-50 border-t border-gray-100 px-3 py-3 flex flex-col items-center transition-all duration-700', showQR ? 'opacity-100' : 'opacity-30']">
                        <!-- Mini QR grid -->
                        <div class="bg-white p-1.5 rounded-lg border border-gray-200 mb-1.5">
                          <div class="w-16 h-16 grid grid-cols-7 gap-px">
                            <div v-for="(cell, idx) in qrPattern" :key="idx"
                              :class="['rounded-[1px]', cell ? 'bg-gray-900' : 'bg-white']"
                            ></div>
                          </div>
                        </div>
                        <p class="text-[6px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Scan to Board</p>
                        <!-- Save button -->
                        <div :class="['w-full py-1.5 rounded-lg text-[6px] font-black uppercase tracking-widest text-center transition-all duration-500', highlightEl === 'save' ? 'bg-accent text-white scale-105 shadow-sm shadow-orange-200' : 'bg-gray-100 text-gray-500']">
                          📥 {{ t('onboarding.mascot_save') }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </transition>

              <!-- Notch -->
              <div class="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/80 rounded-full z-20"></div>
            </div>

            <!-- ===== MASCOT ===== -->
            <transition name="mascot">
              <div
                :key="mascotPos"
                :class="['absolute pointer-events-none select-none transition-all duration-500', mascotPos]"
              >
                <div class="relative">
                  <div :class="['text-4xl', mascotBounce ? 'animate-bounce' : '']">{{ mascotEmoji }}</div>
                  <!-- Bubble -->
                  <div v-if="mascotSpeech"
                    :class="[
                      'absolute bottom-full mb-2 bg-white rounded-2xl shadow-2xl px-3 py-2 text-[10px] font-bold text-gray-800 leading-snug',
                      mascotRight ? 'right-0' : 'left-0'
                    ]"
                    style="min-width: 130px; max-width: 150px;"
                  >
                    {{ mascotSpeech }}
                    <div :class="['absolute top-full w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-white', mascotRight ? 'right-4' : 'left-4']"></div>
                  </div>
                </div>
              </div>
            </transition>

            <!-- Tap ripple -->
            <transition name="tap">
              <div v-if="showTap" class="absolute pointer-events-none z-30" :style="tapStyle">
                <div class="w-8 h-8 rounded-full bg-accent/30 border-2 border-accent animate-ping"></div>
                <div class="absolute inset-1.5 rounded-full bg-accent/60"></div>
              </div>
            </transition>

          </div>
        </div>

        <!-- RIGHT: Description panel -->
        <div class="w-full lg:w-56 order-3 flex-shrink-0">
          <transition name="desc" mode="out-in">
            <div :key="activeStep" class="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div class="text-3xl mb-4">{{ steps[activeStep].icon }}</div>
              <h3 class="text-white font-black text-base mb-2">{{ steps[activeStep].label }}</h3>
              <p class="text-white/50 text-xs leading-relaxed">{{ steps[activeStep].full }}</p>
              <ul class="mt-4 space-y-2">
                <li v-for="tip in steps[activeStep].tips" :key="tip" class="flex items-start gap-2 text-white/40 text-xs">
                  <span class="text-accent mt-px flex-shrink-0">✓</span>
                  {{ tip }}
                </li>
              </ul>
            </div>
          </transition>
        </div>

      </div>

      <!-- Bottom tips -->
      <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div v-for="tip in bottomTips" :key="tip.icon"
          class="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-3 hover:bg-white/10 transition-all">
          <span class="text-2xl flex-shrink-0 mt-0.5">{{ tip.icon }}</span>
          <div>
            <p class="text-white font-bold text-sm">{{ tip.title }}</p>
            <p class="text-white/40 text-xs mt-1 leading-relaxed">{{ tip.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { store, t } from '../store.js'

const steps = computed(() => [
  {
    label: t('onboarding.step0_label'),
    icon: '🌍',
    desc: t('onboarding.step0_desc'),
    full: t('onboarding.step0_full'),
    tips: [t('onboarding.step0_tip1'), t('onboarding.step0_tip2'), t('onboarding.step0_tip3')]
  },
  {
    label: t('onboarding.step1_label'),
    icon: '🔍',
    desc: t('onboarding.step1_desc'),
    full: t('onboarding.step1_full'),
    tips: [t('onboarding.step1_tip1'), t('onboarding.step1_tip2'), t('onboarding.step1_tip3')]
  },
  {
    label: t('onboarding.step2_label'),
    icon: '🚌',
    desc: t('onboarding.step2_desc'),
    full: t('onboarding.step2_full'),
    tips: [t('onboarding.step2_tip1'), t('onboarding.step2_tip2'), t('onboarding.step2_tip3')]
  },
  {
    label: t('onboarding.step3_label'),
    icon: '💺',
    desc: t('onboarding.step3_desc'),
    full: t('onboarding.step3_full'),
    tips: [t('onboarding.step3_tip1'), t('onboarding.step3_tip2'), t('onboarding.step3_tip3')]
  },
  {
    label: t('onboarding.step3_label'),
    icon: '🎟️',
    desc: t('onboarding.step3_desc'),
    full: t('onboarding.step3_full'),
    tips: [t('onboarding.step3_tip1'), t('onboarding.step3_tip2'), t('onboarding.step3_tip3')]
  },
])

const bottomTips = computed(() => [
  { icon: '📸', title: t('onboarding.bottom_tip1_title'), desc: t('onboarding.bottom_tip1_desc') },
  { icon: '💾', title: t('onboarding.bottom_tip2_title'), desc: t('onboarding.bottom_tip2_desc') },
  { icon: '🔒', title: t('onboarding.bottom_tip3_title'), desc: t('onboarding.bottom_tip3_desc') },
])

const mockBuses = computed(() => [
  { name: `${t('brand_name')} Express`, seats: '44', price: '250', depart: '06:00', arrive: '10:30' },
  { name: `Sky ${t('bus')}`, seats: '32', price: '320', depart: '08:30', arrive: '13:00' },
])

const seatLegend = computed(() => [
  { label: t('open'), cls: 'bg-white border-gray-300' },
  { label: t('yours'), cls: 'bg-orange-500 border-orange-500' },
  { label: t('taken'), cls: 'bg-gray-100 border-gray-200' },
])

const takenInDemo = [3, 7, 10, 15, 18]
const allSeats = Array.from({ length: 20 }, (_, i) => i + 1)
const seatRows = computed(() => {
  const rows = []
  for (let i = 0; i < 20; i += 4) rows.push(allSeats.slice(i, i + 4))
  return rows
})

const qrPattern = [
  1,1,1,1,1,1,1,
  1,0,0,0,0,0,1,
  1,0,1,1,1,0,1,
  1,0,0,0,0,0,1,
  1,0,1,1,1,0,1,
  1,0,0,0,0,0,1,
  1,1,1,1,1,1,1,
]

const ticketDetails = computed(() => [
  { label: t('passenger'), val: 'Abebe Girma' },
  { label: t('phone'), val: '0912 345 678' },
  { label: t('seat'), val: '#5' },
  { label: t('bus'), val: `${t('brand_name')} Express` },
])

// State
const activeStep = ref(0)
const highlightEl = ref('')
const selectedSeat = ref(null)
const showQR = ref(false)
const mascotEmoji = ref('🧑‍✈️')
const mascotSpeech = ref('')
const mascotPos = ref('bottom-2 -right-12')
const mascotRight = ref(true)
const mascotBounce = ref(false)
const showTap = ref(false)
const tapStyle = ref({})

function seatCls(n) {
  if (n === selectedSeat.value) return 'bg-accent text-white border-2 border-orange-400 scale-110 shadow-md'
  if (takenInDemo.includes(n)) return 'bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-200'
  return 'bg-white text-gray-700 border border-gray-200 hover:border-orange-400 hover:shadow-sm'
}

function pickSeat(n) {
  if (!takenInDemo.includes(n)) selectedSeat.value = n
}

let timer = null
let autoTimer = null

function clearTimer() {
  if (timer) { clearInterval(timer); timer = null }
}

function tap(top, left) {
  tapStyle.value = { position: 'absolute', top, left, transform: 'translate(-50%, -50%)' }
  showTap.value = true
  setTimeout(() => showTap.value = false, 900)
}

function runStepLang() {
  mascotEmoji.value = '🌍'
  mascotPos.value = 'bottom-2 -right-10 sm:-right-14'
  mascotRight.value = true
  mascotSpeech.value = t('onboarding.mascot_lang')
  mascotBounce.value = true
  selectedSeat.value = null
  showQR.value = false

  let seq = 0
  clearTimer()
  timer = setInterval(() => {
    seq = (seq + 1) % 4
    if (seq === 0) { highlightEl.value = 'dropdown'; mascotSpeech.value = t('onboarding.step0_tip1'); tap('10%', '85%') }
    if (seq === 1) { highlightEl.value = 'English'; mascotSpeech.value = 'English 🇬🇧'; tap('45%', '50%') }
    if (seq === 2) { highlightEl.value = 'አማርኛ'; mascotSpeech.value = 'አማርኛ 🇪🇹'; tap('55%', '50%') }
    if (seq === 3) { highlightEl.value = 'Afaan Oromo'; mascotSpeech.value = 'Afaan Oromo 🇪🇹'; tap('65%', '50%') }
  }, 2000)
}

function runStep0() {
  mascotEmoji.value = '🧑‍✈️'
  mascotPos.value = 'bottom-2 -right-10 sm:-right-14'
  mascotRight.value = true
  mascotSpeech.value = t('onboarding.mascot_welcome')
  mascotBounce.value = false
  selectedSeat.value = null
  showQR.value = false

  let seq = 0
  clearTimer()
  timer = setInterval(() => {
    seq = (seq + 1) % 4
    if (seq === 0) { highlightEl.value = 'from'; mascotSpeech.value = t('onboarding.mascot_welcome'); tap('62%', '50%') }
    if (seq === 1) { highlightEl.value = 'to'; mascotSpeech.value = t('onboarding.mascot_dest'); tap('72%', '50%') }
    if (seq === 2) { highlightEl.value = 'date'; mascotSpeech.value = t('onboarding.mascot_date'); tap('81%', '50%') }
    if (seq === 3) { highlightEl.value = 'search'; mascotSpeech.value = t('onboarding.mascot_search'); mascotBounce.value = true; tap('91%', '50%') }
  }, 2000)
}

function runStep1() {
  mascotEmoji.value = '🧑‍✈️'
  mascotPos.value = 'bottom-2 -left-10 sm:-left-14'
  mascotRight.value = false
  mascotSpeech.value = t('onboarding.step2_desc')
  mascotBounce.value = false
  selectedSeat.value = null
  showQR.value = false

  let seq = 0
  clearTimer()
  timer = setInterval(() => {
    seq = (seq + 1) % 2
    highlightEl.value = 'bus' + seq
    if (seq === 0) { mascotSpeech.value = t('bus') + ' 1 — ' + t('available') + '! 👍'; tap('55%', '50%') }
    if (seq === 1) { mascotSpeech.value = t('bus') + ' 2 — ' + t('confirmed') + ' ✨'; tap('78%', '50%') }
  }, 2200)
}

function runStep2() {
  mascotEmoji.value = '🧑‍✈️'
  mascotPos.value = 'bottom-2 -right-10 sm:-right-14'
  mascotRight.value = true
  mascotSpeech.value = t('onboarding.mascot_pick')
  highlightEl.value = ''
  mascotBounce.value = false
  selectedSeat.value = null
  showQR.value = false

  clearTimer()
  let picked = false
  timer = setInterval(() => {
    if (!picked) {
      const avail = allSeats.filter(n => !takenInDemo.includes(n))
      const pick = avail[Math.floor(Math.random() * avail.length)]
      selectedSeat.value = pick
      mascotSpeech.value = t('onboarding.mascot_seat_num').replace('{num}', pick)
      mascotBounce.value = true
      tap('75%', (((pick - 1) % 2) < 1 ? '35%' : '65%'))
      picked = true
    } else {
      selectedSeat.value = null
      mascotSpeech.value = t('onboarding.mascot_pick')
      mascotBounce.value = false
      picked = false
    }
  }, 2000)
}

function runStep3() {
  mascotEmoji.value = '🥳'
  mascotPos.value = 'bottom-2 -right-10 sm:-right-14'
  mascotRight.value = true
  mascotSpeech.value = t('onboarding.mascot_success')
  highlightEl.value = ''
  showQR.value = false
  mascotBounce.value = true

  clearTimer()
  setTimeout(() => { showQR.value = true; mascotSpeech.value = t('onboarding.mascot_save') }, 800)

  let seq = 0
  timer = setInterval(() => {
    seq = (seq + 1) % 3
    if (seq === 0) { highlightEl.value = 'save'; mascotSpeech.value = t('onboarding.mascot_save'); mascotEmoji.value = '🧑‍✈️'; tap('93%', '50%') }
    if (seq === 1) { highlightEl.value = ''; mascotSpeech.value = t('onboarding.mascot_screenshot'); mascotEmoji.value = '🥳'; mascotBounce.value = true }
    if (seq === 2) { mascotSpeech.value = t('onboarding.mascot_boarding'); mascotBounce.value = false; mascotEmoji.value = '🧑‍✈️' }
  }, 2400)
}

function goToStep(i) {
  clearTimer()
  showTap.value = false
  highlightEl.value = ''
  activeStep.value = i
  if (i === 0) runStepLang()
  else if (i === 1) runStep0()
  else if (i === 2) runStep1()
  else if (i === 3) runStep2()
  else if (i === 4) runStep3()
}

function startAuto() {
  autoTimer = setInterval(() => {
    goToStep((activeStep.value + 1) % steps.value.length)
  }, 10000)
}


onMounted(() => { goToStep(0); startAuto() })
onUnmounted(() => { clearTimer(); if (autoTimer) clearInterval(autoTimer) })
</script>

<style scoped>
.screen-enter-active, .screen-leave-active { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
.screen-enter-from { opacity: 0; transform: translateX(16px) scale(0.98); }
.screen-leave-to   { opacity: 0; transform: translateX(-16px) scale(0.98); }

.desc-enter-active, .desc-leave-active { transition: all 0.3s ease; }
.desc-enter-from, .desc-leave-to { opacity: 0; transform: translateY(8px); }

.mascot-enter-active, .mascot-leave-active { transition: all 0.4s ease; }
.mascot-enter-from, .mascot-leave-to { opacity: 0; transform: scale(0.7); }

.tap-enter-active, .tap-leave-active { transition: all 0.3s ease; }
.tap-enter-from, .tap-leave-to { opacity: 0; transform: scale(0.4); }

.border-x-6 { border-left-width: 6px; border-right-width: 6px; }
.border-t-6  { border-top-width: 6px; }
</style>
