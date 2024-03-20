<template>
  <div>
    <Header :center="center" :add="add" @getinput="getinput"></Header>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="nickName" label="用户昵称" />
      <el-table-column prop="username" label="用户账号" />
      <el-table-column prop="mobile" label="手机号" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="accountNonLocked" label="账号锁定">
        <template v-slot="{ row }">
          <el-button size="small" type="danger" v-if="row.accountNonLocked == false">过期</el-button>
          <el-button size="small" v-else type="success">正常</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="accountNonExpired" label="账号过期">
        <template v-slot="{ row }">
          <el-button size="small" type="danger" v-if="row.accountNonExpired == false">过期</el-button>
          <el-button size="small" v-else type="success">正常</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="credentialsNonExpired" label="密码过期">
        <template v-slot="{ row }">
          <el-button size="small" type="danger" v-if="row.credentialsNonExpired == false">过期</el-button>
          <el-button size="small" v-else type="success">正常</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="创建时间" />
      <el-table-column fixed="right" label="操作">
        <el-button link type="primary"><svg-icon name="ele-Check"></svg-icon>密码重置</el-button>
        <el-button type="warning" link><svg-icon name="ele-Edit"></svg-icon>修改</el-button>
        <el-button type="danger" link><svg-icon name="ele-Delete"></svg-icon>删除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="current" v-model:page-size="size" :page-sizes="[10, 20, 30, 50]" :small="small"
      :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="400"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script lang="ts" name="SystemUser" setup>
import Header from '@/components/header/index.vue'
import { reactive, ref } from 'vue';
import { getuesrApi } from '../../../api/system/index.ts'

const center = ref('用户名称')
const add = ref('新增用户')
const current = ref(1)
const size = ref(20)
const keyword = ref('')
const tableData = ref<any[]>([])

const getinput = (val: any) => {
  console.log('val', val);
  keyword.value = val
  add1()
}
const add1 = async () => {
  try {
    const res = await getuesrApi({ current: current.value, size: size.value, keyword: keyword.value })
    tableData.value = res.data.records
    console.log('res', res.data);

  } catch (error) {
    console.log(error);

  }
}
add1()

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  current.value = val
  add1()

}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  size.value = val
  add1()
}


</script>

<style lang="scss" scoped></style>
