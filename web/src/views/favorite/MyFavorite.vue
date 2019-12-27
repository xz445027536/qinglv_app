<template>
  <div
    :style="{'background-image': `url('${bg}')`}"
    style="background-repeat: repeat-y; background-size: 100% 100%; padding: 0 70px; min-height: 80vh;">
    <div class="favorite-list-container">
      <div v-if="total > 0">
        <row-title style="margin-bottom: 32px; margin-left: -12px;" title-cn="我的收藏" title-en="My Favorite"></row-title>

        <div class="scheme-flex-container">
          <GoodVerticalCard
            v-for="(item, index) in schemeList"
            :style="{ marginRight: index % 4 === 3 ? '0' : '18px'}"
            :key="item.solutionId"
            :item="item"
            :deletable="true"
            @cancelCollect="cancelCollect"
            :show-price="true"
            :show-id="true"></GoodVerticalCard>
        </div>

        <div v-if="total > pageSize" class="page-flex-container">
          <Page @on-change="handlePageChange" :current="currentPage" :page-size="pageSize" :total="total" show-total show-elevator />
        </div>
      </div>

      <div v-else style="height: 60vh; width: 100%; margin-top: 12px; background-color: white;">
        <div style="height: 60vh;" class="center-column-flex-container">
          <img src="../../assets/scheme/bg_empty.png" alt="暂时没有收藏方案">
          <span class="empty-text">暂时没有收藏方案</span>
        </div>
      </div>

    </div>

    <Modal style="margin: 24px;" :closable="false" v-model="showDeleteModal">
      <img src="../../assets/scheme/bg_delete_alert_2x.png" alt="删除提示" width="488" height="270">
      <p style="margin-top: 12px; text-align: center; font: bold 18px 'Microsoft YaHei'; color: #2bc7c6;">该收藏记录将被删除</p>
      <p style="margin-top: 12px; text-align: center">是否继续？</p>
      <div slot="footer" class="custom-center-footer">
        <Button type="default" style="width: 80px;" @click="cancel">取消</Button>
        <Button
          style="width: 80px;"
          class="button-background no-border"
          @click="ok(currentId)"
          type="default">确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import bg from '../../assets/bg_demand.png'
  import GoodVerticalCard from '../../components/GoodVerticalCard'
  import RowTitle from '../../components/RowTitle'
  import { getFavoriteSchemeList, unCollectScheme } from '../../api/scheme'

  export default {
    name: 'MyFavorite',
    components: {
      GoodVerticalCard,
      RowTitle
    },
    beforeRouteUpdate(to, from, next) {
      console.log('MyFavorite beforeRouteUpdate: ', 'from: ', from)
      console.info('MyFavorite beforeRouteUpdate: ', 'to.name: ', to.name)
      next()

      this.getFavoriteList(this.currentPage, this.pageSize)
    },
    data() {
      return {
        bg,

        showDeleteModal: false,
        currentId: '',
        schemeList: [],
        currentPage: 1,
        pageSize: 20,
        total: 0
      }
    },
    created() {
      this.getFavoriteList(this.currentPage, this.pageSize)
    },
    methods: {
      getFavoriteList(currentPage, pageSize) {
        getFavoriteSchemeList(currentPage, pageSize).then(res => {
          console.log('getFavoriteSchemeList: ', res)
          this.schemeList = res.data.list
          this.total = res.data.total
        })
      },

      cancelCollect(id) {
        console.log('cancelCollect: ', id)
        this.showDeleteModal = true
        this.currentId = id
      },

      ok(id) {
        unCollectScheme(id).then(res => {
          this.showDeleteModal = false
          console.log('unCollectScheme: ', res)
          this.$Message.success('已取消收藏该方案')
          this.getFavoriteList(this.currentPage, this.pageSize)
        }).catch(err => {
          console.log('unCollectScheme: ', err)
        })
      },

      cancel() {
        this.showDeleteModal = false
        this.$Message.info('已取消当前操作')
      },

      handlePageChange(currentPage) {
        this.currentPage = currentPage
        this.getFavoriteList(currentPage, this.pageSize)
      }
    }
  }
</script>

<style scoped>
  .favorite-list-container {
    margin: 34px 123px;
    width: 1054px;
  }

  .scheme-flex-container {
    display: flex;
    width: 1054px;
    flex-wrap: wrap;
  }

  .empty-text {
    font: 24px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.2);
  }

  .page-flex-container {
    margin-top: 12px;
    height: 70px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  /deep/ .ivu-btn:focus {
    box-shadow: 0 0
  }

  .custom-center-footer /deep/ .no-border {
    border: 0
  }

  .custom-center-footer {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
  }

  .button-background {
    background-image: url("../../assets/scheme/bg_scheme_class_item.png");
    background-size: cover;
    color: white;
  }
</style>