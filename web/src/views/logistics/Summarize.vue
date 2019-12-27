<template>
  <div>
    <nav-layout></nav-layout>
    <div class="summarize" style="width:1440px;height:975px;">
      <div class="sum-cont" style="width:1300px;height:100%;margin:0 auto;">
        <div class="summar-nav" style="width:100%;height:320px;text-align:center;padding-bottom:25px">
          <router-link to="/logistics/track/board" style="margin-right:7px" @mouseover.native="isShow" @mouseout.native="isNone" tag="div" class="router-link">
            <img :src="imgUrl" alt="">
            <div class="chinese">
              <span :style="FontWeight">轨迹</span>碳表盘
            </div>
            <div class="english">TRACE CALCULATE</div>
            <div class="content" v-if="ContentShow">通过考虑每批货物的路线、运输方式等实际操作数据，然后基于特定排放因子，可以估算碳排放量。</div>
            <img src="../../assets/summarize/arrows-hover.png" alt="" style="width:58px;height:58px" v-else>
          </router-link>
          <router-link to="/logistics/Pack/skip" style="margin-right:6px" tag="div" class="router-link" @mouseover.native="isShow1" @mouseout.native="isNone1">
            <img :src="imgUrl1" alt="">
            <div class="chinese"><span :style="FontWeight1">包装</span>碳表盘</div>
            <div class="english">PACKING CALCULATE</div>
            <div class="content" v-if="ContentShow1">匹配智慧包装服务平台，通过输入托寄物名称或品类，匹配方案库包装方案，可以估算对应包装材料碳排放量。</div>
            <img src="../../assets/summarize/arrows-hover.png" alt="" style="width:58px;height:58px" v-else>
          </router-link>
          <router-link to="/logistics/Solution" style="margin-right:7px" tag="div" class="router-link">
            <img src="../../assets/summarize/carbon-reduction.png" alt="">
            <div class="chinese" style="opacity:0.45">绿色减排方案</div>
            <div class="english" style="opacity:0.45">GREEN LOGISTIC S0LUTIONS</div>
            <div class="content" style="opacity:0.45">(敬请期待)</div>
          </router-link>
          <router-link to="/logistics/Reporter" tag="div" class="router-link">
            <img src="../../assets/summarize/carbon-emissions.png" alt="">
            <div class="chinese" style="opacity:0.45">碳排放报告</div>
            <div class="english" style="opacity:0.45;text-align:center">CARBON REPORT</div>
            <div class="content" style="opacity:0.45">(敬请期待)</div>
          </router-link>
        </div>  
        <div style="height:629px;background-color:#fff;color:#000;opacity:0.85;">
          <div class="clearfix" style="padding-top:78px;">
            <div style="float: left;width:700px;margin-left:64px;">
              <div style="position:relative;width:700px">
                <img src="../../assets/icon_rectangle.png" alt="" style="position:absolute;top:5px;left:5px;width:12px">
                <div>
                  <span style="margin-top:40px;margin-left:15px;font-size:20px;line-height:50px;opacity:0.85;">概述</span>
                  <span style="margin-left:6px;font-size:18px;opacity:0.2;">Overview</span>
                </div>
                <div style="width:42px;height:4px;margin-left:16px;background:linear-gradient(90deg,rgba(55,186,208,1),rgba(0,232,171,1));"></div>
              </div>
              <div style="width:674px;margin-left:30px;margin-top:30px;font-size:16px;line-height:26px;opacity:0.85;">
                快递行业总量增长迅速，妥善处理快递包装问题，优化货物的路线、运输方式，对于节约资源，保护环境和促进快递行业健康可持续发展具有重要意义。<br><br>
                我们作为快递行业的领先者，主动承担社会责任，开展绿色环保设计大赛，传播和倡导顺丰节约资源、保护环境的绿色速递使命。<br><br>
                我们通过绿色包装产品的研发与创新，在绿色包装、可循环包装、绿色物流运输上全面开展绿色研发、使用计划，将绿色环保贯通整个快递环节。
              </div>
            </div>
            <img src="../../assets/summarize/tu.png" alt="" style="float:right;padding-top:20px">
          </div>
          <div style="height:153px;margin-top:38px;background:linear-gradient(90deg,rgba(55,186,208,1) 0%,rgba(0,232,171,1) 100%);">
            <div style="float:left;width:256px;height:100%;margin-left:64px;padding-top:25px;color:#fff;">
              <div style="height:60px;font-size:48px;line-height:60px;font-family:STXihei;">Contact us</div>
              <div style="height:20px;margin-top:-5px;font-size:16px;opacity:0.6;letter-spacing:10px;">联系我们</div>
            </div>
            <div style="float:left;height:100%;margin-left:340px;padding-top:20px;color:#fff;font-family:STXihei;">
              <img src="../../assets/summarize/job-number.png" alt="" style="margin-left:-4px">
              <div style="font-size:14px;opacity:0.6">CONTACT</div>
              <div style="font-size:14px;opacity:0.6">联系人</div>
              <div style="font-size:24px;">苏工</div>
            </div>
            <div style="float:right;height:100%;margin-right:64px;padding-top:20px;color:#fff;font-family:STXihei;">
              <img src="../../assets/summarize/email.png" alt="" style="margin-left:-4px">
              <div style="font-size:14px;opacity:0.6">E-MAIL</div>
              <div style="font-size:14px;opacity:0.6">邮箱</div>
              <div style="font-size:24px;">suzhaohua@sfmail.sf-express.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavLayout from "../navlayout/NavLayout";
