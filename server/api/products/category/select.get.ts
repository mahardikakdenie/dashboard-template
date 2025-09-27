import { CommonResponse } from "~/types/common.types";
import auth from "../../middleware/auth";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const table = 'product-categories';
    const endpoint = `${config.public.apiBaseUrl}?name=${table}`;

    try {
        await auth(event);
        const masterData = await $fetch<CommonResponse<any>[]>(endpoint);

        const productCategory = masterData.find(data => data?.name === table);

        return productCategory?.datas.map((data: any) => ({
            name: data?.name,
            id: data?.id,
        }));
    } catch (error) {
        throw createError({statusCode: 500});
    }
});
