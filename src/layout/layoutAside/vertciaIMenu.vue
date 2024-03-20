<template>
    <div>
        <el-menu style="height: 100vh;" :collapse="isCollapse" :default-active="$route.path" :router="true"
            active-text-color="#ffd04b" class="el-menu-vertical-demo" text-color="#fff" default-expand-all>
            <Menultem :data="data"></Menultem>
        </el-menu>

    </div>
</template>

<script setup lang='ts'>
import type { MenuItemType } from '@/layout/layoutAside/types/verticalMenuType'
import Menultem from './menultem.vue';
import { useLayoutConfigStore } from '../../store/layoutConfig'
import { computed } from 'vue';



const store = useLayoutConfigStore()


const isCollapse = computed(() => {
    return store.isCollapse
})

defineProps<{
    data: MenuItemType[]
}>()


</script>

<style lang='scss' scoped></style>../../store/layoutConfig