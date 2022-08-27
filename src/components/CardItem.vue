<template>
  <div class="w-3/12 flex flex-col relative border border-secondary">
    <div class="w-full h-64 bg-contain bg-no-repeat" :style="{backgroundImage:`url(https://via.placeholder.com/300x150/FF0000/FFFFFF?text=${home.title.split(' ').join('')})`}"></div>
    <div class="w-full flex flex-col gap-1 px-3 py-2">
      <div class="text-20p text-black font-bold">{{home.title}}</div>
      <div class="text-16p text-black">{{home.address}}</div>
      <div class="text-16p text-black mt-2"> New Properties for Sale from £ <span class="font-bold">{{home.price}}</span></div>
      <div class="text-14 text-black "> Shared Ownership Available</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
}
</script>
<script setup>
const props = defineProps({
  home: {
    type: Object,
    required: true,
  },
})
</script>
<style scoped>

</style>