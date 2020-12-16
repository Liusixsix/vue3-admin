import { toRaw } from 'vue'
import {Module} from 'vuex'

export interface RouteItem{
    fullPath:string
    hash?: any;
    meta?: any;
    name?: string;
    params?: any;
    path?: string;
    query?: any;
}

// 不需要出现在标签页中的路由
const whiteList = ['Redirect', 'login']

const state = {
    tabsList:[] as RouteItem[]
}

type StateType = typeof state

const menus:Module<StateType,any> = {
    namespaced: true,
    state,
    mutations:{
        initTabs(state,routes){
            state.tabsList = routes
        },
        addTabs(state,route):boolean{      
            if(whiteList.includes(route.name)) return false
            const isExists  = state.tabsList.some(item=>item.fullPath == route.fullPath)
            if(!isExists) state.tabsList.push(route)
            return true
        },
        closeCurrentTabs(state, route){//关闭当前页
            const index = state.tabsList.findIndex(item=>item.fullPath === route.fullPath)
            state.tabsList.splice(index,1)
        },
        closeOtherTabs(state, route){//关闭其他
            state.tabsList = state.tabsList.filter(item=>item.fullPath === route.fullPath)
        },
        closeAllTabs(state) {// 关闭全部
            state.tabsList = []
        }
    }
}

export default menus