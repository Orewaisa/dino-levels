<template>
  <section v-if="!checkAccount" class="login font">
    <form class="form-login" @submit.prevent="sendUser()">
      <p class="error-text">{{ errors }}</p>
      <div class="input-block" v-for="(field, key) in fields">
        <label class="name">{{ field.type }}<span>*</span></label>
        <input :type="getInputType(field.key)" v-model="formData[field.key]">
      </div>
      <p class="no-account"><nuxt-link to="/login">Есть аккаунт? Войди в него</nuxt-link></p>
      <button type="submit" class="btn-login">Войти</button>
    </form>
  </section>
</template>

<style scoped lang="less">
  .login {
    display: flex;

    & .form-login {
      margin: 0 auto;
      
      & .error-text {
        font-weight: bold;
        font-size: 30px;
        color: red;
      }

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
  import { reactive } from "vue";
  
  const store = useChecksAccount();
  const checkAccount = computed(() => store.checkAccount);
  let errors = ref("");
  let fields = [
    { id: 1, type: 'Ник', key: 'text' },
    { id: 2, type: 'Почта', key: 'email' },
    { id: 3, type: 'Пароль', key: 'password' },
    { id: 4, type: 'Подтверждение пароля', key: 'currPassword' },
  ];
  let formData = reactive({
    text: '',
    email: '',
    password: '',
    currPassword: '',
  });
  
  async function sendUser() {
    const checkPassword = formData.password == formData.currPassword;
    
    if(checkPassword) {
      const responseCheckForm = await user.checkForm(formData);
      console.log(responseCheckForm);

      if(responseCheckForm.data.ok) {
        const response = await user.postUser({name: formData.text, email: formData.email, password: formData.password}, {});
        
        let data = response.data.userData;
        
        console.log(data);
        
        localStorage.setItem("token", data.token);
    
        return store.reloadedCheckAccount(true); 
      } else {
        errors.value = responseCheckForm.data.textError;
      }
    } else {
      errors.value = 'Пароли не совпадают!'
    }
    
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