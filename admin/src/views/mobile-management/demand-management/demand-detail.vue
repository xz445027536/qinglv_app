<template>
  <div>
    <el-breadcrumb separator="/" style="margin: 20px 0">
      <el-breadcrumb-item :to="{ path: '/mobile/demand' }">需求列表</el-breadcrumb-item>
      <el-breadcrumb-item>需求详情</el-breadcrumb-item>

    </el-breadcrumb>
    <!--需求概览-->
    <div class="card-content">
      <el-card class="box-card">
        <el-row>
          <el-col :span="9">
            <div class="demand-title">
              <el-button type="primary" icon="el-icon-message" circle></el-button>
              <span>需求编号：</span><span>{{ demandContent.serialNo }}</span>
            </div>
          </el-col>
          <el-col :span="9" v-if="demandContent.statusName==='待处理'">
            <div class="demand-title">
              <span>响应倒计时：</span>
              <span v-if="demandContent.surpTime > 0">{{ formatTime(demandContent.surpTime) }}</span>
              <span v-else style="color:red">已超时</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <div><span class="list-term">创建人：</span><span class="list-content">{{ demandContent.operName
              }}({{ demandContent.operCode }})</span></div>
            <div><span class="list-term">需求部门：</span><span
              class="list-content">{{demandContent.deptName || '--'}}</span></div>
            <div><span class="list-term">联系电话：</span><span
              class="list-content">{{demandContent.telPhone ? demandContent.telPhone : (demandContent.mobile || '--')}}</span>
            </div>
            <div><span class="list-term">电子邮箱：</span><span class="list-content">{{demandContent.email || '--'}}</span>
            </div>
          </el-col>
          <el-col :span="9">
            <div><span class="list-term">需求标题：</span><span class="list-content">{{demandContent.title}}</span></div>
            <div><span class="list-term">创建时间：</span><span class="list-content">{{demandContent.createTime}}</span>
            </div>
            <div><span class="list-term">期望完成日期：</span><span class="list-content">{{demandContent.finishDate}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <p class="status-term">状态</p>
              <p class="status-content">{{ demandContent.statusName }}</p>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <!--需求内容-->
    <div class="card-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>需求内容</span>
        </div>
        <div class="text item">
          <el-row style="line-height: 32px;">
            <el-col :span="3">
              <div class="bold">需求类型：</div>
            </el-col>
            <el-col :span="3">
              <div class="gird-content">
                {{ demandContent.typeName ? demandContent.typeName : '--'}}{{demandContent.backTypeName ? '(' + demandContent.backTypeName + ')' : ''
                }}
              </div>
            </el-col>
            <el-col :span="18"
                    v-if="(currentUserRole$==='0'&&demandContent.statusName!='已完成')||demandContent.statusName==='待处理'">
              <el-select v-model="backType" placeholder="需求类型有误？" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.confKey"
                  :label="item.confValue"
                  :value="item.confKey">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="bold">需求标题：</div>
            </el-col>
            <el-col :span="21">
              <div class="gird-content">{{ isNull(demandContent.title) }}</div>
            </el-col>
          </el-row>
          <template v-if="demandContent.type === 3||demandContent.type === 4">
            <el-row>
              <el-col :span="3">
                <div class="bold">托寄物内容：</div>
              </el-col>
              <el-col :span="21">
                <div class="gird-content">{{ isNull(demandContent.goodsContent) }}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3">
                <div class="bold">参数信息：</div>
              </el-col>
              <el-col :span="21">
                <table border='0' cellspacing='0' cellpadding='0'>
                  <tr>
                    <th v-for="item in paramThData" :key="item" class="th-item">{{item}}</th>
                  </tr>
                  <tr>
                    <td v-for="item in paramTdData" :key="item" class="tr-item"> {{item}}</td>
                  </tr>
                </table>
              </el-col>
            </el-row>
          </template>
          <el-row>
            <el-col :span="3">
              <div class="bold">期望完成日期：</div>
            </el-col>
            <el-col :span="21">
              <div class="gird-content">{{ isNull(demandContent.finishDate) }} </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="bold">现状及问题：</div>
            </el-col>
            <el-col :span="21">
              <div class="gird-content"><p>{{ isNull(demandContent.question) }}</p></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="bold">需求说明：</div>
            </el-col>
            <el-col :span="21">
              <div class="gird-content"><p>{{ isNull(demandContent.description) }}</p></div>
              <div class="added-explain" v-for="item in addedExplain " :key="item.id">
                <span style="font-weight: bold">{{item.operatorName}}补充需求描述：</span>{{item.comments}}
                <span style="float: right;color: gray">{{item.createTime}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="bold">物品图片：</div>
            </el-col>
            <el-col :span="21">
              <div class="gird-content">
                <ul style="margin: 0; padding: 0;">
                  <li class="fl img-list" v-for="(value, index) in demandContent.thumbs">
                    <img :key="index" :src="value" alt="goods" @click="bigImg(demandContent.images,index)">
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>

      </el-card>
    </div>

    <!--处理记录-->
    <div class="card-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="cursor: pointer" @click="switchProgress">
          <span style="margin-right: 10px">处理记录</span>
          <i v-if="showProgress" class="el-icon-arrow-up"></i>
          <i v-else class="el-icon-arrow-down"></i>
        </div>
        <div v-if="showProgress" style="max-height:500px;overflow-y: scroll">
          <div style="display: flex;flex-direction: row" v-if="demandContent.statusName !='已完成'">
            <div style="display: flex;flex-direction: column;align-items: center">
              <div style="width: 10px;height: 10px;border-radius: 50%;border: 2px #5FC83C solid"></div>
              <div style="flex: 1;border-left: 1px rgb(216,216,216) solid"></div>
            </div>
            <div style="display: flex;flex-direction: column;margin: 0 0 20px 10px;font-size: 14px">
              <b>当前处理人：<span style="line-height: 24px;color: gray">{{ currentDealInfo.nextOperName }}</span></b>
            </div>
          </div>
          <div style="display: flex;flex-direction: row" v-for="(item,index) in reqProcessInfo">
            <div style="display: flex;flex-direction: column;align-items: center">
              <div v-if="demandContent.statusName ==='已完成'&&index===0" style="width: 10px;height: 10px;border-radius: 50%;border: 2px #5FC83C solid"></div>
              <div v-else style="width: 10px;height: 10px;border-radius: 50%;border: 2px rgb(216,216,216) solid"></div>
              <div v-if='index != (reqProcessInfo.length-1)'
                   style="flex: 1;border-left: 1px rgb(216,216,216) solid"></div>
            </div>
            <div style="display: flex;flex-direction: column;margin: 0 0 20px 10px;font-size: 14px">
              <b>{{item.statusDesc}}</b>
              <div style="line-height: 24px;color: gray">
                <div style="margin-top: 10px">
                  <span v-if="item.role==='1'||item.role==='5'">需求提交人：</span>
                  <span v-else-if="item.role==='3'||item.role==='0'">需求处理人：</span>
                  <span v-else-if="item.role==='2'">需求接口人：</span>
                  <span v-else>处理人：</span>
                  {{item.operatorName}}
                </div>
                <div style="margin-top: 10px" v-if="item.comments && item.status != '6'">处理意见：{{item.comments}}</div>
                <div style="margin-top: 10px" v-if="item.cloudUrl">方案链接：<a :href="item.cloudUrl"
                                                                           style="color: #2D8cF0;">{{item.cloudUrl}}</a>
                </div>
                <div style="margin-top: 10px;display: flex;flex-direction: row" v-if="item.images.length != 0">图片：
                  <img v-for="(image,i) in item.images" :src="image" style="width: 50px;height: 50px;margin: 0 10px"
                       @click="bigImg(item.images,i)"/>
                </div>
                <div style="margin-top: 10px">时间：{{item.createTime}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!--需求处理-->
    <div class="card-content"
         v-if="(currentUserRole$==='0'&&demandContent.statusName!='已完成')||demandContent.statusName==='待处理'||demandContent.status===4||demandContent.status===8">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>需求处理</span>
          <el-radio-group v-model="radio" style="margin-left: 20px">
            <el-radio :label="0" v-if="currentUserRole$==='0'||currentUserRole$==='2'">需求转办</el-radio>
            <el-tooltip effect="dark" content="需求回复后，不要忘记方案提交哦。如已有该需求的方案，请选择“方案提交”" v-if="demandContent.type === 3 || demandContent.type === 4" placement="top">
              <el-radio :label="1">需求回复</el-radio>
            </el-tooltip>
            <el-radio :label="1" v-else>需求回复</el-radio>
            <el-tooltip effect="dark" content="方案提交后，需求方将会进行确认。如无方案，可以先进行需求回复哦。" placement="top" v-if="demandContent.type === 3 || demandContent.type === 4">
              <el-radio :label="4">方案提交</el-radio>
            </el-tooltip>
            <el-radio :label="2">驳回需求</el-radio>
            <el-radio :label="3" v-if="currentUserRole$==='0'">结束需求</el-radio>
          </el-radio-group>
        </div>
        <el-form label-position="top">
          <el-form-item :label="radio==0?'需求描述:':'处理意见:'" :required="radio!=0">
            <el-input
              type="textarea"
              :rows="5"
              :maxlength="500"
              :placeholder="radio==0?'请填写您要补充的需求信息':'请输入内容'"
              v-model="demandProcess">
            </el-input>
            <div style="text-align: right">{{demandProcess.length}}/500</div>
          </el-form-item>
          <el-form-item label="图片上传:" v-if="radio==1||radio==2||radio==4">
            <el-upload
              :auto-upload="false"
              action=""
              :on-remove="handleRemove"
              :on-change="handleChange"
              :limit="5"
              :multiple="true"
              :on-exceed="handExceed"
              list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <div>共{{imageList.length}}张，还能上传{{5 - imageList.length}}张。</div>
          </el-form-item>
          <el-form-item :label="cloudUrlTitle" v-if="radio==1||radio==2||radio==4">
            <el-input placeholder="请输入方案链接" v-model="cloudUrl"></el-input>
            <span style="color: rgba(153, 153, 153, 0.847058823529412)">方案文件请通过SCSS云盘上传，获取共享链接后填入上述输入框处。</span>
          </el-form-item>
          <el-form-item v-if="radio==0">
            <span>请选择需求承接人:</span>
            <el-select v-model="accepter" placeholder="请选择">
              <el-option
                v-for="item in accepterOptions"
                :key="item.userCode"
                :label="item.userName+'/'+item.userCode"
                :value="item.userCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="demandContent.status===11" type="primary" @click="handleDemand"
                       style="float: right">确认
            </el-button>
            <el-button type="primary" @click="goback" style="float: right" plain>返回</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!--大图浏览-->
    <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
      <img class="prev" @click.stop="prev" :src="prevIcon">
      <div class="showImg">
        <img class="bigImg" :src="bigImages[num]">
      </div>
      <img class="next" @click.stop="next" :src="nextIcon">
      <div class="imgPage">{{ num + 1 }}/{{ bigImages.length }}</div>
    </div>
  </div>
</template>
<script>
  import prevIcon from '@/assets/images/u5172.png'
  import nextIcon from '@/assets/images/u5176.png'

  import { handleDemandProcess, getRequireType, getAccepter } from '@/api/demand'

  export default {
    props: ['detail'],
    data() {
      return {
        active: 1,
        id: this.$route.query.id,
        demandContent: this.$route.query.detail.reqInfo,
        demandProcess: '',
        reqProcessInfo: this.$route.query.detail.reqProcessInfo,
        currentDealInfo: this.$route.query.detail.reqProcessInfo[0],
        options: [],
        processProgress: [],
        backType: '',
        showBigImg: false,
        num: 0,
        prevIcon: prevIcon,
        nextIcon: nextIcon,
        radio: 1,
        accepter: '',
        imageList: [],
        accepterOptions: [],
        showProgress: true,
        cloudUrl: '',
        bigImages: [],
        timeInterval: {},
        cloudUrlTitle: '方案文件链接:'
      }
    },
    computed: {
      addedExplain: function() {
        return this.reqProcessInfo.filter((item) => {
          return item.status === '6' && item.comments
        })
      },
      paramThData: function() {
        const thDataList = []
        if (this.demandContent.type === 3) { // 新客户需求
          switch (this.demandContent.forecastType) {
            case 0:// 收入预估
              thDataList.push('收入预估/月')
              break
            case 1:// 票件量预估
              thDataList.push('票件量预估/月')
              break
          }
        } else if (this.demandContent.type === 4) { // 老客户深耕
          thDataList.push('票件量/月')
          thDataList.push('损坏票数/月')
          thDataList.push('理赔金额/月')
        }
        thDataList.push('尺寸大小/票')
        thDataList.push('重量/票')
        return thDataList
      },
      paramTdData: function() {
        const tdDataList = []
        if (this.demandContent.type === 3) { // 新客户需求
          const effectForecast = this.demandContent.effectForecast + (this.demandContent.forecastType === 0 ? '元' : '票')
          tdDataList.push(effectForecast)
        } else if (this.demandContent.type === 4) { // 老客户深耕
          tdDataList.push(`${this.demandContent.waybillAmt}票`)
          tdDataList.push(`${this.demandContent.breakageAmt}票`)
          tdDataList.push(`${this.demandContent.monthClaims}元`)
        }
        tdDataList.push(`${this.demandContent.goodsLength}CM*${this.demandContent.goodsWidth}CM*${this.demandContent.goodsHeight}CM`)
        tdDataList.push(`${this.demandContent.goodsWeight}KG`)
        return tdDataList
      }
    },
    watch: {
      radio(val, oldVal) {
        if (val === 1 || val === 4) {
          this.cloudUrlTitle = '方案文件链接:'
        }
        if (val === 2) {
          this.cloudUrlTitle = '参考方案文件链接:'
        }
      }
    },
    created() {
      this.setShowTime()
      this.getRequireType()
      getAccepter().then(res => {
        this.accepterOptions = res.data
      })
    },
    destroyed() {
      clearInterval(this.timeInterval)
    },
    methods: {
      setShowTime() {
        if (this.demandContent.surpTime > 0) {
          this.timeInterval = setInterval(() => {
            if (this.demandContent.surpTime === 0) {
              clearInterval(this.timeInterval)
            } else {
              this.demandContent.surpTime--
            }
          }, 1000)
        }
      },
      switchProgress() {
        this.showProgress = !this.showProgress
      },
      handleRemove(file, fileList) {
        this.setImageList(fileList)
      },
      handleChange(file, fileList) {
        this.setImageList(fileList)
      },
      handExceed(file, fileList) {
        this.$message.error('最多只能上传5张图片')
      },
      setImageList(fileList) {
        this.imageList = fileList
      },
      bigImg(images, index) {
        this.showBigImg = true
        this.bigImages = images
        this.num = index
      },
      prev() {
        if (this.num === 0) {
          this.num = this.bigImages.length
        }
        this.num--
        console.log(this.num)
      },
      next() {
        if (this.num === this.bigImages.length - 1) {
          this.num = -1
        }
        this.num++
      },
      handleDemand() {
        if (this.radio === 0) {
          if (!this.accepter) {
            this.$message.warning('请选择需求承接人')
            return
          }
        } else if (!this.demandProcess) {
          this.$message.warning('请输入需求处理内容')
          return
        }
        var form = new FormData()
        form.append('reqSerialNo', this.demandContent.serialNo)
        form.append('status', this.getStatus())
        if (this.cloudUrl) {
          form.append('cloudUrl', this.cloudUrl)
        }
        if (this.backType) {
          form.append('backType', this.backType)
        }
        if (this.demandProcess) {
          form.append('comments', this.demandProcess)
        }
        if (this.radio === 0 && this.accepter) {
          form.append('receiver', this.accepter)
        }

        if (this.imageList.length > 0) {
          for (var i in this.imageList) {
            form.append(i, this.imageList[i].raw)
          }
        }
        handleDemandProcess(form).then(res => {
          this.$message.success('需求处理成功')
          this.goback()
          this.$router.push({
            path: this.$route.fullPath, // 获取当前连接，重新跳转
            query: {
              _time: new Date().getTime() / 1000 // 时间戳，刷新当前router
            }
          })
        })
      },
      /**
       * 获取当前操作状态值
       * 0: '用户提交需求',
       * 1: '用户驳回接口人方案',
       * 2: '用户驳回工程师方案',
       * 3: '用户确认方案',
       * 4: '接口人回复需求',
       * 5: '接口人驳回需求',
       * 6: '接口人转办需求',
       * 7: '接口人提交方案',
       * 8: '工程师回复需求',
       * 9: '工程师驳回需求',
       * 10: '工程师提交方案',
       * 11: '超管终止需求处理流程
       * 12: '工程师驳回需求，用户修改再提交'
       * @returns {number} 状态值
       */
      getStatus() {
        switch (this.radio) {
          case 0: // 需求转办
            if (this.currentUserRole$ === '2' || this.currentUserRole$ === '0') { // 接口人||admin
              return 6
            }
            break
          case 1: // 需求回复
            if (this.currentUserRole$ === '3') { // 工程师
              return this.demandContent.type === 1 || this.demandContent.type === 2 ? 10 : 8 // “包材需求、活动/展会需求”需求回复相当于方案提交，流程节点流转至需求提交人
            }
            if (this.currentUserRole$ === '2' || this.currentUserRole$ === '0') { // 接口人||admin
              return this.demandContent.type === 1 || this.demandContent.type === 2 ? 7 : 4 // “包材需求、活动/展会需求”需求回复相当于方案提交，流程节点流转至需求提交人
            }
            break
          case 4: // 方案提交
            if (this.currentUserRole$ === '3') { // 工程师
              return 10
            }
            if (this.currentUserRole$ === '2' || this.currentUserRole$ === '0') { // 接口人||admin
              return 7
            }
            break
          case 2: // 驳回需求
            if (this.currentUserRole$ === '3') { // 工程师
              return 9
            }
            if (this.currentUserRole$ === '2' || this.currentUserRole$ === '0') { // 接口人||admin
              return 5
            }
            break
          case 3: // 结束需求
            return 11
        }
      },
      old() {
        handleDemandProcess({
          rid: this.id,
          beType: this.value,
          adviceDesc: this.demandProcess
        }).then(res => {
          console.log(res)
        }).catch((error) => {
          console.log(error)
        })
      },
      getRequireType() {
        getRequireType().then(res => {
          this.options = res.data
          console.log(res.data)
        }).catch((error) => {
          console.log(error)
        })
      },
      isNull(data) {
        return (data === '' || data === undefined || data === null) ? '--' : data
      },
      goback() {
        this.$router.back()
      },
      formatTime(seconds) {
        return [
          parseInt(seconds / 60 / 60),
          parseInt(seconds / 60 % 60),
          parseInt(seconds % 60)
        ]
          .join(':')
          .replace(/\b(\d)\b/g, '0$1')
      }
    }
  }
</script>
<style scoped>
  ul, li, p, span {
    font-family: 'Microsoft YaHei Regular', 'Microsoft YaHei';
  }

  ul, li {
    list-style: none;
  }

  p {
    padding: 0;
    margin: 0;
  }

  .fl {
    float: left;
  }

  .card-content {
    margin-bottom: 20px;
  }

  .demand-title {
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.847058823529412);
    line-height: 40px;
    margin-bottom: 5px;
  }

  .list-term, .list-content {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.847058823529412);
    line-height: 30px;
  }

  .list-term {
    display: inline-block;
    width: 100px;
  }

  .status-term {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.447058823529412);
    text-align: center;
    margin: 0;
    line-height: 22px;
  }

  .status-content {
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.847058823529412);
    text-align: center;
    margin: 0;
    line-height: 28px;
  }

  .el-row {
    margin-bottom: 20px;
    font-family: 'Microsoft Tai Le Bold', 'Microsoft Tai Le';
    font-style: normal;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.847058823529412);
  }

  .el-button {
    margin-right: 10px;
  }

  .bold {
    font-weight: 700;
    line-height: 28px;
  }

  .gird-content {
    line-height: 28px;
  }

  .img-list {
    margin-right: 20px;
    width: 93px;
    height: 82px;
  }

  img {
    width: 100%;
    height: 100%;
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

  .prev {
    position: absolute;
    cursor: pointer;
    top: 50%;
    left: 10px;
    width: 29px;
    height: 50px;
    transform: translate(10px, -50%);
    -ms-transform: translate(10px, -50%); /* IE 9 */
    -moz-transform: translate(10px, -50%); /* Firefox */
    -webkit-transform: translate(10px, -50%); /* Safari 和 Chrome */
    -o-transform: translate(10px, -50%);
  }

  .next {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 20px;
    width: 29px;
    height: 50px;
    transform: translate(10px, -50%);
    -ms-transform: translate(10px, -50%); /* IE 9 */
    -moz-transform: translate(10px, -50%); /* Firefox */
    -webkit-transform: translate(10px, -50%); /* Safari 和 Chrome */
    -o-transform: translate(10px, -50%);
  }

  .imgPage {
    position: fixed;
    color: #000000;
    text-align: center;
    left: 50%;
    bottom: 50px;
    font-size: 18px;
  }

  .added-explain {
    border-top: 1px dashed gray;
    line-height: 40px;
  }
  .th-item {
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    border-right: 1px solid rgba(0, 0, 0, 0.25);
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    padding: 10px;
    text-align: center;
    font-size: 12px;
    font-weight: normal;
    color: rgba(0, 0, 0, 1);
  }

  .th-item:first-child {
    border-left: 1px solid rgba(0, 0, 0, 0.25);
  }

  .tr-item {
    border-right: 1px solid rgba(0, 0, 0, 0.25);
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    text-align: center;
    padding: 10px;
  }

  .tr-item:first-child {
    border-left: 1px solid rgba(0, 0, 0, 0.25);
  }
</style>
