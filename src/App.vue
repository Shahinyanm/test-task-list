
<template>
  <div class="max-w-content mx-auto h-screen py-12 cursor-pointer">
    <div class="w-full flex items-center justify-center">
      <div class="text-main text-[36px] font-medium"> Some text here</div>
    </div>
    <div class="w-full flex items-center justify-start mb-4">
      <div class="w-full flex items-center justify-start gap-4">
        <div class="text-black text-[16px] font-medium">Filter</div>
        <div class="flex items-center justify-start">
          <div class="flex justify-center">
            <div class="xl:w-96">
              <input type="text" class=" rounded-full form-control block w-full px-3 py-3 text-base font-normal text-gray-700  bg-white bg-clip-padding border border-solid border-gray-300  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                  placeholder="Type title to search"
                     v-model="searchQuery"
                     id="searchInput"

              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex items-center justify-between gap-6 flex-wrap ">
      <card-item v-for="home in getFilteredHomes" :key="home.id" :home="home"></card-item>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { HomeService } from './service/home/home.service'
import CardItem from './components/CardItem'

const homes = reactive([])
const searchQuery = ref('')
const getFilteredHomes = computed(()=>{
  return searchQuery.value.length >= 3 ? homes.filter(item=>item.title.toLowerCase().includes(searchQuery.value.toLowerCase())): homes
})
onMounted(async ()=>{
  homes.push(...await HomeService.fetchHomes())
  console.log(await HomeService.fetchHomes())
})
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
