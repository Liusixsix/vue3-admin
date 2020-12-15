import { createApp } from 'vue'
import App from './App.vue'
import router,{setupRouter} from './router'
import store from './store'
import {setupAntd} from '@/plugins/index'
const app = createApp(App).use(store)

setupAntd(app)
setupRouter(app)


router.isReady().then(_=>app.mount('#app'))

