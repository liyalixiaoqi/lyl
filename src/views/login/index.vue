<template>
  <div class="login-container">
    <div class="login-box">
      <h1>企业中后台管理系统</h1>
      <el-form :model="userInfo" :rules="rules" ref="loginFormRef">
        <el-form-item>
          <el-input v-model="userInfo.username" placeholder="请输入用户名" prop="username" :prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="userInfo.password" placeholder="请输入密码" prop="password" :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from 'vue-router';
import useUserStore from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();
const userInfo = ref({
  username: "",
  password: "",
});

const rules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const login = () => {
  userStore.login(userInfo.value).then(() => {
    router.push("/home");
  });
};
</script>

<style scoped lang="less">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
.login-box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  background: var(--bg-color);
}
.login-btn {
  width: 100%;
}
</style>
