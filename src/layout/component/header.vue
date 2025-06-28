<template>
    <div class="header-container">
        <div class="header-left">
            <div class="header-title">
                <h3>后台管理系统</h3>
            </div>   
        </div>
        <div class="header-center">
        </div>
      <div class="header-right">
        <el-icon><UserFilled /></el-icon>
        <h3>{{ userName }}</h3>
        <span @click="handleLogout" class="header-right-icon">退出登录</span>
      </div>
    </div>
</template>

<script setup lang="ts">
import {  UserFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import useUserStore from "@/stores/user";
const router = useRouter();
const userStore = useUserStore();
const userName = userStore.userName;
const handleLogout = () => {
  userStore.logout();
   router.push("/login");
}
</script>

<style scoped lang="less">
    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        padding: var(--main-padding);
    }
    .header-right {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .header-right-icon {
        font-size: 16px;
        cursor: pointer;
    }
</style>