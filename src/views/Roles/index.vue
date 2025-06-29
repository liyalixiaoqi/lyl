<template>
	<div>
		<el-button type="primary" @click="handleAdd" class="add-btn">新增</el-button>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="ID" />
			<el-table-column prop="userRole" label="角色名称" />
			<!-- <el-table-column prop="auth" label="角色权限" /> -->
			<el-table-column label="操作">
				<template #default="scope">
					<el-button type="primary" @click="handleChangeAuth(scope.row)">修改权限</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog v-model="dialogVisible" title="新增角色" width="500px">
			<el-form :model="form" label-width="120px">
				<el-form-item label="角色名称">
					<el-input v-model="form.userRole" />
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="handleAddSubmit">保存</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { getAuthUserList } from '@/api/user';
import { useRouter } from 'vue-router';
const router = useRouter();
interface IForm {
	userRole: string;
	auth: number[];
}
interface IEditForm {
	id: string;
	userRole: string;
	auth: number[];
}
const tableData = ref<IEditForm[]>([]);
const dialogVisible = ref(false);
const form: IForm = reactive({
	userRole: '',
	auth: []
});

onMounted(async () => {
	await fetchData();
});

const fetchData = async () => {
	const res = await getAuthUserList();
	tableData.value = res;
};
const handleAdd = () => {
	dialogVisible.value = true;
};

const handleAddSubmit = () => {
	tableData.value.push({
		id: tableData.value.length + 1,
		userRole: form.userRole,
		auth: form.auth
	});
	form.userRole = '';
	form.auth = [];
	dialogVisible.value = false;
};
const handleChangeAuth = (row: IEditForm) => {
	router.push({
		path: '/permission',
		query: {
			id: row.id,
			auth: row.auth
		}
	});
};
</script>

<style scoped lang="less">
.add-btn {
	margin-bottom: 10px;
}
</style>
