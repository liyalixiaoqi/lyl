import { RouteRecordRaw } from 'vue-router';
export default {
	path: '/home',
	name: 'Home',
	component: () => import('@/layout/index.vue'),
	meta: {
		title: '首页'
	},
	children: [
	]
} as RouteRecordRaw;
