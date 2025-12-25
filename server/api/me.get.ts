import { User } from '~/types/user.type';
import auth from './middleware/auth';
import { CommonResponse } from '~/types/common.types';
import { Company } from '~/types/company.types';

export default defineEventHandler(async (event): Promise<{
		success: boolean;
		message: string;
		data: User;
	}> => {
		const config = useRuntimeConfig();
		const table = 'users';
		const endpoint = `${config.public.apiBaseUrl}/users/me`;

		try {
			await auth(event);
			const token = event.context.token;
			const response = await $fetch<any>(endpoint, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			return {
				success: true,
				message: `success`,
				data: response.data.data,
			};
		} catch (error) {
			throw createError({ statusCode: 500 });
		}
	}
);
