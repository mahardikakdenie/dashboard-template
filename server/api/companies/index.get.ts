import { CommonResponse } from "~/types/common.types";
import { getDomain } from "~/utils/defaultCompanyDomain";

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
            data: comapanyData?.datas.map((data: any) => ({
                default_domain_tenant: getDomain(data?.name),
                ...data,
            })),
        }
    } catch (error) {
        throw createError({ statusCode: 500 })
    }
});
