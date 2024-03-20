<template>
    <div>
        <el-card id="main" style="width: 100%;height: 380px;" shadow="hover"></el-card>

    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';

import { onMounted, onActivated, watch, nextTick, ref } from 'vue';



const props = defineProps<{
    theme?: null | string,
    last30Daysdata: string[],  //日期
    saleMoneyListdata: number[], //销售额
    orderNumListdata: number[], //订单数
    returnMoneyListdata: number[], //退款额
    rechargeMoneyListdata: number[] //充值额
}>()


let chartDom
const chart = ref<any>()



onMounted(() => {
    window.addEventListener('resize', () => {
        chart.value && chart.value.resize()
    })
    init()
})



function init() {
    console.log('props.theme', props.theme);

    chartDom = document.getElementById('main');
    chart.value = echarts.init(chartDom);
    const option1 = {
        // title: {
        //     text: '近30天营销趋势'
        // },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['订单数', '销售额', '退款额', '充值额']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: props.last30Daysdata
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '订单数',
                type: 'line',

                data: props.orderNumListdata
            },
            {
                name: '销售额',
                type: 'line',

                data: props.saleMoneyListdata
            },
            {
                name: '退款额',
                type: 'line',

                data: props.returnMoneyListdata
            },
            {
                name: '充值额',
                type: 'line',
                data: props.rechargeMoneyListdata
            },
        ]
    };
    option1 && chart.value.setOption(option1);
}
watch(
    () => [props.theme, props.last30Daysdata, props.orderNumListdata, props.rechargeMoneyListdata, props.returnMoneyListdata, props.saleMoneyListdata],
    () => {
        nextTick(() => {
            console.log(1234599);
            init()
        })
    }, {
    deep: true,
    immediate: true
})

//当使用了keep-alive页面缓存时，每次从缓存中重新插入时，重置图标自适应
onActivated(() => {
    chart.value && chart.value.resize()
})

// watch(()=>[props.last30Daysdata])

</script>

<style lang='scss' scoped></style>