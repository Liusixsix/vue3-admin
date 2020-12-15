import { Button,Modal, Table, Menu, Input, Form,Card, Checkbox, Radio } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { App } from 'vue';

export function setupAntd(app:App){
    app.use(Button)
    .use(Form)
    .use(Input)
    .use(Modal)
    .use(Table)
    .use(Menu)
    .use(Card)
    .use(Checkbox)
    .use(Radio);
}