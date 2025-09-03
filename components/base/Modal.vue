
<script setup>
import { computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Modal Title',
  },
  width: {
    type: String,
    default: 'md', // xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  cancelText: {
    type: String,
    default: 'Batal',
  },
  confirmText: {
    type: String,
    default: 'Simpan',
  },
});

// Emits
const emit = defineEmits(['close-modal', 'confirm']);

// Mapping ukuran ke Tailwind max-width
const widthMap = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

const widthClass = computed(() => widthMap[props.width] || widthMap.md);

// Tutup modal
const closeModal = () => {
  emit('close-modal', false);
};

// Aksi konfirmasi
const onConfirm = () => {
  emit('confirm');
};

// Klik overlay hanya menutup jika di luar konten modal
const handleOverlayClick = () => {
  closeModal();
};
</script>

<template>
  <teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      @click.self="handleOverlayClick"
    >
      <!-- Modal Container -->
      <div
        class="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in"
        :class="[widthClass]"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 rounded-full p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="px-6 py-4 max-h-96 overflow-y-auto">
          <slot></slot>
        </div>

        <!-- Footer (opsional) -->
        <div v-if="showFooter" class="flex justify-end px-6 py-4 bg-gray-50 space-x-3 border-t border-gray-200">
          <button
            @click="closeModal"
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {{ cancelText }}
          </button>
          <button
            @click="onConfirm"
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
/* Animasi masuk (opsional) */
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
