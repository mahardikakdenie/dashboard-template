<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'; // Jika pakai vue-i18n
import { z } from 'zod';
import type { Option } from '~/types/option.types';

const token = useCookie('auth_token');

const productSchema = z.object({
	name: z.string().min(3),
	description: z.string().optional(),
	price: z.number().optional(),
	status: z.enum(['available', 'unavailable']).optional(),
	image: z.string().url().optional(),
	category: z.string().optional(),
	stock: z.number().optional(),
	rating: z.number().min(0).max(5).optional(),
	sku: z.string().optional(),
	tags: z.array(z.string()).optional(),
	warranty: z.string().optional(),
	color: z.string().optional(),
	material: z.string().optional(),
	features: z.array(z.string()).optional(),
	highlights: z.array(z.string()).optional(),
	relatedProducts: z.array(z.string()).optional(),
	companyId: z.string().optional(),
});

// Jika tidak pakai vue-i18n, ganti $t dengan string langsung
const { t } = useI18n();

// State form
const formData = ref({
	name: '',
	description: '',
	price: '',
	status: 'available' as const,
	image: '',
	category: '',
	stock: '',
	rating: 0,
	sku: '',
	tags: [] as string[],
	warranty: '',
	color: '',
	material: '',
	features: [] as string[],
	highlights: [] as string[],
	relatedProducts: [] as string[],
	companyId: '',
});

// State untuk menyimpan file gambar dan URL preview
const imageFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);

// Fungsi saat gambar dipilih
const onImageSelected = async (event: Event) => {
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

		const form = new FormData();
		form.append('image', file);

		try {
			const response = await $fetch('/api/media', {
				method: 'POST',
				body: form,
			});

			console.log('response : ', response);
			formData.value.image = response.data;
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	}
};

// Helper: tambah item ke array
const addTag = () => {
	if (!formData.value.tags.includes('')) {
		formData.value.tags.push('');
	}
};
const removeTag = (index: number) => {
	formData.value.tags.splice(index, 1);
};

// Sama untuk features, highlights, dll — bisa dibuat reusable function
const updateArrayField = (
	field: keyof typeof formData.value,
	index: number,
	value: string
) => {
	const arr = formData.value[field] as string[];
	arr[index] = value;
};

const addArrayItem = (field: keyof typeof formData.value) => {
	const arr = formData.value[field] as string[];
	if (!arr.includes('')) arr.push('');
};

const removeArrayItem = (field: keyof typeof formData.value, index: number) => {
	const arr = formData.value[field] as string[];
	arr.splice(index, 1);
};

const handleSubmit = async (e: Event) => {
	e.preventDefault();
	// Kirim ke API di sini
    const response = await $fetch('/api/products', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
        body: {
            ...formData.value,
            price: parseInt(formData.value.price),
        },
    });
    
    if (response.meta.status === 201) {
        navigateTo('/products/product-list', {replace: true});
    }
    
};

const companies = ref<{ name: string; id: string }[]>([]);
const getDataCompany = async () => {
	try {
		const response = await $fetch<{ data: { id: string; name: string }[] }>(
			'/api/companies/select',
			{
				headers: {
					Authorization: `Bearer ${token.value}`,
				},
			}
		);

		companies.value = response?.data;
	} catch (error) {
		console.log('error : ', error);
	}
};

const productCategories = ref<Option[]>([]);
const getDataProductCategory = async () => {
    try {
		const response = await $fetch<Option[]>(
			'/api/products/category/select',
			{
				headers: {
					Authorization: `Bearer ${token.value}`,
				},
			}
		);

		productCategories.value = response;
	} catch (error) {
		console.log('error : ', error);
	}
};

onMounted(() => {
	getDataCompany();
    getDataProductCategory();
});
</script>

<template>
	<div class="shadow bg-white p-6 mt-4 rounded-xl max-w-4xl mx-auto">
		<h2 class="text-xl font-bold text-gray-800 mb-6">
			{{ $t('create_product') }}
		</h2>

		<form @submit="handleSubmit" class="space-y-6">
			<!-- Name (required) -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					{{ $t('product_name') }} *
				</label>
				<input
					v-model="formData.name"
					type="text"
					required
					class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
					:placeholder="$t('enter_product_name')" />
			</div>

			<!-- Description -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					{{ $t('description') }}
				</label>
				<textarea
					v-model="formData.description"
					rows="3"
					class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
					:placeholder="$t('enter_description')" />
			</div>

			<!-- Price -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					{{ $t('price') }} ({{ $t('in_numbers') }})
				</label>
				<input
					v-model="formData.price"
					type="number"
					step="0.01"
					min="0"
					class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
					:placeholder="$t('enter_price')" />
			</div>

			<!-- Status -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					{{ $t('status') }}
				</label>
				<select
					v-model="formData.status"
					class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
					<option value="available">{{ $t('available') }}</option>
					<option value="unavailable">{{ $t('unavailable') }}</option>
				</select>
			</div>

			<!-- Upload Gambar -->
			<div class="w-full col-span-12">
				<label class="block text-sm font-medium text-gray-700 mb-2"
					>Product Image</label
				>

				<!-- Container Preview & Input -->
				<div
					class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors duration-200 relative">
					<!-- Preview Gambar -->
					<div v-if="imagePreview" class="mb-3">
						<img
							:src="imagePreview"
							alt="Preview"
							class="mx-auto h-32 w-auto object-cover rounded-md shadow-sm border border-gray-200" />
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
						<span class="text-sm text-gray-600" v-if="!imagePreview"
							>Klik untuk upload gambar atau seret ke sini</span
						>
						<span class="text-sm text-blue-600 font-medium" v-else
							>Ganti gambar</span
						>
					</label>
				</div>
			</div>
			<!-- Category -->
