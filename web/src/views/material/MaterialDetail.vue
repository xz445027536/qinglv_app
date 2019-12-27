<template>
  <div class="material-area ">
    <div style="margin: 22px 110px 0 110px;">
      <row-title style="margin-bottom: 32px;" title-cn="材料信息" title-en="Specialized Material"></row-title>
      <Card :bordered="false" class="mat-card">
        <div class="material-detail-flex-container">
          <img style="border: 1px #f5f5f5;" width="338" height="276" :src="matData.matImg"/>

          <div class="material-info-container fill-remaining-space">
            <div class="material-name">{{matData.matName}}</div>

            <div class="name-underline"></div>

            <div style="margin-top: 16px;">
              <SchemeTag
                style="height: 30px; line-height: 30px; font-size: 12px;"
                color="#2bc5c4"
                v-for="(label, index) in matData.labels" :key="index"
              >{{label.labelName}}
              </SchemeTag>
            </div>

            <div style="margin-top: 50px;">
              <Row>
                <Col span="2" class="label-font">
                单价</Col>
                <Col span="11" class="content-font">
                {{matData.unitPrice}}元
                <span class="label-font" style="margin-left: 4px;">价格仅供参考，以实际采购报价为准</span>
                </Col>
                <Col span="2" class="label-font">
                配置岗位</Col>
                <Col span="9" class="content-font">
                {{matData.configPosition}}</Col>
              </Row>

              <br>

              <Row>
                <Col span="2" class="label-font">
                品名</Col>
                <Col span="11" class="content-font">
                {{matData.matNickName || '无'}}</Col>
                <Col span="2" class="label-font">
                应用场景</Col>
                <Col span="9" class="content-font">
                {{matData.applyScene}}</Col>
              </Row>

              <br>

              <Row>
                <Col span="2" class="label-font">
                规格尺寸</Col>
                <Col span="11" class="content-font">
                {{matData.size}}</Col>
                <Col span="2" class="label-font">
                备注说明</Col>
                <Col span="9" class="content-font">
                {{matData.remark && matData.remark.length > 0 ? matData.remark : '无'}}</Col>
              </Row>

              <br>

              <Row>
                <Col span="2" class="label-font">
                配置地区</Col>
                <Col span="11" class="content-font">
                {{matData.configArea}}</Col>
                <Col span="2" class="label-font"></Col>
                <Col span="9" class="content-font"></Col>
              </Row>

            </div>
          </div>
        </div>
      </Card>
      <row-title style="margin-bottom: 32px;margin-top: 30px" title-cn="相关方案"
                 title-en="Recommended Scheme" v-if="matData.matRelatedSolList.length>0">
      </row-title>
      <!--<div>-->
      <!--<Card v-for="item in recommendMats" :key="item.matId" class="recommend-card"-->
      <!--@click.native="onMaterialClick(item.matId)">-->
      <!--<div class="recommend-card-area">-->
      <!--<div class="recommend-card-area-arrow"></div>-->
      <!--<img :src="item.matImg" style="width: 86px;height: 64px">-->
      <!--<div style="margin-left: 10px">-->
      <!--<p style="font: 12px 'Microsoft YaHei';color: rgba(0, 0, 0, 0.85)">{{item.matName}}</p>-->
      <!--<p style="font: 12px 'Microsoft YaHei';color: rgba(0, 0, 0, 0.45);margin-top: 12px">{{item.feature}}</p>-->
      <!--</div>-->

      <!--</div>-->
      <!--</Card>-->
      <!--</div>-->
      <div class="scheme-flex-container" v-if="matData.matRelatedSolList.length>0">
        <GoodVerticalCard
          v-for="(item, index) in matData.matRelatedSolList"
          :style="{ marginRight: index % 4 === 3 ? '0' : '18px'}"
          :key="item.solutionId"
          :item="item"
          :show-price="true"
          :show-id="true"></GoodVerticalCard>
      </div>
    </div>

  </div>
</template>
<script>
  import { getPackMats } from '../../api/material'
  import RowTitle from '../../components/RowTitle'
  import SchemeTag from '../../components/SchemeTag'
  import GoodVerticalCard from '../../components/GoodVerticalCard'

  export default {
    components: {
      RowTitle,
      SchemeTag,
      GoodVerticalCard
    },
    data() {
      return {
        matData: {
          matRelatedSolList:[]
        },
        recommendMats: []
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        scrollTo(0, 0)
        getPackMats(this.$route.params).then(response => {
          this.matData = response.data
        })
//        getRecommendMats(this.$route.params).then(response => {
//          this.recommendMats = response.data
//        })
      },
      onMaterialClick(id) {
        this.$router.replace({ name: 'MaterialDetail', params: { matId: id } })
      }
    }
  }
</script>

<style scoped lang="less">
  .material-area {
    background-image: url('../../assets/bg_demand.png');
    background-repeat: repeat-y;
    background-size: 100% 100%;
    min-height: 945px;
  }

  .material-detail-flex-container {
    display: flex;
    align-items: center;
  }

  .material-info-container {
    margin-left: 50px;
  }

  .material-name {
    font: bold 18px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.85);
  }

  .name-underline {
    margin-top: 10px;
    width: 32px;
    background: linear-gradient(to right, rgb(105, 228, 175), rgb(95, 184, 205));
    height: 2px;
  }

  .label-font {
    font: 12px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.45);
  }

  .content-font {
    font: 12px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.85);
  }

  .recommend-card {
    display: inline-block;
    cursor: pointer;
    width: 390px;
    height: 102px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    margin: 0px 16px 18px 0px;
    &-area {
      display: flex;
      flex-direction: row;
      align-items: center;
      &-arrow {
        background-image: url("../../assets/mat/icon_more_gray.png");
        width: 20px;
        height: 20px;
        margin: 0px 8px 0px 20px;
      }
    }
  }

  .recommend-card:hover {
    box-shadow: 0px 0px 20px 0px rgba(43, 199, 198, 0.5);
    border-right: 4px solid #2bc7c6;
  }

  .recommend-card:hover .recommend-card-area-arrow {
    background-image: url("../../assets/mat/icon_more_green.png");
  }

  .mat-card {
    padding: 20px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
  }

  .scheme-flex-container {
    display: flex;
    /*width: 985px;*/
    /*width: 1018px;*/
    width: 1220px;
    flex-wrap: wrap;
    /*justify-content: center;*/
  }
</style>
