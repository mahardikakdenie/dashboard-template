// server/api/products.get.ts (atau file handler-mu)
import { Product, ProductResponse } from '~/types/product.types';
import auth from '../middleware/auth';
import { CommonResponse } from '~/types/common.types';
import { Company } from '~/types/company.types';

const config = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<ProductResponse> => {
	try {
		await auth(event);
		const user = event.context.user;

		// ✅ Ambil query params
		const query = getQuery(event);
		const page = query.page ? Number(query.page) : 1;
		const limit = query.limit ? Number(query.limit) : 10;
		const search = typeof query.search === 'string' ? query.search : '';

		console.log("page : ", page);
		

		if (!user) {
			throw createError({
				statusCode: 401,
				message: 'Unauthorized: User not found in context',
			});
		}

		// Ambil data master
		const masterDatas = await $fetch<CommonResponse<any>[]>( // ✅ gunakan unknown dulu karena isinya dinamis
			`${config.public.apiBaseUrl}`, // ❗ pastikan endpoint benar
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			}
		);

		// Cari data products dan companies
		const productResponse = masterDatas.find(
			(item) => item.name === 'products'
		) as CommonResponse<Product[]> | undefined;
		const companyResponse = masterDatas.find(
			(item) => item.name === 'companies'
		) as CommonResponse<Company[]> | undefined;

		const products = productResponse?.datas ?? [];
		const companies = companyResponse?.datas ?? [];

		// Gabungkan product dengan company
		const enrichedProducts: Product[] = products.map((product) => {
			const company =
				companies.find((c) => c.id === product.companyId) ?? undefined;
			return {
				...product,
				company,
			};
		});

		return {
			meta: { status: 200 },
			data: enrichedProducts,
		};
	} catch (error) {
		console.error('Error in /api/products:', error);
		throw createError({
			statusCode: 500,
			message: 'Gagal mengambil data produk',
		});
	}
});
