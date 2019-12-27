<template>
  <div style="position: relative">
    <Spin v-if="isLoading" fix>
      <Icon type="ios-loading" size=large class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>

    <div>
      <div v-if="total > 0">
        <row-title :cnFontSize="18" style="margin-bottom: 32px; margin-left: -12px;" :title-cn="goodName" :title-en="goodEnglishName"></row-title>
        <div class="scheme-flex-container">
          <GoodVerticalCard
            v-for="(item, index) in goodList"
            :style="{ marginRight: index % 4 === 3 ? '0' : '18px'}"
            :key="item.solutionId"
            :item="item"
            :show-price="true"
            detail-name="PackSchemeDetail"
            :show-id="true"></GoodVerticalCard>
        </div>

        <div v-if="total > pageSize" class="page-flex-container">
          <Page @on-change="handlePageChange" :current="currentPage" :page-size="pageSize" :total="total" show-total show-elevator />
        </div>

      </div>

      <div v-else style="height: 60vh; width: 100%; margin-top: 12px; background-color: white;">
        <div style="height: 60vh;" class="center-column-flex-container">
          <img src="../../../assets/scheme/bg_empty.png" alt="暂时没有方案">
          <span class="empty-text">暂时没有方案</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RowTitle from '../../../components/RowTitle'
  import GoodVerticalCard from '../../../components/GoodVerticalCard'
  import { getSchemeList } from '../../../api/scheme'

  export default {
    name: 'Scheme',
    components: {
      RowTitle,
      GoodVerticalCard
    },
    data() {
      return {
        goodId: '',
        goodName: '',
        goodEnglishName: '', // 英文 title 暂无

        isLoading: true,
        goodList: [],
        currentPage: 1,
        pageSize: 20,
        total: 0
      }
    },
    created() {
      // console.log('Good created')
      this.getRouteData()
      this.getSchemeData(this.goodId, this.currentPage, this.pageSize)
    },
    methods: {
      getRouteData() {
        this.goodId = this.$route.params.goodId
        this.goodName = this.$route.params.name
      },

      getSchemeData(goodId, currentPage, pageSize) {
        scrollTo(0, 0)
        getSchemeList(goodId, currentPage, pageSize).then(res => {
          this.isLoading = false
          this.total = res.data.total
          if (this.total > 0) {
            this.goodList = res.data.list
          } else {
            this.goodList = []
          }
        }).catch(err => {
          this.isLoading = false
          console.log('getSchemeList: ', err)
        })
      },

      handlePageChange(currentPage) {
        this.currentPage = currentPage
        this.getSchemeData(this.currentGoodsId, currentPage, this.pageSize)
      }
    }
  }
</script>

<style scoped>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }

  .scheme-flex-container {
    display: flex;
    /*width: 985px;*/
    /*width: 1018px;*/
    width: 1054px;
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
