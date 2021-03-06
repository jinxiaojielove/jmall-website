// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './font/iconfont.css';
import echarts from 'echarts';
import 'echarts-wordcloud/dist/echarts-wordcloud.min';
import util from './util/util';
import 'echarts/theme/macarons';

//  接口
import * as alls from './api/index';

//  枚举类
import * as enums from './util/enumClass';

// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'

// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)


//  todo 之后考虑下是否引入白名单的概念

router.beforeEach((to, from, next) => {
    next();
});

Vue.use(ElementUI);

Vue.prototype.$echarts = echarts;
Vue.prototype.$util = util;
Vue.prototype.$alls = alls;
Vue.prototype.$enums = enums;

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
