import { Module } from "vuex"


const state = {
    token:localStorage.getItem('token'),
    name:'',
    roles:[]
}

type UserStateType = typeof state

const user:Module<UserStateType,any> = {
    namespaced:true,
    state,
    mutations:{
        SET_TOKEN(state,token){
            state.token = token
        },
        SET_NAME(state,name){
            state.name = name
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
    },
    actions:{
        login({commit},userInfo){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    commit('SET_TOKEN','token')
                    resolve(null)
                },200)
            })
        },
        getInfo({commit,state}){
            return new Promise((resolve,reject)=>{
                const roles:any = ['admin']
                setTimeout(()=>{
                    commit('SET_ROLES',roles)
                    if(!roles || roles.length <= 0){
                        reject('getInfo: roles must be a non-null array!')
                    }
                    resolve(roles)
                },300)
            })
        },
          // remove token
        resetToken({ commit }) {
            return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            localStorage.setItem('token','')
            resolve(null)
        })
  },
    }
}

export default user