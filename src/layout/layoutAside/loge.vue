<template>
    <div class="layout-logo" style="height: 50px;display: flex;align-items: center;">
        <img alt="" class="logo" src="@/assets/logo.jpeg" />
        <span v-if="!isCollapse">积云 - 后台管理系统</span>
    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { useLayoutConfigStore } from '../../store/layoutConfig'

const store = useLayoutConfigStore()

const isCollapse = computed(() => {
    return store.isCollapse
})

</script>

<style lang='scss' scoped>
.logo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
}
</style>../../store/layoutConfig