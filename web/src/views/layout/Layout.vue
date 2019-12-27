<template>
  <div class="layout">
    <Layout style="background: #f9f9f9">
      <!--顶栏模块-->
      <div class="header-title" :class="headerTransparent?'header-transparent':''">
        <div class="header-content">
          <img @click="toHomePage" src="../../assets/layout/icon_logo.png"
               style="height: 29px;margin-left: 70px; cursor: pointer;">
          <Menu mode="horizontal" :activeName="activeTab" style="margin-left: 90px; font-weight: bold;min-width: 500px">
            <MenuItem name="1" to="/">首页</MenuItem>
            <MenuItem name="2" to="/scheme/schemeLibrary">方案库</MenuItem>
            <MenuItem v-if="currentUserRole$ === '1' || currentUserRole$ === '5'" name="3" to="/demand/demandList">
              我的需求
            </MenuItem>
            <MenuItem v-if="currentUserRole$ === '1' || currentUserRole$ === '5'" name="4" to="/demand/newDemand">
              需求上报
            </MenuItem>
            <MenuItem name="5" to="/logistics/Summarize">绿色物流</MenuItem>
          </Menu>
          <div style="flex: 1">
            <search-view :isTransparent="headerTransparent"></search-view>
          </div>
          <template v-if="headerTransparent">
            <Tooltip placement="bottom" theme="light" style="height: 14px; margin-right: 10px;">
              <img @click="toMyFavorite" style="cursor: pointer;" width="14" height="14" src="../../assets/scheme/icon_favorite_white.png" alt="我的收藏">
              <div slot="content">我的收藏</div>
            </Tooltip>
            <Tooltip placement="bottom-start" theme="light" style="height: 14px">
              <div style="cursor: pointer;height: 14px">
                <img src="../../assets/layout/icon_notice_white.png" v-if="messageCount==0">
                <Badge :count="messageCount" v-if="messageCount>0">
                  <img src="../../assets/layout/icon_notice_white.png">
                </Badge>
              </div>
              <div slot="content" style="width: 12em">
                <div v-if="messageData.replied>0" class="message">
                  你有<span style="color: #2bc7c6; padding: 0 1px; cursor: pointer"
                          @click="goDemandList('0')">{{messageData.replied}}个</span>需求被回复
                  <Icon class="forward-icon" type="ios-arrow-forward" @click="goDemandList('0')"/>
                </div>
                <div v-if="messageData.rejected>0" class="message">
                  你有<span style="color: #2bc7c6; padding: 0 1px; cursor: pointer"
                          @click="goDemandList('1')">{{messageData.rejected}}个</span>方案被驳回
                  <Icon class="forward-icon" type="ios-arrow-forward" @click="goDemandList('1')"/>
                </div>
                <div v-if="messageData.pendingConfirm>0" class="message">
                  你有<span style="color: #2bc7c6; padding: 0 1px; cursor: pointer"
                          @click="goDemandList('2')">{{messageData.pendingConfirm}}个</span>方案待确认
                  <Icon class="forward-icon" type="ios-arrow-forward" @click="goDemandList('2')"/>
                </div>
                <div v-if="messageData.ended>0" class="message">
                  你有<span style="color: #2bc7c6; padding: 0 1px; cursor: pointer"
                          @click="goDemandList('3')">{{messageData.ended}}个</span>需求已完成
                  <Icon class="forward-icon" type="ios-arrow-forward" @click="goDemandList('3')"/>
                </div>
                <div
                  v-if="messageData.pendingConfirm==0&&messageData.replied==0&&messageData.rejected==0&&messageData.ended==0">
                  暂无通知消息！
                </div>
              </div>
            </Tooltip>
            <span style="margin:0 10px">{{username}}</span>
            <div style="line-height: 18px;cursor: pointer;min-width: 67px" v-if="currentUserRole$ != '5'">
              <a :href="adminUrl" target="view_window">
                <img src="../../assets/layout/icon_admin_white.png" style="vertical-align: middle">
                <span style="margin-left: 5px;vertical-align: middle;color: white;">进入后台</span>
              </a>
            </div>
            <div style="border-left: 1px white solid;height: 9px;margin: 0 10px;vertical-align: middle"></div>
            <div style="margin-right: 70px;cursor: pointer;min-width: 43px" @click="logout">
              <img src="../../assets/layout/icon_logout_white.png" style="vertical-align: middle">
              <span style="margin-left: 5px;vertical-align: middle">退出</span>
            </div>
          </template>

          <template v-else>
            <!-- <a style="margin-right: 10px;" :href="adminUrl" target="view_window">
              &lt;!&ndash;<img width="14" height="14" src="../../assets/scheme/icon_favorite_2x.png" style="vertical-align: middle">&ndash;&gt;
              <img width="14" height="14" src="../../assets/scheme/icon_favorite.png">
            </a> -->
            <Tooltip placement="bottom" theme="light" style="height: 14px; margin-right: 10px;">
              <img @click="toMyFavorite" style="cursor: pointer;" width="14" height="14" src="../../assets/scheme/icon_favorite.png" alt="我的收藏">
              <div slot="content">我的收藏</div>
            </Tooltip>
            <Tooltip placement="bottom-start" theme="light" style="height: 14px">
              <div style="cursor: pointer;height: 14px">
                <img src="../../assets/layout/icon_notice_green.png" v-if="messageCount==0">
                <Badge :count="messageCount" v-if="messageCount>0">
                  <img src="../../assets/layout/icon_notice_green.png">
                </Badge>
              </div>
              <div slot="content" style="width: 12em">
                <div v-if="messageData.replied>0" class="message">
                  你有<span style="color: #2bc7c6; padding: 0 1px; cursor: pointer"
                          @click="goDemandList('0')">{{messageData.replied}}个</span>需求被回复
                  <Icon class="forward-icon" type="ios-arrow-forward" @click="goDemandList('0')"/>
                </div>
                <div v-if="messageData.rejected>0" class="message">
                  你有<span style="color: #2bc7c6; padding: 0 1px; cursor: pointer"
                          @click="goDemandList('1')">{{messageData.rejected}}个</span>方案被驳回
                  <Icon class="forward-icon" type="ios-arrow-forward" @click="goDemandList('1')"/>
                </div>
                <div v-if="messageData.pendingConfirm>0" class="message">
                  你有<span style="color: #2bc7c6; padding: 0 1px; cursor: pointer"
                          @click="goDemandList('2')">{{messageData.pendingConfirm}}个</span>方案待确认
                  <Icon class="forward-icon" type="ios-arrow-forward" @click="goDemandList('2')"/>
                </div>
                <div v-if="messageData.ended>0" class="message">
                  你有<span style="color: #2bc7c6; padding: 0 1px; cursor: pointer"
                          @click="goDemandList('3')">{{messageData.ended}}个</span>需求已完成
                  <Icon class="forward-icon" type="ios-arrow-forward" @click="goDemandList('3')"/>
                </div>
                <div
                  v-if="messageData.pendingConfirm==0&&messageData.replied==0&&messageData.rejected==0&&messageData.ended==0">
                  暂无通知消息！
                </div>
              </div>
            </Tooltip>
            <span style="margin:0 10px;color: gray">{{username}}</span>
            <div style="line-height: 18px;cursor: pointer;min-width: 67px" v-if="currentUserRole$ != '5'">
              <a :href="adminUrl" target="view_window">
                <img src="../../assets/layout/icon_admin_green.png" style="vertical-align: middle">
                <span style="margin-left: 5px;vertical-align: middle;color: gray">进入后台</span>
              </a>
            </div>
            <div style="border-left: 1px gray solid;height: 9px;margin: 0 10px;vertical-align: middle"></div>
            <div style="margin-right: 70px;cursor: pointer;min-width: 43px" @click="logout">
              <img src="../../assets/layout/icon_logout_green.png" style="vertical-align: middle">
              <span style="margin-left: 5px;vertical-align: middle;color: gray">退出</span>
            </div>
          </template>
        </div>
      </div>
      <!--页面内容模块-->
      <Content style="margin-top: 60px;width: 1440px;margin-left: auto;margin-right: auto">
        <!--<keepAlive include="DemandList">-->
        <!--<router-view :key="key"/>-->
        <!--</keepAlive>-->
        <!--<router-view :key="key"/>-->
        <router-view v-if="isRouterAlive"/>
      </Content>
      <!--页脚模块-->
      <Footer class="center-column-flex-container" style="background: white;">
        <!-- <div style="margin-bottom: 8px;">
          <img style="width:36px;cursor: pointer;" src="../../assets/layout/bottom_icon_wechat.png" alt="微信">
          <img style="width:36px;margin-left: 20px; cursor: pointer;" src="../../assets/layout/bottom_icon_email.png" alt="邮箱">
          <img style="width:36px;margin-left: 20px; cursor: pointer;" src="../../assets/layout/bottom_icon_weibo.png" alt="微博">
        </div> -->
        <div class="copyright-text">
          <p>ICP 2020 &copy; 顺丰科技 版权所有</p> 
        </div>
      </Footer>
      <!--回到顶部与意见反馈模块-->
      <feedback></feedback>
    </Layout>

  </div>
