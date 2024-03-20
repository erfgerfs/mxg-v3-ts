<template>

    <el-aside style="height: 100vh;" :class="isCollapse ? 'layout-aside-menu-60' : 'layout-aside-menu-200'">
        <loge></loge>
        <VertciaIMenu :data="menuList"></VertciaIMenu>


    </el-aside>
</template>

<script setup lang='ts'>
import loge from './loge.vue'
import VertciaIMenu from './vertciaIMenu.vue'
import { useLayoutConfigStore } from '../../store/layoutConfig'
import { computed } from 'vue';
import { usertokenlogin } from '../../store/user'

const store = useLayoutConfigStore()

const isCollapse = computed(() => {
    return store.isCollapse
})
const userstore = usertokenlogin()
const menuList = computed(() => {
    return filterMenuList(userstore.menuList)
})
const filterMenuList = (menuList: any) => {
    const aaa = (menuList: any) => {
        const targetMenu = menuList.filter((item: any) => !item.meta?.hidden)
        targetMenu.forEach((item: any) => {
            if (item.children && item.children?.length > 0) {
                aaa(item.children)
            }
        })
        return targetMenu
    }
    return aaa(menuList)
}
</script>

<style lang='scss' scoped></style>../../store/layoutConfig