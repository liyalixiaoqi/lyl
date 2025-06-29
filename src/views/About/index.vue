<template>
	<div>
		<Tag :text="text" :theme="theme" />
		<Tag :text="text" :theme="theme" />
		<Tag :text="text" :theme="theme" />
	</div>
</template>

<script setup lang="ts">
// import Tag from '@/component/Tag.vue';
import { ref } from 'vue';

const text = ref<string>('123');
const theme = ref<string>('red');

</script>

<style scoped lang="less"></style>
