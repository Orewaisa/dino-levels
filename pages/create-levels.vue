<template>
  <main v-if="store.checkAdminToken">
    <section class="panel-add-level">
      <form>
        <div class="block-input">
          <label>Тип уровня</label>
          <input type="text" placeholder="Переменные">
        </div>

        <div class="block-input">
          <label>Название уровня</label>
          <input type="text" placeholder="Ошибка переменные">
        </div>
        
        <div class="block-input">
          <label>Задача уровня</label>
          <input type="text" placeholder="Задача">
        </div>

        <div class="block-input">
          <label>Варианты ответа</label>
          <input type="text" placeholder="Задача">
          <input type="text" placeholder="Задача">
          <input type="text" placeholder="Задача">
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
  import { user, levels } from '@/services/api/index'
  import { useChecksAccount } from '../stores/checksAccount';

  const store = useChecksAccount();
  let options = reactive([
  ])
  let formData = reactive({
    type: "",
    title: "",
    task: "",
    option: [
      {option: '', check: null},
      {option: '', check: null},
      {option: '', check: null},
    ],

  })

  async function addLevel() {
    
  } 
</script>