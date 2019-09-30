<template>
  <div class="swiper">
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="(item,index) of imgs" :key="index">
        <img :src="item.img_url" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  data(){
    return{
      imgs:[
        {img_url:require('../assets/images/swiper_01.jpg')},
        {img_url:require('../assets/images/swiper_02.jpg')},
        {img_url:require('../assets/images/swiper_03.jpg')},
        {img_url:require('../assets/images/swiper_04.jpg')}
      ]
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