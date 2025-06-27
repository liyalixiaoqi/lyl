<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-container">
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            >
            <el-menu-item index="1">
                <el-icon><HomeFilled /></el-icon>
                <span>项目介绍</span>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon><HomeFilled /></el-icon>
                <span>用户列表</span>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon><HomeFilled /></el-icon>
                <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon><HomeFilled /></el-icon>
                <span>权限列表</span>
            </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main class="main-container">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
    import Header from './component/header.vue';
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