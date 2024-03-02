import { defineStore } from 'pinia';
import pinia from '@/store';

export interface UserState {
  username: string;
  accessToken: string;
  refreshToken?: string;
  roles: Array<string>;
}
export const useUserStoreHook = defineStore('userInfo', {
  state: (): UserState => ({
    username: 'dairuining',
    accessToken: '',
    roles: ['common'],
  }),
  getters: {},
  actions: {},
  persist: {
    key: 'userInfo',
    storage: sessionStorage,
    paths: ['accessToken'],
  },
});
export function useUserStore() {
  return useUserStoreHook(pinia);
}
