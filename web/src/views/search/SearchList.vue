<template>
  <div class="search-area">
    <Spin v-if="isLoading" fix>
      <Icon type="ios-loading" size=large  class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>

    <div>
      <div v-if="total > 0">
        <div style="display: inline-flex;margin-bottom: 32px; margin-left: -12px;">
          <row-title :title-cn="`${goodName}`"
                     :title-en="goodEnglishName"></row-title>
          <span style="font: bold 20px 'Microsoft YaHei';color: rgba(0, 0, 0, 0.85);margin-top: 12px;line-height: 20px">({{total}})</span>
        </div>
        <div class="scheme-flex-container">
          <GoodVerticalCard
            v-for="(item, index) in goodList"
            :style="{ marginRight: index % 4 === 3 ? '0' : '15px'}"
            :key="item.solutionId"
            :item="item"
            :show-price="true"
            :show-id="true"></GoodVerticalCard>
        </div>

        <div class="page-flex-container">
          <Page @on-change="handlePageChange" :page-size="pageSize" :total="total" show-total show-elevator/>
        </div>

      </div>

      <div v-else style="height: 90%; width: 985px; margin-top: 12px; background-color: white;">
        <div class="center-column-flex-container" style="height: 100%;min-height: 700px">
          <img src="../../assets/scheme/bg_empty.png" alt="暂时没有方案">
          <span class="empty-text">很抱歉没有符合条件的结果</span>
          <span class="empty-text">请修改搜索词或筛选条件</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RowTitle from '../../components/RowTitle'
  import GoodVerticalCard from '../../components/GoodVerticalCard'
  import { searchList } from '@/api/search.js'

  export default {
    data() {
      return {
        goodName: this.$route.query.searchWord,
        goodEnglishName: '', // 英文 title 暂无
        isLoading: true,
        goodList: [],
        currentPage: 1,
        pageSize: 20,
        total: 0
      }
    },
    components: {
      RowTitle,
      GoodVerticalCard
    },
    watch: {
      $route: {
        handler(to) {
          this.goodName = to.query.searchWord
          this.currentPage = 1
          this.getSearchList(to.query.searchWord)
        }, immediate: true
      }
    },
    methods: {
      getSearchList(searchWord) {
        this.isLoading = true
        searchList({
          searchTxt: searchWord,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }).then((res) => {
          this.isLoading = false
          this.total = res.data.total
          if (this.total > 0) {
            this.goodList = res.data.list
          } else {
            this.goodList = []
          }
        }).catch(err => {
          this.isLoading = false
          console.log('getSearchList: ', err)
        })
      },
      handlePageChange(currentPage) {
        this.currentPage = currentPage
        this.getSearchList(this.goodName)
      }
    }
  }
</script>

<style scoped>
  .search-area {
    background-image: url('../../assets/bg_demand.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    min-height: 945px;
    display: flex;
    justify-content: center;
    position: relative;
    overflow: auto !important;
    padding-top: 20px;
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  .scheme-flex-container {
    display: flex;
    width: 1045px;
    flex-wrap: wrap;
    /*justify-content: center;*/
  }

  .page-flex-container {
    margin-top: 12px;
    height: 70px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .empty-text {
    font: 24px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.2);
  }
</style>