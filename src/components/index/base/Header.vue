<template>
  <div class="header">
    <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
    <mt-search placeholder="请输入景点名称"></mt-search>
    <router-link to="/city">
      <span class="city-name">{{$store.state.city}}</span>
    </router-link>
    <!-- <mt-button @click="search">搜索</mt-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    search() {}
  }
};
</script>

<style lang="scss">
.header {
  display: flex;
  height: 1rem;
  background-color: #26a2ff;
  line-height: 1rem;
  .mint-button{
    height: 100%;
    background-color: #26a2ff;
    color: #fff;
  }
  .mint-search {
    flex: 1;
    height: 100%;
    
    box-shadow: none;
    color: #fff;
    .mint-searchbar{
      box-sizing: border-box;
      height: 0.8rem;
      margin-top: .1rem;
      padding:.1rem;
      background-color: #26a2ff;
      line-height: 0.8rem;
      .mint-searchbar-inner{
        border-radius: .3rem;
      }
      .mint-searchbar-cancel{
        display: none;
      }
    }
  }
  .city-name{
    height: 100%;
    padding: 0 0.1rem;
    font-size: 0.3rem;
    color: #fff;
  }
  .mint-button:not(.is-disabled):active::after{
    opacity: 0;
  }
}
</style>