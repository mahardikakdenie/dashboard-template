import { CommonResponse, ResponseApi } from "~/types/common.types";
import auth from "../middleware/auth";
import { Company } from "~/types/company.types";
import queryNewData from "~/utils/queryNewData";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const endpoint = `${config.public.apiBaseUrl}/companies/stats`;
    try {
        await auth(event);
        const token = event.context.token;
        const response = await $fetch<ResponseApi<{
            all: number;
        }>>(endpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return {
            data: response.data,
            meta: response.meta,
        }
    } catch (error) {
        throw createError({statusCode: 500});
    }
});
