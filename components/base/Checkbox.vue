<template>
    <label class="flex justify-center items-center">
        <input type="checkbox" :checked="checked" class="form-checkbox h-4 w-4 cursor-pointer text-indigo-600 rounded" />
    </label>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    checked: boolean;
}>(), {
    checked: false,
});
</script>
