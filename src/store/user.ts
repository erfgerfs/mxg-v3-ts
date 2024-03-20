import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi, userApi, logoutApi } from '@/api/login'
import type { logintype } from '../api/login/index'
import type { LoginParamsType, UserResType, userInfoType } from '../api/login/types'
import type { MenuItemType } from '@/layout/layoutAside/types/verticalMenuType'
import type { RouteComponent } from 'vue-router'

import router, { dynamicRoutes, errorRoutes } from '../router/index'


export const usertokenlogin = defineStore('user', () => {

    const usertoken = ref<any>(null)

    // 用户信息
    const userInfo = ref<userInfoType>()
    // 菜单数据
    const menuList = ref<MenuItemType[]>([])
    // 按钮权限数据
    const buttonList = ref<string[]>([])
    // 用户名与密码的数据
    const rememberData = ref<LoginParamsType>()

    //保存有组件缓存的东西
    const hclist = ref<string[]>([])
    const woyc = (dynamicRoutes: any) => {
        const deepCacheName = (dynamicRoutes: any) => {
            if (dynamicRoutes.meta.cache && dynamicRoutes.name) {
                hclist.value.push(dynamicRoutes.name)
            }
            if (dynamicRoutes.children && dynamicRoutes.children.length > 0) {
                dynamicRoutes.children.forEach((item: any) => {
                    deepCacheName(item)
                })
            }
        }
        deepCacheName(dynamicRoutes)
        console.log('hclist', hclist.value);

    }



    const login = async (data: logintype) => {
        try {
            const res = await loginApi(data)
            console.log('hhhhh', res);
            usertoken.value = res.data.access_token

            return res
        } catch (error) {
            console.log(error);

        }
    }
    const getuser = async () => {
        try {
            const res = await userApi()
            userInfo.value = res.data.userInfo
            menuList.value = res.data.menuList
            buttonList.value = res.data.buttonList
            filterRouter()
            return res
        } catch (error) {

        }
    }

    //过滤当前用户所拥有的路由数据

    const filterRouter = () => {
        const viewsModules = parseRouteKey()
        const newRouter = dynamicImportComponent(menuList.value, viewsModules)
        console.log('useRouter', newRouter);
        addRouterHandle(newRouter)

    }
    const addRouterHandle = (newRouter: any) => {
        // 动态添加
        dynamicRoutes[0].children = [...(newRouter || []), ...errorRoutes]
        console.log('dynamicRoutes', dynamicRoutes);
        //获取缓存
        dynamicRoutes.forEach((item) => {
            router.addRoute(item)
        })
        woyc(dynamicRoutes[0])
    }
    // 处理导入组件的key值
    const parseRouteKey = () => {
        // @ts-ignore
        // 利用vite里面功能的glob 第一个参数是过滤路由，第二个是忽略
        const modules = import.meta.glob(['@/views/**/*.vue', '!@/views/**/components/**'])
        const viewsModules: Record<string, RouteComponent> = Object.keys(modules).reduce(
            (prevObj, currentKey) =>
                // 将src/view重置''
                Object.assign(prevObj, {
                    [currentKey.replace(/\/src\/views|..\/views/, '')]: modules[currentKey]
                }),
            {}
        )
        return viewsModules
    }

    // 将后台返回的component转化为动态导入路由组件 component : '/home/index.vue' => conmponent = () => import()
    const dynamicImportComponent = (
        menuList: MenuItemType[],
        viewsModules: Record<string, RouteComponent>
    ) => {
        if (menuList.length <= 0) return []

        return menuList.map((item: MenuItemType) => {
            console.log('item=>', item)
            const { component } = item
            if (component) {
                item.component = viewsModules[`${component}`] || viewsModules[`/${component}`]
            }
            item.children && dynamicImportComponent(item.children, viewsModules)
            return item
        })

        return menuList
    }
    const logout = async () => {
        try {
            const res = await logoutApi()
            console.log('res', res);
            usertoken.value = undefined
            userInfo.value = undefined
            menuList.value = []
            buttonList.value = []
            // 页面重新
            window.location.reload()
            return res
        } catch (error) {

        }
    }

    return {
        usertoken,
        login,
        userInfo,
        menuList,
        buttonList,
        getuser,
        filterRouter,
        parseRouteKey,
        addRouterHandle,
        logout,
        woyc,
        hclist
    }
}, {
    persist: {
        paths: ['usertoken']
    }
})