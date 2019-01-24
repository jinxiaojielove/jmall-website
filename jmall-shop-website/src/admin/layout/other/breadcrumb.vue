<template>
    <div class="breadcrumb">
        <div class="title-b">
            <div class="switch">
                <i class="fa fa-bars fa-size cursor-pointer" @click.stop="switchSidebar"></i>
            </div>
            <div>
                {{title}}
            </div>
        </div>
        <div class="logout-b">
            <el-dropdown>
                <span class="icon-lb"><i class="iconfont icon-gerenzhongxin"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>个人设置</el-dropdown-item>
                    <el-dropdown-item divided @click="logOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {removeToken} from '../../../util/auth';

    export default {
        name: 'breadcrumb',
        data() {
            return {
                title: '',
            }
        },
        methods: {
            switchSidebar() {

            },
            getRouteTitle() {
                this.title = this.$route.meta.title;
            },
            logOut() {
                removeToken('my-cookies');
                this.$store.commit('REMOVE_TOKEN');
                this.$router.push({
                    path: '/login'
                });
            }
        },
        mounted() {
            this.title = this.$route.meta.title;
        },
        watch: {
            '$route': 'getRouteTitle'
        }
    }
</script>

<style lang="stylus" type="text/stylus">
    .breadcrumb
        display flex
        height 3.2rem
        align-items center
        justify-content space-between
        background #ffffff
        .logout-b
            margin-right 0.8rem
            .icon-lb
                cursor pointer
                .iconfont
                    font-size 1.2rem
        .title-b
            display inline-flex
            align-items center
        .switch
            width 3.2rem
            text-align center
            .fa-size
                font-size 1.6rem
</style>
