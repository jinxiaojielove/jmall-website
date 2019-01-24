<template>
    <div class="login">
        <div class="login-form">
            <h2>登录</h2>
            <el-form :model="form" :rules="rules" ref="form" labelPosition="top" label-width="50px" size="small">
                <el-form-item label="姓名" prop="userName">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <div class="button-center">
                    <el-button type="primary" @click="submitForm('form')" style="width:100%;" size="small">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {Message} from 'element-ui';
    import {setToken} from '../util/auth';
    import {loginFormByName} from '../api/login';

    export default {
        name: 'login',
        data() {
            return {
                form: {
                    userName: '',
                    password: '',
                },
                rules: {
                    userName: [{required: false, message: '用户名'}],
                    password: [{required: false, message: '密码必填'}],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        loginFormByName(this.form).then(res => {
                            console.log(res);
                            if (res.code === 200) {
                                let token = res.token;
                                setToken('my-cookies', token);
                                this.$store.commit('SET_TOKEN', token);
                                Message({
                                    type: 'success',
                                    duration: 1000,
                                    message: '登录成功'
                                });
                                this.$router.push({
                                    path: '/admin'
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted() {
        }
    }
</script>

<style lang="stylus" type="text/stylus">
    .login
        display flex
        width 100%
        align-items center
        justify-content flex-end
        background url(../assets/images/login.jpg) center no-repeat
        background-size cover
        .login-form
            width 13rem
            height 17rem
            padding 1rem
            margin-right 10rem
            background rgba(255, 255, 255, .78)
            border-radius .6rem
            h2
                padding-bottom 1rem
                margin-bottom .5rem
                line-height 1
                font-size 1rem
                text-align center
                border-bottom 1px solid rgba(2, 7, 3, 0.55)
        .button-center
            display flex
            margin-top 1rem
            align-items center
            justify-content center
        .el-form--label-top .el-form-item__label
            padding 0 0 0 !important
        .el-form-item
            margin-bottom 0
</style>
