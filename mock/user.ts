import { MockMethod } from 'vite-plugin-mock';

export default [
	{
		url: '/mock/api/userList',
		method: 'get',
		response: () => {
			return {
				code: 200,
				message: 'success',
				data: [
					{
						id: 1,
						userName: '李四',
						nickname: '李四',
						role: [
							{
								id: 1,
								userRole: '普通用户'
							},
							{
								id: 2,
								userRole: '管理员'
							}
						]
					},
					{
						id: 2,
						userName: '张三',
						nickname: '张三',
						role: [
							{
								id: 2,
								userRole: '管理员'
							}
						]
					},
					{
						id: 3,
						userName: '王五',
						nickname: '王五',
						role: [
							{
								id: 1,
								userRole: '普通用户'
							}
						]
					},
					{
						id: 4,
						userName: '赵六',
						nickname: '赵六',
						role: [
							{
								id: 1,
								userRole: '普通用户'
							},
							{
								id: 2,
								userRole: '管理员'
							}
						]
					},
					{
						id: 5,
						userName: '孙七',
						nickname: '孙七',
						role: [
							{
								id: 1,
								userRole: '普通用户'
							},
							{
								id: 2,
								userRole: '管理员'
							}
						]
					},
					{
						id: 6,
						userName: '周八',
						nickname: '周八',
						role: [
							{
								id: 1,
								userRole: '普通用户'
							},
							{
								id: 2,
								userRole: '管理员'
							}
						]
					},
					{
						id: 7,
						userName: '吴九',
						nickname: '吴九',
						role: [
							{
								id: 1,
								userRole: '普通用户'
							}
						]
					},
					{
						id: 8,
						userName: '郑十',
						nickname: '郑十',
						role: [
							{
								id: 2,
								userRole: '管理员'
							}
						]
					}
				]
			};
		}
	},
	{
		url: '/mock/api/authUserList',
		method: 'get',
		response: () => {
			return {
				code: 200,
				message: 'success',
				data: [
					{
						id: 1,
						userRole: '管理员',
						auth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
					},
					{
						id: 2,
						userRole: '普通用户',
						auth: [1, 2, 3]
					}
				]
			};
		}
	}
] as MockMethod[];
