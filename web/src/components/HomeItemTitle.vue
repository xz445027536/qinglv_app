<template>
  <div class="item-title">
    <img src="../assets/icon_rectangle.png" style="height: 19px"/>
    <div style="text-align: left;margin-top: 19px">
      <div style="display: flex">
        <div class="item-title-text">
          <p>{{titleName}}</p>
          <div class="under-line"></div>
        </div>
        <div style="flex: 1"></div>
      </div>
      <div class="item-title-en"> {{titleEn}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['titleName', 'titleEn']
  }
</script>

<style scoped>
  .item-title {
    display: flex;
    z-index: 100;
  }

  .item-title-text {
    font-family: "Microsoft YaHei";
    font-size: 26px;
    line-height: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .item-title-en {
    font-family: 'STXihei';
    font-size: 24px;
    line-height: 24px;
    margin-top: 18px;
    color: rgba(68, 68, 68, 0.2);
  }

  .under-line{
    margin-top: 18px;
    background: linear-gradient(to left, #02e8ab, #37bad0);
    height: 2px;
  }


</style>