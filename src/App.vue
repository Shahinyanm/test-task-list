<template>
  <div class="entities">
    <EntitiesConfig :entitiesList="entitiesList"></EntitiesConfig>
    <EntitiesList :entitiesList="entitiesList"></EntitiesList>
  </div>
</template>

<script setup lang="ts">
import EntitiesList from '@/components/lists/EntitiesList.vue'
import EntitiesConfig from '@/components/lists/EntitiesConfig.vue'

import listsContent from './data/lists/lists.ts'
import { ref } from 'vue'

const entitiesList = ref(listsContent)
</script>
<style scoped>
.entities {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: auto;
  padding: 50px;
  box-sizing: border-box;
}
</style>
