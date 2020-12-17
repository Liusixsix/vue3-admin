import { permission } from '@/directives/permission'
import { App } from 'vue';

export function setupDirectives(app:App){
    app.directive('permission',permission)
}