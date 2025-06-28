<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-container">
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-menu
            :default-active=activeIndex
             class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
            >
            <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path" >
                <el-icon><HomeFilled /></el-icon>
                <span>{{ item.meta.title }}</span>
            </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="main-container">
            <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import Header from './component/header.vue';
    import { useRouter,useRoute } from "vue-router";
    import { HomeFilled,User,Setting,Lock } from "@element-plus/icons-vue";

    const router = useRouter();
    const route = useRoute();
    const menuList = router.getRoutes().filter(item => item.meta.isShow);
    console.log(menuList,route);
    const activeIndex = route.path;
    const handleOpen = (key: string) => {
        router.push(key);
    }
    const handleClose = () => {
        router.push('/');
    }
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
</style>