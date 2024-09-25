<template>
  <section class="level font" v-if="levelInfo">
    <div class="params">
      <h3>{{ levelInfo.complexity }}</h3>
      <h3>{{ levelInfo.type }}</h3>
    </div>

    <div class="title">
      <p class="error">{{ errorText }}</p>
      <p class="current">{{ currentText }}</p>
      <h2>{{ levelInfo.title }}</h2>
    </div>

    <div class="task">
      <div class="texts">
        <p v-for="textTask in levelInfo.task.split('\n')">{{ textTask }}</p>
      </div>
    </div>

    <div class="options">
      <div class="option" v-for="option in levelInfo.options" @click="checksOption(option.check)">
        <p>{{ option.option }}</p>
      </div>
    </div>

    <NuxtLink to="/levels" class="back"><button>Обратно</button></NuxtLink>
  </section>
</template>

<style lang="less" scoped>
  .level {
    margin: 0px 40px;

    & .back {
      margin-top: 50px;
      display: flex;
      justify-content: center;

      & > button {
        padding: 10px;
        background: #00098b;
        border-radius: 15px;
        color: #00d9ff;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;
        border: none;
        transition: all 0.3s;
        &:hover {
          opacity: 85%;
        }
      }
    }

    & .params {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      & > h3 {
        padding: 5px 10px;
        border-radius: 5px;
        background: #0083a3;
      }
    }

    & .title {
      text-align: center;
      font-size: 20px;

      & .error {
        color: red;
        font-weight: 700;
        font-size: 50px;
      }
      
      & .current {
        color: rgb(0, 185, 0);
        font-weight: 700;
        font-size: 50px;

      }
    }

    & .task {
      margin: 50px auto;
      padding: 20px 10px;
      width: 40%;
      background: #262232;
      display: flex;
      justify-content: center;
      border-radius: 5px;
      
      & .texts {
        margin: 10px 0px;
        font-size: 20px;
        user-select: none;
        color: #2d91bc;
        font-weight: 500;

        & > p {
        }
      }
    }
    
    & .options {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-self: center;
      gap: 20px;
      
      & .option {
        padding: 10px 20px;
        font-size: 25px;
        border-radius: 10px;
        background: #00005c;
        cursor: pointer;

        & > p {
          
        }
      }
    }
  }
</style>

<script setup>
  import { levels } from "@/services/api/index";

  const levelId = useRoute().query.id;
  let levelInfo = ref(null);
  let checkCurrent = ref(null);
  let token = ref("");
  let errorText = ref("");
  let currentText = ref("");

  async function checksOption(check) {
    errorText.value = '';
    if(check) {
      const response = await levels.postCurrentLevel({id: levelId, token: token.value, points: levelInfo.value.points}, {}).then(res => res.data);
      checkCurrent.value = check;
      console.log(levelInfo.points);
      if(response.error) {
        errorText.value = response.error;
      } else {
        currentText.value = 'Верно!';
      }
    } else {
      errorText.value = 'Не правильно!';
      setTimeout(() => {
        errorText.value = '';
        
      }, 3000)
    }
  }

  onMounted(async () => {
    const response = await levels.getLevel(levelId, {});
    token.value = localStorage.getItem("token");
    levelInfo.value = response;
    console.log(levelInfo.value);
    
  })
</script>