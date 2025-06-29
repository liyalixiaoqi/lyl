import { MockMethod } from 'vite-plugin-mock';

export default [
	{
		url: '/mock/api/authList',
		method: 'get',
		response: () => {
			return {
				code: 200,
				message: 'success',
				data: [
					{
						id: 1,
						project: '项目介绍',
						subList: [
							{ id: 2, project: '搜索' },
							{ id: 3, project: '查看' },
							{ id: 4, project: '编辑' },
							{ id: 5, project: '删除' }
						]
					},
					{
						id: 6,
						project: '用户管理',
						subList: [
							{ id: 7, project: '搜索' },
							{ id: 8, project: '查看' },
							{ id: 9, project: '编辑' }
						]
					},
					{
						id: 11,
						project: '角色管理',
						subList: [
							{ id: 12, project: '搜索' },
							{
								id: 13,
								project: '查看',
								subList: [
									{ id: 16, project: '搜索' },
									{ id: 17, project: '查看' }
								]
							},
							{
								id: 14,
								project: '编辑',
								subList: [
									{ id: 18, project: '搜索' },
									{ id: 19, project: '查看' }
								]
							},
							{
								id: 15,
								project: '删除',
								subList: [
									{ id: 20, project: '搜索' },
									{ id: 21, project: '查看' }
								]
							}
						]
					},
					{
						id: 21,
						project: '权限管理',
						subList: [
							{ id: 22, project: '搜索' },
							{ id: 23, project: '查看' },
							{ id: 24, project: '编辑' },
							{ id: 25, project: '删除' }
						]
					}
				]
			};
		}
	}
] as MockMethod[];
