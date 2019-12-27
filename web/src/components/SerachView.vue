<template>
  <div style="width: 200px;float: right;margin-right: 100px;position: relative">
    <Input v-model="searchWord" placeholder="托寄物名称/物资名称、代码" search style="color: rgba(0,0,0,0.85)"
           :class="{input:isTransparent,icon:searchHintShow}"
           @on-change="searchInputChange"
           @on-focus="searchInputFocus"
           @on-search="searchSubmit"
           @on-blur="searchInputBlur"/>
    <div class="ivu-select-dropdown" v-show="searchHintShow"
         style="transform-origin: center top 0px; position: absolute; will-change: top, left;"
         x-placement="bottom-start">
      <ul class="ivu-select-not-found" v-show="!isLoading&&searchHintList.length==0">
        <li>无匹配数据</li>
      </ul>
      <ul class="ivu-select-dropdown-list" v-show="!isLoading&&searchHintList.length>0">
        <li v-for="(item,index) in searchHintList" :key="index" class="ivu-select-item" @click="itemClick(item)">{{item}}</li>
      </ul>
      <ul class="ivu-select-loading" v-show="isLoading">加载中</ul>
    </div>
  </div>
</template>
<script>
  import { searchHint } from '@/api/search.js'

  export default {
    props: ['isTransparent'],
    data() {
      return {
        searchWord: '',
        searchHintList: [],
        searchHintShow: false,
        isLoading: false
      }
    },
    created() {
    },
    methods: {
      searchInputBlur() {
        setTimeout(() => {
          this.searchHintShow = false
        }, 200)

      },
      searchInputFocus() {
        this.searchHintShow = true
      },
      searchInputChange() {
        this.searchHintShow = true
        if (this.searchWord) {
          this.isLoading = true
          searchHint({ searchTxt: this.searchWord }).then(response => {
            this.searchHintList = response.data
            this.isLoading = false
          }).catch(() => {
            this.isLoading = false
          })
        } else {
          this.searchHintList = []
        }
      },
      searchSubmit() {
        this.searchHintShow = false
        if (this.searchWord) {
          this.$router.replace({ name: 'SearchList', query: { searchWord: this.searchWord } })
        }
      },
      itemClick(item) {
        this.searchWord = item
        this.searchSubmit()
      }
    }
  }
</script>
<style scoped lang="less">

  .input /deep/ .ivu-input {
    border: none;
  }

  .input /deep/ .ivu-input:focus {
    border:none;
    box-shadow:  2px 2px 5px rgba(43, 199, 198, 0.5) inset
  }

    /deep/ .ivu-input:focus {
    box-shadow: 2px 2px 5px rgba(43, 199, 198, 0.5)
  }

  .icon /deep/ .ivu-input-icon {
    color: rgb(43, 199, 198);
  }

</style>