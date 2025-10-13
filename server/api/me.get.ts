import { User } from '~/types/user.type';
import auth from './middleware/auth';
import { CommonResponse } from '~/types/common.types';
import { Company } from '~/types/company.types';

export default defineEventHandler(
	async (
		event
	): Promise<{
		success: boolean;
		message: string;
		data: User;
	}> => {
		const config = useRuntimeConfig();
		const table = 'users';
		const endpoint = `${config.public.apiBaseUrl}`;
		
		try {
			await auth(event);
			const payloadUser = event.context.user;
			const response = await $fetch<CommonResponse<User[]>[]>(endpoint);

			const users = response.find((res) => res.name === table);
			const role = response.find((res) => res.name === 'roles');
			const companies = response.find((res) => res.name === 'companies');

			const currentUser = users?.datas?.find(
				(curr) => curr.id === payloadUser.id
			);
			const currRole =
				role?.datas?.find(
					(currRole) => currRole.id === currentUser?.roleId
				) ?? role?.datas?.find((r) => r.name === 'superadmin');
			const user = {
				...currentUser,
				password: undefined,
				role: {
					id: currRole?.id,
					name: currRole?.name,
				},
				company:
					companies?.datas?.find(
						(currComp: Company) =>
							currComp?.id === currentUser?.companyId
					) ?? null,
			};

			return {
				success: true,
				message: `success`,
				data: user as User,
			};
		} catch (error) {
			throw createError({ statusCode: 500 });
		}
	}
);
