<template>
    <div>
        <el-drawer v-model="props.drawer" :before-close="qx" :with-header="false">

            <el-form :model="form" label-width="auto" style="max-width: 800px">
                <el-form-item>
                    新增菜单
                </el-form-item>
                <el-form-item label="上级菜单">
                    <el-cascader :options="options" :props="props1" clearable />
                </el-form-item>
                <el-form-item label="菜单类型">
                    <div style="margin-top: 20px">
                        <el-radio-group v-model="form.type" size="small">
                            <el-radio value="1" border>菜单</el-radio>
                            <el-radio value="2" border>按钮</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
                <el-form-item label="菜单名称">
                    <el-input v-model="form.meta.title" maxlength="10" placeholder="请输入菜单名称" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item v-if="form.type == '2'" label="权限标识">
                    <el-input v-model="form.code" maxlength="50" placeholder="请输入权限标识" show-word-limit type="text" />
                </el-form-item>
                <el-form-item v-if="form.type == '1'" label="路由地址">
                    <el-input v-model="form.path" maxlength="200" placeholder="路由地址path值" show-word-limit type="text" />
                </el-form-item>
                <el-form-item v-if="form.type == '1'" label="路由名称">
                    <el-input v-model="form.name" maxlength="50" placeholder="路由名称" show-word-limit type="text" />
                </el-form-item>
                <el-form-item v-if="form.type == '1'" label="组件路径">
                    <el-input v-model="form.component" maxlength="390" placeholder="路由组件相对路径" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item v-if="form.type == '1'" label="菜单图标">
                    <el-input v-model="form.meta.icon" maxlength="100" placeholder="路由组件相对路径" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item v-if="form.type == '1'" label="重定向">
                    <el-input v-model="form.redirect" maxlength="200" placeholder="路由组件相对路径" show-word-limit
                        type="text" />
                </el-form-item>
                <el-form-item v-if="form.type == '1'" label="是否隐藏">
                    <!-- v-model="form.hidden" -->
                    <el-radio-group v-model="form.meta.hidden" size="small">
                        <el-radio :value=false>不隐藏</el-radio>
                        <el-radio :value=true>隐藏</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.type == '1'" label="是否缓存">
                    <!-- v-model="form.hidden" -->
                    <el-radio-group v-model="form.meta.cache" size="small">
                        <el-radio :value=false>不缓存</el-radio>
                        <el-radio :value=true>缓存</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="form.sort" :min="1" :max="10" @change="handleChange" />
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark" maxlength="30" style="width: 240px" placeholder="请输入备注"
                        show-word-limit type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="aaa">确定</el-button>
                    <el-button @click="qx">取消</el-button>
                </el-form-item>
            </el-form>


        </el-drawer>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { addmenuApi } from '@/api/system/index'
import { ElMessage } from 'element-plus';
const form = reactive({
    name: '',
    type: '1',

    remark: '',
    path: '',
    component: '',

    redirect: '',

    sort: 0,
    code: '',
    meta: {
        hidden: false,
        cache: false,
        icon: '',
        title: '',
    }
})
const handleChange = (value: number) => {
    console.log(value)
}
const props1 = {
    checkStrictly: true,
}
const props = defineProps({
    drawer: Boolean,
    id11: String
})

console.log("props.drawer", props.drawer);
console.log('id111', props.id11);

const emits = defineEmits(['qx'])
const qx = () => {
    emits('qx', props.drawer = false)
}
const options = [
    {
        value: 'guide',
        label: '首页',

    },
    {
        value: 'component',
        label: '系统管理',
        children: [
            {
                value: 'basic',
                label: '菜单管理',

            },
            {
                value: 'form',
                label: '角色管理',

            },
            {
                value: 'data',
                label: '用户管理',

            },

        ],
    },
    {
        value: 'component',
        label: '商品管理',
        children: [
            {
                value: 'basic',
                label: '商品列表',

            },
            {
                value: 'form',
                label: '商品分类',

            },
            {
                value: 'data',
                label: '用户管理',

            },

        ],
    },
    {
        value: 'guide2',
        label: '梦学谷',

    },
    {
        value: 'guide1',
        label: '401页面',

    },

]
const aaa = async () => {
    console.log('form', form);
    try {
        const res = await addmenuApi(form)
        console.log('wsq111', res);
        ElMessage({
            message: '添加成功',
            type: 'success',
        })
        emits('qx', props.drawer = false)
    } catch (error) {
        console.log(error);

    }
}
</script>

<style lang='scss' scoped></style>