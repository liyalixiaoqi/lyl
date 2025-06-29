<template>
	<div>
		<el-form :model="form" :inline="true" style="margin-right: 20px">
			<el-form-item label="用户名">
				<el-input v-model="form.userName" />
			</el-form-item>
			<el-form-item label="昵称">
				<el-input v-model="form.nickname" />
			</el-form-item>
			<el-form-item label="角色" style="width: 180px">
				<el-select v-model="form.roleId" placeholder="请选择角色" clearable>
					<el-option v-for="item in authUserList" :key="item.id" :label="item.userRole" :value="item.id" />
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="ID" />
			<el-table-column prop="userName" label="用户名" />
			<el-table-column prop="nickname" label="昵称" />
			<el-table-column prop="role" label="角色">
				<template #default="scope">
					<el-tag v-for="item in scope.row.role" :key="item.id"
						:type="item.userRole === '管理员' ? 'success' : 'info'" class="tag-role" size="small">
						{{ item.userRole }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog v-model="editDialogVisible" title="编辑用户" width="500px">
			<el-form :model="editForm" label-width="120px">
				<el-form-item label="用户名">
					<el-input v-model="editForm.userName" />
				</el-form-item>
				<el-form-item label="昵称">
					<el-input v-model="editForm.nickname" />
				</el-form-item>
				<el-form-item label="角色">
					<el-select v-model="editForm.roleId" placeholder="请选择角色" clearable multiple>
						<el-option v-for="item in authUserList" :key="item.id" :label="item.userRole" :value="item.id" />
					</el-select>
				</el-form-item>
			</el-form>

			<template #footer>
				<el-button @click="editDialogVisible = false">取消</el-button>
				<el-button type="primary" @click="handleEditSubmit">保存</el-button>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue';
import { getUserList, getAuthUserList } from '@/api/user';
interface IRole {
	id: number;
	userRole: string;
	auth: number[];
}
interface IUser {
	id: number;
	userName: string;
	nickname: string;
	role: Array<IRole>;
}
interface IForm {
	userName: string;
	nickname: string;
	roleId: string;
}
const authUserList = ref<IRole[]>([]);
const tableData = ref<IUser[]>([]);
const form = reactive<IForm>({
	userName: '',
	nickname: '',
	roleId: []
});

const editDialogVisible = ref(false);
const editForm = reactive<IUser>({
	id: '',
	userName: '',
	nickname: '',
	role: []
});
onMounted(() => {
	fetchData();
	fetchAuthUserList();
});
const fetchAuthUserList = async () => {
	const res = await getAuthUserList();
	authUserList.value = res;
};
const fetchData = () => {
	getUserList().then((res) => {
		tableData.value = res;
	});
};
const onSearch = () => {
	let result: IUser[] = [];
	if (form.userName || form.nickname || form.roleId) {
		result = tableData.value.filter((item) => {
			if (form.userName && !item.userName.includes(form.userName)) {
				return false;
			}
			if (form.nickname && !item.nickname.includes(form.nickname)) {
				return false;
			}
			if (form.roleId && !item.role.some((role) => role.id === form.roleId)) {
				return false;
			}
			return true;
		});
	} else {
		result = tableData.value;
	}
	tableData.value = result;
};

watch([() => form.userName, () => form.nickname, () => form.roleId], () => {
	fetchData();
});

const handleEdit = (row: IUser) => {
	editDialogVisible.value = true;
	Object.assign(editForm, {
		...row,
		roleId: row.role.map((item) => item.id) || []
	});
};
const handleEditSubmit = () => {
	let obj = tableData.value.find((item) => item.id === editForm.id);
	if (obj) {
		obj.userName = editForm.userName;
		obj.nickname = editForm.nickname;

		obj.role = editForm.roleId.map((item) => ({
			id: item,
			userRole: authUserList.value.find((v) => v.id === item)?.userRole || ''
		}));
	}

	editDialogVisible.value = false;

};
</script>

<style scoped lang="less">
.tag-role {
	margin-right: 5px;
}
</style>
