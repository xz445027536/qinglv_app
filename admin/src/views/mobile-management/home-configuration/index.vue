<template>
  <div class="page-content">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="Banner 配置" name="banner">
        <div>
          <app-banner></app-banner>
        </div>
      </el-tab-pane>
      <el-tab-pane label="热门方案配置" name="hot">
        <hot-programme></hot-programme>
      </el-tab-pane>
      <el-tab-pane label="特色包材配置" name="special">
        <pkg-material></pkg-material>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Banner from './banner'
  import Programme from './programme'
  import Material from './material'
  import PkgMaterial from './material.vue'

  export default {
    name: 'home-configuration',
    components: {
      PkgMaterial,
      'app-banner': Banner,
      'hot-programme': Programme,
      'pkg-material': Material
    },
    data() {
      return {
        activeName: 'banner'
      }
    },
    created() {
    },
    methods: {
      handleTabClick(tabInstance) {
        // console.log('tabInstance: ', tabInstance)
      }
    }
  }
</script>

<style scoped>
  .flex-tab {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>