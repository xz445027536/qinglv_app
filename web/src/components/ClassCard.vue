<template>
  <Card class="class-card" @click.native="handleCardClick(good)" :bordered="false">
    <div class="class-flex-row-container">
      <!--<img style="margin-left: 20px; border-radius: 4px;" width="86" height="86" :src="good.imgUrl" alt="">-->
      <img style="margin-left: 12px; border-radius: 4px;" width="111" height="111" :src="good.imgUrl" :alt="good.name">

      <div class="fill-remaining-space"></div>
      <div class="text-icon-container">
        <div class="class-name-font">{{good.name}}</div>

        <div :title="'前往'" class="icon-headed"></div>
      </div>
    </div>

  </Card>
</template>

<script>
  export default {
    name: 'ClassCard',
    props: ['good'],
    data() {
      return {}
    },
    created() {
    },
    methods: {
      handleCardClick(good) {
        this.$emit('goodsClick', good)
      }
    }
  }
</script>

<style scoped>
  >>> .ivu-card-body {
    padding: 0;
  }

  .class-card {
    cursor: pointer;
    width: 250px;
    /*width: 240px;*/
    /*height: 104px;*/
    height: 135px;
  }

  .class-card:hover {
    box-shadow: 0 0 20px 0 rgba(43, 199, 198, 0.5);
    background: linear-gradient(to right, #02e8ab, #37bad0);
  }

  .class-card:hover .icon-headed {
    background-image: url(../assets/homepage/icon_arrow_right_white.png);
  }

  .class-card:hover .class-name-font {
    color: white;
  }

  .class-flex-row-container {
    width: 250px;
    /*width: 240px;*/
    /*height: 104px;*/
    height: 135px;
    display: flex;
    align-items: center;
  }

  .text-icon-container {
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
  }

  .class-name-font {
    /*font: 14px 'Microsoft YaHei';*/
    font: 16px 'Microsoft YaHei';
    color: rgba(68, 68, 68, 0.85);
  }

  .icon-headed {
    margin-top: 20px;
    width: 16px;
    height: 16px;
    background-image: url(../assets/homepage/icon_arrow_right_green.png);
    background-size: cover;
    cursor: pointer;
  }

  .icon-headed:hover {
    background-image: url(../assets/homepage/icon_arrow_right_white.png);
  }
</style>
