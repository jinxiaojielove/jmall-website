<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="stylus" type="text/stylus">
    @import "./css/reset.css";
    @import "./assets/css/font-awesome.min.css";
    @import "./css/common.styl";
</style>
