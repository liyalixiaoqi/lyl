import { RouteRecordRaw } from 'vue-router';

export default {
	path: '/login',
	name: 'LoginPage',
	component: () => import('@/views/login/index.vue'),
	meta: {
		role: ['common', 'admin']
	},
	children: []
} as RouteRecordRaw;
