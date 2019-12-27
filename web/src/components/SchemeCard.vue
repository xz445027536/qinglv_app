<template>
  <div class="full-card">
    <Card :bordered="false" @click.native="handleCardClick(item.solutionId)" class="scheme-card">
      <div v-if="showId" class="scheme-id"><span class="id-font" style="vertical-align: center">{{item.solutionId}}</span></div>
      <div class="class-info-container">
        <div>
          <img width="114" height="86" :src="item.goodsSolImg" alt="分类图片">
        </div>

        <div style="margin-left: 12px; align-self: baseline; flex-grow: 3;">
          <div class="scheme-name nowrap-ellipsis" :title="item.solutionName">{{item.solutionName}}</div>
          <div style="margin-top: 10px; min-height: 24px;">
            <!--<Tag v-for="label in item.labels" v-if="label && label.labelName" color="#2BC7C6" :key="label.labelId">{{label.labelName}}</Tag>-->
            <SchemeTag v-for="label in item.labels" v-if="label && label.labelName" :key="label.labelId">
              <span style="transform: scale(0.8);">{{label.labelName}}</span>
            </SchemeTag>
          </div>
          <div style="margin-top: 10px;">
            <img height="10" src="../assets/scheme/icon_seen_2x.png" alt="看过"><span class="icon-side-text">{{item.viewCount}}</span>
            <img height="10" style="margin-left: 12px;" src="../assets/scheme/icon_thumbs_up_2x.png" alt="点赞"><span class="icon-side-text">{{item.likeCount}}</span>
          </div>
        </div>

        <div v-if="showPrice" style="flex-grow: 2; align-self: baseline; text-align: center;">
          <span style="white-space: nowrap; margin-right: 4px; font: 10px 'Microsoft YaHei', serif; color: rgba(0, 0, 0, 0.45);">方案价格</span>
          <span style="font: 14px 'Microsoft YaHei', serif; color: rgba(0, 0, 0, 0.65); vertical-align: middle;">￥{{item.unitPrice}}</span>
          <div style="margin-top: 8px;">
            <span style="font: 8px 'Microsoft YaHei', serif; color: rgba(0, 0, 0, 0.45);">以实际采购为准</span>
          </div>
        </div>
      </div>
    </Card>
    <div class="right-side-bar"></div>
  </div>
</template>

<script>
  import SchemeTag from './SchemeTag'

  export default {
    name: 'SchemeCard',
    props: ['item', 'showId', 'showPrice'],
    components: {
      SchemeTag
    },
    data() {
      return {
        schemeList: []
      }
    },
    created() {
      console.log('SchemeCard')
    },
    methods: {
      handleCardClick(id) {
        this.$emit('card-click', id)
        console.log('toSchemeDetail: ', id)
        this.$router.push(
          {
            name: 'SchemeDetail',
            params: { id: id }
          }
        )
      },

    }
  }
</script>

<style scoped>
  .scheme-card {
    position: relative;
    cursor: pointer;
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.1);
    height: 163px;
  }

  .scheme-card:hover {
    box-shadow: 0 0 20px 0 rgba(43, 199, 198, 0.5);
    /*border-right: 4px solid #2bc7c6;*/
    /*cursor: pointer;*/
    /*border-image: linear-gradient(#37bad0, #00e8ab) 4;*/
    /*background: url('../assets/scheme/bg_gradient_bar_2x.png') no-repeat right;*/
    /*display: block; !* make the link background clickable *!*/
  }
  .full-card {
    position: relative;
    width: 424px;
    height: 163px;
    /*width: 30%;*/
  }

  .right-side-bar {
    position: absolute;
    width: 4px;
    height: 100%;
    right: 0;
    top: 0;
    background: url('../assets/scheme/bg_gradient_bar_2x.png');
    z-index: 1;
    visibility: hidden;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .full-card:hover .right-side-bar {
    visibility: visible;
  }

  .scheme-id {
    position: absolute;
    left: -25px;
    top: 10px;
    color: #ffffff;
    background: url("../assets/scheme/bg_scheme_id_2x.png") no-repeat;
    /*background-size: cover;*/
    background-size: 144px 30px;
    height: 30px;
    width: 148px;
    padding: 0 3px;
    /*text-align: left;*/
    transform: scale(0.8);
  }

  .id-font {
    font: 12px 'Microsoft YaHei';
    padding-left: 9px;
    /*-webkit-transform : scale(0.66,0.66);*/
    /*transform: scale(0.833);*/
  }

  .class-info-container {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .icon-side-text {
    margin-left: 6px;
    font: 10px 'Microsoft YaHei'; color: rgba(0, 0, 0, 0.45);
  }

  .scheme-name {
    font: 14px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.65);
  }
</style>