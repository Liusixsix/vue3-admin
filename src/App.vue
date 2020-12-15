<template>
  <config-provider :locale="zhCN">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </config-provider>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  components: { ConfigProvider },

  setup() {
    return {
      zhCN,
    };
  },
});
</script>

<style lang="scss" >
 @import "~@/styles/common.scss";
</style>