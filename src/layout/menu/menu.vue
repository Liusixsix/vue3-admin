<template>
  <a-menu
    v-model:open-keys="openKeys"
    v-model:selectedKeys="selectedKeys"
    :inline-collapsed="collapsed"
    mode="inline"
    theme="dark"
     @click="clickMenuItem"
  >
    <template v-for="item in menus" :key="item.name">
      <menu-item :menu-info="item"/>
    </template>
  </a-menu>
</template>

<script lang='ts'>

import { defineComponent, toRaw ,reactive, toRefs, computed, watch} from "vue";
import { RouteRecord, useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import MenuItem from './menu-item.vue'
export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  components: {MenuItem},
  setup(props) {
    const currentRoute = useRoute();
    const router = useRouter();
    const store = useStore();

    const getOpenkeys = () =>[currentRoute.matched[1].name];

    const state = reactive({
      openKeys: getOpenkeys(),
      selectedKeys: [currentRoute.name],
    });
    const menus = computed(()=>store.getters.menus)
       // 跟随页面路由变化，切换菜单选中状态
    watch(() => currentRoute.fullPath, () => {
      if (currentRoute.name == 'login' || props.collapsed) return
      state.selectedKeys = [currentRoute.name]
    })


  const clickMenuItem = ({item, key, keyPath}:any)=>{
     router.push({name: key})
  }


    return {
        ...toRefs(state),
        menus,
        clickMenuItem
    }
  },
});
</script>

<style>
</style>
