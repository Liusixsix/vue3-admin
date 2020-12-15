import { Router, RouteRecord } from "vue-router";
import NProgress from "nprogress";
import 'nprogress/nprogress.css' 
import store from "@/store";
import { toRaw } from "vue";

const loginRoutePath = "/login";
const whiteList = ['/login']

NProgress.configure({showSpinner:false})


export function createRouterGuards(router: Router) {
  router.beforeEach(async(to, from, next) => {
    NProgress.start();
    const token = localStorage.getItem("token");
    if (token) {
      if (to.path === loginRoutePath) {
        next({ path: "/" });
        NProgress.done();
      } else {
        const hasRoles = store.getters.roles && store.getters.roles.length > 0;
        if (hasRoles) {
          next();
        } else {       
          try {
             const roles = await store.dispatch('user/getInfo')
              const accessRoutes = await store.dispatch('permission/generateRoutes',roles)
              accessRoutes.forEach((route:RouteRecord) => {
                  router.addRoute(route)
              });
            next({ ...to, replace: true })
          }catch (error){
            await store.dispatch('user/resetToken')
            next(`/login?redirect=${to.path}`)
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
