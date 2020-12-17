import {ObjectDirective} from 'vue'

export const permission:ObjectDirective = {
    mounted(el:HTMLButtonElement,binding,vnode){
        if(binding.value == undefined) return
        const {action,effect} = binding.value
        if(!action) return

        if (effect == 'disabled') {
            el.disabled = true
            el.setAttribute('title', '没有权限')
        } else {
            // el.remove()
        }
        // console.log(el,binding,vnode)
    }
}