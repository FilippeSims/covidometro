<script setup>
  import moment from 'moment';

  const props = defineProps({
    country: Object,
    countryStatus: Object,
  })

  const emit = defineEmits(['click'])
</script>

<template>
  <div class="pb-20">
    <div
      v-for="result in props.countryStatus" 
      class="
        m-auto
        w-[90%]
        lg:w-[60%]
        bg-white
        shadow
        mt-5
        py-10
        rounded
        "
    >
      <h2 class="text-center font-RocaOne text-2xl text-[#4f4745] mb-5">{{ result.Country }} <br> {{ moment.utc(result.Date).format('DD/MM/YYYY') }}</h2>
      <div class="flex justify-between text-center font-FilsonPro">
        <div class="w-full">
          <h2>Casos</h2>
          <p class="font-RocaOne text-2xl text-[#ed6160] mt-3">{{ result.Cases.toLocaleString('pt-BR') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
