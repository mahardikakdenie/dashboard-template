import { CommonResponse } from "~/types/common.types";
import auth from "../../middleware/auth";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const endpoint = `${config.public.apiBaseUrl}`;

    try {
        await auth(event);

        const masterDatas = await $fetch<CommonResponse<any>[]>(endpoint);
    } catch (error) {
        throw createError({statusCode: 500});
    }
});
