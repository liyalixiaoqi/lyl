<template>
	<div class="common-layout">
		<el-container>
			<el-header class="header-container">
				<Header />
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu
						:default-active="activeIndex"
						class="el-menu-vertical-demo"
						@open="handleOpen"
						@close="handleClose"
						:router="true"
					>
						<template v-for="item in menuList" :key="item.path">
							<el-menu-item v-if="!item.children?.length" :index="item.path">
								<span>{{ item.meta?.title }}</span>
							</el-menu-item>
							<el-sub-menu v-else :index="item.path">
								<template #title>
									<span>{{ item.meta?.title }}</span>
								</template>
								<el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
									<span>{{ child.meta.title }}</span>
								</el-menu-item>
							</el-sub-menu>
						</template>
					</el-menu>
				</el-aside>
				<el-main class="main-container">
					<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-container">
						<el-breadcrumb-item
							v-for="item in breadcrumbStore.parentRoute"
							:key="item"
							:to="{ path: item }"
							>{{ item }}</el-breadcrumb-item
						>
					</el-breadcrumb>
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Header from './component/header.vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeFilled, User, Setting, Lock } from '@element-plus/icons-vue';
import useBreadcrumb from '@/stores/breacrumb/index';
const breadcrumbStore = useBreadcrumb();
const router = useRouter();
const route = useRoute();
const menuList = router.options.routes[1]?.children?.filter((item) => item.meta?.isShow) || [];
console.log(menuList);
// 当前激活的菜单
const activeIndex = route.path;
const handleOpen = (key: string) => {
	console.log(key);
	router.push(key);
};
const handleClose = () => {
	router.push('/');
};
</script>

<style scoped lang="less">
.common-layout {
	height: 100vh;
	padding: var(--main-padding);
	background-color: var(--bg-color-layout);
}

.header-container {
	border-top: none;
	padding: 0;
	margin-bottom: 10px;
	border-radius: 5px;
	box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
}

.el-menu-vertical-demo {
	border-right: none;
	height: calc(100vh - 85px);
	margin-right: 10px;
	border-radius: 5px;
	box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
	padding: var(--main-padding);
}

.main-container {
	height: calc(100vh - 85px);
	padding: var(--main-padding);
	background-color: var(--bg-color-layout);
	border-radius: 5px;
	box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1);
}
.breadcrumb-container {
	margin-bottom: 10px;
}
</style>
