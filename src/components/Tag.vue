<template>
    <div class="wrap-tag">
        <span ref="tagRef" v-bind="props" class="tag-text"></span>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue';
const props = defineProps({
    text: {
        type: String,
        default: null
    },
    theme: {
        type: String,
        default: null,
        require: false
    }
});
const tagRef = ref<HTMLElement>();

onMounted(() => {
    setText();
    setTheme();
});
const setText = () => {
    tagRef.value!.innerText = props.text;
};
const setTheme = () => {
    tagRef.value!.style.backgroundColor = props.theme;
};
</script>
<style scoped>
.tag-text {
    margin: 4px;
    padding: 4px 8px;
    font-size: 12px;
    background-color: #f0f0f0;
    color: #fff;
    border-radius: 4px;
}

.wrap-tag {
    padding: 4px;
}
</style>
