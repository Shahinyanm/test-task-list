<style scoped lang="scss">
.checkbox {
  display: inline-flex;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  vertical-align: middle;
  margin: 0 5px;
  text-align: center;

  span {
    width: 5px;
    height: 5px;
    background: black;
    border-radius: 50%;
    margin: auto;
  }
}
</style>

<template>
  <span @click="onCheckboxToggle" class="checkbox">
    <check-icon   v-if="state === 'checked'"></check-icon>
    <span v-else-if="state === 'partially_checked'"></span>
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import CheckIcon from "@/components/icons/CheckIcon.vue";

const props = defineProps({
  defaultState: {
    type: String,
    required: false
  },
  identifier: {
    required: false
  }
})
const emit = defineEmits<{
  (e: 'toggle', value: string, identifier?: any): void
}>()

const state = ref<string>(props.defaultState)

watch(
  () => props.defaultState,
  (currentState) => {
    state.value = currentState
  }
)

function onCheckboxToggle() {
  switch (state.value) {
    case 'checked': {
      state.value = 'unchecked'
      break
    }
    case 'partially_checked':
    case 'unchecked': {
      state.value = 'checked'
      break
    }
    default: {
      throw new Error('Invalid state')
    }
  }
  emit('toggle', state.value, props.identifier)
}
</script>
