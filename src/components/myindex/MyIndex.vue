<template>
  <div class="index">
    <my-header></my-header>
    <swiper></swiper>
    <hot></hot> 
  </div>
</template>

<script>
  import MyHeader from './MyHeader'
  import Swiper from './Swiper'
  import Hot from './Hot'
  export default {
    data(){
      return{}
    },
    components:{MyHeader,Swiper,Hot}
  }
</script>

<style lang="scss">
</style>