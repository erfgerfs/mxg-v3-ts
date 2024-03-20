import request from '@/utils/request'

import type { StatisticsResType, bieType } from '../../api/home/type'

export const getStatisticsApi = () => {
    return request<StatisticsResType>('/home/statistics', 'GET')
}
export const getbtApi = () => {
    return request<bieType>('/home/categoryData', 'GET')
}
export const getbarApi = () => {
    return request<bieType>('/home/member/top10', 'GET')
}
export const getlinkApi = () => {
    return request<bieType>('home/30days/saleData', 'GET')
}

