import { CommonResponse } from "~/types/common.types";
import { Themes } from "~/types/themes.types";

export default defineEventHandler(async () => {
    const themes = await $fetch<CommonResponse<any>[]>('https://685bc2c289952852c2dadda2.mockapi.io/api/databases?name=themes');
});
