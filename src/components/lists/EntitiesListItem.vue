<template>
  <div v-if="entity.state !== 'unchecked'" class="entities-list-item">
    <div class="info">
      <span>{{ entity.name }}</span>
      <button @click="onBtnClick">
        {{ contentState === 'ordered' ? 'Перемешять' : 'Сортировать' }}
      </button>
    </div>
    <template v-if="contentState === 'ordered'">
      <template v-for="item of entity.items" :key="item.id">
        <div v-if="item.isChecked" class="content">
          <span
            @click="onContentClick(item.id)"
            v-for="num of item.count"
            :key="num"
            :style="{ background: item.color }"
          ></span>
        </div>
      </template>
    </template>
    <div v-else class="content">
      <span
        @click="onContentClick(item.id, index)"
        v-for="(item, index) of shuffledContent"
        :key="item.id"
        :style="{ background: item.color }"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IEntity } from '@/shared/interfaces/entities.interface'
import { ref } from 'vue'
import { getRandomInteger } from '@/shared/helpers/common.helper'

const props = defineProps<{
  entity: IEntity
}>()
const contentState = ref('ordered')
const shuffledContent = ref([])

function onBtnClick() {
  switch (contentState.value) {
    case 'ordered': {
      contentState.value = 'unordered'
      shuffledContent.value = generateShuffleContent()
      break
    }
    case 'unordered': {
      contentState.value = 'ordered'
      break
    }
  }
}

function generateShuffleContent() {
  const shuffledColors = []
  let counters = []
  let itemsArr = []
  props.entity.items.forEach((item) => {
    if (item.count > 0 && item.isChecked) {
      counters.push(0)
      itemsArr.push(item)
    }
  })

  if (counters.length === 0) {
    return []
  }

  do {
    const index = getRandomInteger(0, itemsArr.length - 1)
    shuffledColors.push({
      id: itemsArr[index].id,
      color: itemsArr[index].color
    })
    counters[index]++
    if (counters[index] === itemsArr[index].count) {
      counters.splice(index, 1)
      itemsArr.splice(index, 1)
    }
  } while (counters.length)
  return shuffledColors
}

function onContentClick(id: string, index?: number) {
  const targetItem = props.entity.items.find((item) => item.id === id)
  targetItem.count--
  if (contentState.value === 'unordered') {
    shuffledContent.value.splice(index, 1)
  }
}
</script>
<style scoped lang="scss">
.entities-list-item {
  padding: 10px;
  border: 1px solid black;

  .info {
    display: flex;
    justify-content: space-between;
  }

  .content {
    margin: 10px 0;
    line-height: 12px;
    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin: 0 0.5px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
}
</style>