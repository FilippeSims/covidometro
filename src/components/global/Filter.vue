<script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
    countries: Object,
  })

  const input = ref('');

  const list = ref([]);

  function filter(){
    const array = props.countries.filter((valor) => valor.Country.toLowerCase().includes(input.value.toLowerCase()))
    list.value = array;
    if(input.value === '') {
      list.value = []
    }
  }

  function filterBlur(){
    setTimeout(() => {
      list.value = []
    }, 800)
  }

  function inputClick(country){
    input.value = country
  }

  watch(input, (value) => {
    filter()
  })
  </script>

<template>
  <div class="relative">
    <div class="
      m-auto
      w-[90%]
      lg:w-[60%]
      bg-white
      shadow
      rounded
      py-10
      px-10
      lg:px-20
      -mt-[50px]
      lg:mt-[-103px]
    ">
      <h2 class="text-center font-RocaOne text-2xl text-[#4f4745]">Filtrar dados sobre um país</h2>
      <div>
        <input 
          class="w-full p-2 border-b border-[#ed6160] outline-none font-FilsonPro"
          placeholder="Digite o nome do país"
          v-model="input"
          v-on:onkeyup="teste"
          @focus="filter"
          @blur="filterBlur"

        />
        <div class="absolute bg-white shadow block overflow-auto max-h-[240px]">
          <ul v-for="result in list" class="cursor-pointer border-transparent hover:border-[#ed6160]">
            <li class="p-2 border-b cursor-pointer border-transparent hover:border-[#ed6160] hover:border-b-2" @click.prevent="$emit('clickCountry', result.Slug), inputClick(result.Country)">{{ result.Country }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
</style>