<template>
  <h1>{{result}}</h1>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue'
export default defineComponent({
    setup(){


        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve({
                    result:'这是异步组件的内容'
                })
            },3000)
        })
    }
})
</script>
<style>

</style>