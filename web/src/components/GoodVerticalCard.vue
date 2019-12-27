<template>
  <div class="card-container">
    <Icon class="delete-icon" v-if="deletable" @click="emitCancelEvent(item.solutionId)" :size="24" color="#2bc7c6" type="md-close" />

    <Card class="scheme-vertical-card" :bordered="false" @click.native="handleCardClick(item.solutionId)">
      <div class="scheme-flex-column-container">
        <div>
          <img style="border-top-left-radius: 4px; border-top-right-radius: 4px;" width="250" height="192" :src="item.goodsSolImg" alt="分类图片">
        </div>
        <div>
          <div class="scheme-name nowrap-ellipsis" :title="item.solutionName">{{item.solutionName}}</div>
          <!--<Tooltip theme="light">-->
            <!--<span slot="content" style="white-space: normal;" class="scheme-name">{{item.solutionName}}</span>-->
            <!--<div class="scheme-name">{{item.solutionName}}</div>-->
          <!--</Tooltip>-->
        </div>
        <div style="margin-top: 6px; height: 20px;">
          <SchemeTag v-for="label in item.labels" v-if="label && label.labelName" :key="label.labelId">
            <span style="transform: scale(0.8);">{{label.labelName}}</span>
          </SchemeTag>
        </div>
        <div class="scheme-price">￥{{item.unitPrice}}</div>
        <div style="margin-top: 12px;">
          <img height="10" src="../assets/scheme/icon_seen_2x.png" alt="看过"><span class="icon-side-text">{{item.viewCount}}</span>
          <img height="10" style="margin-left: 16px;" src="../assets/scheme/icon_thumbs_up_2x.png" alt="点赞"><span class="icon-side-text">{{item.likeCount}}</span>
        </div>
      </div>
    </Card>

    <div class="bottom-bar"></div>

  </div>
</template>

<script>
  import SchemeTag from './SchemeTag'

  export default {
    name: 'GoodVerticalCard',
    props: {
      item: {
        required: true
      },

      deletable: {
        default: false
      },
      detailName:{
        type: String,
        default(){
          return 'SchemeDetail'
        }
      },
      showComment: {
        type: Boolean,
        default: true
      }
    },
    components: {
      SchemeTag
    },
    data() {
      return {
        showDeleteModal: false
      }
    },
    created() {
    },
    methods: {
      handleCardClick(id) {
        this.$emit('card-click', id)
        this.$router.push(
          {
            name: this.detailName,
            params: { id: id }
          }
        )
      },

      emitCancelEvent(id) {
        this.$emit('cancelCollect', id)
      }
    }
  }
</script>

<style scoped lang="less">
  /deep/ .ivu-card-body {
    padding: 0;
  }

  .card-container {
    cursor: pointer;
    margin-bottom: 15px;
    position: relative;

    &:hover {
      .bottom-bar, .delete-icon {
        visibility: visible;
      }
    }
  }

  .delete-icon {
    position: absolute;
    visibility: hidden;
    right: 10px;
    top: 10px;
    z-index: 1;
  }

  .scheme-vertical-card {
    width: 250px;
    /*width: 240px;*/
    /*height: 325px;*/
    height: 336px;
    border-radius: 4px;

    &:hover {
      box-shadow: 0 0 20px 0 rgba(43, 199, 198, 0.5);

      .scheme-name, .scheme-price {
        color: #2bc7c6;
      }
    }
  }

  .bottom-bar {
    position: absolute;
    width: 250px;
    /*width: 240px;*/
    height: 5px;
    right: 0;
    bottom: 0;
    background: url('../assets/scheme/bg_bottom_gradient_bar_2x.png');
    z-index: 1;
    visibility: hidden;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .scheme-flex-column-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .scheme-name {
    text-align: center;
    width: 198px;
    margin-top: 12px;
    font: 16px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.65);
  }

  .scheme-price {
    margin-top: 12px;
    font: 14px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.65);
  }

  .icon-side-text {
    margin-left: 5px;
    font: 10px 'Microsoft YaHei'; color: rgba(0, 0, 0, 0.45);
  }
</style>