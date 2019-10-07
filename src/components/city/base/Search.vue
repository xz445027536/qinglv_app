<template>
  <div class="search">
    <mt-search v-model="value" placeholder="输入城市名或拼音"></mt-search>
    <ul v-show="value">
      <li v-for="(city,index) of filterCities" :key="index">{{city.name}}</li>
      <li v-show="isShow">未匹配到数据</li>
    </ul>
  </div>
</template>

<script>
export default {
  props:["cities"],
  data(){
    return{
      value:""
    }
  },
  computed:{
    filterCities(){
      let result=[];
      for(let key in this.cities){
        this.cities[key].forEach((city,index)=>{
          if(city.name.includes(this.value) || city.spell.includes(this.value)){
            result.push(city)
          }
        })
      }
      return result;
    },
    isShow(){
      return !this.filterCities.length;
    }
  }
}
</script>

<style lang="scss">
  .search{
    height: .9rem;
    .mint-search{
      height: 100%;
      .mint-searchbar{
        padding: .1rem;
        background-color: #26a2ff;
        .mint-searchbar-inner{
          border-radius: .2rem;
        }
        .mint-searchbar-cancel{
          display: none;
        }
      }
    }
  }
</style>