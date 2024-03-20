<script lang="ts" setup>
import { getStatisticsApi } from '@/api/home'
import { ref } from 'vue'
import type { StatisticsResType } from '@/api/home/types'


// 营业额的数据
export type BlockListType = {
  name: string
  unit: string
  content: string
  startColor: string
  endColor: string
  column: string
}
const StaticData = ref<StatisticsResType>({
  totalOrderNum: 0,
  totalSaleMoney: 0,
  totalReturnedMoney: 0,
  totalIncomeMoney: 0
})

// 营业额的列表样式数据
const blockList = ref<BlockListType[]>([
  {
    name: '订单笔数',
    unit: '笔',
    content: '订单笔数=(商品消费+快速消费+计次消费)的订单数',
    startColor: '#00ba26',
    endColor: '#00ba26a1',
    column: 'totalOrderNum'
  },
  {
    name: '销售总额',
    unit: '元',
    content: '销售总额=商品消费+快速消费+计次消费的合计金额',
    startColor: '#f52c12',
    endColor: '#f52c12c7',
    column: 'totalSaleMoney'
  },
  {
    name: '退款总额',
    unit: '元',
    content: '退款总额=退货或撤单的退款总金额',
    startColor: '#fb9a08',
    endColor: '#fb9a08db',
    column: 'totalReturnedMoney'
  },
  {
    name: '综合收入',
    unit: '元',
    content: '综合收入是指店铺实际进帐金额',
    startColor: '#2062e6',
    endColor: '#2062e696',
    column: 'totalIncomeMoney'
  }
])

// 加载营业额的数据
const loadStaticData = async () => {
  try {
    const res = await getStatisticsApi()
    StaticData.value = res.data
  } catch (e) {
    console.log(e)
  }
}
loadStaticData()
</script>

<template>
  <div class="home-static">
    <div class="home-static-title">营业数据统计</div>
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :sm="24" :span="6" :xs="24" v-for="(item, index) in blockList" :key="index">
        <el-card :style="{ 'background-image': `linear-gradient(to left,${item.startColor} , ${item.endColor})` }"
          shadow="hover">
          <!-- <h6>{{ blockList[item.column] }}</h6> -->
          <div style="display: flex;margin-bottom: 10px;">
            <span style="font-size: 16px;">{{ item.name }}</span>

            <el-popover trigger="hover" :content="item.content">
              <template #reference>

                <svg-icon color="#fff" name="ele-QuestionFilled"></svg-icon>

              </template>
            </el-popover>


          </div>
          <div style="display: flex;">

            <p style="font-size: 12px;">
              <span style="font-size: 24px;">{{ StaticData[item?.column] }}</span>
              {{ item.unit }}
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
 
</template>

<style lang="scss" scoped>
.home-static {
  .home-static-title {
    font-size: 18px;
    line-height: 25px;
    height: 25px;
    padding-left: 10px;
    margin: 15px 0;
    border-left: 2px solid var(--el-color-primary);
  }
}
</style>
