<template>
  <div>
    <div class="track-cont" style="width:100%;height:590px;">
      <div class="track" style="width:1300px;height:558px;margin:0 auto;background-color:#fff;color:#000">
        <div style="padding-top:103px;text-align:center">
          <p style="font-size:36px"><span style="font-weight:bold">轨迹</span>碳表盘</p>
          <p style="letter-spacing:11px;font-size:14px;opacity:0.45;font-family:STXihei;">TRACE CALCULATE</p>
        </div>
        <div>
          <router-link class="waybill-box" to="waybill" style="float:left">
            <img src="../../assets/logistics/waybill-ico.png" alt="" style="position:absolute;top:34px;left:88px;">
            <div>
              <div style="padding:128px 74px 0 74px;">
                <div style="line-height:20px;font-size:20px">输入<span style="font-weight:bold">运单号</span>，查询已发生业务</div>
                <div style="margin-top:10px;line-height:10px;font-size:12px;opacity:0.45;font-family:STXihei;">CALCULATE BY WAYBILL</div>
                <div style="margin-top:34px;line-height:24px;opacity:0.85">通过输入已发生业务运单号，对<span style="font-weight:bold">实际路由轨迹</span>或<span style="font-weight:bold">对应包装</span>碳排放进行估算。</div>
              </div>
            </div>
          </router-link>
          <router-link class="waybill-box" to="SendInfo" style="float:left">
            <img src="../../assets/logistics/sendinfo-ico.png" alt="" style="position:absolute;top:34px;left:88px;">
            <div>
              <div style="padding:128px 74px 0 74px;">
                <div style="line-height:20px;font-size:20px">选择<span style="font-weight:bold">寄递信息</span>，查询未发生业务</div>
                <div style="margin-top:10px;line-height:10px;font-size:12px;opacity:0.45;font-family:STXihei">CALCULATE BY SHIPPING INFORMATION</div>
                <div style="margin-top:34px;line-height:24px;opacity:0.85">通过选择<span style="font-weight:bold">寄递省份-城市信息</span>，进行<span style="font-weight:bold">路由轨迹</span>的碳排放估算，结果可显示该流向时效产品碳排放数据。</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>  
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
}
</script>

<style lang="less" scoped>
.track-cont {
  background: url("../../assets/bg.png") no-repeat 0 -249px;
}
.track {
  .ivu-menu {
    height: 253px;
    margin: 35px 65px 0 65px;
    .ivu-menu-item {
      width: 572px;
      color: #000;
      padding: 0;
      box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
      div {
        .round {
          z-index: 10;
          width: 70px;
          height: 70px;
          margin-left: 50px;
          background: url("../../assets/logistics/sendinfo-ico.png") no-repeat
            10px 5px;
          border-radius: 50%;
        }
      }
    }
  }
  .waybill-box {
    display: inline-block;
    position: relative;
    width: 617px;
    height: 298px;
    background: url("../../assets/logistics/waybill_out.png") no-repeat 0 0;
    color: #000;
  }
  .waybill-box:hover {
    background-image: url("../../assets/logistics/waybill_hover.png");
  }
}
</style>