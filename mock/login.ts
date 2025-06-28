import { MockMethod } from 'vite-plugin-mock';

// mock/user.ts
export default [
	{
		url: '/mock/api/login',
		method: 'post',
		response: () => {
			return {
				code: 200,
				message: '登录成功',
				data: {
					userName: 'admin',
					userRole: 'admin',
					userToken: '123456'
				}
			};
		}
	}
] as MockMethod[];
