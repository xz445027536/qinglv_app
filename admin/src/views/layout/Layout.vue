<template>
  <div>
    <!--<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">-->

      <!--<div class="main-container">-->
        <!--<navbar></navbar>-->

      <!--</div>-->
    <!--</div>-->

    <el-container>
      <el-aside width="240px">
        <sidebar class="sidebar-container"></sidebar>
      </el-aside>

      <el-container>
        <el-header style="height: 64px;" class="header-container">
          <span style="font-size: 24px;"><b>智慧包装管理平台</b></span>
          <span class="fill-remain"></span>
          <el-popover
            placement="top-start"
            trigger="hover">
            <div v-if="messageData.newAmt>0">
              你有{{messageData.newAmt}}个需求待处理  <el-button type="text" @click="goDemand('0')">查看</el-button>
            </div>
            <div v-if="messageData.rejectAmt>0">
              你有{{messageData.rejectAmt}}个方案被驳回  <el-button type="text" @click="goDemand('1')">查看</el-button>
            </div>
            <div v-if="messageData.rejectAmt==0&&messageData.newAmt==0">
              暂无通知消息！
            </div>
            <div style="margin-right: 10px;cursor: pointer" slot="reference">
              <i class="el-icon-bell" style="color: white;font-size: 20px"></i>
              <el-badge v-if="messageCount>0" :value="messageCount" :max="99" style="margin-top: -20px;margin-left: -10px"></el-badge>
            </div>
          </el-popover>

          <div style="font-size: small">
            <span style="margin-right: 10px;">{{username}}</span>
            <span style="margin-right: 10px;">{{currentRoleName$}}</span>
            <span style="cursor: pointer;" @click="logout">退出</span>
          </div>
        </el-header>

        <el-main>
          <app-main></app-main>
        </el-main>
        <el-footer style="text-align: center; font-size: 13px; margin-top: 24px;">Copyright © 2018 顺丰科技</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'
import { fetchDemandData } from '@/api/demand'
import CAS from '../../utils/casLogin'
// import { loadMenu } from '../../api/menu'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  data() {
    return {
      messageData: {
        newAmt: 0,
        rejectAmt: 0
      },
      messageCount: 0
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'getDemandData'
  },
  created() {
    this.getDemandData()
  },
  computed: {
    username() {
      return this.$store.state.user.name
    },
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  methods: {
    handCommand(command) {
      switch (command) {
        case '1':
          this.logout()
          break
      }
    },
    getDemandData() {
      if (this.currentUserRole$ !== '1') { // app管理员不显示需求通知
        fetchDemandData({ 'jumpPage': 1, 'pageSize': 10 }).then(res => {
          this.messageData = res.data
          this.messageCount = this.messageData.newAmt + this.messageData.rejectAmt
        })
      }
    },
    goDemand(checkType) {
      this.$router.replace({ name: 'demandManagement', query: { checkType: checkType }})
    },

    logout() {
      CAS.casLogout()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import 'src/styles/mixin.scss';
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .layout-container {
    display: flex;
    flex-direction: row;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  .el-header {
    background-color: rgb(48, 65, 86);
    color: #333;
    line-height: 60px;
  }

  .header-container {
    padding: 0 32px 0 16px;
    display: -ms-flex;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    span, a {
      color: white;
    };
  }

  .el-aside {
    color: #333;
    width: 240px;
  }
</style>
