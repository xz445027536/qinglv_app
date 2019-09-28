<template>
  <div class="home">
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="index">首页</mt-tab-container-item>
      <mt-tab-container-item id="scenic">景点</mt-tab-container-item>
      <mt-tab-container-item id="hotel">酒店</mt-tab-container-item>
      <mt-tab-container-item id="me">我的</mt-tab-container-item>
    </mt-tab-container>
    <!--底部导航栏-->
    <mt-tabbar fixed v-model="active">
      <mt-tab-item id="index">
        <img slot="icon" src="../assets/images/home.png" alt="">首页
      </mt-tab-item>
      <mt-tab-item id="scenic">
        <img slot="icon" src="../assets/images//scenic.png" alt="">景点
      </mt-tab-item>
      <mt-tab-item id="hotel">
        <img slot="icon" src="../assets/images/hotel.png" alt="">酒店
      </mt-tab-item>
      <mt-tab-item id="me">
        <img slot="icon" src="../assets/images/me.png" alt="">我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data(){
    return {active:"index"}
  }
}
</script>
<style lang="scss">
  
</style>