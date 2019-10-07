<template>
  <div class="myheader">
    <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
    <mt-field placeholder="请输入景点名称"></mt-field>
    <mt-button @click="search">搜索</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    search() {}
  }
};
</script>

<style lang="scss">
.myheader {
  display: flex;
  height: 1rem;
  background-color: #1296db;
  button {
    height: 100%;
    background-color: transparent;
    box-shadow: none;
    color: #fff;
  }
  .mint-cell {
    flex: 1;
    box-sizing: border-box;
    height: 0.8rem;
    min-height: 0;
    margin-top: .1rem;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    line-height: 0.8rem;
    .mint-cell-wrapper {
      padding-left: 0;
      .mint-cell-value {
        padding: 0.1rem .2rem;
        font-size: 0.3rem;
        input::-webkit-input-placeholder {
          color: #aaa;
        }
      }
    }
  }
  .mint-button {
    font-size: 0.3rem;
    padding: 0 0.1rem;
  }
  .mint-button:not(.is-disabled):active::after{
    opacity: 0;
  }
}
</style>