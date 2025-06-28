<template>
  <div class="relative max-w-xs w-full">
    <input
      :type="type"
      :placeholder="placeholder"
      :class="[
        'w-full py-2 pl-5 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200',
        {
          'pr-9': type === 'text',
          'pr-3': type !== 'text'
        }
      ]"
      class="block w-full"
    />
    <!-- Conditional Search Icon for Text Type -->
    <label
      v-if="type === 'text'"
      class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500"
    >
      <IconsSearchIcons />
    </label>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{
    placeholder?: string
	type?: string;
}>(), {
    placeholder: 'Cari Pesanan..',
	type: 'text'
});
</script>
