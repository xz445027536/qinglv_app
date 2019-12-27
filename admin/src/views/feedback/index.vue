<template>
  <div class="page-content">
    <app-table
      :col-configs="colConfigs"
      :data="feedbackData"
      :expand="true">
      <el-table-column type="expand" slot="expand">
        <template slot-scope="{ row }">
          <el-form style="margin-left: 30px;" label-position="left" inline class="demo-table-expand">
            <el-form-item v-if="row.source === 'web'" label="浏览器信息">
              <span>{{row.webHead}}</span>
            </el-form-item>

            <!--<div v-else-if="row.source === 'app'">-->
            <div v-else-if="row.source === 'app'">
              <el-form-item label="手机型号">
                <span>{{row.mobileModel}}</span>
              </el-form-item>
              <el-form-item label="分辨率">
                <span>{{row.dpi}}</span>
              </el-form-item>
              <el-form-item label="系统版本">
                <span>{{row.mobileVersion}}</span>
              </el-form-item>
              <el-form-item label="网络">
                <span>{{row.network}}</span>
              </el-form-item>
              <el-form-item label="APP 版本">
                <span>{{row.appVersion}}</span>
              </el-form-item>
            </div>

            <!--<div v-else>-->
            <div v-else>
              <el-form-item label="手机型号">
                <span>{{row.mobileModel}}</span>
              </el-form-item>
              <el-form-item label="分辨率">
                <span>{{row.dpi}}</span>
              </el-form-item>
              <el-form-item label="系统版本">
                <span>{{row.mobileVersion}}</span>
              </el-form-item>
              <el-form-item label="运营商">
                <span>{{row.network}}</span>
              </el-form-item>
              <el-form-item label="微服务版本">
                <span>{{row.appVersion}}</span>
              </el-form-item>
              <!--<el-form-item label="运营商">-->
                <!--<span>{{row.appVersion}}</span>-->
              <!--</el-form-item>-->
            </div>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        type="index"
        slot="index"
        width="80"
        label="序号"
        sortable
        align="center">
      </el-table-column>

      <el-table-column slot="imgThumbUrl" label="图片" align="center">
        <template slot-scope="{ row }">
          <!--<el-popover-->
            <!--v-if="row.imgThumbUrl"-->
            <!--placement="left"-->
            <!--width="525"-->
            <!--trigger="click">-->
            <!--<img width="500" height="500" :src="row.imgUrl" alt="反馈图片">-->
            <!--<img style="cursor: pointer;" slot="reference" :src="row.imgThumbUrl" alt="图片">-->
          <!--</el-popover>-->
          <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
            <div class="showImg">
              <img class="bigImg" :src="currentBigImageUrl">
            </div>
          </div>
          <img style="cursor: pointer;" @click="handleFeedbackImageClick(row.imgUrl)" v-if="row.imgThumbUrl" :src="row.imgThumbUrl" alt="图片">
          <span v-else>无</span>
        </template>
      </el-table-column>
    </app-table>
    <div>
      <el-pagination
        class="pagination-style"
        @current-change="handleFeedbackPageChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { getFeedbackList } from '../../api/feedback'
  import MyTable from '../../components/MyTable/my-table'

  export default {
    name: 'index',
    components: {
      'app-table': MyTable
    },
    data() {
      return {
        colConfigs: [
          {
            slot: 'index',
            width: 80
          },
          {
            prop: 'content',
            label: '反馈内容'
          },
          {
            prop: 'createBy',
            label: '创建人'
          },
          {
            prop: 'createTime',
            label: '创建时间'
          },
          {
            prop: 'source',
            label: '来源'
          },
          {
            slot: 'imgThumbUrl'
            // label: '图片'
          }
        ],
        feedbackData: [],
        pageSize: 10,
        currentPage: 1,
        total: 1,
        showBigImg: false,
        currentBigImageUrl: ''
      }
    },
    created() {
      this.fetchFeedbackData(1)
    },
    methods: {
      fetchFeedbackData(currentPage) {
        const params = {
          jumpPage: currentPage,
          pageSize: this.pageSize
        }
        getFeedbackList(params).then(res => {
          this.feedbackData = res.data.recoreds
          this.total = res.data.total
        }).catch(err => {
          console.log('getFeedbackList: ', err)
        })
      },

      handleFeedbackImageClick(imageUrl) {
        this.currentBigImageUrl = imageUrl
        this.showBigImg = true
      },

      handleFeedbackPageChange(currentPage) {
        console.log('currentPage: ', currentPage)
        this.fetchFeedbackData(currentPage)
      }
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .imgMask {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .showImg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .bigImg {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>