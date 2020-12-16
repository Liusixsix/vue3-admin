import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import common from '@/router/common'
import shared from '@/router/modules/shared'
import error from '@/router/modules/error'

import { App } from 'vue'
import { createRouterGuards } from './router-guards'

import Layout from '@/layout/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect:'/dashboard',
    component:()=> Layout,
    meta:{
      title:'系统看板' , icon: 'icon-yibiaopan'
    },
    children: [
      {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
              title: '首页',
              icon: 'icon-shouye',
          },
          component: () => import(/* webpackChunkName: "dashboard-welcome" */ '@/views/dashboard/index.vue')
      },
    ]
   ,
  },
  ...shared,
  // ...error
]

export const asyncRoutes:Array<RouteRecordRaw> = [
    {
      path:'/demos',
      name:'demos',
      component: Layout,           
      meta: {
          title: 'demo演示',
          icon: 'icon-zhuomian',
      },
      children:[
          {
              path:'custom-a-custom-modal',
              name:'custom-a-custom-modal',
              component:()=>import(/* webpackChunkName: "modal" */ '@/demo/modal.vue'), 
              meta: {
                  title: '自定义模态框',
                  icon: 'icon-zhuomian',
              },
          },
          {
            path:'button',
            name:'button',
            component:()=>import(/* webpackChunkName: "modal" */ '@/demo/button.vue'), 
            meta: {
                title: '按钮的扩展',
                icon: 'icon-zhuomian',
            },
        },
        {
          path:'/suspense',
          name:'suspense',
          component:()=>import(/* webpackChunkName: "modal" */ '@/demo/suspense/index.vue'), 
          meta: {
              title: '异步加载组件',
              icon: 'icon-zhuomian',
          },
      }
      ]
  },
  
  
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})


export function setupRouter(app:App){
  app.use(router)
  createRouterGuards(router)
}

export default router
