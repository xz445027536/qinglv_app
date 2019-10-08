<template>
  <div class="list">
    <div class="list-current">
      <h3 class='list-title'>当前城市</h3>
      <div class="city">
        <span>{{$store.state.city}}</span>
      </div>
    </div>
    <div class="list-hot">
      <h3 class='list-title'>热门城市</h3>
      <div class="city">
        <span v-for='(item,index) in hotCities' :key='index' @click="handleClick(item.name)">{{item.name}}</span>
      </div>
    </div>
    <!-- <div class="list-item" v-for='(city,key) of cities' :key="key">
      <h3 class='list-title' :ref="key">{{key}}</h3>
      <ul>
        <li class='city-item' v-for='(item,index) of city' @click='handleClick(item.name)' :key="index">{{item.name}}</li>
      </ul>
    </div> -->
    
  </div>
</template>

<script>
export default {
  props:["hotCities","cities"],
  methods:{
    handleClick(city){
      //向仓库中存值
      this.$store.commit("changeCity",city);
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  .list{
    .list-title{
      line-height: 0.54rem;
      background-color: #eee;
      padding-left: 0.2rem;
      color: #666;
      font-size: 0.3rem;
    }
    .city{
      padding-left:.15rem;
      span{
        display:inline-block;
        width:28%;
        padding:.15rem .2rem;
        margin:.1rem;
        border:.01rem solid #ccc;
        text-align:center;
        box-sizing:border-box;
        border-radius:.05rem;
      }
    }
    .city-item{
      line-height:.6rem;
      padding-left:.2rem
    }
  }
</style>