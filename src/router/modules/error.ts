import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/error/index.vue"),
    meta: {
      title: "错误页",
      icon: "EditOutlined",
      hidden:true
    },
  },
];

export default routes;