<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					{{ $t('category') }}
				</label>
				<select
					v-model="formData.category"
					class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>Product Category Select</option>
					<option
						v-for="(category, i) in productCategories"
						:key="i"
						:value="category.id">
						{{ category.name }}
					</option>
				</select>
			</div>
			<!-- Stock -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					{{ $t('stock') }}
				</label>
				<input
					v-model="formData.stock"
					type="number"
					min="0"
					class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
					:placeholder="$t('enter_stock')" />
			</div>

			<!-- SKU -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					{{ $t('sku') }}
				</label>
				<input
					v-model="formData.sku"
					type="text"
					class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
					:placeholder="$t('enter_sku')" required />
			</div>

			<!-- Tags (Array) -->
			<div>
				<div class="flex justify-between items-center mb-1">
					<label class="block text-sm font-medium text-gray-700">
						{{ $t('tags') }}
					</label>
					<button
						type="button"
						@click="addArrayItem('tags')"
						class="text-xs text-blue-600 hover:text-blue-800">
						+ {{ $t('add_tag') }}
					</button>
				</div>
				<div class="space-y-2">
					<div
						v-for="(tag, index) in formData.tags"
						:key="index"
						class="flex gap-2">
						<input
							:value="tag"
							@input="e => updateArrayField('tags', index, (e.target as HTMLInputElement).value)"
							type="text"
							class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
							:placeholder="$t('enter_tag')" />
						<button
							type="button"
							@click="removeArrayItem('tags', index)"
							class="px-2 text-red-500 hover:text-red-700">
							✕
						</button>
					</div>
				</div>
			</div>

			<!-- Features (Array) -->
			<div>
				<div class="flex justify-between items-center mb-1">
					<label class="block text-sm font-medium text-gray-700">
						{{ $t('features') }}
					</label>
					<button
						type="button"
						@click="addArrayItem('features')"
						class="text-xs text-blue-600 hover:text-blue-800">
						+ {{ $t('add_feature') }}
					</button>
				</div>
				<div class="space-y-2">
					<div
						v-for="(feat, index) in formData.features"
						:key="index"
						class="flex gap-2">
						<input
							:value="feat"
							@input="e => updateArrayField('features', index, (e.target as HTMLInputElement).value)"
							type="text"
							class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
							:placeholder="$t('enter_feature')" />
						<button
							type="button"
							@click="removeArrayItem('features', index)"
							class="px-2 text-red-500 hover:text-red-700">
							✕
						</button>
					</div>
				</div>
			</div>

			<!-- Highlights (Array) -->
			<div>
				<div class="flex justify-between items-center mb-1">
					<label class="block text-sm font-medium text-gray-700">
						{{ $t('highlights') }}
					</label>
					<button
						type="button"
						@click="addArrayItem('highlights')"
						class="text-xs text-blue-600 hover:text-blue-800">
						+ {{ $t('add_highlight') }}
					</button>
				</div>
				<div class="space-y-2">
					<div
						v-for="(hl, index) in formData.highlights"
						:key="index"
						class="flex gap-2">
						<input
							:value="hl"
							@input="e => updateArrayField('highlights', index, (e.target as HTMLInputElement).value)"
							type="text"
							class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
							:placeholder="$t('enter_highlight')" />
						<button
							type="button"
							@click="removeArrayItem('highlights', index)"
							class="px-2 text-red-500 hover:text-red-700">
							✕
						</button>
					</div>
				</div>
			</div>

			<!-- Related Products (Array of IDs) -->
			<div>
				<div class="flex justify-between items-center mb-1">
					<label class="block text-sm font-medium text-gray-700">
						{{ $t('related_products') }} ({{ $t('product_ids') }})
					</label>
					<button
						type="button"
						@click="addArrayItem('relatedProducts')"
						class="text-xs text-blue-600 hover:text-blue-800">
						+ {{ $t('add_related') }}
					</button>
				</div>
				<div class="space-y-2">
					<div
						v-for="(rp, index) in formData.relatedProducts"
						:key="index"
						class="flex gap-2">
						<input
							:value="rp"
							@input="e => updateArrayField('relatedProducts', index, (e.target as HTMLInputElement).value)"
							type="text"
							class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
							:placeholder="$t('enter_product_id')" />
						<button
							type="button"
							@click="removeArrayItem('relatedProducts', index)"
							class="px-2 text-red-500 hover:text-red-700">
							✕
						</button>
					</div>
				</div>
			</div>

			<!-- Company ID -->
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					{{ $t('company_id') }}
				</label>
				<select
					v-model="formData.companyId"
					class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
					<option
						v-for="(company, i) in companies"
						:key="i"
						:value="company.id">
						{{ company.name }}
					</option>
				</select>
			</div>

			<!-- Submit Button -->
			<div class="pt-4">
				<button
					type="submit"
					class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
					{{ $t('create_product') }}
				</button>
			</div>
		</form>
	</div>
</template>
