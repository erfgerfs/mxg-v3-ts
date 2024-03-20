<template>
    <template v-for="(item, index) in data" :key="index">
        <el-menu-item v-if="!item.children || !item.children.length" :index="item.path">
            <svg-icon :name="item.meta.icon"></svg-icon>

            <span>{{ item.meta.title }}</span>
        </el-menu-item>
        <el-sub-menu :index="item.path" v-if="item.children && item.children!.length">
            <template #title>
                <svg-icon :name="item.meta.icon"></svg-icon>
                <span>{{ item.meta.title }}</span>
            </template>


            <Menultem :data="item.children"></Menultem>
            <!-- <el-menu-item :index="itm.path" v-for="(itm, inde) in item.children" :key="inde">
                <svg-icon :name="itm.meta.icon"></svg-icon>
                <span>{{ itm.meta.title
                    }}</span>
            </el-menu-item> -->

        </el-sub-menu>
    </template>
</template>

<script setup lang='ts'>
import type { MenuItemType } from './types/verticalMenuType';

defineProps<{
    data: MenuItemType[]
}>()

</script>

<style lang='scss' scoped></style>