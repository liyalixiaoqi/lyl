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
			name: 'Project',
			component: () => import('@/views/Project/index.vue'),
			meta: {
				title: '项目介绍',
				isShow: true
			}
		},
		{
			path: '/user',
			name: 'User',
			component: () => import('@/views/User/index.vue'),
			meta: {
				title: '用户列表',
				isShow: true
			}
		},
		{
			path: '/role',
			name: 'Role',
			component: () => import('@/views/Roles/index.vue'),
			meta: {
				title: '角色列表',
				isShow: true
			}
		},
		{
			path: '/permission',
			name: 'Permission',
			component: () => import('@/views/Permission/index.vue'),
			meta: {
				title: '权限列表',
				isShow: true
			}
		},
	]
} as RouteRecordRaw;
