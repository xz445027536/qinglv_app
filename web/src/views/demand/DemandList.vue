<template>
  <div class="demand-area">
    <div class="flex-row">
      <div class="demand-type flex-row">
        <div :style="{'background-image':`url(${card_bg_1})`}" class="demand-type-card" style="margin-right: 6px;">
          <img src="../../assets/demand/icon_waiting_demand.png" alt="待处理需求" height="45px" style="margin-right: 54px;">
          <div class="flex-column">
            <p style="color: rgba(0,0,0,0.45); margin-bottom: 8px;">待处理需求</p>
            <p style="color: #2bc7c6; font-weight: bold;"><span
              style="font-size: 30px; margin-right: 4px;">{{demandData.pendingAmt}}</span><span>个</span></p>
          </div>
        </div>
        <div :style="{'background-image':`url(${card_bg_2})`}" class="demand-type-card" style="margin: 0 6px;">
          <img :src="icon_process_demand" alt="处理中需求" height="45px" style="margin-right: 54px;">
          <div class="flex-column">
            <p style="color: rgba(0,0,0,0.45); margin-bottom: 8px;">处理中需求</p>
            <p style="color: #2bc7c6; font-weight: bold;"><span
              style="font-size: 30px; margin-right: 4px;">{{demandData.handlingAmt}}</span><span>个</span></p>
          </div>
        </div>
        <div :style="{'background-image':`url(${card_bg_3})`}" class="demand-type-card" style="margin:0 6px;">
          <img :src="icon_finish_demand" alt="已完成需求" height="45px" style="margin-right: 54px;">
          <div class="flex-column">
            <p style="color: rgba(0,0,0,0.45); margin-bottom: 8px;">已完成需求</p>
            <p style="color: #2bc7c6; font-weight: bold;"><span
              style="font-size: 30px; margin-right: 4px;">{{demandData.finishedAmt}}</span><span>个</span></p>
          </div>
        </div>
        <div :style="{'background-image':`url(${card_bg_4})`}" class="demand-type-card" style="margin-left: 6px;">
          <img :src="icon_total_demand" alt="全部需求" height="45px" style="margin-right: 54px;">
          <div class="flex-column">
            <p style="color: rgba(0,0,0,0.45); margin-bottom: 8px;">全部需求</p>
            <p style="color: #2bc7c6; font-weight: bold;"><span
              style="font-size: 30px; margin-right: 4px;">{{demandData.totalAmt}}</span><span>个</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-row">
      <div class="demand-query">
        <Form ref="formInline" :model="formInline" style="position: relative; min-width: 100px;" inline>
          <FormItem prop="status">
            <label for="status">状态</label>
            <Select name="status" v-model="formInline.status" style="width: 10em" clearable>
              <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="title">
            <label for="title">需求标题</label>
            <Select
              name="title"
              placeholder="请输入需求标题"
              v-model="formInline.title"
              filterable
              clearable
              remote
              :remote-method="remoteMethod1"
              :loading="loading1"
              @blur="getDemandTitles"
              style="width: 10em;">
              <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
          </FormItem>
          <FormItem prop="date">
            <label for="date">提交日期</label>
            <DatePicker name="date" :value="formInline.date" v-model="formInline.date" format="yyyy-MM-dd"
                        type="daterange" placement="bottom-end" placeholder="开始时间-结束时间"
                        style="width: 16em"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="getDemandList(formInline.status,currentPage,'')"
                    :style="{'background-image':'url('+button_query+')'}"
                    style="border: none; background-repeat: no-repeat; background-size: 100% 100%; padding: 5px 15px; box-shadow: 0px 4px 10px 0px rgba(43, 199, 198, 0.4);">
              查询
            </Button>
          </FormItem>
          <FormItem style="margin-right: 0; position: absolute; right: 0;">
            <Button @click="exportDemand"
                    style="border: 1px solid #2bc7c6; margin-right: 12px; color: #2bc7c6; background-repeat: no-repeat; background-size: 100% 100%; padding: 4px 19px;">
              导出CSV
            </Button>
            <!--<Button type="primary" @click="demandReport" :style="{'background-image':'url('+button_report+')'}" style="border: none; background-repeat: no-repeat; background-size: 100% 100%; padding: 5px 20px; box-shadow: 0px 4px 10px 0px rgba(43, 199, 198, 0.4);">需求上报</Button>-->
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="flex-row">
      <div class="demand-list flex-column">
        <Table :row-class-name="rowClassName" :columns="columns1" :data="demandList" style="width: 100%;"
               v-if="demandList.length>0">
          <template slot="action" slot-scope="props">
            <Button type="primary" size="small">通过</Button>
          </template>
        </Table>

        <div v-else class="center-column-flex-container" style="height: 100%;min-height: 500px">
          <img src="../../assets/scheme/bg_empty.png" alt="暂时没有方案">
          <span class="empty-text">需求空空如也</span>
          <span class="empty-text">快点击上方的<span class="empty-demand-link" @click="newDemandClick">需求上报</span>向我们提交包装需求吧！</span>
        </div>

        <div v-if="total > 0" class="page-flex-container flex-row">
          <Page @on-change="handlePageChange" :current="currentPage" :page-size="pageSize" :total="total" show-total
                show-elevator/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import card_bg_1 from '../../assets/demand/card_bg_1.png'
  import card_bg_2 from '../../assets/demand/card_bg_2.png'
  import card_bg_3 from '../../assets/demand/card_bg_3.png'
  import card_bg_4 from '../../assets/demand/card_bg_4.png'
  import icon_waiting_demand from '../../assets/demand/icon_waiting_demand.png'
  import icon_process_demand from '../../assets/demand/icon_process_demand.png'
  import icon_finish_demand from '../../assets/demand/icon_finish_demand.png'
  import icon_total_demand from '../../assets/demand/icon_total_demand.png'
  import button_export from '../../assets/demand/button_export.png'
  import button_report from '../../assets/demand/button_report.png'
  import button_query from '../../assets/demand/button_query.png'
  import icon_new from '../../assets/demand/new.png'
  import icon_reject from '../../assets/demand/reject.png'
  import red_tag from '../../assets/demand/red_tag.png'

  import {
    getRequireList,
    getRequireTitles,
    getrequireCount,
    getRequireDetail,
    setMessage,
    exportList
  } from '../../api/demand'

  export default {
    name: "DemandList",
    data() {
      return {
        isFirst: 1,
        loading1: false,
        options1: [],
        list: ['hhh', 'zzz'],
        typeList: [
          {
            value: -1,
            label: '全部'
          },
          {
            value: 0,
            label: '待处理'
          },
          {
            value: 1,
            label: '处理中'
          },
          {
            value: 2,
            label: '已完成'
          }
        ],
        formInline: {
          status: '',
          title: '',
          date: [this.getDateStr(-90), this.getNowFormatDate()]
        },
        card_bg_1: card_bg_1,
        card_bg_2: card_bg_2,
        card_bg_3: card_bg_3,
        card_bg_4: card_bg_4,
        icon_waiting_demand: icon_waiting_demand,
        icon_process_demand: icon_process_demand,
        icon_finish_demand: icon_finish_demand,
        icon_total_demand: icon_total_demand,
        button_query: button_query,
        button_export: button_export,
        button_report: button_report,
        icon_new: icon_new,
        icon_reject: icon_reject,
        red_tag: red_tag,
        currentPage: 1,
        pageSize: 10,
        total: 0,
        columns1: [
          {
            title: '需求编号',
            key: 'reqSn',
            width: 220,
            render: (h, params) => {
              if (params.row.flag === "0") {
                return h('div', [
                  h('i', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      cursor: 'pointer',
                      backgroundImage: 'url(' + `${this.icon_new}` + ')',
                      backgroundSize: '100% 100%',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      marginRight: '10px',
                      padding: '0 24px'
                    }
                  }),
                  h('span', {
                    style: {
                      type: 'text',
                      size: 'small'
                    }
                  }, `${this.demandList[params.index].reqSn}`)
                ])
              } else if (params.row.flag === "1") {
                return h('div', [
                  h('i', {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      cursor: 'pointer',
                      backgroundImage: 'url(' + `${this.icon_reject}` + ')',
                      backgroundSize: '100% 100%',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      marginRight: '10px',
                      padding: '0 24px'
                    }
                  }),
                  h('span', {
                    style: {
                      type: 'text',
                      size: 'small'
                    }
                  }, `${this.demandList[params.index].reqSn}`)
                ])
              } else if (params.row.redTag === '0') {
                return h('div', [
                  h('img', {
                    domProps: {
                      align: 'center',
                      src: require('../../assets/demand/red_tag.png'),
                    },
                    style: {
                      width: '6px',
                      height: '6px',
                      lineHeight: '16px',
                      margin: '5px'
                    }
                  }),
                  h('span', {
                    style: {
                      type: 'text',
                      size: 'small'
                    }
                  }, `${this.demandList[params.index].reqSn}`)
                ])
              } else {
                return h('div', [
                  h('span', {
                    style: {
                      type: 'text',
                      size: 'small'
                    }
                  }, `${this.demandList[params.index].reqSn}`)
                ])
              }
            }
          },
          {
            title: '需求标题',
            key: 'title'
          },
          {
            title: '状态',
            key: 'handleStatus',
            width: 130,
            render: (h, params) => {
              let texts = ''
              if (params.row.handleStatus === '0') {
                texts = "待处理"
              } else if (params.row.handleStatus === '1') {
                texts = "处理中"
              } else if (params.row.handleStatus === '2') {
                texts = "已完成"
              }
              return h('div', [
                h('span', {
                  props: {
                    type: 'text',
                    size: 'small',
                  }
                }, texts)
              ])
            }
          },
          {
            title: '提交日期',
            key: 'createTime',
            width: 180
          },
          {
            title: '期望完成日期',
            key: 'expectFinishDate'
          },
          {
            title: '当前处理人',
            key: 'nextOperName',
            width: 130,
          },
          {
            title: '操作',
            key: 'option',
            width: 100,
            render: (h, params) => {
              if (params.row.handleStatus === '0') {
                return h('div', [
                  h('span', {
                    style: {
                      type: 'text',
                      size: 'small',
                      cursor: 'pointer',
                      color: '#2bc7c6'
                    },
                    on: {
                      click: () => {
                        this.getDemandDetail(params.row.id, params.row.flag, params.row.reqSn, params.row.redTag)
                      }
                    }
                  }, '处理')
                ])
              } else {
                return h('div', [
                  h('span', {
                    style: {
                      type: 'text',
                      size: 'small',
                      cursor: 'pointer',
                      color: '#2bc7c6'
                    },
                    on: {
                      click: () => {
                        this.getDemandDetail(params.row.id, params.row.flag, params.row.reqSn, params.row.redTag)
                      }
                    }
                  }, '查看')

                ])
              }
            },
          }
        ],
        demandList: [],
        demandData: [],
        checkType: ''
      }
    },
    created() {
      /*const _this = this
      document.onkeydown = function () {
        const key = window.event.keyCode
        if (key == 13) {
          _this.getDemandList(_this.formInline.status, _this.currentPage)
        }
      }*/
    },
    mounted() {
      this.getDemandCount()
      this.getDemandTitles()
      this.checkType = this.$route.params.checkType
      if (!this.checkType && this.isFirst) {
        this.formInline.status = 0
        this.firstDemandList('0')
        this.isFirst = 0
      } else {
        this.getDemandList('', this.currentPage, this.$route.params.checkType)
      }
    },
    methods: {
      newDemandClick(){
        this.$router.push('/demand/newDemand')
      },
      exportDemand() {
        exportList({
          progStatus: this.formInline.status,
          title: this.formInline.title
        })
      },
      changeDate(dateA) {
        var dateee = new Date(dateA).toJSON()
        var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        return date
      },
      getDateStr(n) {
        let dd = new Date()
        dd.setDate(dd.getDate() + n)//获取AddDayCount天后的日期
        const y = dd.getFullYear()
        const m = (dd.getMonth() + 1) < 10 ? ('0' + (dd.getMonth() + 1)) : (dd.getMonth() + 1)
        const d = dd.getDate() < 10 ? ('0' + dd.getDate()) : dd.getDate()
        return y + "-" + m + "-" + d
      },
      getNowFormatDate() {
        const date = new Date()
        const seperator1 = "-"
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        let strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = "0" + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate
        return currentdate
      },
      remoteMethod1(query) {
        if (query !== '') {
          this.loading1 = true
          setTimeout(() => {
            this.loading1 = false
            const list = this.list.map(item => {
              return {
                value: item,
                label: item
              }
            })
            this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
          }, 200)
        } else {
          this.options1 = []
        }
      },
      rowClassName(row, index) {
        if (index % 2 === 0) {
          return 'even-row'
        }
        return 'odd-row'
      },
      handlePageChange(current) {
        this.getDemandList(this.formInline.status, current)
        scrollTo(0, 0)
      },
      getDemandTitles() {
        getRequireTitles().then(res => {
          this.list = res.data
        }).catch(err => {
          console.log('requireRecommit: ', err)
        })
      },
      getDemandCount() {
        getrequireCount().then(res => {
          this.demandData = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      firstDemandList(progStatus) {
        getRequireList({
          jumpPage: 1,
          pageSize: this.pageSize,
          progStatus: progStatus ? progStatus : this.formInline.status,
          title: this.formInline.title,
          startDt: this.formInline.date[0] ? this.changeDate(this.formInline.date[0]) : '',
          endDt: this.formInline.date[1] ? this.changeDate(this.formInline.date[1]) : ''
        }).then(res => {
          let data1 = res.data
          if (!data1 || !data1.records) {
            getRequireList({
              jumpPage: 1,
              pageSize: this.pageSize,
              progStatus: '1',
              title: this.formInline.title,
              startDt: this.formInline.date ? this.changeDate(this.formInline.date[0]) : '',
              endDt: this.formInline.date ? this.changeDate(this.formInline.date[1]) : ''
            }).then(res => {
              let data2 = res.data
              if (data2 && data2.records) {
                this.total = data2.total
                this.demandList = data2.records
                this.formInline.status = 1
                console.log("data2", this.demandList)
              } else {
                this.demandList = []
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            this.total = data1.total
            this.demandList = data1.records
            // console.log("data1", this.demandList)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getDemandList(progStatus, currentPage, checkType) {
        if (checkType) {
          this.formInline.status = ''
          this.formInline.title = ''
          this.formInline.date = []
        }
        getRequireList({
          jumpPage: currentPage,
          pageSize: this.pageSize,
          progStatus: progStatus ? progStatus : this.formInline.status,
          title: this.formInline.title,
          startDt: this.formInline.date[0] ? this.changeDate(this.formInline.date[0]) : '',
          endDt: this.formInline.date[1] ? this.changeDate(this.formInline.date[1]) : '',
          checkType: checkType
        }).then(res => {
          if (res.data && res.data.records) {
            this.total = res.data.total
            this.demandList = res.data.records
          } else {
            this.total = 0
            this.demandList = []
          }
          this.getDemandCount()
          this.getDemandTitles()
        }).catch(err => {
          console.log(err)
        })
      },
      getDemandDetail(id, flag, reqSn, redTag) {
        getRequireDetail({
          id: id
        }).then(res => {
          this.$router.push({
            name: 'DemandDetail',
            query: { id: id, flag: flag, detail: res.data }
          })
        }).catch(err => {
          console.log(err)
        })
        if (redTag === '0') {
          setMessage({
            reqSn: reqSn
          }).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        }
      },
      demandReport() {
        this.$router.push({
          name: 'NewDemand'
        })
      }
    }
  }
</script>
<style scoped>
  .demand-area {
    background-image: url('../../assets/bg_demand.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    min-height: 945px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .demand-type {
    margin-top: 36px;
    width: 80%;
  }

  .demand-type-card {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 110px;
    width: 25%;
  }

  .demand-query {
    margin-top: 24px;
    background: white;
    z-index: 200;
    width: 80%;
    padding: 22px 30px 0;
    box-shadow: 0px 6px 10px 0px rgba(28, 60, 69, 0.10);
  }

  .demand-list {
    margin-bottom: 50px;
    background: white;
    width: 80%;
    height: 90%;
    padding: 22px 30px;
    box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.15);
  }

  .page-flex-container {
    margin-top: 22px;
    height: 70px;
  }

  .empty-text {
    font: 24px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.2);
    line-height: 1.5;
  }

  .empty-demand-link {
    color: #2ec1bd;
    text-decoration: underline;
    cursor: pointer;
  }

  label {
    padding-right: 8px;
  }
</style>
<style>
  .odd-row td {
    background-color: #fff;
  }

  .even-row td {
    background-color: rgba(43, 199, 198, 0.15);
  }
</style>