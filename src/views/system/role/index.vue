<template>
  <div>
    <Header :center="center" :add="add" @getinput="getinput"></Header>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="roleCode" label="角色编号" />
      <el-table-column prop="status" label="用户状态" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column fixed="right" label="操作">
        <template v-slot="{ row }" style="display: flex;align-items: center;">
          <el-button link type="primary"><svg-icon name="ele-Check"></svg-icon> 分配权限</el-button>
          <el-button type="warning" link><svg-icon name="ele-Edit"></svg-icon>修改</el-button>
          <el-button type="danger" link><svg-icon name="ele-Delete"></svg-icon>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="current" v-model:page-size="size" :page-sizes="[10, 20, 30, 50]" :small="small"
      :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="400"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script lang="ts" name="SystemRole" setup>
import Header from '@/components/header/index.vue'
import { reactive, ref } from 'vue';
import { getroleApi } from '@/api/system/index'

const background = ref(true)
const disabled = ref(false)
const small = ref(false)
const center = ref('角色名称')
const add = ref('新增角色')
const name = ref('')
const current = ref(1)
const size = ref(20)
const getinput = (val: any) => {
  console.log('val', val);
  name.value = val
}

const tableData = ref<any[]>([])
const add1 = async () => {
  try {
    const res = await getroleApi({ name: name.value, current: current.value, size: size.value })
    console.log("res", res);

    tableData.value = res.data.records
    console.log('tableData.value', tableData.value);

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
