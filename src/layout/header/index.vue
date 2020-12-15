<template>
  <a-layout-header class="layout-header">
    <div class="left-options">
      <span
        class="menu-fold"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <component
          :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'"
        />
      </span>
      <a-breadcrumb>
        <template v-for="routeItem in route.matched" :key="routeItem.name">
          <a-breadcrumb-item>{{ routeItem.meta.title }}</a-breadcrumb-item>
        </template>
      </a-breadcrumb>
    </div>

    <div class="right-options">
      <component :is="fullscreenIcon" @click="toggleFullScreen" />
      <Dropdown>
        <a-avatar>admin</a-avatar>
        <template v-slot:overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a @click.prevent="doLogout"><poweroff-outlined /> 退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </Dropdown>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import Vue, { defineComponent, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import components from "./components";
export default defineComponent({
  components: { ...components },
  name: "PageHeader",
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup() {
    const store = useStore();
    const state = reactive({
      fullscreenIcon: "FullscreenOutlined",
    });

    const router = useRouter();
    const route = useRoute();
    // console.log(route.matched)
    // console.log(router.getRoutes())

    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    const doLogout = ()=>{
        
    }

    return {
      ...toRefs(state),
      route,
      toggleFullScreen,
    };
  },
});
</script>


<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
  padding: 0;

  .left-options {
    display: flex;
    align-items: center;

    .menu-fold {
      padding: 0 24px;
      cursor: pointer;
    }
  }

  .right-options {
    display: flex;
    align-items: center;

    > * {
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>