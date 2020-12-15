<template>
  <router-view v-slot="{ Component }" :key="notNeedKey ? 'key' : route.fullPath" >
    <transition v-if="animate" name="zoom-fade" mode="out-in" appear>
      <component :is="Component" />
    </transition>
    <component v-else :is="Component" />
  </router-view>
</template>

<script ang="ts">
import { defineComponent } from "vue";
import {useRoute} from 'vue-router'
export default defineComponent({
  name: "transition",
  props: {
    notNeedKey: {
      type: Boolean,
      default: true,
    },
    animate: {
      type: Boolean,
      default: true,
    },
  },
  setup() {

    const route = useRoute()
    return {
      route
    }
  }
});
</script>

<style>
</style>