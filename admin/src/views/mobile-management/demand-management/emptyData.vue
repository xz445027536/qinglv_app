<template>
<div class="page-content">
  <div class="img-empty">
      <img :src="avatar" alt="emptyData">
      <div class="font-empty">暂无数据</div>
  </div> 
</div>
  
</template>

<script>
  import avatar from '@/assets/images/u4602.png'
  export default {
    data() {
      return {
        avatar: avatar
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .page-content {
    height: 500px;
    -webkit-display: flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
  .img-empty {
    width: 273px;
    height: 200px;
  }
  img {
    width: 273px;
    height: 150px;
  }
  .font-empty {
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    color: #989898;
    text-align: center;
    line-height: 50px;
  }
</style>
