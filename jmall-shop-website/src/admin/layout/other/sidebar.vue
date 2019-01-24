<template>
    <div class="sidebar">
        <div class="logo">
            <span>W</span>&emsp;Logo
        </div>
        <div class="column-sidebar">
            <SidebarItem></SidebarItem>
        </div>
    </div>
</template>

<script>
    import SidebarItem from './sidebarItem';

    export default {
        name: 'sidebar',
        components: {
            SidebarItem
        }
    }
</script>

<style lang="stylus" type="text/stylus">
    .sidebar
        position fixed
        left 0
        width 15rem
        height 100%
        background #000000
        color #ffffff
        overflow-y auto
        .logo
            position fixed
            top 0
            width 15rem
            height 3.2rem
            line-height 3.2rem
            background #000
            z-index 9
            span
                display inline-block
                width 3.2rem
                text-align center
            img
                vertical-align middle
        .column-sidebar
            padding-top 3.2rem

</style>
