<template>
  <div class="swiper">
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item,index) of swiper" :key="index">
        <img :src="item.imgUrl" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
import { getSwiper } from '@/api';
export default {
  data(){
    return{
      swiper:[],
    }
  },
  created(){
    this.getData();
  },
  methods:{
    async getData(){
      let swiper=await getSwiper();
      this.swiper=swiper;
    }
  }
}
</script>
<style lang="scss">
  .swiper{
    height: 2rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>