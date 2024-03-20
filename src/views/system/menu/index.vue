<template>
  <div>
    <Header :center="center" :add="add" @getinput="getinput" :drawer="drawer" @xz="xz"></Header>

    <el-table :data="tableData" style="width: 100%; margin-bottom: 10px;margin-top: 20px;" row-key="id" border>
      <el-table-column prop="meta.title" label="菜单名称">
        <template v-slot="{ row }">
          <div style="display: flex;align-items: center;justify-content: space-around;">
            <svg-icon :name="row.meta.icon"></svg-icon><span>{{ row.meta.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路由地址" />
      <el-table-column prop="component" label="组件路径" />
      <el-table-column prop="code" label="权限标识" />
      <el-table-column prop="type" label="类型">
        <template v-slot="{ row }">
          <el-button v-if="row.type == '1'" style="border:1px solid #c4e0ff;color: #7fbeff;">菜单</el-button>
          <el-button v-else style="border:1px solid #c4e7b4;color: #acc83a;">按钮</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" />
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <!-- edit -->
          <el-button link v-if="row.type == '1'" type="primary" @click="getadd(row.id)"><svg-icon
              name="ele-Plus"></svg-icon> 新增下级</el-button>
          <el-button type="warning" link><svg-icon name="ele-Edit"></svg-icon>修改</el-button>
          <el-button type="danger" link><svg-icon name="ele-Delete"></svg-icon>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Menuadd @qx="qx" :drawer="drawer" :id11="id11"></Menuadd>
  </div>
</template>

<script lang="ts" name="System" setup>
import Header from '@/components/header/index.vue'
import { reactive, ref } from 'vue';
import { getmenuApi } from '@/api/system/index'
import Menuadd from '@/components/stytem/menuadd.vue'
import { ElMessage } from 'element-plus';

const tableData = ref<any[]>([])

const drawer = ref<boolean>(false)

const qx = (val: boolean) => {
  console.log('wsq', val);
  drawer.value = val
  add1()
}
const id11 = ref<string>('')

const getadd = (id: string) => {
  drawer.value = true
  id11.value = id
}
const xz = (val: boolean) => {
  drawer.value = val
}
const center = ref('菜单名称')
const add = ref('新增菜单')
const keyword = ref('')
const getinput = (val: any) => {
  console.log('val', val);
  keyword.value = val
  add1()
}
const add1 = async () => {
  try {
    const res = await getmenuApi({ keyword: keyword.value })
    console.log("res", res);
    tableData.value = res.data

    console.log('tableData.value', tableData.value);

  } catch (error) {
    console.log(error);

  }
}
add1()

</script>

<style lang="scss" scoped></style>
