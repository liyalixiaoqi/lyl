import { RouteRecordRaw } from 'vue-router';

interface RouteMeta {
	title: string;
	isShow?: boolean;
	prarentRoute?: string; // 注意这里的拼写
	role?: string[];
}

interface RouteRecord extends RouteRecordRaw {
	meta?: RouteMeta;
	children?: RouteRecord[];
}

export function getBreadcrumbRoute(name: string, routes: RouteRecord[]): string[] {
	const result: string[] = [];
	const processed = new Set<string>();

	function findRouteAndParents(routeName: string): boolean {
		if (processed.has(routeName)) {
			return false;
		}

		function findInRoutes(routes: RouteRecord[]): RouteRecord | null {
			for (const route of routes) {
				if (route.name === routeName) {
					return route;
				}
				if (route.children) {
					const found = findInRoutes(route.children);
					if (found) {
						return found;
					}
				}
			}
			return null;
		}

		const currentRoute = findInRoutes(routes);
		if (!currentRoute) {
			return false;
		}

		processed.add(routeName);

		// 注意这里使用 prarentRoute 而不是 parentRouter
		if (currentRoute.meta?.prarentRoute) {
			findRouteAndParents(currentRoute.meta.prarentRoute);
		}

		result.push(routeName);
		return true;
	}

	const found = findRouteAndParents(name);
	return found ? result : [];
}
