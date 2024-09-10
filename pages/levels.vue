<template>
	<section class="levels-list font">
		<div class="level" v-for="level in arrayLevels" :key="level.id" @click="navigationPageLevels(level, level.id)" :style="{'background': checkComplexityLevel(level.id) ? 'green' : null}">
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
</template>

<style lang="less" scoped>
.levels-list {
	padding: 20px;
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	grid-auto-rows: auto;

	& .level {
		margin: 10px auto;
		padding: 20px;
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
      margin: 10px 0px;
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
function checkComplexityLevel(id) {
	return correctUser.value.completedLevels.some(e => e.idLevel == id);
}

onMounted(async () => {
    token = localStorage.getItem("token");
    const response = await levels.getLevels({});
    const users = await user.getUsers({});
    correctUser.value = users.find(e => e.token === token);
  
    arrayLevels.value = response;

  console.log(correctUser.value)
})
</script>
