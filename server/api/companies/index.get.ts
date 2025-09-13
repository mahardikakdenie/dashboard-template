import { CommonResponse } from "~/types/common.types";

export default defineEventHandler(async () => {
    const config = useRuntimeConfig();
    const endpoint = 'companies';
    const urlEndpoint = `${config.public.apiBaseUrl}?name=${endpoint}`;
    try {
        const masterData = await $fetch<CommonResponse<any>[]>(urlEndpoint);

        const comapanyData = masterData.find(data => data.name === endpoint);

        return {
            meta: {
                status: 200,
            },
            data: comapanyData?.datas,
        }
    } catch (error) {
        throw createError({ statusCode: 500 })
    }
});
