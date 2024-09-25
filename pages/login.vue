<template>
  <section v-if="!checkAccount" class="login font">
    <form class="form-login" @submit.prevent="sendUser()">
      <p class="error-text">{{ errors }}</p>
      <div class="input-block" v-for="(field, key) in fields">
        <label class="name">{{ field.type }}<span>*</span></label>
        <input :type="getInputType(field.key)" v-model="formData[field.key]">
      </div>
      <p class="no-account"><nuxt-link to="/registration">Есть аккаунт? Войди в него</nuxt-link></p>
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

  .error-text {
    color: red;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }
</style>

<script setup>
  import { useChecksAccount } from "../stores/checksAccount";
  import { user } from "../services/api/index";
  
  const store = useChecksAccount();
  const checkAccount = computed(() => store.checkAccount);
  let errors = ref('');
  let fields = [
    { id: 1, type: 'Ник', key: 'text' },
    { id: 2, type: 'Почта', key: 'email' },
    { id: 3, type: 'Пароль', key: 'password' },
  ];
  let formData = reactive({
    text: '',
    email: '',
    password: ''
  });

  async function sendUser() {
    errors.value = '';
    const response = await user.postLoginUser(formData, {});
    console.log(response.data);
    
    if(response.data.ok) {
      const token = response.data.token;
      if(response.data.admin) {
        store.reloadedVariableAdminToken(true);
      }
      store.reloadedCheckAccount(true);
      localStorage.setItem("token", token);
      setTimeout(() => {
        navigateTo('/')
      }, 1000)
    } else {
      errors.value = response.data.errorText;
    }
    console.log(errors.value)
  }
  function getInputType(key) {
    switch(key) {
      case "text" : return "text"
        break;
      case "email" : return "email"
        break;
      case "password" : return "password"
        break;
      case "currPassword" : return "password"
        break;
    };
  }
</script>