</template>

<script>
  import CAS from '../../utils/casLogin'
  import Feedback from '../../components/Feedback.vue'
  import SearchView from '../../components/SerachView.vue'
  import { getrequireCount } from '../../api/demand'

  export default {
    components: { Feedback, SearchView },
    computed: {

      key() {
        // if (this.$route.name == 'DemandList') {
        //   return this.$route.name
        // }
        return this.$route.name !== undefined ? `${this.$route.name}${+new Date()}` : `${this.$route}${+new Date()}`
      },
      username() {
        return this.$store.state.name
      }
    },
    data() {
      return {
        activeTab: '1',
        headerTransparent: false,
        adminUrl: process.env.VUE_APP_ADMIN_URL,
        messageData: {
          pendingConfirm: 0,
          rejected: 0,
          replied: 0,
          ended: 0
        },
        messageCount: 0,
        isRouterAlive: true,
        searchWord: ''
      }
    },
    watch: {
      '$route': 'routeChange'
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
      this.routeChange()
      this.getDemandCount()
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(() => (this.isRouterAlive = true))
      },
      toHomePage() {
        this.$router.push({
          name: 'Home'
        })
      },
      getDemandCount() {
        getrequireCount().then(res => {
          this.messageData = res.data
          this.messageCount = this.messageData.pendingConfirm + this.messageData.rejected + this.messageData.replied + this.messageData.ended
        }).catch(err => {
          console.log(err);
        })
      },
      goDemandList(checkType) {
        this.$router.replace({
          name: 'DemandList',
          params: { checkType: checkType, timestamp: Date.parse(new Date()) }
        })
        this.reload()
        // console.log(checkType);
      },

      toMyFavorite() {
        console.log('toMyFavorite')
        this.$router.push({
          name: 'MyFavorite'
        })
      },

      routeChange() {
        this.handleScroll()
        this.switchTab()
        this.getDemandCount()
      },
      switchTab() {
        if(this.$route.path.indexOf('logistics') !== -1){
          this.activeTab = '5'
        } else if (this.$route.path.indexOf('newDemand') !== -1) {
          this.activeTab = '4'
        } else if (this.$route.path.indexOf('demandList') !== -1) {
          this.activeTab = '3'
        } else if (this.$route.path.indexOf('schemeLibrary') !== -1) {
          this.activeTab = '2'
        } else {
          this.activeTab = '1'
        }
      },
      handleScroll() {
        this.headerTransparent = this.getScrollY() <= 60 && this.$route.name === 'HomePage';
      },
      //获取滚轮滚动的距离,适配所有的浏览器
      getScrollY() {
        return window.pageYOffset || document.documentElement.scrollTop
      },
      logout() {
        CAS.casLogout()
      }
    }
  }
