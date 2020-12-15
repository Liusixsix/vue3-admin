/**
* 不要授权可以访问的页面
*/

import { RouteRecordRaw } from "vue-router";


const routes:Array<RouteRecordRaw> = [
    {
        path:'/login',
        name:'login',
        component:()=>import( /* webpackChunkName: "login" */ '@/views/login/index.vue' ),
        meta:{
            hidden:true
        }
    }
]

export default routes