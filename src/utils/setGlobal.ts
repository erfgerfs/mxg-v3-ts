import type { App } from "vue"
import Svgicon from '@/components/Svgicon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
export default {
    install(app: App) {
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(`ele-${key}`, component)
        }
        app.component('SvgIcon', Svgicon)
    }
}

