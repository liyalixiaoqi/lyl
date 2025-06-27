import { RouteRecordRaw } from 'vue-router';
export default {
	path: '/home',
	name: 'Home',
	component: () => import('@/views/home/index.vue'),
	meta: {
		title: '首页'
	}
} as RouteRecordRaw;
