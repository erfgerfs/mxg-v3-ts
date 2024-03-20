import { usertokenlogin } from '@/store/user'
import router from '@/router'

const whiteList: string[] = (['/login', '/404', '/401'])

router.beforeEach(async (to, from, next) => {
    const store = usertokenlogin()
    const token = store.usertoken
    console.log('zzz', token);

    if (token !== null) {
        if (to.path === '/login') {
            return next({ path: '/' })
            // next()
        } else {
            if (!store.userInfo || store.menuList.length <= 0 || store.buttonList.length <= 0) {
                const res = await store.getuser()
                if (res!.data) {
                    //不指定页面会出现白屏的问题
                    return next({ path: to.path, query: to.query })
                } else {
                    return next(`/login?redirect=${to.path}`)
                }
                // next({ path: to.path, query: to.query })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            return next()
        } else {
            return next(`/login?redirect=${to.path}`)
        }
    }
})