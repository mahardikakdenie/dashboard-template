import { getQuery } from 'h3';
import { CommonResponse } from '~/types/common.types';
import { User } from '~/types/user.type';
import auth from '../middleware/auth';

export default defineEventHandler(async (event): Promise<{data: User; meta: any}> => {
	const config = useRuntimeConfig();
	const endpoint = `${config.public.apiBaseUrl}/users`;

	try {
		await auth(event);
		const token = event.context.token;

		if (!token) {
			throw createError({ statusCode: 401, message: 'Unauthorized' });
		}

		// Ambil query params
		const { limit, page, role } = getQuery(event);

		const response = await $fetch<any>(endpoint, {
			params: {
				limit,
				page,
				role,
			},
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (!response?.data) {
			throw createError({
				statusCode: 500,
				message: 'Invalid response from upstream API',
			});
		}

		return {
			meta: response.meta,
			data: response.data,
		};
	} catch (error: any) {
		console.error('Error fetching users:', error);

		if (error.statusCode === 401 || error.status === 401) {
			throw createError({ statusCode: 401, message: 'Unauthorized' });
		}

		throw createError({
			statusCode: error.statusCode || 500,
			message: error.message || 'Failed to fetch users',
		});
	}
});
