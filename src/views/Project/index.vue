<template>
	<div class="project-container">
		<div class="project-header">
			<el-input v-model="projectInfo.date" placeholder="请输入项目时间" class="project-input" />
			<el-input v-model="projectInfo.name" placeholder="请输入项目名称" class="project-input" />
			<el-button type="primary" @click="handleSearch">搜索</el-button>
		</div>
		<el-table :data="datalist" style="width: 100%">
			<el-table-column prop="date" label="Date" width="180" />
			<el-table-column prop="name" label="Name" width="180" />
			<el-table-column prop="address" label="Address" />
		</el-table>
		<el-pagination class="pagination" v-model:current-page="projectInfo.currentPage"
			v-model:page-size="projectInfo.pageSize" :page-sizes="[10, 20, 30, 40]" background
			:layout="'prev, pager, next, total'" :total="projectInfo.total" @size-change="handleSizeChange"
			@current-change="handleCurrentChange" />
	</div>
</template>

<script setup lang="ts">
import { getProjectList } from '@/api/project';
import { ref, onMounted, reactive, computed, watch } from 'vue';

interface ProjectInfo {
	date: string;
	name: string;
	currentPage: number;
	pageSize: number;
	total: number;
}
interface ProjectItem {
	id: number;
	date: string;
	name: string;
	address: string;
}
const projectList = ref<ProjectItem[]>([]);
const projectInfo = reactive<ProjectInfo>({
	date: '',
	name: '',
	currentPage: 1,
	pageSize: 10,
	total: 0
});
onMounted(() => {
	fetchData();
});

const fetchData = async () => {
	try {
		const res = await getProjectList();
		projectList.value = res;
		projectInfo.total = res.length;
	} catch (error) {
		console.log(error);
	}
};
watch([() => projectInfo.date, () => projectInfo.name], () => {
	if (!projectInfo.date && !projectInfo.name) {
		fetchData();
	} else {
		handleSearch();
	}
});

const datalist = computed(() => {
	return projectList.value.slice(
		(projectInfo.currentPage - 1) * projectInfo.pageSize,
		projectInfo.currentPage * projectInfo.pageSize
	);
});
const handleSizeChange = (size: number) => {
	projectInfo.pageSize = size;
};

const handleCurrentChange = (page: number) => {
	projectInfo.currentPage = page;
};

const handleSearch = () => {

	let result: ProjectItem[] = [];
	if (projectInfo.date || projectInfo.name) {
		if (projectInfo.date) {
			result = projectList.value.filter((item: ProjectItem) => {
				return item.date.indexOf(projectInfo.date) !== -1;
			});
		}
		if (projectInfo.name) {
			result = projectList.value.filter((item: ProjectItem) => {
				return item.name.indexOf(projectInfo.name) !== -1;
			});
		}
	} else {
		result = projectList.value;
	}
	projectList.value = result;
	projectInfo.currentPage = 1;
	projectInfo.total = result.length;
};
</script>

<style scoped lang="less">
.pagination {
	margin-top: 20px;
	display: flex;
	justify-content: flex-end;
}

.project-header {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 20px;
}

.project-input {
	width: 200px;
	margin-right: 10px;
}
</style>
