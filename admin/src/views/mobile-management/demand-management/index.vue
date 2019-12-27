<template>
  <div class="page-content">
    <div style="display: flex;flex-direction: row;padding: 20px 0">
      <div style="flex: 1;border-right: 1px solid #eaeaea ">
        <p>待处理需求</p>
        <p>{{totalData.waitingAmt}}个</p>
      </div>
      <div style="flex: 1;border-right: 1px solid #eaeaea ">
        <p>处理中需求</p>
        <p>{{totalData.processAmt}}个</p>
      </div>
      <div style="flex: 1;border-right: 1px solid #eaeaea">
        <p>已完成需求</p>
        <p>{{totalData.finishAmt}}个</p>
      </div>
      <div style="flex: 1 ">
        <p>全部需求</p>
        <p>{{totalData.totalAmt}}个</p>
      </div>
    </div>
    <el-form size="mini" :inline="true" :model="demandForm">

      <el-form-item label="状态">
        <el-select v-model="demandForm.status" placeholder="全部" style="width: 100px">
          <el-option label="全部" value=''></el-option>
          <el-option
            v-for="item in status"
            :key="item.confKey"
            :label="item.confValue"
            :value="item.confKey">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需求人">
        <el-select v-model="demandForm.operName" clearable filterable placeholder="请输入姓名/工号" style="width: 142px">
          <el-option
            v-for="item in userOptions"
            :key="item.operCode"
            :label="item.operName+'/'+item.operCode"
            :value="item.operCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题查询">
        <el-select v-model="demandForm.title" clearable filterable placeholder="请输入需求标题">
          <el-option
            v-for="item in titleOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提交日期">
        <el-date-picker
          style="width: 240px"
          class="input-class"
          v-model="demandForm.createDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchDemand">查询</el-button>
      </el-form-item>
      <!--<el-form-item>-->
      <!--<el-button type="primary" @click="refreshDemand">刷新</el-button>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="exportDemand">导出 CSV</el-button>
      </el-form-item>
    </el-form>
    <app-table
      :data="demandData"
      :colConfigs="demandColConfigs"
      id="out-table">
      <el-table-column
        prop="serialNo"
        slot="serialNo"
        width="145"
        label="需求编号"
        align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.serialNo }}</span>
          <div class="new-text" v-if="scope.row.flag=='0'">new</div>
          <div class="reject-text" v-if="scope.row.flag=='1'">驳</div>

        </template>
      </el-table-column>
      <el-table-column fixed="right" slot="action" label="操作" align="left" width="100">
        <template slot-scope="scope">
          <div class="link">
            <span v-if="scope.row.statusName === '已完成'" @click="demandDetail(scope.row.id)">查看</span>
            <span v-else-if="currentUserRole$ === '0'" @click="demandDetail(scope.row.id)">处理</span>
            <span v-else-if="scope.row.statusName === '待处理'" @click="demandDetail(scope.row.id)">处理</span>
            <span v-else-if="scope.row.status === '4'||scope.row.status === '8'"
                  @click="demandDetail(scope.row.id)">处理</span>
            <span v-else @click="demandDetail(scope.row.id)">查看</span>

          </div>
        </template>
      </el-table-column>
    </app-table>

    <div>
      <el-pagination
        class="pagination-style"
        @current-change="handleDemandChange"
        :current-page.sync="currentDemandPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalDemand">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import MyTable from '../../../components/MyTable/my-table'
  import avatar from '@/assets/images/u3721.png'
  import iconPending from '@/assets/images/icon_pending.png'
  import iconDoing from '@/assets/images/icon_doing.png'
  import iconDone from '@/assets/images/icon_done.png'
  import EmptyData from './emptyData'
  import {
    getDemandUsers,
    getDemandTitles,
    fetchDemandData,
    getDemandDetail,
    exportDemand,
    getRequireStatus
  } from '@/api/demand'

  export default {
    name: 'demand-management',
    components: {
      'app-table': MyTable,
      'data-empty': EmptyData
    },
    data() {
      return {
        demandForm: {
          status: '0',
          operName: '',
          title: '',
          createDate: ''
        },
        pageSize: 10,

        demandData: [],
        totalData: {},
        userOptions: [],
        titleOptions: [],
        status: [],
        show: true,
        loading: false,
        currentDemandPage: 1,
        totalDemand: 0,

        demandColConfigs: [
          {
            slot: 'serialNo'
          },
          {
            prop: 'operName',
            label: '需求人'
          },
          {
            prop: 'title',
            label: '需求标题',
            'min-width': '200'
          },
          {
            prop: 'createTime',
            label: '提交日期',
            'min-width': '200'
          },
          {
            prop: 'expectFinishDate',
            label: '期望完成日期',
            'min-width': '200',
            sortable: true,
            formatter: this.formatterDate
          },
          {
            prop: 'statusName',
            label: '状态'
          },
          {
            prop: 'currentDealerName',
            label: '当前处理人',
            formatter: this.formatterDealer
          },
          {
            slot: 'action'
          }
        ],
        avatar: avatar,
        iconPending: iconPending,
        iconDoing: iconDoing,
        iconDone: iconDone,
        timeout: null
      }
    },
    created() {
      if (this.$route.query.checkType) { // 通知消息进入页面
        this.getDemandData(this.currentDemandPage, this.$route.query.checkType)
      } else { // 非通知消息进入页面（默认显示待处理列表；若待处理列表无数据，则显示处理中列表；若待处理和处理中皆无数据，还是显示待处理列表）
        this.initDemandData()
      }
      this.querySearchPerson()
      this.querySearchTitle()
      this.getRequireStatus()
    },
    methods: {
      isEmpty(res) {
        this.demandData = res.data.recoreds
        this.totalData = res.data
        this.totalDemand = res.data.total
      },
      initDemandData() {
        fetchDemandData({
          jumpPage: 1,
          pageSize: this.pageSize,
          status: parseInt(this.demandForm.status),
          userKey: this.demandForm.operName,
          title: this.demandForm.title,
          start: this.demandForm.createDate ? this.demandForm.createDate[0] : '',
          end: this.demandForm.createDate ? this.demandForm.createDate[1] : '',
          checkType: ''
        }).then(res => {
          this.isEmpty(res)
          if (res.data.recoreds.length === 0 && parseInt(this.demandForm.status) === 0) { // 待处理且无数据，查询处理中数据
            this.demandForm.status = '3'
            this.initDemandData()
            return
          }
          if (res.data.recoreds.length === 0 && parseInt(this.demandForm.status) === 3) { // 处理中无数据，则再显示待处理数据
            this.demandForm.status = '0'
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      getDemandData(val, checkType) {
        fetchDemandData({
          jumpPage: val,
          pageSize: this.pageSize,
          status: parseInt(this.demandForm.status),
          userKey: this.demandForm.operName,
          title: this.demandForm.title,
          start: this.demandForm.createDate ? this.demandForm.createDate[0] : '',
          end: this.demandForm.createDate ? this.demandForm.createDate[1] : '',
          checkType: checkType || ''
        }).then(res => {
          this.isEmpty(res)
        }).catch((error) => {
          console.log(error)
        })
      },
      searchDemand() {
        this.getDemandData(1)
      },
      getRequireStatus() {
        getRequireStatus().then(res => {
          this.status = res.data
          console.log(res.data)
        }).catch((error) => {
          console.log(error)
        })
      },
      querySearchPerson() {
        const operName = this.demandForm.operName
        getDemandUsers({
          userKey: operName
        }).then(res => {
          if (res.data.length) {
            this.userOptions = res.data
          } else {
            this.userOptions = []
          }
        }).catch((error) => {
          console.log(error)
        })
        console.log(this.userOptions)
      },
      querySearchTitle() {
        const title = this.demandForm.title
        getDemandTitles({
          title: title
        }).then(res => {
          if (res.data.length) {
            this.titleOptions = res.data
          } else {
            this.titleOptions = []
          }
        }).catch((error) => {
          console.log(error)
        })
        console.log(this.userOptions)
      },
      handleSelect(item) {
        console.log(item)
      },
      demandDetail(id) {
        console.log(id)
        getDemandDetail(id).then(res => {
          console.log(res.data)
          this.$router.push({
            path: '/DemandDetail',
            query: { detail: res.data, id: id }
          })
        })
      },

      refreshDemand() {
        this.$router.push({
          path: this.$route.fullPath, // 获取当前连接，重新跳转
          query: {
            _time: new Date().getTime() / 1000 // 时间戳，刷新当前router
          }
        })
      },

      exportDemand() {
        exportDemand({ userCode: this.$store.state.user.id, role: this.currentUserRole$ })
      },

      handleDemandChange(current) {
        this.getDemandData(current)
      },

      formatterDealer(row, column) {
        return row.currentDealerName ? row.currentDealerName : '--'
      },

      formatterDate(row, column) {
        return row.expectFinishDate ? row.expectFinishDate : '--'
      }
    }
  }
</script>

<style scoped>
  .fl {
    float: left;
  }

  .img {
    width: 90px;
    height: 90px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .new-text {
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    font-size: 13px;
    text-align: center;
    line-height: 28px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .reject-text {
    background-color: blue;
    color: white;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    font-size: 13px;
    text-align: center;
    line-height: 28px;
    position: absolute;
    top: 0;
    right: 0;
  }

  p {
    margin: 10px 24px;
    text-align: center;
    font-weight: bold;
    font-style: normal;
    font-size: 20px;
  }

  .status {
    margin: 0 25%;
  }

  .red {
    color: #FF0000;
  }

  .green {
    color: #00FF00;
  }

  .el-row {
    margin: 20px 0;
  }

  .grid-content {
    width: 50%;
    height: 100px;
    margin: 0px auto;
  }

</style>
<style>
  .el-picker-panel {
    max-width: 540px;
    margin: 0;
  }

  .el-date-table td {
    padding: 0;
  }

  .el-date-range-picker__header div {
    font-size: 14px;
  }

  .el-date-table td div {
    width: 25px;
    height: 25px;
  }

  .el-date-table td span {
    width: 20px;
    height: 20px;
    display: block;
    margin: 0 auto;
    line-height: 20px;
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    border-radius: 50%;
  }

  .el-date-table tr {
    font-size: 12px;
  }
</style>
