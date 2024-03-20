<template>
    <div>
        <el-card style="width: 100%" shadow="hover">
            <div id="main1" style="width: 100%;height: 300px;"></div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { nextTick, onActivated, onBeforeMount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps<{
    xdata: any
    ydata: any
    theme?: string | null
}>();


onMounted(() => {
    init()
    window.addEventListener('resize', () => {
        myChart1 && myChart1.resize()
    })
})
// console.log('xdata11', props.xdata);
// console.log('ydata11', props.ydata);

let chartDom
let myChart1: echarts.ECharts
function init() {
    chartDom = document.getElementById('main1');
    myChart1 = echarts.init(chartDom);


    const option = {
        tooltip: {
            trigger: 'item'
        },
        xAxis: {
            type: 'category',
            data: props.xdata
        },
        yAxis: {
            type: 'value'
        },
        series: [

            {
                data: props.ydata,
                type: 'bar',
                itemStyle: {  // 使用方法二的写法
                    color: {
                        type: 'linear',
                        x: 0,  //右
                        y: 0,  //下
                        x2: 0,  //左
                        y2: 1,  //上
                        colorStops: [
                            {
                                offset: 0,
                                color: '#80bef6' // 0% 处的颜色
                            },
                            {
                                offset: 0.7,
                                color: '#188df0' // 70% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#188df0' // 100% 处的颜色
                            }
                        ]
                    }
                },
            },

        ],

    }

    option && myChart1.setOption(option);

}
onBeforeMount(() => {
    window.removeEventListener('resize', () => {
        myChart1 && myChart1.resize()
        if (myChart1) {
            myChart1.dispose()
            myChart1 = null
        }
    })
})
//当使用了keep-alive页面缓存时，每次从缓存中重新插入时，重置图标自适应
onActivated(() => {
    myChart1 && myChart1.resize()
})
watch(() => [props.theme, props.xdata, props.ydata], () => {
    nextTick(() => {
        // console.log(1234599);
        init()
    })
}, {
    deep: true,
    immediate: true
})


</script>

<style lang='scss' scoped></style>