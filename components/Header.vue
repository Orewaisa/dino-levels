<template>
  <header class="header font">
    <div class="logo">
      <div class="logo-icon">
        dwwd
      </div>
    </div>

    <nav class="nav">
      <ul class="pages-links">
        <li class="page-link"><nuxt-link to="/">Главная</nuxt-link></li>
        <li class="page-link"><nuxt-link to="/levels">Уровни</nuxt-link></li>
        <li class="page-link"><nuxt-link to="/experience">Система опыта</nuxt-link></li>
        <li class="page-link admin-panel" v-if="checkAdminAccount"><nuxt-link to="/create-levels">Создать уровень</nuxt-link></li>
        <li class="page-link">
          <nuxt-link v-if="checkAccount" to="/account">Аккаунт</nuxt-link>
          <nuxt-link v-else to="/login">Войти в аккаунт</nuxt-link>
        </li>
      </ul>
    </nav>

  </header>
</template>

<style lang="less" scoped>
  .header {
    padding: 20px 40px;
    display: flex;
    align-items: center;

    & .logo {
      margin-right: auto;

      & .logo-icon {

      }
    }

    & .nav {

      & .pages-links {
        display: flex;
        align-items: center;
        gap: 20px;

        & .page-link {
          font-size: 18px;
          
          & > a {
          }
        }

        & .admin-panel {
          & > a {
            color: rgb(225, 255, 0);

          }
        }
      }
    }
  }
</style>

<script setup>
  import { user, levels } from '@/services/api/index'
  import { useChecksAccount } from "../stores/checksAccount";

  const store = useChecksAccount();
  const checkAccount = computed(() => store.checkAccount);
  const checkAdminAccount = computed(() => store.checkAdminToken);

  onMounted(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      store.reloadedCheckAccount(true);
		  
      const response = await user.getCurrentUser({ params: { token } });
      console.log(response);
      
      if(response.user.admin) {
        store.reloadedVariableAdminToken(true);
      };

    }
    
  })
</script>