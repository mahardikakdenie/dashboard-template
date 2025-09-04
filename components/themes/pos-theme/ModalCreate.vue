<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['on-close-modal']);
const closeModal = () => {
	emit('on-close-modal');
};

// State untuk menyimpan file gambar dan URL preview
const imageFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);

// Fungsi saat gambar dipilih
const onImageSelected = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const file = target.files?.[0];

	if (file) {
		imageFile.value = file;

		// Buat preview URL
		const reader = new FileReader();
		reader.onload = (e) => {
			imagePreview.value = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	}
};
</script>

<template>
	<BaseModal width="3xl" title="Create Theme" @close-modal="closeModal">
		<div>
			<form class="space-y-4">
				<div class="grid grid-cols-12 gap-4">
					<!-- Nama Tema -->
					<div class="w-full col-span-12">
						<label
							class="block text-sm font-medium text-gray-700 mb-1"
							>Name Theme</label
						>
						<input
							type="text"
							class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm hover:shadow"
							placeholder="Masukkan data Nama Tema POS" />
					</div>

					<!-- Status -->
					<div class="w-full col-span-12">
						<label
							class="block text-sm font-medium text-gray-700 mb-2"
							>Status</label
						>
						<div class="relative">
							<select
								class="w-full px-4 py-2 pl-3 pr-10 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md appearance-none cursor-pointer">
								<option
									value="pending"
									class="text-pink-700 font-medium">
									Pending
								</option>
								<option
									value="success"
									class="text-green-700 font-medium">
									Success
								</option>
								<option
									value="warning"
									class="text-yellow-700 font-medium">
									Warning
								</option>
								<option
									value="failed"
									class="text-red-700 font-medium">
									Failed
								</option>
							</select>
							<div
								class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
								<svg
									class="w-5 h-5 text-gray-500"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7" />
								</svg>
							</div>
						</div>
					</div>

					<!-- Upload Gambar -->
					<div class="w-full col-span-12">
						<label
							class="block text-sm font-medium text-gray-700 mb-2"
							>Theme Image</label
						>

						<!-- Container Preview & Input -->
						<div
							class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors duration-200 relative">
							<!-- Preview Gambar -->
							<div v-if="imagePreview" class="mb-3">
								<img
									:src="imagePreview"
									alt="Preview"
									class="mx-auto h-32 w-auto object-cover rounded-md shadow-sm border" />
							</div>

							<!-- Input File -->
							<input
								type="file"
								accept="image/*"
								@change="onImageSelected"
								class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								id="image-upload" />

							<!-- Label sebagai tombol klik -->
							<label
								for="image-upload"
								class="cursor-pointer flex flex-col items-center justify-center space-y-1">
								<svg
									v-if="!imagePreview"
									class="w-8 h-8 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
								</svg>
								<span
									class="text-sm text-gray-600"
									v-if="!imagePreview"
									>Klik untuk upload gambar atau seret ke
									sini</span
								>
								<span
									class="text-sm text-blue-600 font-medium"
									v-else
									>Ganti gambar</span
								>
							</label>
						</div>
					</div>
				</div>
			</form>
		</div>
	</BaseModal>
</template>
