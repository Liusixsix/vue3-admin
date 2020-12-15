<template>
  <template v-if="!menuInfo.meta?.hidden">
    <a-sub-menu v-if="menuInfo.children?.length">
      <template v-slot:title>
        <span>
          <icon-font style="color: aliceblue" :type="menuInfo.meta?.icon" />
          <span>{{ menuInfo.meta?.title }}</span>
        </span>
      </template>

    <template v-for="item in menuInfo.children" :key="item.name">
        <template v-if="!item.children">
            <a-menu-item :key="item.name">
                 <icon-font style="color: aliceblue" :type="menuInfo.meta?.icon" />
                 <span>{{ item.meta?.title }}</span>
            </a-menu-item>
        </template>
        <template v-else>
            <menu-item :menu-info='item' :key="item.name"></menu-item>
        </template>
    </template>

    </a-sub-menu>
    <a-menu-item v-else>
        <icon-font style="color: aliceblue" :type="menuInfo.meta?.icon" />
      {{menuInfo.meta?.title}}
    </a-menu-item>
  </template>
</template>

<script lang='ts'>
import { defineComponent, toRaw } from "vue";
import { Menu } from "ant-design-vue";
import IconFont from "@/components/iconfont";

export default defineComponent({
  name: "menu-item",
  components: {
    IconFont,
    "a-sub-menu": Menu.SubMenu,
    "a-menu-item": Menu.Item,
  },

  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props){

  }
});
</script>

<style>
</style>