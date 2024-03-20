import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useLayoutConfigStore = defineStore('layoutConfig', () => {
    //控制菜单展开收起状态
    const isCollapse = ref<boolean>(false)

    //控制主题颜色
    const isDark = ref<boolean>(false)
    return {
        isCollapse,
        isDark
    }
}, {
    persist: true
})