<template>
  <div class="layout-header-breadcrumb">
    <svg-icon @click="handleCollapse" class="layout-header-expand-icon"
      :name="isCollapse ? 'ele-Expand' : 'ele-Fold'"></svg-icon>
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <template v-for="(item, index) in breadcrumList" :key="index">
          <el-breadcrumb-item v-if="index === breadcrumList.length - 1">

            <span class="flex-center">
              <svg-icon v-if="item.meta.icon" :size="14" :name="item.meta.icon"></svg-icon>
              {{ item.meta.title }}
            </span>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else :to="item.path">{{ item.meta.title }}</el-breadcrumb-item>
        </template>
      </transition-group>


    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUpdate, onMounted, ref } from 'vue';
import { useLayoutConfigStore } from '../../store/layoutConfig'
import { useRoute, type RouteLocationNamedRaw, type RouteLocationNormalized, type RouteRecordNormalized, onBeforeRouteUpdate } from 'vue-router';
const store = useLayoutConfigStore()

const handleCollapse = () => {
  store.isCollapse = !store.isCollapse
}
const isCollapse = computed(() => {
  return store.isCollapse
})

const route = useRoute()
console.log(route);

//保存面包屑数据
const breadcrumList = ref<RouteRecordNormalized[]>([])


//获取路由面包屑数据

const getBreadcrumd = (to: RouteLocationNormalized) => {
  const methd = to.matched.filter((item: RouteRecordNormalized) => {
    if (item.meta && item.meta.title && item.meta.isBreadcrumb != false) {
      return item
    }

  })
  breadcrumList.value = methd
}
onBeforeRouteUpdate((to: RouteLocationNormalized) => {
  getBreadcrumd(to)
})

onMounted(() => {
  getBreadcrumd(route)

})
</script>

<style lang="scss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s ease;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-to {
  position: absolute;
  z-index: -1;
}
</style>
../../store/layoutConfig