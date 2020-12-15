<template>
  <div class="login-box">
    <div class="login-logo">
      <h1>Antd Admin</h1>
    </div>
    <a-form
      layout="horizontal"
      @submit="handleSubmit"
      @submit.prevent
    >
      <a-form-item v-bind="validateInfos.username">
        <a-input
          size="large"
          v-model:value="formInline.username"
          type="text"
          placeholder="admin" 
        >  <template v-slot:prefix><user-outlined type="user"/></template></a-input>
      </a-form-item>
      <a-form-item  v-bind="validateInfos.password">
          <a-input
          size="large"
          v-model:value="formInline.password"
          type="password"
          placeholder="password"
        ><template v-slot:prefix><lock-outlined type="user"/></template></a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          :loading="loading"
          block
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import {useForm} from '@ant-design-vue/use'
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "login",
  components: {UserOutlined,LockOutlined},
  setup() {
    const state = reactive({
      loading: false,
      formInline: {
        username: "",
        password: "",
      },
    });

    const rules = reactive({
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [
        { required: true, message: "请输入登录密码", trigger: "blur" },
      ],
    });

    const store = useStore()
    const router = useRouter()

    const {validate,validateInfos } = useForm(state.formInline,rules)
    console.log(store)
    const handleSubmit = () => {
        validate().then(async(res)=>{
            state.loading = true
            await store.dispatch('user/login',res).finally(()=>state.loading = false)
           router.replace('/')
        }).catch(err => {
            
        });
    };

    return {
      ...toRefs(state),
      rules,
      handleSubmit,
      validateInfos,  
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  padding-top: 240px;
  flex-direction: column;
  align-items: center;
  background: url("~@/assets/login.svg");
  background-size: 100%;

  .login-logo {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    h1 {
      margin-left: 10px;
      margin-bottom: 0;
    }
  }

  ::v-deep(.ant-form) {
    width: 400px;

    .ant-col {
      width: 100%;
    }
    .ant-form-item-label {
      padding-right: 6px;
    }
  }
}
</style>
