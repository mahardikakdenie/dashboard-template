import { Product, ProductResponse } from '~/types/product.types';
import auth from '../middleware/auth';
import { CommonResponse } from '~/types/common.types';

const config = useRuntimeConfig();
const masterEndpoint = 'products';
export default defineEventHandler(async (event): Promise<ProductResponse> => {
	try {
		await auth(event);

		const user = event.context.user;

        if (!user) {
            throw createError({ statusCode: 401, message: 'Unauthorized: User not found in context' });
        }
        
		const masterDatas = await $fetch<CommonResponse<Product[]>[]>(
			`${config.public.apiBaseUrl}?name=${masterEndpoint}`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			}
		);

        const product = masterDatas.find(item => item.name === 'products');

		return {
			meta: {
				status: 200,
			},
            user,
			data: product?.datas ?? [],
		};
	} catch (error) {
		throw createError({
			statusCode: 500,
			message: 'Gagal mengambil data produk',
		});
	}
});
