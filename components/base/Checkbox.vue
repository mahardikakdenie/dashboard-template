<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		checked?: boolean;
		ariaLabel?: string;
	}>(),
	{
		checked: false,
		ariaLabel: undefined,
	}
);

const emit = defineEmits<{
	(e: 'update:checked', value: boolean): void;
}>();

const handleChange = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('update:checked', target.checked);
};
</script>
<template>
	<label class="flex items-center cursor-pointer">
		<input
			type="checkbox"
			:checked="checked"
			@change="handleChange"
			class="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 focus:ring-2"
			:aria-checked="checked" />
		<!-- Slot opsional untuk label teks -->
		<span
			v-if="$slots.default"
			class="ml-2 text-sm text-gray-700 dark:text-gray-300">
			<slot />
		</span>
	</label>
</template>
