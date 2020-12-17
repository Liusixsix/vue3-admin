<template>
  <div>
      <a-alert
        message="可扩展antd按钮样式功能"
        description="继承自原ant-design-vue的a-button，轻易扩展按钮的type定制不同颜色，详细看@/components/button/button.vue"
        type="info"
        show-icon
        style="margin-bottom: 12px"
    />
     <a-card>
      <div class="btn-rows">
          <a-space>
        <a-button type="primary" v-permission="{ action: 'create', effect: 'disabled' }">primary</a-button>
        <a-button type="warning">warning</a-button>
        <a-button type="success">success</a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import {Alert,Card,Space} from 'ant-design-vue'
import Vue, { defineComponent } from 'vue'
export default defineComponent({
  components: { [Alert.name]: Alert, [Card.name]: Card,[Space.name]:Space},

})
</script>

<style>

</style>