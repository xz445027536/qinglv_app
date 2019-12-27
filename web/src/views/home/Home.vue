<template>
  <div style="text-align: center">
    <!--banner模块-->
    <div class="banner-area">
      <Carousel v-model="bannerShowIndex" loop :autoplay-speed="5000" :autoplay="bannerList.length >= 2" dots="none">
        <CarouselItem v-for="item in bannerList" :key="item.id" style="padding: 1px">
          <div class="image" @click="handleBannerImageClick(item)"
               :style="{'background-image':'url('+item.bannerImg+')'}"></div>
        </CarouselItem>
      </Carousel>
      <div class="index">
        <span class="image-unchecked" v-for="(item,index) in bannerList" :key="item.id"
              :class="{ 'image-checked': bannerShowIndex == index }" @click="bannerShowIndex = index"></span>
      </div>
    </div>
    <div class="home-bg">
      <!--热门方案模块-->
      <div style="padding-top: 80px">
        <home-item-title titleName="热门方案" titleEn="Popular Program"></home-item-title>
        <div style="text-align: left;margin-left: 20px">
          <Card :bordered="false" class="solution-card" v-for="(item,index) in solutionList"
                @click.native="onSolutionClick(item.solutionId)" :key="index">
            <div class="solution-card-area">
              <img v-if="item.goodsImg" :src="item.goodsImg" style="border-radius: 4px"/>
              <img src="../../assets/icon_empty_img.png" v-else style="width: 148px;height: 148px">
              <div class="solution-card-area-info">
                <p class="solution-card-area-title">{{item.solutionName}}</p>
                <div class="solution-card-area-arrow"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <!--特色包材模块-->
      <div style="position: relative">
        <home-item-title titleName="特色包材" titleEn="Specialized Material" style="margin-top: 80px"></home-item-title>
        <div style="display: flex;flex-direction:row;width: 100%;align-items: center;justify-content: space-between">
          <img
            :src="matShowIndex > 0 ? require('../../assets/homepage/icon_arrow_left.png') : require('../../assets/homepage/icon_arrow_left_disable.png')"
            @click="changeMat(1)" :style="{cursor:matShowIndex>0?'pointer':'not-allowed'}" style="margin-left: 20px">
          <Carousel v-model="matShowIndex" style="width: 1100px" dots="none" arrow="never">
            <CarouselItem v-for="(item,index) in carouselMatList" :key="index" style="padding-bottom: 80px">
              <Card :bordered="false" class="mat-card" v-for="(item,index) in item" :key="index"
                    @click.native="onMaterialClick(item.matId)">
                <div class="mat-card-area">
                  <img v-if="item.matImg" :src="item.matImg"/>
                  <img src="../../assets/icon_empty_img.png" v-else style="width: 260px;height: 196px">
                  <p class="mat-card-area-title">{{item.matName}}</p>
                  <p class="mat-card-area-feature">{{item.feature}}</p>
                  <div class="mat-card-area-tag">
                    <SchemeTag v-for="(tag,index) in item.labels" :key="index">{{tag.labelName}}
                    </SchemeTag>
                  </div>
                  <Button class="mat-card-area-button" type="primary" ghost>立即查看</Button>
                </div>
              </Card>
            </CarouselItem>
          </Carousel>
          <img
            :src="matShowIndex<carouselMatList.length-1?require('../../assets/homepage/icon_arrow_right.png'):require('../../assets/homepage/icon_arrow_right_disable.png')"
            style="cursor: pointer;margin-right: 20px"
            :style="{cursor:matShowIndex<carouselMatList.length-1?'pointer':'not-allowed'}"
            @click="changeMat(2)">
        </div>
        <div style="position: absolute;width: 100%;bottom: 25px">
          <span class="image-unchecked" v-for="(item,index) in carouselMatList" :key="index"
                :class="{ 'image-checked': matShowIndex == index }" @click="matShowIndex = index"></span>
        </div>
      </div>
      <!--关于我们模块-->
      <div>
        <home-item-title titleName="关于我们" titleEn="About SPS"></home-item-title>
        <div class="info-area">
          <div class="info-area-card" v-for="(item,index) in spspDescList" :key="item.confKey">
            <p class="info-area-title">{{item.confDesc}}</p>
            <p class="info-area-info" :style="index===spspDescList.length-1? 'border-right:none':''">
              {{item.confValue}}<span
              style="font-size: 30px">{{item.unit}}</span>
            </p>
          </div>
        </div>
        <div style="display: flex;flex-direction: row;justify-content: space-between;padding-bottom: 140px">
          <div style="position: relative;width: 800px">
            <p
              style="font-family: 'Microsoft YaHei';font-size: 116px;color:rgba(255,255,255,0.2);text-align: left;line-height: 116px">
              SPS</p>
            <div
              style="font-family: 'Microsoft YaHei';font-size: 42px;color: rgba(255,255,255,0.8);text-align: left;line-height: 42px;position: absolute;top:60px;left: 60px">
              顺丰科技SPS<span style="font-size: 30px">（原包装实验室）</span>
            </div>
            <div
              style="width: 600px;margin-left: 80px;margin-top: 15px;text-align: left;font-family: 'Microsoft YaHei';color: rgba(255,255,255,0.8);font-size: 16px;line-height: 30px">
              顺丰科技包装实验室，成立于2013年，是全行业首家物流包装实验室。2018年，包装实验室正式更名SPS，全称Sustainable Packaging Solutions，中文意为“可持续包装解决方案”， 实现从概念到内核的价值裂变式升级。作为顺丰科技旗下核心的绿色包装研发与应用部门，SPS一直致力于推动行业标准化、减量化、绿色化的可持续性生态链建设，通过重点布局传统、冷链、医药、重货、特种五大业务板块，定期为鲜花、食品、3C、果蔬、生鲜、疫苗等客户提供通用型和定制化的综合包装解决方案，系统构建起从研发到应用的连通式服务体系。
            </div>
          </div>
          <div style="width: 400px">
            <home-item-title titleName="合作伙伴" titleEn="Cooperative Partner" style="margin-top: 40px"></home-item-title>
            <div style="text-align: left;margin-left: 20px">
              <div class="cooper-img">
                <img src="../../assets/homepage/logo_aili.png" style="height: 50px">
              </div>
              <div class="cooper-img">
                <img src="../../assets/homepage/logo_taoshi.png" style="height: 50px">
              </div>
              <div class="cooper-img">
                <img src="../../assets/homepage/logo_xiyueer.png" style="height: 50px">
              </div>
              <div class="cooper-img">
                <img src="../../assets/homepage/logo_zhongji.png" style="height: 50px">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import SchemeTag from '../../components/SchemeTag'
  import HomeItemTitle from '../../components/HomeItemTitle.vue'
  import { initHomePage } from '../../api/homepage'

  export default {
    data() {
      return {
        bannerShowIndex: 0,
        bannerList: [],
        solutionList: [],
        matList: [],
        spspDescList: [],
        matListSource: [],
        matShowIndex: 0,
      }
    },
    computed: {
      carouselMatList: function () {
        var arr = []
        for (var i = 0; i < this.matListSource.length; i += 3) {
          arr.push(this.matListSource.slice(i, i + 3))
        }
        return arr
      }
    },
    components: {
      HomeItemTitle,
      SchemeTag
    },
    created() {
      initHomePage().then(response => {
        this.bannerList = response.data[0].bannerList
        this.solutionList = response.data[0].frqtSolutionList
        this.matListSource = response.data[0].matList
        this.matList = response.data[0].matList.slice(this.showIndex, this.showIndex + 3)
        this.spspDescList = response.data[0].spspDescList
      })
    },
    methods: {
      changeMat(type) {
        switch (type) {
          case 1://左移
            if (this.matShowIndex > 0) this.matShowIndex--
            break
          case 2://右移
            if (this.matShowIndex < this.carouselMatList.length - 1) this.matShowIndex++
            break
        }
      },
      handleBannerImageClick(item) {
        if (item.h5Url) {
          location.href = item.h5Url
        } else if (item.clickUrl) {
          this.$router.push({ name: 'BannerDetail', query: { img: item.clickImg } })
        }
      },

      onSolutionClick(id) {
        this.$router.push({ name: 'SchemeDetail', params: { id: id } })
      },
      onMaterialClick(id) {
        this.$router.push({ name: 'MaterialDetail', params: { matId: id } })
      }
    }
  }
