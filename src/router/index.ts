import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import useUserStore from '@/stores/user/index';
// import.meta.glob 为 vite 提供的特殊导入方式
// 它可以将模块中全部内容导入并返回一个Record对象
// 默认为懒加载模式 加入配置项 eager 取消懒加载
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
	eager: true
});
const routes: Array<RouteRecordRaw> = [];

// 将路由全部导入数组
Object.keys(modules).forEach((key) => {
	routes.push(modules[key].default);
});

//导入生成的路由数据
const router = createRouter({
	history: createWebHistory(),
	routes
});
// 白名单路由
const whiteList = ['/login'];
router.beforeEach(async (_to, _from, next) => {
	console.log(localStorage.getItem('userInfo'), `localStorage.getItem('userInfo')`);

	const userStore = useUserStore();
	const hasToken = userStore?.userToken;
	if (hasToken) {
		if (_to.path === '/login') {
			next({
				path: '/home'
			});
		} else {
			NProgress.start();
			next();
		}
	} else {
		if (whiteList.includes(_to.path)) {
			// 未登录可以访问白名单页面
			next();
		} else {
			// 未登录且访问非白名单页面，重定向到登录页
			next(`/login?redirect=${_to.path}`);
			NProgress.done();
		}
	}
});

router.afterEach((_to) => {
	NProgress.done();
});

export default router;
