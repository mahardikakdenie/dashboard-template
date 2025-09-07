import { CommonResponse } from "~/types/common.types";
import { User } from "~/types/user.type";

export default defineEventHandler(async () => {
  const summaries = await $fetch<CommonResponse<any>[]>('https://685bc2c289952852c2dadda2.mockapi.io/api/databases?name=users');
  return {
    meta: { status: 200 },
    data: {
        total: summaries[0].datas.length,
        active: summaries[0].datas.filter((user: User) => user.status === 'active').length,
        inactive: summaries[0].datas.filter((user: User) => user.status === 'inactive').length,
        new: summaries[0].datas.filter((user: User) => {
            const createdAt = new Date(user.created_at);
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - createdAt.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 30; // Users created in the last 30 days
        }).length,
    },
  };
});
