<template>
  <div class="city">
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
    <city-list></city-list>
  </div>
</template>

<script>
import { getCities } from "@/api";
import CityHeader from "./base/Header";
import CitySearch from "./base/Search";
import CityList from "./base/list"
export default {
  data(){
    return{
      hotCities:[],
      cities:[]
    }
  },
  components:{CityHeader,CitySearch,CityList},
  created(){
    this.getData()
  },
  methods:{
    async getData(){
      let {hotCities,cities}=await getCities();
      this.hotCities=hotCities
      this.cities=cities
    }
  }
}
</script>

<style>

</style>