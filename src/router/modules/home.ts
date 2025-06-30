import { RouteRecordRaw } from 'vue-router';
export default {
	path: '/home',
	name: 'Home',
	component: () => import('@/layout/index.vue'),
	redirect: '/',
	meta: {
		title: '首页'
	},
	children: [
		{
			path: '/',
			name: 'HomePage',
			component: () => import('@/views/Home/index.vue'),
			meta: {
				title: 'Home组件',
				isShow: true,
				prarentRoute: 'Home'
			}
		},
		{
			path: '/prarent',
			name: 'ParentPage',
			meta: {
				title: '父组件',
				isShow: true,
				prarentRoute: 'Home'
			},
			children: [
				{
					path: '/prarent/child',
					name: 'Child1',
					component: () => import('@/views/Child/index.vue'),
					meta: {
						title: '子组件',
						isShow: true,
						prarentRoute: 'ParentPage'
					},
					children: []
				},
				{
					path: '/prarent/child2',
					name: 'Child2',
					component: () => import('@/views/Child/index.vue'),
					meta: {
						title: '子组件2',
						isShow: true,
						prarentRoute: 'ParentPage'
					},
					children: []
				},
				{
					path: '/prarent/child3',
					name: 'Child3',
					component: () => import('@/views/Child/index.vue'),
					meta: {
						title: '子组件3',
						isShow: true,
						prarentRoute: 'ParentPage'
					},
					children: []
				}
			]
		},
		{
			path: '/project',
			name: 'Project',
			component: () => import('@/views/Project/index.vue'),
			meta: {
				title: '项目介绍',
				isShow: true,
				prarentRoute: 'Home'
			},
			children: []
		},
		{
			path: '/user',
			name: 'User',
			component: () => import('@/views/User/index.vue'),
			meta: {
				title: '用户列表',
				isShow: true,
				prarentRoute: 'Home'
			},
			children: []
		},
		{
			path: '/role',
			name: 'Role',
			component: () => import('@/views/Roles/index.vue'),
			meta: {
				title: '角色列表',
				isShow: true,
				prarentRoute: 'Home'
			},
			children: []
		},
		{
			path: '/permission',
			name: 'Permission',
			component: () => import('@/views/Permission/index.vue'),
			meta: {
				title: '权限列表',
				isShow: true,
				prarentRoute: 'Home'
			},
			children: []
		}
	]
} as RouteRecordRaw;
