import { MockMethod } from 'vite-plugin-mock';

export const user = (): MockMethod[] => {
	return [
		{
			url: '/mock/api/user',
			method: 'get',
			response: () => {
				return {
					code: 200,
					message: 'success',
					data: {
						id: 1,
						name: 'admin',
						password: '123456',
						email: 'admin@example.com',
						avatar: 'https://avatars.githubusercontent.com/u/100000000?v=4',
						role: 'admin',
						permissions: ['admin']
					}
				};
			}
		}
	];
};
