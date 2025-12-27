<script setup lang="ts">

const props = withDefaults(
	defineProps<{
		modelValue?: string | number | null;
		options?: Array<{ value: string | number; label: string }>;
		disabled?: boolean;
		ariaLabel?: string;
	}>(),
	{
		modelValue: null,
		options: () => [],
		disabled: false,
		ariaLabel: undefined,
	}
);

const emit = defineEmits<{
	(e: 'update:modelValue', value: string | number | null): void;
}>();

const handleChange = (event: Event) => {
	const target = event.target as HTMLSelectElement;
	const value = target.value;

	if (value === '') {
		emit('update:modelValue', null);
	} else {
		const option = props.options.find(opt => String(opt.value) === value);
		emit('update:modelValue', option ? option.value : value);
	}
};
</script>

<template>
	<label class="flex flex-col cursor-pointer">
		<select
			:value="modelValue !== null ? String(modelValue) : ''"
			@change="handleChange"
			:disabled="disabled"
			:aria-label="ariaLabel"
			class="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:disabled:bg-gray-700"
		>
			<option value="">Select...</option>
			<option
				v-for="option in options"
				:key="option.value"
				:value="String(option.value)"
			>
				{{ option.label }}
			</option>
		</select>
		<span
			v-if="$slots.default"
			class="mt-1 text-xs text-gray-500 dark:text-gray-400"
		>
			<slot />
		</span>
	</label>
</template>
