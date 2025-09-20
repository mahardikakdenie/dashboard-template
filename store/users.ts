
import { defineStore } from 'pinia'
import type { User } from '~/types/user.type';

export const useUserStore = defineStore('user-store', {
  state: () => ({
    datas: [] as User[],
    me: {} as User,
    token: '' as string,
  }),
  actions: {
    setUserDatas(newDatas: User[]) {
      this.datas = newDatas;
    },
    setAuthMe(user: User) {
      this.me = user;
    },
    setToken(token: string) {
      this.token = token;
    }
  },
})
