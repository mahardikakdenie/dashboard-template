import { CommonResponse } from "~/types/common.types";
import auth from "../middleware/auth";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const endpoint = 'roles';
    const urlEndpoint = `${config.public.apiBaseUrl}`;

    try {
        await auth(event);

        const masterData = await $fetch<CommonResponse<any[]>[]>(urlEndpoint);
        const roleData = masterData.find(data => data.name === endpoint);
        const userData = masterData.find(data => data?.name === 'users');

        return {
            meta: {
                status: 200,
            },
            data: roleData?.datas.map((role) => ({
                ...role,
                user_created: userData?.datas.find(user => user.id === role.created_by),
            })),
        }
    } catch (error) {
        throw createError({ statusCode: 500 });
    }
});
