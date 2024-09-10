<template>
  <main>
    <section v-if="checkAccount" class="account">

    </section>
  </main>
</template>


<script setup>
  import { useChecksAccount } from "../stores/checksAccount"

  const store = useChecksAccount();
  const checkAccount = mounted(() => store.checkAccount);
</script>