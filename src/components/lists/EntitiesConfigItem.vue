<template>
  <div class="entity-config-item">
    <ListArrow direction="right" @toggle="onListToggle" />
    <CheckboxInput :defaultState="entity.state" @toggle="onListCheckboxToggle" />
    {{ entity.name }}
    <div v-if="isChildItemsVisible" class="sub-items">
      <ul>
        <li v-for="(item, index) of entity.items" :key="item.id">
          <CheckboxInput
            :defaultState="item.isChecked ? 'checked' : 'unchecked'"
            :identifier="index"
            @toggle="onSubItemCheckboxToggle"
          />
          {{ item.name }}
          <span class="configs">
            <span class="count" @click="setCount(index)">{{
                item.count
              }}</span>
            <span
              :style="{ background: item.color }"
              class="color"
              @click="setColor(index)"
            ></span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CheckboxInput from "@/components/shared/CheckboxInput.vue";
import ListArrow from "@/components/icons/ListArrow.vue";
import { ref } from "vue";

const props = defineProps({
  entity: {
    type: Object,
    required: true
  },
  entityIndex: {
    type: Number,
    required: true
  }
});
const emit = defineEmits(["toggleColorInput", "toggleCountInput", "toggleCheckbox", "submitCheckboxToggle"]);
const entity = ref(props.entity);

const isChildItemsVisible = ref(false);

function setCount(index: number) {
  emit("toggleCountInput", { childIndex: index, entityIndex: props.entityIndex });
}

function setColor(index: number) {
  emit("toggleColorInput", { childIndex: index, entityIndex: props.entityIndex });
}

function onListToggle(direction: string) {
  switch (direction) {
    case "right": {
      isChildItemsVisible.value = false;
      break;
    }
    case "bottom": {
      isChildItemsVisible.value = true;
      break;
    }
  }
}

function onListCheckboxToggle(state: string) {
  emit("toggleCheckbox", { state: state, entityIndex: props.entityIndex });
}

function onSubItemCheckboxToggle(state: string, index: number) {
  emit("submitCheckboxToggle", { entityIndex: props.entityIndex, state: state, index: index });
}

</script>
<style lang="scss" scoped>
.entity-config-item {
  margin-bottom: 5px;

  .sub-items {
    padding: 10px 0 10px 50px;

    ul {
      li {
        margin: 5px 0;

        .configs {
          padding-left: 100px;

          span {
            display: inline-block;
            vertical-align: middle;
            margin: 0 2px;
            cursor: pointer;
          }

          .count {
            width: 20px;
            height: 20px;
            text-align: center;
          }

          .color {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>