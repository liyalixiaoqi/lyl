import { RouteRecordRaw } from 'vue-router';

interface RouteMeta {
	title: string;
	isShow?: boolean;
	parentRouter?: string;
}

interface RouteRecord extends RouteRecordRaw {
	meta?: RouteMeta;
	children?: RouteRecord[];
}

export function getBreadcrumbRoute(name: string, routes: RouteRecord[]): string[] {
	const names: string[] = [];

	// 递归查找路由及其子路由
	function findRoute(routeName: string, routeList: RouteRecord[]) {
		for (const route of routeList) {
			// 检查当前路由
			if (route.name === routeName) {
				// 添加当前路由名称
				names.push(routeName);

				// 如果有父路由，继续查找
				if (route.meta?.parentRouter) {
					findRoute(route.meta.parentRouter, routes);
				}
				return true;
			}

			// 检查子路由
			if (route.children && route.children.length > 0) {
				const found = findRoute(routeName, route.children);
				if (found) {
					// 如果在子路由中找到，添加当前路由名称（因为是父级）
					names.push(route.name as string);
					// 继续查找父级
					if (route.meta?.parentRouter) {
						findRoute(route.meta.parentRouter, routes);
					}
					return true;
				}
			}
		}
		return false;
	}

	findRoute(name, routes);
	return names.reverse();
}
