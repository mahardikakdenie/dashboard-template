import { CommonResponse } from "~/types/common.types";
import auth from "../../middleware/auth";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const masterEndpoint = 'product-categories';
    try {
        auth(event);
        const masterDatas = await $fetch<CommonResponse<any[]>[]>(`${config.public.apiBaseUrl}?name=${masterEndpoint}`);

        const categories = masterDatas.find(data => data.name === masterEndpoint);

        return {
            meta: {
                status: true,
            },
            data: categories?.datas,
        }
    } catch (error) {
        throw createError({statusCode: 500, message: 'Internal Server Error'});
    }
});
