import z from 'zod';
import { CommonResponse } from '~/types/common.types';
import auth from '../middleware/auth';
import { User } from '~/types/user.type';

const roleInputSchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
});

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const endpoint = 'roles';
	const urlEndpoint = `${config.public.apiBaseUrl}?name=${endpoint}`;

	try {
        await auth(event);
        const body = await readBody(event);
        const result = roleInputSchema.safeParse(body);
        const user: User = event.context.user;

        if (!user) {
            throw createError({ statusCode: 401, message: 'Unauthorized: User not found in context' });
        }
        const masterData = await $fetch<CommonResponse<any>[]>(urlEndpoint);
        const roleData = masterData.find(data => data.name === endpoint);

        const newRole = {
            id: crypto.randomUUID(),
            created_at: new Date(),
            created_by: user.id,
            ...result.data,
        }

        roleData?.datas.push(newRole);

        await $fetch(`${config.public.apiBaseUrl}/${roleData?.id}`, {
            method: "PUT",
            body: roleData,
        });

        return {
            meta: {
                status: 201,
                message: "Role Created Successfully"
            },
            data: newRole,
        }
	} catch (error) {
		throw createError({ status: 500 });
	}
});
