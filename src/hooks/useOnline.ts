import { onMounted, ref ,onUnmounted} from 'vue'


export function useOnline(){
    const online = ref(true)

    const showStatus = (val:any)=>{
        online.value = typeof val === 'boolean' ? val :val.target.online
    }
    navigator.onLine ? showStatus(true):showStatus(false)

    onMounted(()=>{
        window.addEventListener('online',showStatus)
        window.addEventListener('offline',showStatus)
    })
    

    onUnmounted(() => {
        // 移除监听网络状态的变化
        window.removeEventListener('online', showStatus)

        window.removeEventListener('offline', showStatus)
    })

    return {online}
}