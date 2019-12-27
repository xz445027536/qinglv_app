<template>
  <div>
    <nav-layout></nav-layout>
    <div class="reporter-cont">
      <div class="reporter" style="width:1300px;height:893px;margin:0 auto">
        <div style="height:476px;background-color:#fff;text-align:center;color:#000;opacity:0.85">
          <div style="padding-top:103px;font-size:36px;"><span style="font-weight:bold;">碳排放</span>报告</div>
          <div style="opacity:0.45;letter-spacing:11px;">CARBON REPORT</div>
          <div style="padding:55px 200px 68px;opacity:0.45">
            <ul class="clearfix" style="list-style:none">
              <li>
                <img src="../../assets/logistics/way_ico.png" alt="" style="width:94px;">
                <div style="font-size:20px">路线轨迹</div>
                <div style="opacity:0.45;">ROUTE TRACK</div>
                <div style="margin-top:12px;">（敬请期待）</div>
              </li>
              <li>
                <img src="../../assets/logistics/transportation_ico.png" alt="" style="width:94px;">
                <div style="font-size:20px">运输方式</div>
                <div style="opacity:0.45;">TRANSPORTATION</div>
                <div style="margin-top:12px;">（敬请期待）</div>
              </li>
              <li>
                <img src="../../assets/logistics/shipments_ico.png" alt="" style="width:94px;">
                <div style="font-size:20px">包材物料</div>
                <div style="opacity:0.45;">PACK MATERIALS</div>
                <div style="margin-top:12px;">（敬请期待）</div>
              </li>
              <li>
                <img src="../../assets/logistics/pack_ico.png" alt="" style="width:94px;">
                <div style="font-size:20px">减排数据</div>
                <div style="opacity:0.45;">EMISSION REDUCTION</div>
                <div style="margin-top:12px;">（敬请期待）</div>
              </li>
            </ul>
          </div>
          <!-- <div style="width:1169px;margin:0 auto ;font-size:16px;text-align:left">
            <div style="line-height:30px;">碳排放权交易既是应对气候变化的重要市场工具，也是治理雾霾等污染问题、改善环境质量的长效机制。在碳交易基础上发展起来的碳金融市场，还可以发展成为低碳融资的新途径，为推动绿色产业成长提供新的金融支持，也为要素市场开辟新的增长空间。随着《巴黎协定》正式生效、七省市碳排放权交易试点的不断深化和全国碳排放权交易体系启动，中国碳市场建设已经进入崭新阶段。</div>
            <div style="margin-top:30px">设计精确可靠的碳报告方法。通过考虑没批货物的线路、运输方式、发货重量等实际操作数据，然后基于企业特定排放因子，可以给对象最优的二氧化碳计算，输出碳排放报告。</div>
          </div> -->
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
</template>
<script>
import NavLayout from '../navlayout/NavLayout'
export default {
  components:{NavLayout},
  data(){
    return{}
  }
}
</script>
<style  scoped>
  .reporter-cont{
    height:720px;
    background:url('../../assets/bg.png') no-repeat 0 -249px;
  }
  .clearfix::after{
    content: "";
    display: block;
    clear: both;
  }
  ul{
    list-style:none;
  }
  li{
    float: left;
    width:180px;
  }
  li+li{
    margin-left:60px;
  }
</style>