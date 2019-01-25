<template>
    <div class="sidebarItem">
        <el-menu background-color="#000" text-color="#fff" :router="rout" :default-active="activeIndex"
                 @select="handleSelect" class="border-r-0">
            <el-menu-item index="admin">
                <i class="iconfont icon-shouye icon-font"></i>首页
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">商品管理</template>
                <el-menu-item index="createProduct">创建商品</el-menu-item>
            </el-submenu>
        </el-menu>

    </div>
</template>

<script>
    export default {
        name: 'sidebarItem',
        data() {
            return {
                activeIndex: 'admin',
                rout: true,
                columnData: []
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key;
            },
        },
        mounted() {
            //   解决刷新页面高亮消失
            let fullPath = this.$route.fullPath;
            this.activeIndex = fullPath.substring(1, fullPath.length);
        },
    }
</script>

<style lang="stylus" type="text/stylus">
    .sidebarItem
        height 2.4rem
        line-height 2.4rem
        background #000000
        li
            .icon-font
                display inline-flex
                width 1.2rem
                justify-content center
                margin-right 0.3rem
                font-size 1rem

</style>
