import { test as testFn } from '@/utils/test';
import { getBreadcrumbRoute } from '@/utils/common';
import { describe, expect, test } from 'vitest';
import { RouteRecordRaw } from 'vue-router';

describe('test', () => {
	test('test', () => {
		expect(testFn(1, 2)).toBe(3);
	});
});

describe('getBreadcrumbRoute', () => {
	// 使用实际的路由配置
	const mockRoutes = [
		{
			path: '/about',
			name: 'About',
			meta: {
				title: '关于'
			}
		},
		{
			path: '/home',
			name: 'Home',
			redirect: '/',
			meta: {
				title: '首页'
			},
			children: [
				{
					path: '/',
					name: 'HomePage',
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
							meta: {
								title: '子组件',
								isShow: true,
								prarentRoute: 'ParentPage'
							}
						},
						{
							path: '/prarent/child2',
							name: 'Child2',
							meta: {
								title: '子组件2',
								isShow: true,
								prarentRoute: 'ParentPage'
							}
						},
						{
							path: '/prarent/child3',
							name: 'Child3',
							meta: {
								title: '子组件3',
								isShow: true,
								prarentRoute: 'ParentPage'
							}
						}
					]
				},
				{
					path: '/project',
					name: 'Project',
					meta: {
						title: '项目介绍',
						isShow: true,
						prarentRoute: 'Home'
					}
				},
				{
					path: '/user',
					name: 'User',
					meta: {
						title: '用户列表',
						isShow: true,
						prarentRoute: 'Home'
					}
				},
				{
					path: '/role',
					name: 'Role',
					meta: {
						title: '角色列表',
						isShow: true,
						prarentRoute: 'Home'
					}
				},
				{
					path: '/permission',
					name: 'Permission',
					meta: {
						title: '权限列表',
						isShow: true,
						prarentRoute: 'Home'
					}
				}
			]
		},
		{
			path: '/login',
			name: 'LoginPage',
			meta: {
				role: ['common', 'admin']
			}
		}
	] as RouteRecordRaw[];

	test('should return correct breadcrumb path for root route', () => {
		const result = getBreadcrumbRoute('Home', mockRoutes);
		expect(result).toEqual(['Home']);
	});

	test('should return correct breadcrumb path for home page', () => {
		const result = getBreadcrumbRoute('HomePage', mockRoutes);
		expect(result).toEqual(['Home', 'HomePage']);
	});

	test('should return correct breadcrumb path for parent page', () => {
		const result = getBreadcrumbRoute('ParentPage', mockRoutes);
		expect(result).toEqual(['Home', 'ParentPage']);
	});

	test('should return correct breadcrumb path for child route', () => {
		const result = getBreadcrumbRoute('Child1', mockRoutes);
		expect(result).toEqual(['Home', 'ParentPage', 'Child1']);
	});

	test('should return correct breadcrumb path for project page', () => {
		const result = getBreadcrumbRoute('Project', mockRoutes);
		expect(result).toEqual(['Home', 'Project']);
	});

	test('should handle non-existent route', () => {
		const result = getBreadcrumbRoute('NonExistent', mockRoutes);
		expect(result).toEqual([]);
	});

	test('should handle route without parent', () => {
		const result = getBreadcrumbRoute('About', mockRoutes);
		expect(result).toEqual(['About']);
	});

	test('should handle login page', () => {
		const result = getBreadcrumbRoute('LoginPage', mockRoutes);
		expect(result).toEqual(['LoginPage']);
	});
});
