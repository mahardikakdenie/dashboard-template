import { CommonResponse } from "~/types/common.types";
import auth from "../../middleware/auth";
import z from "zod";

const roleAssign = z.object({
    user_name: z.string(),
    role_id: z.uuid(),
});

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const endpoint = `${config.public.apiBaseUrl}`;

    try {
        await auth(event);

        const masterDatas = await $fetch<CommonResponse<any>[]>(endpoint);
        if (!masterDatas) {
            throw createError({statusCode: 500});
        };

        const users = masterDatas.find(data => data?.name === 'users');
    } catch (error) {
        throw createError({statusCode: 500});
    }
});