export default {
  components:{NavLayout},
  data() {
    return {
      FontWeight:'',
      imgUrl:require('../../assets/summarize/track-out.png'),
      ContentShow:true,
      FontWeight1:"",
      imgUrl1:require('../../assets/summarize/packged-out.png'),
      ContentShow1:true
    }
  },
  methods:{
    isShow(){
      this.imgUrl=require('../../assets/summarize/track-hover.png');
      this.FontWeight="font-weight:bold";
      this.ContentShow=false;
    },
    isNone(){
      this.imgUrl=require('../../assets/summarize/track-out.png');
      this.FontWeight="font-weight:normal";
      this.ContentShow=true;
    },
    isShow1(){
      this.imgUrl1=require('../../assets/summarize/packgrd-hover.png')
      this.FontWeight1="font-weight:bold"
      this.ContentShow1=false
    },
    isNone1(){
      this.imgUrl1=require('../../assets/summarize/packged-out.png')
      this.FontWeight1="font-weight:normal"
      this.ContentShow1=true
    }
  }
}
</script>
<style lang="less" scoped>
  .summarize{background:url('../../assets/bg.png') no-repeat 0 -249px;}
  .sum-cont {
    .summar-nav{
      .router-link{
        float: left;
        width:320px;
        height:100%;
        background-color:#fff;
        box-shadow:0px 4px 15px 0px rgba(0, 0, 0, 0.1);
        color:#000;
        cursor: pointer;
        img{
          width:66px;
          height:66px;
          margin-top:45px
        }
        div.chinese{
          margin-bottom:10px;
          font-size:20px;
          line-height:20px;
        }
        div.english{
          line-height:10px;
          font-size:12px;
          font-family:STXihei;
          opacity:0.85;
        }
        div.content{
          width:250px;
          height:61px;
          margin:30px auto 0;
          line-height:24px;
          font-size:12px;
          opacity:0.45;
        }
      }
      .router-link:hover{
        color: #000;
        border-bottom:5px solid #2ec1bd;
        box-shadow:0px 0px 23px 0px rgba(43,199,198,0.5);
      }
    }  
    .clearfix:after{
      content: "";
      display: block;
      clear: both;
    }
  }
</style>