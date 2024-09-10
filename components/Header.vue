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
      }
    }
  }
</style>

<script setup>
  import { useChecksAccount } from "../stores/checksAccount";
  import { user } from "../services/api/index";

  const store = useChecksAccount();
  const checkAccount = computed(() => store.checkAccount);

  onMounted(async () => {
    const token = localStorage.getItem("token") || null;
    const response = await user.getUsers({});

    if (token) {
      store.reloadedCheckAccount(true);
    }
  })
</script>