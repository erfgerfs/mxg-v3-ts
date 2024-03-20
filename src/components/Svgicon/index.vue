<template>
    <div>
        <render />
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { h } from 'vue'
import { resolveComponent } from 'vue';
const props = withDefaults(
    defineProps<{
        // 图标颜色
        color?: string
        // 图标大小
        size?: string | number
        // 图标名称
        name?: string
    }>(),
    {
        name: '',
        size: 18
    }
)

const render = () => {
    if (props.name && props.name?.startsWith('ele-')) {
        return h(resolveComponent('el-icon'), { color: props.color, size: props.size }, () => {
            return h(resolveComponent(props.name))
        })
    } else {
        return h('i')
    }
}
</script>

<style lang='scss' scoped></style>