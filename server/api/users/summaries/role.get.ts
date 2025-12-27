import auth from "../../middleware/auth";

export default defineEventHandler(async (event): Promise<any> => {
    const config = useRuntimeConfig();
    const endpoint = `${config.public.apiBaseUrl}/user/role/stats`;
    try {
        await auth(event);
        const token = event.context.token;
        const response = await $fetch<any>(endpoint, {
            method: 'GET',
            params: {},
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return {
            meta: response.meta,
            data: response.data,
        }
    } catch (error: any) {
        if (error.statusCode === 401 || error.status === 401) {
            throw createError({ statusCode: 401, message: 'Unauthorized' });
        }

        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch users',
        });
    }
});
