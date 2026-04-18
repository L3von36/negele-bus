<template>
  <div aria-live="polite" aria-atomic="true"
       class="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm pointer-events-none">
    <transition-group name="toast">
      <div v-for="t in toastState.toasts" :key="t.id"
           role="status"
           :class="[
             'pointer-events-auto px-4 py-3 rounded-xl shadow-medium border text-sm font-medium flex items-start gap-2.5',
             t.type === 'error'   && 'bg-red-50 border-red-200 text-red-700',
             t.type === 'success' && 'bg-green-50 border-green-200 text-green-700',
             t.type === 'info'    && 'bg-card border-border text-text-primary',
           ]">
        <svg v-if="t.type === 'error'" class="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <svg v-else-if="t.type === 'success'" class="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span class="flex-1">{{ t.message }}</span>
        <button @click="toast.dismiss(t.id)"
                aria-label="Dismiss notification"
                class="opacity-50 hover:opacity-100 transition-opacity flex-shrink-0">
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { toast, toastState } from '../lib/toast.js'
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-enter-from { opacity: 0; transform: translateY(12px); }
.toast-leave-to   { opacity: 0; transform: translateY(12px); }
</style>
