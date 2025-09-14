import { CommonResponse } from "~/types/common.types";
import auth from "../middleware/auth";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const endpoint = 'roles';
    const urlEndpoint = `${config.public.apiBaseUrl}?name=${endpoint}`;

    try {
        await auth(event);

        const masterData = await $fetch<CommonResponse<any[]>[]>(urlEndpoint);
        const roleData = masterData.find(data => data.name === endpoint);

        return {
            meta: {
                status: 200,
            },
            data: roleData?.datas,
        }
    } catch (error) {
        throw createError({ statusCode: 500 });
    }
});
