import { defineStore } from "pinia";
import axios from "axios";

export const useCovidStore = defineStore({
  id: 'covid',
  state: () => ({
    summary: [],
    country: [],
    error: [],
  }),
  getters: {
    getSummaryCountries: (state) => state.summary.Countries,
    getCountryStatus: (state) => state.country,
  },
  actions: {
    async covidSummary(){
      await axios.get(`https://api.covid19api.com/summary`)
      .then(response => {
        if(response.data.Message !== "Caching in progress"){
          this.summary = response.data;
        }
      })
      .catch(error => {
        this.error = error;
      })
    },
    async countryStatus(slug, date1, date2){
      await axios.get(`https://api.covid19api.com/country/${slug}/status/confirmed?from=${date2}&to=${date1}`)
      .then(response => {
        this.country = response.data;
      })
      .catch(error => {
        this.error = error;
      })
    },
    async toGoBack(){
        this.country = [];
    },
  }
})