</script>

<style scoped lang="less">
  .banner-area {
    position: absolute;
    box-sizing: content-box;
    height: 500px;
    min-width: 1440px;
    top: 0;
    left: 0;
    right: 0;
    & .image {
      width: 100%;
      height: 500px;
      background-position: 100%;
      background-repeat: no-repeat;
      background-position: center 0;
      cursor: pointer;
    }
    & .index {
      position: absolute;
      top: 480px;
      width: 100%;
    }
  }

  .home-bg {
    background: url('../../assets/homepage/bg_home.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 440px;
    padding: 0 110px;
  }

  .solution-card {
    width: 320px;
    display: inline-block;
    margin: 40px 60px 0px 0px;
    box-shadow: 0px 40px 35px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    color: rgba(0, 0, 0, 0.85);
    &-area {
      display: flex;
      height: 100%;
      &-info {
        font-family: 'Microsoft YaHei';
        font-size: 18px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        margin-right: 20px;
      }
      &-title {
        margin-left: 5px;
        width: 130px;
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      &-arrow {
        background-image: url('../../assets/homepage/icon_arrow_right_green.png');
        background-repeat: no-repeat;
        background-size: cover;
        margin-top: 30px;
        width: 24px;
        height: 24px;
      }
    }
    &:hover {
      background: linear-gradient(to right, #02e8ab, #37bad0);
      color: white;
    }
  }

  .solution-card:hover .solution-card-area-arrow {
    background-image: url('../../assets/homepage/icon_arrow_right_white.png');
  }

  .mat-card {
    width: 260px;
    display: inline-block;
    margin: 50px 0px 0px 60px;
    box-shadow: 0px 40px 35px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &-area {
      width: 260px;
      height: 100%;
      text-align: center;
      font-family: 'Microsoft YaHei';
      margin: -16px;
      &-title {
        margin-top: 22px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 18px;

      }
      &-feature {
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin: 12px 5px;
      }
      &-button {
        margin-bottom: 20px;
      }
      &-tag {
        margin-bottom: 20px;
      }
    }
  }

  .mat-card:first-child {
    margin-left: 0px;
  }

  .mat-card:hover .mat-card-area-button {
    color: white;
    background: linear-gradient(to right, #02e8ab, #37bad0);
    border: none;
  }

  .info-area {
    background: white;
    border-radius: 4px;
    margin: 40px 80px;
    height: 176px;
    display: flex;
    align-items: center;
    box-shadow: 0px 40px 35px 0px rgba(0, 0, 0, 0.1);
    &-card {
      display: flex;
      flex-direction: column;
      flex: 1
    }
    &-title {
      font-family: 'Microsoft YaHei';
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85)
    }
    &-info {
      font-family: 'Microsoft YaHei';
      font-size: 54px;
      color: #2ec1bd;
      font-weight: bold;
      border-right: 1px rgba(0, 0, 0, 0.1) solid
    }
  }

  .cooper-img {
    background: white;
    width: 150px;
    height: 86px;
    padding: 18px 26px;
    display: inline-block;
    margin: 24px 28px 0px 0px;
    box-shadow: 0px 40px 35px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .image-unchecked {
    height: 5px;
    width: 7.6px;
    display: inline-block;
    margin-right: 8px;
    background-image: url(../../assets/demand/unchecked.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    border-radius: 3px;
    cursor: pointer;
  }

  .image-checked {
    width: 29.2px;
    background-image: url(../../assets/demand/checked.png);
  }

</style>
<style>

</style>
