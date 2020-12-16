<template>
    <div>
        <a-alert
        message="异步加载组件"
        description="使用suspense组件包裹异步加载的组件"
        type="info"
        show-icon
        style="margin-bottom: 12px"
    />

    <a-card>
        <!-- {{error && 'error :' + error}} -->
        <Suspense>
            <template #default>
                <async-info />
            </template>
            <template #fallback>
                <a-spin /> 
            </template>
        </Suspense>

    </a-card>

    </div>
</template>


<script lang="ts">
import Vue, { defineComponent, onErrorCaptured, ref } from 'vue'
import {Alert,Card,Spin} from 'ant-design-vue'
import AsyncInfo from './async-info.vue'
export default defineComponent({
        components:{
            [Alert.name]:Alert,
            [Card.name] : Card,
            [Spin.name]:Spin,
            AsyncInfo
        },
        setup(){
            const error = ref(null)
            
            // 捕获异步组件的error
            onErrorCaptured((e:any)=>{
                error.value  = e
                return true
            })

            return {
                error
            }
        }
})
</script>


<style lang="scss" scoped>

</style>