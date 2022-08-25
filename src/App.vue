
<template>
  <div class="w-max-content mx-auto h-screen py-12 ">
    <div class="w-full flex items-center justify-center">
      <div class="text-main text-[36px] font-medium"> Some text here</div>
    </div>
    <div class="w-full flex items-center justify-start">
      <div class="w-full flex items-center justify-start gap-4">
        <div class="text-black text-[16px] font-medium">Filter</div>
        <div class="flex items-center justify-start">
          <input  type="text" class="rounded-full p-1 border-1 border-black">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
