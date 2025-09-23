import z from 'zod';
import auth from '../middleware/auth';
import { CommonResponse } from '~/types/common.types';
import { Product } from '~/types/product.types';

const productInputSchema = z.object({
	id: z.uuid(),
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

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const table = 'products';
	const endpoint = `${config.public.apiBaseUrl}?name=${table}`;
	try {
		await auth(event);

		const masterData = await $fetch<CommonResponse<Product[]>[]>(endpoint, {
			method: 'GET',
		});

		if (!masterData) {
			throw createError({ statusCode: 404 });
		}

		const body = await readBody(event);
		const result = productInputSchema.safeParse(body);

		if (!result.success) {
			const errors: Record<string, string[]> = {};
			result.error.issues.forEach((issue: any) => {
				const path = issue.path.join('.');
				if (!errors[path]) {
					errors[path] = [];
				}
				errors[path].push(issue.message);
			});

			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				data: {
					message: 'Validation failed',
					errors,
				},
			});
		}

        const product = masterData.find(product => product?.name === table);

        if (!product) {
            throw createError({
                statusCode: 404,
                message: "Product Not Found",
            });
        }
        
        const detailProducts = product.datas.find((data: Product) => data.id === result.data.id);
        
        if (!detailProducts) {
            throw createError({
                statusCode: 404,
                message: "Product Not Found",
            });
        }

        detailProducts.name = result?.data.name ?? detailProducts?.name;
        detailProducts.description = result?.data?.description ?? detailProducts?.description;

        return product;

	} catch (error) {
		throw createError({ statusCode: 500, message: "Internal Server while hit the endpoint" });
	}
});
