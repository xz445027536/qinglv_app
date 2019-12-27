<template>
  <div>
    <nav-layout></nav-layout>
    <div class="solution-cont">
      <div class="solution" style="width:1300px;height:629px;margin:0 auto">
        <div style="height:476px;background-color:#fff;text-align:center;color:#000;opacity:.85">
          <div style="padding-top:103px;font-size:36px"><span style="font-weight:bold">绿色减排</span>方案</div>
          <div style="opacity:0.45;letter-spacing:11px;">GREEN LOGISTIC S0LUTIONS</div>
          <div style="padding:55px 200px 68px;">
            <ul class="clearfix" style="list-style:none">
              <li>
                <img src="../../assets/logistics/router_ico.png" alt="" style="width:94px;">
                <div style="font-size:20px">路由优化</div>
                <div>ROUTE OPTIMIAZATION</div>
                <div style="margin-top:12px;">（敬请期待）</div>
              </li>
              <li>
                <img src="../../assets/logistics/car_ico.png" alt="" style="width:94px;">
                <div style="font-size:20px">新能源车</div>
                <div>NEW ENERGY VEHICLE</div>
                <div style="margin-top:12px;">（敬请期待）</div>
              </li>
              <li>
                <img src="../../assets/logistics/greenpack_ico.png" alt="" style="width:94px;">
                <div style="font-size:20px">绿色包装</div>
                <div>GREEN PACK</div>
                <div style="margin-top:12px;">（敬请期待）</div>
              </li>
              <li>
                <img src="../../assets/logistics/society_ico.png" alt="" style="width:94px;">
                <div style="font-size:20px">社会物流平台</div>
                <div>SOCIAL LOGISTICS PLATFROM</div>
                <div style="margin-top:12px;">（敬请期待）</div>
              </li>
            </ul>
          </div>
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
  data(){
    return{}
  },
  components:{NavLayout}
}
</script>
<style scoped>
  .solution-cont{
    height: 650px;
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
    position: relative;
    float: left;
    width:180px;
    opacity:0.45;
  }
  li+li{
    margin-left:60px;
  }
  li+li::before{
    position: absolute;
    top:50px;
    left:-40px;
    content:"";
    display: inline-block;
    width: 1px;
    height:82px;
    background-color:rgba(242,245,251,1);
  }
</style>