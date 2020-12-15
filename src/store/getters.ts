const getters = {
    token : (state:any) => state.user.token,
    roles: (state:any) => state.user.roles,
    menus:(state:any) => state.permission.routes,
    tabsList:(state:any)=>state.tabs.tabsList
}

export default getters