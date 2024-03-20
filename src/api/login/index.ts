import request from '@/utils/request'

export type logintype = {
    password: string,
    username: string
}

export const loginApi = (data: logintype) => {
    return request('/auth/token', 'POST', data)
}
export const userApi = () => {
    return request('/system/menu/user', 'GET')
}
//退出登录
export const logoutApi = () => {
    return request('/auth/logout', 'POST')
}