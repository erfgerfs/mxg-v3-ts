import type { App } from "vue/dist/vue.js";
import { authDiective } from './authDiective'


export default {
    install(app: App) {
        app.use(authDiective)

    }
}