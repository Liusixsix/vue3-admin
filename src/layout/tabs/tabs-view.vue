<template>
  <div class="tabs-views">
    <a-tabs
      v-model:activeKey="activeKey"
      class="tabs"
      hideAdd
      type="editable-card"
      @change="changePage"
      @edit="editTabItem"
    >
      <template v-for="pageItem in tabsList" :key="pageItem.fullPath">
        <a-tab-pane :tab="pageItem.meta.title"> </a-tab-pane>
      </template>
      <template v-slot:tabBarExtraContent>
        <a-dropdown :trigger="['click']">
          <a @click.prevent class="ant-dropdown-link">
            <down-outlined :style="{ fontSize: '20px' }" />
          </a>
          <template #overlay>
            <a-menu style="user-select: none">
              <!-- <a-menu-item
                @click="reloadPage"
                :disabled="activeKey !== route.fullPath"
                key="1"
              >
                <reload-outlined />
                刷新
              </a-menu-item> -->
              <a-menu-item @click="removeTab(route)" key="2">
                <close-outlined />
                关闭
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item @click="closeOther(route)" key="5">
                <column-width-outlined />
                关闭其他
              </a-menu-item>
              <a-menu-item @click="closeAll" key="6">
                <minus-outlined />
                关闭全部
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRaw, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { RouteItem } from "@/store/modules/tabs";
import components from "./components";
import { message } from "ant-design-vue";
const ROUTES = 'routes'
export default defineComponent({
  name: "tabs-view",
  components: { ...components },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    // 获取简易的路由对象
    const getSimpleRoute = (route) => {
      const { fullPath, hash, meta, name, params, path, query } = route;
      return { fullPath, hash, meta, name, params, path, query };
    };

    const state = reactive({
      activeKey: route.fullPath,
    });

    const tabsList = computed(() => store.getters.tabsList);

    let routes= []

    try{
        const routesStr = localStorage.getItem(ROUTES)
        routes = routesStr ? JSON.parse(routesStr) : [getSimpleRoute(route)]
    }catch(e){
        routes = [getSimpleRoute(route)]
    }
    
     // 初始化标签页
    store.commit('tabs/initTabs', routes)

    window.addEventListener('beforeunload',e=>{
        localStorage.setItem(ROUTES,JSON.stringify(tabsList.value))
    })

    watch(
      () => route.fullPath,
      (to, from) => {
        state.activeKey = to;
        store.commit("tabs/addTabs", getSimpleRoute(route));
      },
      { immediate: true }
    );

    // tabs 编辑（remove || add）
    const editTabItem = (targetKey,action)=>{
        if(action==='remove'){
            const route = tabsList.value.find(route=>route.fullPath === targetKey)
           removeTab(route)
       }
    }

      // 切换页面
    const changePage = (key)=>{
        state.activeKey = key
        router.push(key)
    }

    // 刷新
    const reloadPage = ()=>{
        router.push('')
    }

    // 关闭
    const removeTab = (route)=>{
        if(tabsList.value.length === 1){
            return message.warning('这已经是最后一页，不能再关闭了！')
        }
        store.commit('tabs/closeCurrentTabs',route)
        if(state.activeKey === route.fullPath){
             const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)]
             state.activeKey = currentRoute.fullPath
             router.push(currentRoute)
        }
    }
    
    // 关闭其他
    const closeOther = (route)=>{
         store.commit('tabs/closeOtherTabs', route)
         state.activeKey = route.fullPath
         router.replace(route.fullPath)
    }

    // 关闭全部
    const closeAll = (route) =>{
        store.commit('tabs/closeAllTabs', route)
        router.replace('/')
      
    }

    return {
      ...toRefs(state),
      route ,
      tabsList,
      editTabItem,
      changePage,
      reloadPage,
      removeTab,
      closeOther,
      closeAll
    };
  },
});
</script>

<style lang='scss' scoped>
.tabs-views {
  border-top: 1px solid #eee;

  ::v-deep(.tabs) {
    .ant-tabs-bar {
      padding: 4px 20px 0 10px;
      margin: 0;
      background-color: white;
      user-select: none;
    }

    .ant-tabs-tabpane {
      display: none;
    }
  }
}
</style>