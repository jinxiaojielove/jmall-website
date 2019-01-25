import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'admin',
            component: () => import('@/admin/admin.vue'),
            redirect: '/admin',
            meta: {
                title: '栏目页',
                requireAuth: true
            },
            children: [
                {
                    path: '/admin',
                    meta: {title: '首页'},
                    components: {
                        admin: () => import('@/admin/default/default.vue')
                    }
                },{
                    path: '/createProduct',
                    name: 'createProduct',
                    meta: {title: '创建商品'},
                    components: {
                        admin: () => import('@/admin/layout/product/createProduct.vue')
                    }
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/login/login.vue')
        }

    ]
})
