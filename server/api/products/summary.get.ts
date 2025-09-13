
import { CommonResponse } from '~/types/common.types';
import auth from '../middleware/auth';
import { Product } from '~/types/product.types';
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const masterEndpoint = 'products';
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

        const product = masterDatas.find(data => data.name === 'products');

        if (!product) {
            throw createError({ statusCode: 500 });
        }
        
        return {
            meta: {},
            data: {
                all: product.datas.length,
            }
        }
    } catch (error) {
        throw createError({ statusCode: 500, message: "Internal Server Error" });
    }
})
