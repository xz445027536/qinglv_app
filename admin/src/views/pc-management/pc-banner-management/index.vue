<template>
  <div class="page-content">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Banner 配置" name="banner">
        <div>
          <app-banner></app-banner>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Banner from './banner'

  export default {
    name: 'home-configuration',
    components: {
      'app-banner': Banner
    },
    data() {
      return {
        activeName: 'banner'
      }
    }
  }
</script>
