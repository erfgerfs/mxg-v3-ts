<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { useFullscreen, useDark } from '@vueuse/core'

import { useLayoutConfigStore } from '@/store/layoutConfig'
import { usertokenlogin } from '@/store/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'


const store = useLayoutConfigStore()


const { isFullscreen, toggle } = useFullscreen()

const isDark = useDark({
  initialValue: 'dark'
})

const handleToggle = (value: boolean) => {
  store.isDark = value
  window.location.reload()
}
const stores = usertokenlogin()
const router = useRouter()

const tc = () => {
  stores.logout()

  ElMessage({
    message: '退出成功',
    type: 'success',
  })

}
</script>

<template>
  <div class="layout-header-user">
    <!-- 全屏切换-->
    <div class="layout-header-user-icon mr5">
      <svg-icon v-if="!isFullscreen" @click="toggle" name="ele-FullScreen"></svg-icon>
      <svg-icon v-else @click="toggle" name="ele-Aim"></svg-icon>
    </div>
    <!--主题切换-->
    <div class="mr5 layout-header-user-icon">
      <el-switch v-model="isDark" @change="handleToggle" active-icon="ele-Moon" inactive-icon="ele-Sunny" inline-prompt
        style="--el-switch-on-color: #333"></el-switch>
    </div>
    <!--下拉菜单-->
    <el-dropdown>
      <span class="el-dropdown-link" style="display: flex;align-items: center;">
        <el-avatar class="mr5" :size="35"
          :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
        罗军
        <svg-icon class="mr5" name="ele-ArrowDown"></svg-icon>
      </span>
      <template #dropdown class="layout-header-user-icon mr5">
        <el-dropdown-menu>
          <el-dropdown-item @click="$router.push('/')">首页</el-dropdown-item>
          <el-dropdown-item @click="$router.push('/404')">404</el-dropdown-item>
          <el-dropdown-item @click="$router.push('/401')">401</el-dropdown-item>
          <el-dropdown-item divided @click="tc">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>


  </div>
</template>

<style lang="scss" scoped></style>@/store/layoutConfig
