<template>
  <main v-if="dataUser">
    <section class="account font">
      <div class="info">
        <div class="name">
          <h2>{{ dataUser.name }}</h2>
          <p class="rank">Ранг: <span :style="{'color': rank[1]}">{{ rank[0] }}</span>.</p>
        </div>
        <p class="email">Почта: <span>{{ dataUser.email }}</span>.</p>
        <p class="info-text">Количество пройденных уровней: <span>{{ countLevel }}</span>.</p>
        <p class="info-text">Количество опыта: <span>{{ countPoint }}</span>.</p>
      </div>
    </section>
    <section class="levels font">
      <div class="current-levels">
        <div class="level-info" v-for="level in currentLevels">
          <p class="complexity">{{ level.complexity }}</p>
          
          <h3 class="title">{{ level.title }}</h3>
          
          <p class="type">{{ level.type }}</p>
        </div>
      </div>
      
    </section>
    <p class="leave-account font" @click="leaveAccount()">Выйти с аккаунта</p>
  </main>
</template>

<style lang="less" scoped>
  .account {
    display: flex;

    & .info {
      margin: 0 auto;
      font-size: 25px;

      & .name {
        font-size: 30px;
      }

      & .rank {
        font-size: 20px;

        & > span {
          font-weight: 600;
        }
      }
    
      & .email {
        margin-top: 10px;
        margin-bottom: 5px;

        & > span {
          color: #ddff00;
        }
      }

      & .info-text {
        margin-bottom: 5px;

        & > span {
          color: #ddff00;
        }
      }
      
    }
  }
  .leave-account {
    margin: 30px;
    font-weight: 600;
    text-align: center;
    font-size: 20px;
    color: red;
    cursor: pointer;
  }
  
  .levels {
    margin: 50px 100px;
    font-size: 30px;

    & .current-levels {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      
      & .level-info {
        margin-top: 5px;
        padding: 10px;
        min-width: 300px;
        height: 100px;
        background: #039a00;
        border-radius: 10px;
        
        & .complexity {
          font-size: 15px;
        }
  
        & .title {
          font-size: 30px;
          text-align: center;            
        }
  
        & .type {
          font-size: 25px;
        }
      }
    }
  }
</style>

<script setup>
  import { useChecksAccount } from "../stores/checksAccount"
  import { user, levels } from '@/services/api/index'

  const store = useChecksAccount();
  let token;
  let currentLevels = ref([]);
  let countLevel = computed(() => {
    return currentLevels.value.length;
  })
  let rank = computed(() => {
    return dataUser.value.rank.split(" ");
  })
  let countPoint = computed(() => {
    let count = 0;
    dataUser.value.completedLevels.forEach((e) => {
      count += e.point;
    })
    return count;
  });
  let dataUser = ref(null);


  function leaveAccount() {
    localStorage.removeItem("token");

    setTimeout(() => {
      navigateTo('/login');

      setTimeout(() => {
        location.reload();
      }, 500)
    },500);
  }

  onMounted(async () => {
    if(localStorage.getItem("token")) {
      token = localStorage.getItem("token");
      const response = await user.getCurrentUser({ params: { token } });
      dataUser.value = response.user;

      dataUser.value.completedLevels.forEach(async e => {
        const response = await levels.getLevel(e.idLevel, {});
        currentLevels.value.push(response)
      });
      console.log(response.user);
      console.log(currentLevels.value);
        
    }
  });
</script>