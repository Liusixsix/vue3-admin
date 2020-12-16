import { onMounted, reactive,toRefs ,computed} from "vue"

interface Battery{
    charging:boolean // 当前电池是否正在充电
    chargingTime: number; // 距离充电完毕还需多少秒，如果为0则充电完毕
    dischargingTime: number; // 代表距离电池耗电至空且挂起需要多少秒
    level: number; // 代表电量的放大等级，这个值在 0.0 至 1.0 之间
    [key: string]: any;
}


export const useBattery = ()=>{
    const state = reactive({
        battery:{
            charging: false,
            chargingTime: 0,
            dischargingTime: 0,
            level: 100
        }
    })

    // 更新电池状态
    const updateBattery = (target:any)=>{
        for(const key in state.battery){
            state.battery[(key as 'level')] = target[key]
        }
        state.battery.level = state.battery.level * 100
    }

     // 计算电池剩余可用时间
     const calcDischargingTime = computed(() => {
        const hour = state.battery.dischargingTime / 3600
        const minute = state.battery.dischargingTime / 60 % 60
        return `${~~hour}小时${~~minute}分钟`
    })

        // 电池状态
        const batteryStatus = computed(() => {
            if (state.battery.charging && state.battery.level >= 100) {
                return '已充满'
            } else if (state.battery.charging) {
                return '充电中'
            } else {
                return '已断开电源'
            }
        })


    onMounted(async()=>{
        const BatteryManager:Battery = await (window.navigator as any).getBattery()
        updateBattery(BatteryManager)
        // 电池充电状态更新时被调用
        BatteryManager.onchargingchange = ({target}:any)=>{
            updateBattery(target)
        }

        // 电池充电时间更新时被调用
        BatteryManager.onchargingtimechange = ({target}:any) => {
            updateBattery(target)
            console.log(target, '电池充电了')
        }
        // 电池断开充电时间更新时被调用
        BatteryManager.ondischargingtimechange = ({target}:any) => {
            updateBattery(target)
            console.log(target, '电池断开充电了')
        }
           // 电池电量更新时被调用
           BatteryManager.onlevelchange = ({target}:any) => {
            updateBattery(target)
            console.log(target, '电量更新了')
        }
    })

    return {
        ...toRefs(state),
        batteryStatus,
        calcDischargingTime,
    }
}