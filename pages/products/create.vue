<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n' // Jika pakai vue-i18n
import { z } from 'zod'

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
const { t } = useI18n()

// State form
const formData = ref({
  name: '',
  description: '',
  price: '',
  status: 'available' as const,
  image: '',
  category: '',
  stock: '',
  rating: '',
  sku: '',
  tags: [] as string[],
  warranty: '',
  color: '',
  material: '',
  features: [] as string[],
  highlights: [] as string[],
  relatedProducts: [] as string[],
  companyId: '',
})

// Helper: tambah item ke array
const addTag = () => {
  if (!formData.value.tags.includes('')) {
    formData.value.tags.push('')
  }
}
const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

// Sama untuk features, highlights, dll — bisa dibuat reusable function
const updateArrayField = (field: keyof typeof formData.value, index: number, value: string) => {
  const arr = formData.value[field] as string[]
  arr[index] = value
}

const addArrayItem = (field: keyof typeof formData.value) => {
  const arr = formData.value[field] as string[]
  if (!arr.includes('')) arr.push('')
}

const removeArrayItem = (field: keyof typeof formData.value, index: number) => {
  const arr = formData.value[field] as string[]
  arr.splice(index, 1)
}

const handleSubmit = (e: Event) => {
  e.preventDefault()

  // Validasi manual (opsional, bisa pakai Zod)
  const parsed = productSchema.safeParse({
    ...formData.value,
    price: formData.value.price ? Number(formData.value.price) : undefined,
    stock: formData.value.stock ? Number(formData.value.stock) : undefined,
    rating: formData.value.rating ? Number(formData.value.rating) : undefined,
    tags: formData.value.tags.filter(t => t.trim() !== ''),
    features: formData.value.features.filter(f => f.trim() !== ''),
    highlights: formData.value.highlights.filter(h => h.trim() !== ''),
    relatedProducts: formData.value.relatedProducts.filter(r => r.trim() !== ''),
  })

  if (!parsed.success) {
    console.error('Validation error:', parsed.error)
    alert('Form tidak valid!')
    return
  }

  console.log('Valid product data:', parsed.data)
  // Kirim ke API di sini
}
</script>

<template>
  <div class="shadow bg-white p-6 mt-4 rounded-xl max-w-4xl mx-auto">
    <h2 class="text-xl font-bold text-gray-800 mb-6">{{ $t('create_product') }}</h2>

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
          :placeholder="$t('enter_product_name')"
        />
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
          :placeholder="$t('enter_description')"
        />
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
          :placeholder="$t('enter_price')"
        />
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ $t('status') }}
        </label>
        <select
          v-model="formData.status"
          class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="available">{{ $t('available') }}</option>
          <option value="unavailable">{{ $t('unavailable') }}</option>
        </select>
      </div>

      <!-- Image URL -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ $t('image_url') }}
        </label>
        <input
          v-model="formData.image"
          type="url"
          class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          :placeholder="$t('enter_image_url')"
        />
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ $t('category') }}
        </label>
        <input
          v-model="formData.category"
          type="text"
          class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          :placeholder="$t('enter_category')"
        />
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
          :placeholder="$t('enter_stock')"
        />
      </div>

      <!-- Rating -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ $t('rating') }} (0–5)
        </label>
        <input
          v-model="formData.rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          :placeholder="$t('enter_rating')"
        />
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
          :placeholder="$t('enter_sku')"
        />
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
            class="text-xs text-blue-600 hover:text-blue-800"
          >
            + {{ $t('add_tag') }}
          </button>
        </div>
        <div class="space-y-2">
          <div v-for="(tag, index) in formData.tags" :key="index" class="flex gap-2">
            <input
              :value="tag"
              @input="e => updateArrayField('tags', index, (e.target as HTMLInputElement).value)"
              type="text"
              class="flex-1 px-3 py-1 text-sm border border-gray-300 rounded"
              :placeholder="$t('enter_tag')"
            />
            <button
              type="button"
              @click="removeArrayItem('tags', index)"
              class="px-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Warranty -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ $t('warranty') }}
        </label>
        <input
          v-model="formData.warranty"
          type="text"
          class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          :placeholder="$t('enter_warranty_info')"
        />
      </div>

      <!-- Color & Material -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('color') }}
          </label>
          <input
            v-model="formData.color"
            type="text"
            class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            :placeholder="$t('enter_color')"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('material') }}
          </label>
          <input
            v-model="formData.material"
            type="text"
            class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            :placeholder="$t('enter_material')"
          />
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
            class="text-xs text-blue-600 hover:text-blue-800"
          >
            + {{ $t('add_feature') }}
          </button>
        </div>
        <div class="space-y-2">
          <div v-for="(feat, index) in formData.features" :key="index" class="flex gap-2">
            <input
              :value="feat"
              @input="e => updateArrayField('features', index, (e.target as HTMLInputElement).value)"
              type="text"
              class="flex-1 px-3 py-1 text-sm border border-gray-300 rounded"
              :placeholder="$t('enter_feature')"
            />
            <button
              type="button"
              @click="removeArrayItem('features', index)"
              class="px-2 text-red-500 hover:text-red-700"
            >
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
            class="text-xs text-blue-600 hover:text-blue-800"
          >
            + {{ $t('add_highlight') }}
          </button>
        </div>
        <div class="space-y-2">
          <div v-for="(hl, index) in formData.highlights" :key="index" class="flex gap-2">
            <input
              :value="hl"
              @input="e => updateArrayField('highlights', index, (e.target as HTMLInputElement).value)"
              type="text"
              class="flex-1 px-3 py-1 text-sm border border-gray-300 rounded"
              :placeholder="$t('enter_highlight')"
            />
            <button
              type="button"
              @click="removeArrayItem('highlights', index)"
              class="px-2 text-red-500 hover:text-red-700"
            >
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
            class="text-xs text-blue-600 hover:text-blue-800"
          >
            + {{ $t('add_related') }}
          </button>
        </div>
        <div class="space-y-2">
          <div v-for="(rp, index) in formData.relatedProducts" :key="index" class="flex gap-2">
            <input
              :value="rp"
              @input="e => updateArrayField('relatedProducts', index, (e.target as HTMLInputElement).value)"
              type="text"
              class="flex-1 px-3 py-1 text-sm border border-gray-300 rounded"
              :placeholder="$t('enter_product_id')"
            />
            <button
              type="button"
              @click="removeArrayItem('relatedProducts', index)"
              class="px-2 text-red-500 hover:text-red-700"
            >
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
        <input
          v-model="formData.companyId"
          type="text"
          class="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          :placeholder="$t('enter_company_id')"
        />
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
        >
          {{ $t('create_product') }}
        </button>
      </div>
    </form>
  </div>
</template>
