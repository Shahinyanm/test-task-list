<template>
  <div class="entities-list">
    <EntitiesListItem v-for="item of entitiesList" :entity="item" :key="item.id" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IEntity } from '@/shared/interfaces/entities.interface'
import EntitiesListItem from '@/components/lists/EntitiesListItem.vue'

const props = defineProps({
  entitiesList: {
    type: Array,
    required: true
  }
})
const entitiesList = ref<IEntity>(props.entitiesList)
</script>
<style scoped>
.entities-list {
  width: 350px;
  padding: 50px;
  border: 1px solid black;
}
</style>