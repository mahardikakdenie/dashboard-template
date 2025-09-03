<script lang="ts" setup>
const emit = defineEmits(['on-close-modal']);
const closeModal = () => {
	emit('on-close-modal');
};
</script>

<template>
	<BaseModal width="3xl" title="Create Theme" @close-modal="closeModal">
		<div>
			<form class="">
				<div class="grid grid-cols-12 gap-2">
					<div
						v-for="i in 4"
						:key="i"
						class="w-full block col-span-12">
						<input
							type="text"
							class="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm hover:shadow"
							placeholder="Masukkan data" />
					</div>
				</div>
			</form>
		</div>
	</BaseModal>
</template>
