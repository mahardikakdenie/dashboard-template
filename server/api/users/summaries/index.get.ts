import auth from "../../middleware/auth";


export default defineEventHandler(
	async (event): Promise<any> => {
		const config = useRuntimeConfig();
		try {
			await auth(event);
			const token = event.context.token;

			const response = await $fetch<any>(`${config.public.apiBaseUrl}/user/stats`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			return {
				success: true,
				message: 'success',
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
	}
);
