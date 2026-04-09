<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="handleClose"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-sm bg-[#1E293B] rounded-2xl border border-white/10 overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-5 border-b border-white/10">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 8h12m4 12h2M6 20h2" /></svg>
          </div>
          <div>
            <h3 class="text-white font-bold text-base leading-none">Scan Ticket</h3>
            <p class="text-white/30 text-[10px] uppercase tracking-widest mt-0.5">Ticket Verification</p>
          </div>
        </div>
        <button @click="handleClose" class="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <!-- Camera View -->
      <div class="relative bg-black" style="aspect-ratio: 1">
        <!-- The actual video feed renders here -->
        <div id="qr-reader" class="w-full h-full"></div>

        <!-- Corner frame overlay (pointer-events-none so camera still works) -->
        <div class="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div class="relative w-52 h-52">
            <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-xl"></div>
            <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-xl"></div>
            <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-xl"></div>
            <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-xl"></div>
          </div>
        </div>

        <!-- Loading state -->
        <div v-if="cameraState === 'loading'" class="absolute inset-0 flex flex-col items-center justify-center bg-black/80 pointer-events-none">
          <svg class="w-6 h-6 text-white/40 animate-spin mb-3" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p class="text-white/40 text-xs">Starting camera…</p>
        </div>

        <!-- Error state -->
        <div v-if="cameraState === 'error'" class="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-6 text-center">
          <svg class="w-10 h-10 text-red-400/60 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.362a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
          <p class="text-white/50 text-sm font-medium">Camera unavailable</p>
          <p class="text-white/25 text-xs mt-1">{{ cameraError }}</p>
          <button @click="startCamera" class="mt-4 px-4 py-2 bg-accent/20 text-accent text-xs font-semibold rounded-lg hover:bg-accent/30 transition-colors">
            Try Again
          </button>
        </div>
      </div>

      <!-- Scan Result Banner -->
      <div class="p-4">
        <!-- Success -->
        <div v-if="scanResult?.type === 'success'" class="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
          <div class="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
          </div>
          <div>
            <p class="text-green-400 text-xs font-bold uppercase tracking-wide">Boarded</p>
            <p class="text-white text-sm font-medium">{{ scanResult.message }}</p>
          </div>
        </div>
        <!-- Warning -->
        <div v-else-if="scanResult?.type === 'warning'" class="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <div class="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01"/></svg>
          </div>
          <div>
            <p class="text-yellow-400 text-xs font-bold uppercase tracking-wide">Warning</p>
            <p class="text-white/70 text-sm">{{ scanResult.message }}</p>
          </div>
        </div>
        <!-- Error -->
        <div v-else-if="scanResult?.type === 'error'" class="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
          <div class="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </div>
          <div>
            <p class="text-red-400 text-xs font-bold uppercase tracking-wide">Invalid</p>
            <p class="text-white/70 text-sm">{{ scanResult.message }}</p>
          </div>
        </div>
        <!-- Idle -->
        <p v-else class="text-center text-white/25 text-xs py-1">
          Point the camera at a passenger's QR ticket
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'

const props = defineProps({
  isOpen: Boolean,
  // Parent passes back the result of each scan so we can display it
  scanResult: { type: Object, default: null }
})

const emit = defineEmits(['close', 'scanned'])

const cameraState = ref('loading') // 'loading' | 'active' | 'error'
const cameraError = ref('')
let scanner = null
let lastScanTime = 0
let lastScanId = ''

async function startCamera() {
  cameraState.value = 'loading'
  cameraError.value = ''

  try {
    scanner = new Html5Qrcode('qr-reader')

    // Enumerate cameras first and pick rear-facing one by device ID.
    // This avoids the browser's "choose front/back" dialog — we decide directly.
    let cameraId = null
    try {
      const cameras = await Html5Qrcode.getCameras()
      if (cameras.length) {
        // Prefer any camera whose label mentions back/rear/environment
        const rear = cameras.find(c => /back|rear|environment/i.test(c.label))
          ?? cameras[cameras.length - 1] // last camera is rear on most phones
        cameraId = rear.id
      }
    } catch (_) {}

    await scanner.start(
      cameraId ?? { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 200, height: 200 }, aspectRatio: 1.0 },
      onScanSuccess,
      () => {}
    )
    cameraState.value = 'active'
  } catch (err) {
    cameraState.value = 'error'
    cameraError.value = err?.message?.toLowerCase().includes('permission')
      ? 'Camera permission denied. Please allow camera access.'
      : 'Could not access camera.'
  }
}

async function stopCamera() {
  if (scanner) {
    if (scanner.isScanning) {
      await scanner.stop().catch(() => {})
    }
    scanner.clear().catch(() => {})
    scanner = null
  }
  cameraState.value = 'loading'
  lastScanId = ''
  lastScanTime = 0
}

function onScanSuccess(decodedText) {
  const now = Date.now()
  // Debounce: skip same code within 2.5s
  if (decodedText === lastScanId && now - lastScanTime < 2500) return
  lastScanId = decodedText
  lastScanTime = now
  emit('scanned', decodedText)
}

function handleClose() {
  emit('close')
}

watch(() => props.isOpen, async (opened) => {
  if (opened) {
    await nextTick()
    startCamera()
  } else {
    stopCamera()
  }
}, { immediate: false })
</script>

<style>
/* Strip all html5-qrcode default chrome — we only want the raw video */
#qr-reader {
  border: none !important;
  padding: 0 !important;
}
#qr-reader__header_message,
#qr-reader__status_span,
#qr-reader__dashboard,
#qr-reader__filescan_input,
#qr-reader > img { display: none !important; }
#qr-reader video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  border-radius: 0 !important;
}
</style>
