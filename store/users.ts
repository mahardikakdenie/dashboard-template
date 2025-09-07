
import { defineStore } from 'pinia'
import type { User } from '~/types/user.type';

export const useCounterStore = defineStore('user-store', {
  state: () => ({
    datas: [] as User[],
  }),
  actions: {
    setDatas(newDatas: User[]) {
      this.datas = newDatas;
    }
  },
})
