// server/api/products.get.ts
import { Product, ProductResponse } from '~/types/product.types';
import auth from '../middleware/auth';
import { CommonResponse } from '~/types/common.types';
import { Company } from '~/types/company.types';

const config = useRuntimeConfig();

// Daftar field yang diizinkan untuk sorting
const ALLOWED_SORT_FIELDS: (keyof Product)[] = [
	'name',
	'price',
	'created_at',
	'stock',
	'rating',
	'category',
	'status',
];

/**
 * 
 * To validation sort field, which field can be sort
 * 
 * @param sortField String
 * @returns keyof Product | null
 */
const getValidateSortField = (sortField: string): keyof Product | null => {
	if (sortField && ALLOWED_SORT_FIELDS.includes(sortField as keyof Product)) {
		return sortField as keyof Product;
	}
  return null;
};

/**
 * 
 * Get data product have sorted with validatedSortfield and order field
 * 
 * @param enrichedProducts Product[]
 * @param validatedSortField Keyof Product | null
 * @param order string
 * @returns Product[]
 */
const getProductSorted = (enrichedProducts: Product[], validatedSortField: keyof Product | null, order: string): Product[] => {
  return enrichedProducts.sort((a, b) => {
				const valA = a[validatedSortField!];
				const valB = b[validatedSortField!];

				// Handle null/undefined
				if (valA == null && valB == null) return 0;
				if (valA == null) return order === 'asc' ? 1 : -1;
				if (valB == null) return order === 'asc' ? -1 : 1;

				let comparison = 0;

				// Handle Date
				if (validatedSortField === 'created_at') {
					const dateA = new Date(valA as string | number).getTime();
					const dateB = new Date(valB as string | number).getTime();
					comparison = dateA - dateB;
				}
				// Handle string
				else if (typeof valA === 'string' && typeof valB === 'string') {
					comparison = valA.localeCompare(valB);
				}
				// Handle number
				else if (typeof valA === 'number' && typeof valB === 'number') {
					comparison = valA - valB;
				}
				// Fallback: stringifikasi
				else {
					comparison = String(valA).localeCompare(String(valB));
				}

				return order === 'desc' ? -comparison : comparison;
			});
};

export default defineEventHandler(async (event): Promise<ProductResponse> => {
	try {
		await auth(event);
		const user = event.context.user;

		if (!user) {
			throw createError({
				statusCode: 401,
				message: 'Unauthorized: User not found in context',
			});
		}

		// ✅ Ambil query params
		const query = getQuery(event);
		const page = query.page ? Number(query.page) : 1;
		const limit = query.limit ? Number(query.limit) : 10;
		const search = typeof query.search === 'string' ? query.search : '';
		const sortField = typeof query.sort === 'string' ? query.sort : '';
		const order =
			typeof query.order === 'string' &&
			['asc', 'desc'].includes(query.order)
				? query.order
				: 'asc';

		console.log('page:', page, 'sort:', sortField, 'order:', order);

		// Validasi field sort & define a variable
		let validatedSortField: keyof Product | null = null;
    
		// Get Validation sortt Field
		validatedSortField = getValidateSortField(sortField);

		// get data master
		const masterDatas = await $fetch<CommonResponse<any>[]>(
			`${config.public.apiBaseUrl}`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			}
		);

		const productResponse = masterDatas.find(
			(item) => item.name === 'products'
		) as CommonResponse<Product[]> | undefined;
		const companyResponse = masterDatas.find(
			(item) => item.name === 'companies'
		) as CommonResponse<Company[]> | undefined;

		const products = productResponse?.datas ?? [];
		const companies = companyResponse?.datas ?? [];

    // Merge product with company
		let enrichedProducts: Product[] = products.map((product) => {
			const company =
				companies.find((c) => c.id === product.companyId) ?? undefined;
			return {
				...product,
				company,
			};
		});

		// 🔍 Filter berdasarkan search (opsional, tapi bagus ditambahkan)
		if (search) {
			const term = search.toLowerCase();
			enrichedProducts = enrichedProducts.filter(
				(p) =>
					(p.name && p.name.toLowerCase().includes(term)) ||
					(p.description &&
						p.description.toLowerCase().includes(term)) ||
					(p.category && p.category.toLowerCase().includes(term)) ||
					(p.sku && p.sku.toLowerCase().includes(term))
			);
		}

		// 🔁 Sorting
		if (validatedSortField) {
			enrichedProducts = getProductSorted(enrichedProducts, validatedSortField, order);
		}

		// 📄 Pagination (opsional, tapi kamu sudah punya page & limit)
		const startIndex = (page - 1) * limit;
		const paginatedProducts = enrichedProducts.slice(
			startIndex,
			startIndex + limit
		);

		return {
			meta: {
				status: 200,
				page,
				limit,
				total: enrichedProducts.length,
			},
			data: paginatedProducts,
		};
	} catch (error) {
		console.error('Error in /api/products:', error);
		throw createError({
			statusCode: 500,
			message: 'Gagal mengambil data produk',
		});
	}
});
