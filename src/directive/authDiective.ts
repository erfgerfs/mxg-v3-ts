import type { App } from "vue";
import { usertokenlogin } from '@/store/user'

export function authDiective(app: App) {
    const stoer = usertokenlogin()
    // 使 v-auth 在所有组件中都可用
    app.directive('auth', {
       
        //第一个是绑定的元素 第二个参数当前的权限标识，
        mounted(el, binding) {
            //获取按钮权限的数据
            const buttonList = stoer.buttonList;
            if (!buttonList.some(btn => btn === binding.value)) {
                el.parentNode.removeChild(el)
            }
        }
    })
}