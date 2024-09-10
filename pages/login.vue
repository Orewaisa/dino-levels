<template>
  <section v-if="!checkAccount" class="login font">
    <form class="form-login" @submit.prevent="checkForm()">
      <div class="input-block" v-for="(field, key) in fields">
        <label class="name">{{ field }}<span>*</span></label>
        <input :type="key" v-model="formData[field]">
      </div>
      <p class="no-account"><nuxt-link to="/registration">Нет аккаунта? Создай его</nuxt-link></p>
      <button type="submit" class="btn-login">Войти</button>
    </form>
  </section>
</template>

<style scoped lang="less">
  .login {
    display: flex;

    & .form-login {
      margin: 0 auto;
      
      & .input-block {
        margin-top: 30px;

        & .name {
          margin-bottom: 5px;
          font-size: 22px;
          display: block;
          
          & > span {
            margin-left: 5px;  
            color: red;
          }
        }
        
        & > input {
          padding: 10px 15px;
          border-radius: 10px;
          width: 500px;
          font-size: 25px;
        }
      }

      & .no-account {
        margin: 10px 0px;

        & > a {
          color: rgb(133, 133, 249);
          text-decoration: underline;
        }
      }

      & .btn-login {
        padding: 5px 20px;
        cursor: pointer;
        font-size: 25px;
        border-radius: 10px;
      }
    }
  }
</style>

<script setup>
  import { useChecksAccount } from "../stores/checksAccount";
  import { user } from "../services/api/index";

  let fields = {
    text: 'Ник',
    email: 'Почта',
    password: 'Пароль'
  }
  let formData = reactive({
    text: '',
    email: '',
    password: ''
  });
  
  const store = useChecksAccount();
  const checkAccount = computed(() => store.checkAccount);
</script>