<template>
    <div>
        {{ props.center }}：<el-input v-model="input" style="width: 200px;margin-right: 20px;"
            :placeholder="`请输入${props.add}`" />
        <el-button type="primary" :icon="Search" @click="getinput">查询</el-button>
        <el-button type="success" :icon="Plus" @click="xz">{{ props.add }}</el-button>
    </div>
</template>

<script setup lang='ts'>
const props = defineProps({
    center: String,
    add: String,
    drawer: Boolean
})


import { Search, Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
const input = ref('')

const emits = defineEmits(['getinput', 'xz'])

const getinput = () => {
    emits('getinput', input.value)
}
const xz = () => {
    emits('xz', !props.drawer)
}



</script>

<style lang='scss' scoped></style>