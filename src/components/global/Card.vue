<script setup>
  const props = defineProps({
    countries: Object,
  })

  function fatalidade(totalCasos, totalMortes){
    const perc = (1 + ((totalMortes - totalCasos) / totalCasos)) * 100
    return `${perc.toFixed(2).replace(".", ",")}%`
  }
</script>

<template>
  <div class="pb-20">
    <div
      v-for="result in props.countries" 
      class="
        m-auto
        w-[90%]
        lg:w-[60%]
        bg-white
        shadow
        mt-2
        py-10
        rounded
        cursor-pointer
        border-2
        border-transparent
        hover:border-2
        hover:border-[#ed6160]
        "
      @click.prevent="$emit('clickCountry', result.Slug)"
    >
      <h2 class="text-center font-RocaOne text-3xl text-[#4f4745] mb-5">{{ result.Country }}</h2>
      <div class="flex flex-col sm:flex-row justify-between text-center font-FilsonPro">
        <div class="sm:w-1/3 sm:border-r border-[#f4f4f4] mb-5 sm:mb-0">
          <h2>Total de casos</h2>
          <p class="font-RocaOne text-2xl text-[#ed6160] sm:mt-3">{{ result.TotalConfirmed.toLocaleString('pt-BR') }}</p>
        </div>
        <div class="sm:w-1/3 sm:border-r border-[#f4f4f4] mb-5 sm:mb-0">
          <h2>Mortes</h2>
          <p class="font-RocaOne text-2xl text-[#ed6160] sm:mt-3">{{ result.TotalDeaths.toLocaleString('pt-BR') }}</p>
        </div>
        <div class="sm:w-1/3">
          <h2>Fatalidade</h2>
          <p class="font-RocaOne text-2xl text-[#ed6160] sm:mt-3">{{ fatalidade(result.TotalConfirmed, result.TotalDeaths) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
