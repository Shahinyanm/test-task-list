<template>
  <div class="entities-config">
    <div class="form-input">
      <input v-if="isColorInputVisible" v-model="color" type="color">
      <input v-if="isCountInputVisible" v-model="count" type="number">
      <button v-if="isColorInputVisible || isCountInputVisible" class="btn" type="button" @click="updateConfigurations"> Подвтервить</button>
    </div>


    <EntitiesConfigItem
      v-for="(item,index) in entitiesList"
      :key="item.id"
      :entity="item"
      :entity-index="index"
      @submitCheckboxToggle="onSubItemCheckboxToggle"
      @toggleCheckbox="onListCheckboxToggle"
      @toggleColorInput="onColorSet"
      @toggleCountInput="onCountSet"
    ></EntitiesConfigItem>
  </div>
</template>

<script lang="ts" setup>
import EntitiesConfigItem from "@/components/lists/EntitiesConfigItem.vue";
import { computed, ref } from "vue";
import type { IEntity } from "@/shared/interfaces/entities.interface";
import { getMultiCheckboxState } from "@/shared/helpers/common.helper";

const props = defineProps({
  entitiesList: {
    type: Array,
    required: true
  }
});

const entitiesList = ref<IEntity>(props.entitiesList);
const color = ref("#000000");
const count = ref(0);
const isCountInputVisible = ref(false);
const isColorInputVisible = ref(false);
const selectedChildIndex = ref(0);
const selectedEntityIndex = ref(0);

const target = computed(() => {
  return isCountInputVisible.value ? "count" : isColorInputVisible.value ? "color" : null;
});

function onColorSet({ entityIndex, childIndex }: { entityIndex: number; childIndex: number }) {
  selectedChildIndex.value = childIndex;
  selectedEntityIndex.value = entityIndex;
  color.value = entitiesList.value[entityIndex].items[childIndex].color;
  isColorInputVisible.value = true;
  isCountInputVisible.value = false;

}

function onCountSet({ childIndex, entityIndex }: { entityIndex: number; childIndex: number }) {
  selectedChildIndex.value = childIndex;
  selectedEntityIndex.value = entityIndex;
  count.value = entitiesList.value[entityIndex].items[childIndex].count;
  isCountInputVisible.value = true;
  isColorInputVisible.value = false;
}


function updateConfigurations() {
  switch (target.value) {
    case "count":
      entitiesList.value[selectedEntityIndex.value].items[selectedChildIndex.value].count = count.value;
      isCountInputVisible.value = false;
      color.value = "#000000";
      break;
    case "color":
      entitiesList.value[selectedEntityIndex.value].items[selectedChildIndex.value].color = color.value;
      isColorInputVisible.value = false;
      count.value = 0;
      break;

  }
}

function onListCheckboxToggle({ entityIndex, state }: { entityIndex: number; state: string }) {

  switch (state) {
    case "checked":
      entitiesList.value[entityIndex].state = "checked";
      entitiesList.value[entityIndex].items.forEach((item: any) => (item.isChecked = true));
      break;
    default:
      entitiesList.value[entityIndex].state = "unchecked";
      entitiesList.value[entityIndex].items.forEach((item) => (item.isChecked = false));

  }
}

function onSubItemCheckboxToggle({ entityIndex, index, state }: { entityIndex: number; index: number, state: string }) {
  switch (state) {
    case "checked":
      entitiesList.value[entityIndex].items[index].isChecked = true;
      break;
    default:
      entitiesList.value[entityIndex].items[index].isChecked = false;

  }
  entitiesList.value[entityIndex].state = getMultiCheckboxState(entitiesList.value[entityIndex].items);
}
</script>
<style lang="scss" scoped>
.entities-config {
  width: 350px;
  padding: 50px;
  border: 1px solid black;

  @mixin button-bg($bg) {
    background: $bg;
    &:hover {
      background: darken($bg, 8%);
      transition: all 0.3s ease;
    }
    &:active {
      background: darken($bg, 25%);
    }
  }


  .form-input {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .btn {
      margin-top: 8px;
      margin-left: 5px;
      height: 24px;
      color: white;
      text-decoration: none;
      border-radius: 3px;
      font-size: .8em;
      @include button-bg(#2ecc71);

    }

    input[type=number] {
      width: 100%;
      padding: 3px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    input[type=color] {
      width: 100%;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  }
}
</style>