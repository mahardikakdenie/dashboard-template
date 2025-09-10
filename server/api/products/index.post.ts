import z from 'zod';
import { CommonResponse } from '~/types/common.types';
import { Product } from '~/types/product.types';

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


const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const result = productSchema.safeParse(body);

    if (!result.success) {
        const errors: Record<string, string[]> = {};
        result.error.issues.forEach((issue) => {
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

    // Simulate saving to a database
    const masterDatas = await $fetch<CommonResponse<Product[]>[]>(`${config.public.apiBaseUrl}?name=products`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const productData = masterDatas.find(item => item.name === 'products' );

    productData?.datas?.push({
        id: crypto.randomUUID(),
        created_at: new Date(),
        ...result.data,
    });

    // if (productData) {
    //     productData.datas = [];
    // }

    // Normally, you would save to a database here
    // For this example, we just return the new product list
    await $fetch(`${config.public.apiBaseUrl}/${masterDatas[0].id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: productData,
    });

    return {
        meta: {
            status: 201,
            message: 'Product created successfully',
        },
        data: productData ?? [],
    };
});
