<script lang="ts" setup>
import { usertokenlogin } from '../../store/user'
const store = usertokenlogin()
//要缓存的页面
const hcarr = store.hclist
// console.log('hcarr', hcarr);

</script>

<template>
  <!--右侧主区域-->
  <el-main class="layout-main">
    <el-scrollbar>
      <div class="layout-main-warp">
        <router-view v-slot="{ Component }">
          <transition mode="out-in" name="fade-transform">
            <keep-alive :include="hcarr">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<style lang="scss" scoped></style>