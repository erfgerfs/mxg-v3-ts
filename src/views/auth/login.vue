<template>
    <div class="box">
        <div class="from-item">
            <div style="display: flex;align-items: center;text-align: center;margin-left: 120px;margin-bottom: 30px;">
                <img style="width: 30px;height: 30px;border-radius: 50%;" src="../../assets/logo.jpeg"
                    mode="scaleToFill" />
                <h2>梦学谷</h2>
            </div>
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item>
                    <b style="font-size: 20px;">账号登陆</b>
                </el-form-item>
                <el-form-item style="margin-bottom: 20px;" prop="username">
                    <el-input v-model="ruleForm.username" prefix-icon="ele-User" placeholder="请输入账号/手机号" />
                </el-form-item>
                <el-form-item style="margin-bottom: 100px;" prop="password">
                    <el-input show-password v-model="ruleForm.password" prefix-icon="ele-Unlock" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-checkbox>记住密码</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" style="width: 100%;">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { usertokenlogin } from '@/store/user'
import { useRouter } from 'vue-router';


const store = usertokenlogin()
interface RuleForm {
    username: string
    password: string
}
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: '123456',
    password: '123456',
})

const router = useRouter()
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },

    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },

    ],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid, fields) => {
        if (valid) {
            await store.login(ruleForm)
            const token = store.usertoken
            if (token) {
                ElMessage({
                    message: '登陆成功！！！',
                    type: 'success',
                })
                router.push('/')

            }
        } else {
            console.log('登录失败', fields)
        }
    })
}

</script>

<style lang='scss' scoped>
.box {
    background: url('../../assets/login-bj.png') no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
}

.from-item {
    border-radius: 5px;
    height: 450px;
    width: 375px;
    padding: 30px;
    background-color: #fff;
    margin: auto;
    margin-right: 130px;
    box-shadow: #74747462 0 2px 15px;
}
</style>