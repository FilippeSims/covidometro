<script setup>
  import { computed, onMounted, ref, reactive, watch } from 'vue';
  import NavBar from './components/global/NavBar.vue';
  import Header from './components/global/Header.vue';
  import Options from './components/global/Options.vue'
  import Filter from './components/global/Filter.vue';
  import Card from './components/global/Card.vue';
  import CardStatus from './components/global/CardStatus.vue';
  import { useCovidStore } from './stores/countries.store.js';
  import moment from 'moment';
  
  const store = useCovidStore();
  store.covidSummary();

  const order = ref(1)
  const caching = ref(false)
  const countryCases = ref(false)
  const buttonToGoBack = ref(false)
  const loading = ref(false)

  const verify = computed(() => {
    return store.getSummaryCountries
  })
   
  const sort = computed(() => {
    if(caching.value === true){
      return {};
    }
    else {
      switch (order.value) {
        case 1:
          return store.getSummaryCountries.sort((a, b) => (a.Country > b.Country)*2-1).slice(0, 5);
        case 2:
          return store.getSummaryCountries.sort((a, b) => (b.Country > a.Country)*2-1).slice(0, 5);
        case 3:
          return store.getSummaryCountries.sort((a, b) => b.TotalConfirmed -  a.TotalConfirmed).slice(0, 5);
        case 4:
          return store.getSummaryCountries.sort((a, b) => a.TotalConfirmed - b.TotalConfirmed).slice(0, 5);
        default:
          return store.getSummaryCountries.sort((a, b) => (a.Country > b.Country)*2-1).slice(0, 5);
      }
    }
  })

  function sortClick(){
    if(order.value !== 4){
      order.value ++;
    } else {
      order.value = 1;
    }
  }

  function toGoBack(){
    store.toGoBack()
    countryCases.value = false;
    buttonToGoBack.value = false;
  }

  function clickCountry(e) {
    store.toGoBack()
    const date1 = moment().format('YYYY-MM-DD');
    const date2 = moment().subtract(5, "days").format('YYYY-MM-DD');
    store.countryStatus(e, date1 + "T00:00:00Z", date2 + "T00:00:00Z")
    countryCases.value = true;
    buttonToGoBack.value = true;
  }

  watch(verify, (value, valueNow) => {
    if(value){
      caching.value = false;
      loading.value = true;
    } else {
      caching.value = true;
    }
  })
</script>
<template>
  <div>
    <NavBar />
    <Header />
    <div
      class="
        m-auto
        w-[90%]
        lg:w-[60%]
        bg-white
        shadow
        -mt-[103px]
        py-5
        rounded
        text-center
        relative
        "
        v-if="caching"
    >
      <p>API em caching, tente novamente mais tarde.</p>
    </div>
    <Filter v-if="!caching" :countries="store.getSummaryCountries"  @clickCountry="clickCountry($event)"/>
    <Options v-if="!caching">
      <button class="p-1 border active:bg-[#ed6160] hover:border-[#ed6160] rounded bg-white" @click.prevent="sortClick" v-if="countryCases === false">
        <img src="./assets/img/sort.png" class="h-5 float-left" />
      </button>
      <button class="p-1 border active:bg-[#ed6160] hover:border-[#ed6160] rounded bg-white" @click.prevent="toGoBack" v-if="buttonToGoBack === true">Voltar</button>
    </Options>
    <Card v-if="!countryCases && !caching && loading" :countries="sort" @clickCountry="clickCountry($event)" delay="200"/>
    <CardStatus v-if="countryCases && !caching" :countryStatus="store.getCountryStatus" />
  </div>
</template>

<style scoped>
</style>
