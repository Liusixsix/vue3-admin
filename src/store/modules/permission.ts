import { routes as constantRoutes, asyncRoutes } from '@/router'
import { Module } from "vuex"

function hasPermission(roles:any[], route:any) {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.includes(role))
    } else {
      return true
    }
  }
  

export function filterAsyncRoutes(routes:any[],roles:any[]):any[]{
    const res:any = []

    routes.forEach(route=>{
        const temp = {...route}
        if(hasPermission(roles,temp)){
            temp.children = filterAsyncRoutes(temp.children,routes)
        }
        res.push(temp)
    })

    return res
}


const state = {
    routes:[],//添加后的routes
    addRoutes:[] //新添加的routes
}

type RouterStateType = typeof state

const permission:Module<RouterStateType,any> = {
    namespaced:true,
    state,
    mutations:{
        SET_ROUTES(state,routes){
            state.addRoutes = routes
            state.routes = (constantRoutes.concat(routes) as any)
        } 
    },
    actions:{
        generateRoutes({commit},roles:any[]){
            return new Promise((resolve,reject)=>{
                let accessedRoutes 
                if(roles.includes('admin')){
                    accessedRoutes = asyncRoutes || []
                }else{
                    accessedRoutes = filterAsyncRoutes(asyncRoutes,roles)
                }
                commit('SET_ROUTES',accessedRoutes)
                resolve(accessedRoutes)
            })
        },
    }
}


export default permission