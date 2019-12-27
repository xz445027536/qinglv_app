<template>
  <div class="navlayout" :class="{ 'not-background-img': hideBackgoundImage }">
    <div
      style="width: 100%;height: 40px;line-height: 40px;box-shadow:0px 0px 25px 0px rgba(0, 0, 0, 0.15); min-width:500px;z-index: 2;"
    >
      <Menu mode="horizontal" :activeName="changeTab">
        <MenuItem name="1" to="/logistics/Summarize" style="margin-right:10px;">概述</MenuItem>
        <MenuItem name="2" to="/logistics/track/board" style="margin-right:10px;">轨迹碳表盘</MenuItem>
        <MenuItem name="3" to="/logistics/Pack/skip" style="margin-right:10px;">包装碳表盘</MenuItem>
        <MenuItem name="4" to="/logistics/Solution" style="margin-right:10px;opacity:0.45">绿色减排方案</MenuItem>
        <MenuItem name="5" to="/logistics/Reporter" style="opacity:0.45">碳排放报告</MenuItem>
      </Menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      changeTab: "1"
    };
  },
  watch: {
    $route: "routeTab"
  },
  computed: {
    hideBackgoundImage() {
      return (
        this.$route.name === "PackSchemeDetail" ||
        this.$route.name === "PackSchemeLibrary" ||
        this.$route.name === "PackClass" ||
        this.$route.name === "PackGood" ||
        this.$route.name === "PackGood2"
      );
    }
  },

  mounted() {
    this.routeTab();
  },
  methods: {
    routeTab() {
      this.activeTab();
    },
    activeTab() {
      let path = this.$route.path.toLowerCase();

      if (path.indexOf("reporter") >= 0) {
        this.changeTab = "5";
      } else if (path.indexOf("solution") >= 0) {
        this.changeTab = "4";
      } else if (path.indexOf("pack") >= 0) {
        this.changeTab = "3";
      } else if (path.indexOf("summarize") >= 0) {
        this.changeTab = "1";
      } else if (path.indexOf("track") >= 0) {
        this.changeTab = "2";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.navlayout {
  width: 1440px;
  height: 359px;
  margin: 0 auto;
  background: url("../../assets/summarize/banner.png") no-repeat 0 -60px,url("../../assets/bg.png") no-repeat 0 110px;
  div {
    position: relative;
    ul.ivu-menu {
      position: absolute;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
      .ivu-menu-item {
        height: 30px;
        margin-top: 5px;
        padding: 0 10px;
        line-height: 30px;
        border-bottom: none;
        color: #000;
      }
      .ivu-menu-item:hover,
      .ivu-menu-item-active {
        background: linear-gradient(
          45deg,
          rgba(55, 186, 208, 1) 0%,
          rgba(0, 232, 171, 1) 99%
        );
        border-radius: 2px;
        color: #fff;
        opacity: 1 !important;
      }
    }
  }

  &.not-background-img {
    background: none;
    height: 40px;
    box-shadow: 0 0 25px 0 rgba(0,0,0,.15);
    
  }
}
</style>