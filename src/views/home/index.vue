<script lang="ts" name="Home" setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import PieChart from '../../components/pie/pieChart.vue'
import { useLayoutConfigStore } from '@/store/layoutConfig'
//获取饼图数据
import { getbtApi, getlinkApi, getbarApi } from '@/api/home/index'
import type { bieType } from '@/api/home/type'
import barChart from '@/components/bar/barChart.vue'
import gaugeChar from '@/components/gauge/gaugeChar.vue'
import lineChart from '@/components/Line/LineChart.vue'

//获取折线的接口

const last30Daysdata = ref<string[]>([])
const saleMoneyListdata = ref<number[]>([])
const orderNumListdata = ref<number[]>([])
const returnMoneyListdata = ref<number[]>([])
const rechargeMoneyListdata = ref<number[]>([])
const data1 = ref<any>()

const store = useLayoutConfigStore()

const theme = computed(() =>
  (store.isDark ? 'dark' : ''))

const bgColor = computed(() => (
  store.isDark ? 'transparent' : ''))

// console.log('store.isDark', store.isDark);
// console.log('props.theme', theme);
// console.log('props.bgColor', bgColor);


const getlink = async () => {
  try {
    const { data } = await getlinkApi()
    console.log(data);

    data1.value = data
    //日期
    last30Daysdata.value = data.last30Days
    // console.log('last30Daysdata.value', last30Daysdata.value);


    //销售额
    saleMoneyListdata.value = data.saleMoneyList
    // console.log('saleMoneyListdata', saleMoneyListdata.value);

    //订单数
    orderNumListdata.value = data.orderNumList
    // console.log('orderNumListdata.value', orderNumListdata.value);

    //退款额
    returnMoneyListdata.value = data.returnMoneyList
    // console.log('returnMoneyListdata.value', returnMoneyListdata.value);

    //充值额
    rechargeMoneyListdata.value = data.rechargeMoneyList
    // console.log('rechargeMoneyListdata.value', rechargeMoneyListdata.value);

  } catch (error) {

  }
}
getlink()





const StaticBlock = defineAsyncComponent(() => import('./components/staticBlock.vue'))


const categoryDate = ref<bieType[]>([])
const loadCategoryData = async () => {
  try {
    const { data } = await getbtApi()
    // console.log(data);
    categoryDate.value = data
    // console.log(categoryDate.value);


  } catch (error) {

  }
}

loadCategoryData()




// export type barType = {
//   name: string,
//   consumeMoney: number
// }

let xdata = ref<string[]>([])
let ydata = ref<number[]>([])
//表格
const aaa = async () => {
  try {
    const { data } = await getbarApi()
    // console.log("res11", res);
    // bardata.value = res.data
    const xArr: any[] = []
    const yArr: any[] = []
    data.forEach((item: any) => {
      xArr.push(item.name)
      yArr.push(item.consumeMoney)

    })
    xdata.value = xArr
    ydata.value = yArr
    // console.log('xdata.value', xdata.value);
    // console.log('ydata.value', ydata.value);

    // bardata.value = res.data.name
    // console.log("bardata", bardata);

  } catch (error) {

  }
}
aaa()


</script>

<template>
  <div>
    <StaticBlock></StaticBlock>
    <div>
      <el-row :gutter="20" style="justify-content: space-around;margin: 20px 0;">
        <el-col :lg="9" :md="11" :sm="24" :xs="24" :span="16">

          <!-- <piChart></piChart> -->
          <PieChart :bgColor="bgColor" :data="categoryDate" title="分类销售统计" subtext="每种商品分类的近30天销售额" :theme="theme">
          </PieChart>

        </el-col>
        <el-col :lg="15" :md="13" :sm="24" :xs="24" :span="8">
          <lineChart :theme="theme" v-if="data1" :rechargeMoneyListdata="rechargeMoneyListdata"
            :returnMoneyListdata="returnMoneyListdata" :last30Daysdata="last30Daysdata"
            :saleMoneyListdata="saleMoneyListdata" :orderNumListdata="orderNumListdata"></lineChart>
        </el-col>

      </el-row>
      <el-row :gutter="20" style="justify-content: space-around;margin: 20px 0;">
        <el-col :lg="15" :md="13" :sm="24" :xs="24" :span="8">
          <barChart :theme="theme" v-if="xdata.length && ydata.length" :xdata="xdata" :ydata="ydata"></barChart>

        </el-col>
        <el-col :lg="9" :md="11" :sm="24" :xs="24" :span="16">
          <gaugeChar></gaugeChar>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<style lang="scss"></style>
