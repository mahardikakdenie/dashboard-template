import z from 'zod';
import { CommonResponse } from '~/types/common.types';
import auth from '../../middleware/auth';

const productCategoriesInputSchema = z.object({
	name: z.string().min(3),
	description: z.string().optional(),
	companyId: z.string().optional(),
});
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const endpoint = 'product-categories';
	try {
        auth(event);
		const body = await readBody(event);
		const result = productCategoriesInputSchema.safeParse(body);
		const masterData = await $fetch<CommonResponse<any[]>[]>(
			`${config.public.apiBaseUrl}?name=${endpoint}`
		);
		const productCategories = masterData.find(
			(data) => data.name === endpoint
		);

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

        const newCategory = {
            id: crypto.randomUUID(),
            created_at: new Date(),
            ...result.data,
        }

        productCategories?.datas.push(newCategory);

        await $fetch(`${config.public.apiBaseUrl}/${productCategories?.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: productCategories,
        });

        return {
            meta: {
                status: 201,
                message: "success",
            },
            data: newCategory,
        }
	} catch (error) {
		throw createError({ statusCode: 500 });
	}
});
