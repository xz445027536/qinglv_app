<template>
  <div class="home">
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="index">
        <my-index></my-index>
      </mt-tab-container-item>
      <!-- <mt-tab-container-item id="scenic">景点</mt-tab-container-item>
      <mt-tab-container-item id="hotel">酒店</mt-tab-container-item> -->
      <mt-tab-container-item id="me">我的</mt-tab-container-item>
    </mt-tab-container>
    <!--底部导航栏-->
    <mt-tabbar fixed v-model="active">
      <mt-tab-item id="index">
        <img slot="icon" v-if="active=='index'" src="../assets/images/home_active.png" alt="" >
        <img slot="icon" v-else src="../assets/images/home.png" alt="">
        首页
      </mt-tab-item>
      <!-- <mt-tab-item id="scenic">
        <img slot="icon" v-if="active=='scenic'" src="../assets/images/scenic_active.png" alt="">
        <img slot="icon" v-else src="../assets/images/scenic.png" alt="">
        景点
      </mt-tab-item>
      <mt-tab-item id="hotel">
        <img slot="icon" v-if="active=='hotel'" src="../assets/images/hotel_active.png" alt="">
        <img slot="icon" v-else src="../assets/images/hotel.png" alt="">酒店
      </mt-tab-item> -->
      <mt-tab-item id="me">
        <img slot="icon" v-if="active=='me'" src="../assets/images/me_active.png" alt="">
        <img slot="icon" v-else src="../assets/images/me.png" alt="">我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  import MyIndex from '../components/myindex/MyIndex'
  export default {
    data(){
      return {
        active:"index",
      }
    },
    components:{MyIndex}
  }
</script>
<style lang="scss">
  
</style>