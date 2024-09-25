<template>
	<section  class="levels-list font" v-if="store.checkAccount">
		<div class="level" v-if="arrayLevels" v-for="level in arrayLevels" :key="level.id" @click="navigationPageLevels(level, level.id)" :style="{'background': checkСompletedLevel(level.id) ? 'green' : checkComplexityLevel(level.complexity)}">
			<p class="id-level">Уровень: {{ level.id }}</p>
			<div class="type">
				<p class="type-text">Тип: {{ level.type }}</p>
			</div>

			<div class="title">
				<h2 class="title-text">{{ level.title }}</h2>
			</div>

			<div class="complexity">
				<p class="complexity-text">Сложность: {{ level.complexity }}</p>
			</div>
		</div>
	</section>
	<section v-else class="error-section font">
		<h2>У вас похоже нет аккаунта, <NuxtLink to="/registration">зарегестрируйтесь</NuxtLink></h2>
	</section>
</template>

<style lang="less" scoped>
.levels-list {
	padding: 20px;
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-auto-rows: auto;

	& .level {
		margin: 0px auto;
		padding: 20px;
		min-width: 300px;
		cursor: pointer;
		background: #0a0768;
		border-radius: 10px;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

		&:hover {
			transform: translateY(-5px);
			box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
		}

		& .id-level {
			font-size: 18px;
		}

		& .type {
			& .type-text {
			}
		}

		& .title {
      margin: 15px 0px;
			text-align: center;
			font-size: 20px;

			& .title-text {
			}
		}

		& .complexity {
			font-size: 18px;

			& .complexity-text {
			}
		}
	}
}

.error-section {
	text-align: center;
	margin-top: 100px;
	& > h2 {
		color: red;

		& > a {
			color: #5c57ff;
			text-decoration: underline;
		}
	}
}

.blocked-level {
  background: green;;
}
</style>

<script setup>
import { user, levels } from '@/services/api/index'
import { useChecksAccount } from "../stores/checksAccount"

const store = useChecksAccount();
let arrayLevels = ref([]);
let token = '';
let correctUser = ref('');

function navigationPageLevels(level, id) {
	navigateTo({ path: `/level/${id}`, query: level })
}
function checkСompletedLevel(id) {
	return correctUser.value.completedLevels.some(e => e.idLevel == id);
}
function checkComplexityLevel(attribute) {
	switch (attribute) {
		case "Легкий": return "null"
			break;

		case "Нормальный": return "#011c95"
			break;
		
		case "Сложный": return "#651515"
			break;
	
		case "Профессиональный": return "#dc0000"
			break;
	}
}

onMounted(async () => {
	if(localStorage.getItem("token")) {
		token = localStorage.getItem("token");
		const responseLevels = await levels.getLevels({});
		const response = await user.getCurrentUser({ params: { token } });
		correctUser.value = response.user;
	
		arrayLevels.value = responseLevels;
	
		console.log(arrayLevels.value)
	}
})
</script>
