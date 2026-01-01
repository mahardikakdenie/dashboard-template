import { CommonResponse, ResponseApi } from "~/types/common.types";
import { getDomain } from "~/utils/defaultCompanyDomain";
import auth from "../middleware/auth";
import { Company } from "~/types/company.types";

export default defineEventHandler(async (event): Promise<ResponseApi<Company[]>> => {
    const config = useRuntimeConfig();
    const endpoint = `${config.public.apiBaseUrl}/company`;
    try {
        await auth(event);
        const token = event.context?.token;

        const params = getQuery(event);
        
        const response = await $fetch<ResponseApi<Company[]>>(endpoint, {
            method: 'GET',
            params: params ?? {},
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.log("error :", error);
        
        throw createError({ statusCode: 500 })
    }
});
