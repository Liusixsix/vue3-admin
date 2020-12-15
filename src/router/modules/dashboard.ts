import { h, markRaw } from "vue";
import { RouteRecord, RouteRecordRaw } from "vue-router";
import { RouterTransition } from "@/components/transition";
import Layout from "@/layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Layout,
    meta: {
      title: "系统看板",
      icon: "icon-shouye",
    },
    children: [
      {
        path: "welcome",
        name: `/dashboard-welcome`,
        meta: {
          title: "首页",
          icon: "icon-shouye",
        },
        component: () =>
          import(
            /* webpackChunkName: "dashboard-welcome" */ "@/layout/index.vue"
          ),
      },
      {
        path: "/ceshi",
        name: "ceshi",
        component: () =>
          import(/* webpackChunkName: "modal" */ "@/views/Home.vue"),
        meta: {
          title: "ceshi",
          icon: "icon-zhuomian",
        },
      },
    ],
  },
];

export default routes;
