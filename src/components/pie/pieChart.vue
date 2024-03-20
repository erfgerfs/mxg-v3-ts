<template>
    <div>
        <el-card style="width: 100%" shadow="hover">

            <div ref='main' :style="{ width: props.width, height: props.height }"></div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>

import type { EChartsType } from 'echarts';
import * as echarts from 'echarts';
import { nextTick, onActivated, onBeforeMount, onMounted, ref, watch } from 'vue';
let props = withDefaults(defineProps<{
    data: any[],
    title?: string,
    subtext?: string,
    theme?: string | null,
    bgColor?: string,
    width?: string,
    height?: string
}>(), {
    width: '100%',
    height: '380px',
    data: () => []
})
const main = ref<HTMLElement | null | undefined>();
const chart = ref<any>()



onMounted(() => {
    init()
    window.addEventListener('resize', () => {
        chart.value && chart.value.resize()
    })
})
//当使用了keep-alive页面缓存时，每次从缓存中重新插入时，重置图标自适应
onActivated(() => {
    chart.value && chart.value.resize()
})

const nvll = ref(['', null, undefined])
function init() {
    console.log('props.theme', props.theme);
    if (!nvll.value.includes(chart.value)) chart.value.dispose()
    chart.value = echarts.init(main.value, props.theme);
    const option = {
        backgroundColor: props.bgColor,
        title: {
            subtext: props.subtext,
            text: props.title,
            left: 'left'
        },
        tooltip: {
            trigger: 'item'
        },

        series: [
            {
                name: '单位:元',
                type: 'pie',
                radius: '50%',
                data: props.data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    option && chart.value.setOption(option);

}

onBeforeMount(() => {
    window.removeEventListener('resize', () => {
        chart.value && chart.value.resize()
        if (chart.value) {
            chart.value.dispose()
            chart.value = null
        }
    })
})
watch(() => [props.data, props.bgColor, props.theme], () => {
    nextTick(() => {
        
        init()
    })
}, {
    deep: true,
    immediate: true
})
</script>

<style lang='scss' scoped>
.n {
    background: #000;
}
</style>