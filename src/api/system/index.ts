import request from '@/utils/request'


export type roleType = {
    current: number | undefined
    size: number | undefined
    name: string | number
}
export type userType = {
    current: number | undefined
    size: number | undefined
    keyword?: string | number
}

export const getmenuApi = (data: any) => {
    return request('/system/menu/search', 'POST', data)


}
export const getroleApi = (data: roleType) => {
    return request('/system/role/search', 'POST', data)
}
export const getuesrApi = (data: userType) => {
    return request('/system/user/search', 'POST', data)
}
export const addmenuApi = (data: any) => {
    return request('/system/menu', 'POST', data)
}

