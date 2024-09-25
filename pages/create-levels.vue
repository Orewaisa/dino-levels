<template>
  <main v-if="store.checkAdminToken">
    <section class="panel-add-level">
      <form @submit.prevent="addLevel()">
        <div class="block-input">
          <label>Тип уровня</label>
          <input type="text" placeholder="Переменные" v-model="formData.type">
        </div>

        <div class="block-input">
          <label>Сложность уровня</label>
          <input type="text" placeholder="Переменные" v-model="formData.complexity">
        </div>

        <div class="block-input">
          <label>Название уровня</label>
          <input type="text" placeholder="Ошибка переменные" v-model="formData.title">
        </div>
        
        <div class="block-input">
          <label>Задача уровня</label>
          <textarea type="text" placeholder="Задача" v-model="formData.task" ></textarea>
        </div>

        <div class="block-input">
          <label>Очки за уровень</label>
          <input type="number" placeholder="Ошибка переменные" v-model="formData.points">
        </div>
        
        

        <div class="block-input">
          <label>Варианты ответа</label>
          <input type="text" placeholder="Задача" v-model="formData.options[0].option" class="option">
          <input type="text" placeholder="Задача" v-model="formData.options[1].option" class="option">
          <input type="text" placeholder="Задача" v-model="formData.options[2].option" class="option">
        </div>

        <button type="submit">Добавить</button>
      </form>
    </section>
  </main>
</template>

<style lang="less" scoped>
  .panel-add-level {
    display: flex;
    justify-content: center;
    & > form {

      & .block-input {
        
        & > label {
          margin-top: 15px;
          margin-bottom: 5px;
          display: block;
          font-size: 22px;
        }
        
        & > input {
          padding: 10px 10px;
          font-size: 20px;
          width: 500px;
          
          &::placeholder {
            font-size: 20px;
          }
        }

        & > textarea {
          padding: 10px 5px;
          width: 98%;
          resize: vertical;
          font-size: 20px;
        }

        & .option {
          display: flex;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>

<script setup>
  import { user, levels } from '@/services/api/index'
  import { useChecksAccount } from '../stores/checksAccount';

  const store = useChecksAccount();
  let formData = reactive({
    type: "",
    title: "",
    task: "",
    points: 0,
    options: [
      {option: '', check: false},
      {option: '', check: false},
      {option: '', check: false},
    ],
    complexity: ""
  })

  async function addLevel() {
    let array = [];
    formData.options.forEach(e => {
      let arr = e.option.split(" ");
      console.log(arr.indexOf("true"));
      if(arr.indexOf("true") >= 0) {
        arr = arr.filter(item => item !== "true");
        e.option = arr.join(" ");
        e.check = true;
        console.log(e);
        return;
      };
    })

    const response = await levels.postAddLevel(formData, {});
    console.log(response);
    
  } 
</script>