import { defineStore } from 'pinia';
import { login } from '@/api/login';

interface UserInfo {
	userName: string;
	userRole: string;
	userToken: string;
}
const useUserStore = defineStore('userInfo', {
	state: (): UserInfo => ({
		userName: '',
		userRole: '',
		userToken: '',
	}),
	actions: {
	  async	login(userInfo: UserInfo) {
		try {
			const res = await login(userInfo);
			console.log(res,userInfo,`res`);
			this.userName = res.userName;
			this.userRole = res.userRole;
			this.userToken = res.userToken;
			return Promise.resolve(res);
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
		},
	logout() {
      localStorage.removeItem('userInfo');
      this.userName = '';
      this.userRole = '';
      this.userToken = '';
		}
	},
	persist: {
    enabled: true,  // 确保开启持久化
    strategies: [
      {
        key: 'user',
        storage: localStorage,
        paths: ['userName', 'userRole', 'userToken']  // 指定要持久化的字段
      }
    ]
	}
});
export default useUserStore;
