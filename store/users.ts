
import { defineStore } from 'pinia'
import type { User } from '~/types/user.type';

export const useUserStore = defineStore('user-store', {
  state: () => ({
    datas: [] as User[],
    me: {} as User,
  }),
  actions: {
    setUserDatas(newDatas: User[]) {
      this.datas = newDatas;
    },
    setAuthMe(user: User) {
      this.me = user;
    }
  },
})