</script>

<style scoped lang="less">
  .layout {
    /*position: absolute;*/
    /*overflow: hidden;*/
    /*top: 0;*/
    /*left: 0;*/
    /*bottom: 0;*/
    /*width: 100%;*/
    /*right: 0;*/
    /*overflow-y: scroll;*/
    /*min-width: 1280px;*/
    min-width: 1440px;
  }

  .header-title {
    background: white;
    position: fixed;
    box-sizing: inherit;
    z-index: 1000;
    width: 100%;
    height: 60px;
    font-family: "Microsoft YaHei";
    font-size: 12px;
    color: rgba(255, 255, 255, 0.85);
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1)
  }

  .header-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px auto;
    max-width: 1440px;
  }

  .header-transparent {
    background: transparent;
    box-shadow: none;
  }

  .copyright-text {
    font: 16px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.45);
  }

  .demo-badge {
    width: 20px;
    height: 20px;
    background: #eee;
    border-radius: 6px;
    display: inline-block;
  }

  .forward-icon {
    position: absolute;
    right: 1px;
    cursor: pointer;
    width: 12px;
    height: 12px;
    line-height: 1.5;
  }

  .forward-icon:hover {
    color: #2bc7c6;
  }

  .message {
    position: relative;
    margin: 8px 5px;
  }

</style>
