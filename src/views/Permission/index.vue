<template>
  <div class="permission-container">
    <el-tree ref="treeRef" :data="treeData" :props="defaultProps" :check-strictly="true" node-key="id" show-checkbox
      :default-checked-keys="auth" />
    <el-button @click="handleChangeAuth" type="primary">修改权限</el-button>
  </div>
</template>

<script setup lang="ts">
import { getAuthList } from '@/api/auth';
import { onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const treeRef = ref();
const auth = ref(route.query.auth);
const treeData = ref([]);
const defaultProps = reactive({
  label: 'project',
  children: 'subList'
});
onMounted(() => {
  fetchAuthList();
});

const fetchAuthList = async () => {
  const res = await getAuthList();
  treeData.value = res;
};

const handleChangeAuth = () => {
  console.log('修改权限', treeRef.value.getCheckedKeys());

};
</script>

<style scoped lang="less"></style>
