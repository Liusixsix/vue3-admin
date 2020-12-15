<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed='collapsed' :trigger="null" collapsible class="layout-sider">
        <logo :collapsed="collapsed" />
       <Menu />
    </a-layout-sider>
    <a-layout> 
      <page-header v-model:collapsed='collapsed'></page-header>
        <a-layout-content class="layout-content">
          <tabs-view></tabs-view>
          <div class="tabs-view-content">
              <a-card>
                <router-transition></router-transition>
              </a-card>
          </div>
        </a-layout-content>    
     </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Layout,Card } from "ant-design-vue";
import Vue, { defineComponent, ref } from "vue";
import {RouterTransition} from '@/components/transition'
import logo from './logo/index.vue'
import Menu from './menu/menu.vue'
import PageHeader from './header/index.vue'
import {TabsView} from './tabs/index'

export default defineComponent({
  name: "lyout",
  components: {
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Sider.name]: Layout.Sider,
    [Card.name]:Card,
    logo,
    Menu,
    RouterTransition,
    PageHeader,
    TabsView,
  },
  setup() {
      const collapsed = ref(false)


 
    return {
      collapsed
    }
  },
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  overflow: hidden;
  height: 100vh;

  .ant-layout {
    overflow: hidden;
  }

   .layout-content {
    flex: none;
  }

  .tabs-view-content {
    padding: 20px 14px 0;
    height: calc(100vh - 110px);
    overflow: auto;
  }
}
</style>