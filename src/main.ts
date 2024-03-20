
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

// 如果您正在使用CDN引入，请删除下面一行。
import userIcon from './utils/setGlobal'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './styles/dh.scss'
import './styles/index.scss'
// 引入pinia
import pinia from '../src/store/index'
//引入页面鉴权
import './permission'
import { authDiective } from './directive/authDiective'


const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
// app.use(p)
app.use(userIcon)
app.use(pinia)
app.mount('#app')
app.use(authDiective)

