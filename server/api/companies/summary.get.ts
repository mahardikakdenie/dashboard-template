import { CommonResponse } from "~/types/common.types";
import auth from "../middleware/auth";
import { Company } from "~/types/company.types";
import queryNewData from "~/utils/queryNewData";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const endpoint = `${config.public.apiBaseUrl}`;
    try {
        await auth(event);

        const response = await $fetch<CommonResponse<any>[]>(endpoint);
        
        const companies = response.find(resp => resp.name === 'companies');

        return {
            totalCompany: companies?.datas.length,
            active: companies?.datas.filter((company: Company) => company.status === 'active').length,
            inactive: companies?.datas.filter((company: Company) => company.status === 'inactive').length,
            pending: companies?.datas.filter((company: Company) => company.status === 'pending').length,
            new: companies?.datas.filter((company: Company) => queryNewData(company.created_at)).length,
        }
    } catch (error) {
        throw createError({statusCode: 500});
    }
});
