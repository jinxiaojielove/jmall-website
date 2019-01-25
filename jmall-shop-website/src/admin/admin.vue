<template>
    <div class="admin">
        <Sidebar></Sidebar>
        <div class="admin-container">
            <div class="admin-breadcrumb">
                <Breadcrumb></Breadcrumb>
            </div>
            <div class="router-switch">
                <keep-alive>
                    <router-view name="admin"></router-view>
                </keep-alive>
            </div>
            <!--<End></End>-->
        </div>
    </div>
</template>

<script>
    import Sidebar from './layout/other/sidebar';
    import Breadcrumb from './layout/other/breadcrumb';
    import End from './layout/other/end';

    export default {
        name: 'admin',
        data() {
            return {
                routerSwitchHeight: 0
            }
        },
        components: {
            Sidebar,
            Breadcrumb,
            End
        },
        mounted() {
            window.onresize = function () {
                let a = document.body.clientWidth || document.documentElement.clientWidth;
                console.log(a, 'client');
            }
        }
    }
</script>

<style lang="stylus" type="text/stylus">
    .admin
        width 100%
        min-height 100%
        background #f0f2f5
        .admin-container
            position relative
            margin-left 15rem
            .admin-breadcrumb
                position fixed
                left 15rem
                top 0
                width calc(100% - 15rem)
                z-index 99
            .router-switch
                position relative
                margin 4rem 0.8rem 0.8rem
                padding 1rem
                background #fff
</style>
