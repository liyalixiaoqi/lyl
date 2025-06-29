import { RouteRecordRaw } from 'vue-router';

export default {
	path: '/about',
	name: 'About',
	component: () => import('@/views/About/index.vue'),
	meta: {
		title: '关于'
	}
} as RouteRecordRaw;
