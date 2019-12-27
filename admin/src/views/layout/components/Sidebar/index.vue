<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      unique-opened
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#409EFF">
      <div class="logo-container">
        <div class="logo">
          <img :src="titlePic" style="width: 36px; height: 36px;">
        </div>
      </div>
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  import ScrollBar from '@/components/ScrollBar'
  import titlePic from '../../../../assets/title.png'

  export default {
    components: { SidebarItem, ScrollBar },
    data() {
      return {
        titlePic
      }
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      routes() {
        return this.$router.options.routes
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style scoped>
  .logo-container {
    height: 64px;
    /*border-radius: 6px;*/
    /*background: #d3dce6;*/
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .logo {
    height: 48px;
    /*width: 224px;*/
    /*width: 160px;*/
    width: 48px;
    border-radius: 6px;
    background: #2E3B4C;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
