<template>
  <div class="index">
    <index-header></index-header>
    <index-swiper></index-swiper>
    <index-hot></index-hot> 
  </div>
</template>

<script>
  import IndexHeader from './base/Header'
  import IndexSwiper from './base/Swiper'
  import IndexHot from './base/Hot'
  export default {
    data(){
      return{}
    },
    components:{IndexHeader,IndexSwiper,IndexHot}
  }
</script>

<style lang="scss">
</style>