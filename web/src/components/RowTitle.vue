<template>
  <div class="class-title">
    <img src="../assets/icon_rectangle.png" style="height: 12px;"/>
    <div class="title-container">
      <div>
        <div class="title-cn" :style="{ 'font-size': cnFontSize ? `${cnFontSize}px` : ''}">{{titleCn}}</div>

        <div class="title-underline" :style="{ 'margin-top': underlineGap ? `${underlineGap}px` : ''}"></div>
      </div>
      <div class="title-en" :style="{ 'font-size': enFontSize ? `${enFontSize}px` : ''}">{{titleEn}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RowTitle',
    props: ['titleCn', 'titleEn', 'underlineGap', 'cnFontSize', 'enFontSize'],
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style scoped>
  .class-title {
    display: flex;
    flex-direction: row;
  }

  .title-container {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }

  .title-cn {
    font: 20px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.85);
    /*padding-bottom: 10px;*/
    /*border-bottom: 2px #2ec1bd solid;*/
  }

  .title-underline {
    margin-top: 6px;
    /*width: 32px;*/
    background: linear-gradient(to right, rgb(105, 228, 175), rgb(95, 184, 205));
    height: 3px;
  }

  .title-en {
    margin-left: 8px;
    font: 18px 'STXihei';
    color: rgba(0, 0, 0, 0.2);
  }
</style>