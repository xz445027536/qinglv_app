<template>
  <div class="tag-container">
    <span><slot></slot></span>
  </div>
</template>

<script>
  export default {
    name: 'SchemeTag',
    props: ['tagData'],
    data() {
      return {}
    },
    created() {
    },
    methods: {}
  }
</script>

<style scoped>
  .tag-container {
    display: inline-block;
    /*height: 20px;*/
    /*line-height: 20px;*/
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
    margin: 2px 4px 2px 0;
    padding: 2px 8px;
    background: #f5f8fe;
    white-space: nowrap;
    border-radius: 25px;
    font: 8px 'Microsoft YaHei';
    /*transform: scale(0.8);*/
    color: #1ec9c2;
  }
</style>