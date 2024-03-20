<template>
    <div>
        <el-card id="main33" style="width: 100%;height: 380px;" shadow="hover">Hover</el-card>
    </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { onActivated, onMounted, ref } from 'vue';

onMounted(() => {
    window.addEventListener('resize', () => {
        myChart3 && myChart3.resize()
    })
    init()
})
let chartDom
let myChart3: echarts.ECharts

function init() {
    chartDom = document.getElementById('main33');
    myChart3 = echarts.init(chartDom);

    var option;

    option = {
        title: {
            text: '气温仪表盘℃'
        },
        series: [
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 60,
                splitNumber: 12,
                itemStyle: {
                    color: '#FFAB91'
                },
                progress: {
                    show: true,
                    width: 30
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 30
                    }
                },
                axisTick: {
                    distance: -45,
                    splitNumber: 5,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                splitLine: {
                    distance: -52,
                    length: 14,
                    lineStyle: {
                        width: 3,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: -20,
                    color: '#999',
                    fontSize: 20
                },
                anchor: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    width: '60%',
                    lineHeight: 40,
                    borderRadius: 8,
                    offsetCenter: [0, '-15%'],
                    fontSize: 50,
                    fontWeight: 'bolder',
                    formatter: '{value} °C',
                    color: 'inherit'
                },
                data: [
                    {
                        value: 38
                    }
                ]
            },
            {
                type: 'gauge',
                center: ['50%', '60%'],
                startAngle: 200,
                endAngle: -20,
                min: 0,
                max: 60,
                itemStyle: {
                    color: '#FD7347'
                },
                progress: {
                    show: true,
                    width: 8
                },
                pointer: {
                    show: true
                },
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: true
                },
                splitLine: {
                    show: true
                },
                axisLabel: {
                    show: true
                },
                detail: {
                    show: true
                },
                data: [
                    {
                        value: 38
                    }
                ]
            }
        ]
    };

    option && myChart3.setOption(option);

}



//当使用了keep-alive页面缓存时，每次从缓存中重新插入时，重置图标自适应
onActivated(() => {
    myChart3 && myChart3.resize()
})




</script>

<style lang='scss' scoped></style>