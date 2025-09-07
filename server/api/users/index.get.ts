import { CommonResponse } from "~/types/common.types";
import { User } from "~/types/user.type";

export default defineEventHandler<Promise<{
    meta: {
        status: number;
    };
    data: User[];
}>>(async () => {
    const datas = await $fetch<CommonResponse<User[]>[]>('https://685bc2c289952852c2dadda2.mockapi.io/api/databases?name=users');

    const users = datas.find(data => data.name === 'users') ?? null;

    return {
        meta: {
            status: 200,
        },
        data: users?.datas ?? [],
    };
});
