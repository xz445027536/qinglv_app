<template>
  <div :style="{'background-image': `url('${bg}')`}"
       style="background-repeat:no-repeat; background-size:100% 100%; min-height: 600px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow:auto!important;">
    <div class="breadcrumb">
      <Breadcrumb separator=">">
        <BreadcrumbItem to="/demand/demandList">我的需求</BreadcrumbItem>
        <BreadcrumbItem to="/demand/demandList">需求列表</BreadcrumbItem>
        <BreadcrumbItem to="" style="font-weight: normal;">需求详情</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="flex-row" style="width: 100%;">
      <div class="demand-detail" id="leftBox">
        <RowTitle style="margin-bottom: 32px;" title-cn="需求详情" title-en="Demand Detail"></RowTitle>
        <div>
          <div>
            <Row>
              <Col span="10">
              <Row>
                <p style="font-size: 18px; color: #000; margin-bottom: 38px; margin-left: 40px;">
                  {{detailData.title}}</p>
              </Row>
              <Row>
                <Col class="detail-content" span="12">
                <i class="icon"></i>需求编号：</Col>
                <Col span="12" style="color: rgba(0,0,0,0.85);">
                {{detailData.reqSn}}</Col>
              </Row>
              <Row>
                <Col class="detail-content" span="12">
                <i class="icon"></i>需求类型：</Col>
                <Col span="12" style="color: rgba(0,0,0,0.85);">
                {{reqType}}</Col>
              </Row>
              <Row v-if="detailData.type==='3'||detailData.type==='4'">
                <Col class="detail-content" span="12">
                <i class="icon"></i>托寄物内容：</Col>
                <Col span="12" style="color: rgba(0,0,0,0.85);">
                {{detailData.goodsContent}}</Col>
              </Row>
              <Row>
                <Col class="detail-content" span="12">
                <i class="icon"></i>期望完成日期：</Col>
                <Col span="12" style="color: rgba(0,0,0,0.85);">
                {{detailData.expectFinishDate}}</Col>
              </Row>
              </Col>
              <Col span="14">
              <div v-show="imgListBig.length>0"
                   style="margin: 0 auto; text-align: center; display: inline-flex; align-items: center;">
                <div v-show="imgListBig.length>=2" style="margin-right: 10px;">
                  <img src="../../assets/demand/previous_hover.png" @click="changePic(1)"
                       v-if="showIndex>0" style="cursor: pointer" width="30px" height="30px">
                  <img src="../../assets/demand/previous.png" style="cursor: pointer" width="30px" height="30px" v-else>
                </div>
                <div class="image-area" v-for="(item,index) in imgList" :key="index">
                  <img :src="item" @click="bigImg(detailData.images,showIndex+index)" style="cursor: pointer"/>
                </div>
                <div v-show="imgListBig.length>=2" style="margin-left: 10px;">
                  <img src="../../assets/demand/next_hover.png" @click="changePic(2)"
                       v-if="showIndex+1 < imgListSource.length-1" style="cursor: pointer" width="30px" height="30px">
                  <img src="../../assets/demand/next.png" style="cursor: pointer" width="30px" height="30px" v-else>
                </div>
              </div>

              <ImgView v-if="showBigImg" v-on:childByValue="childByValue1" :imageVisible="showBigImg" :index="num"
                       :imgList="imgListSourceBig" :formImgList="bigImages1"></ImgView>

              </Col>
            </Row>
          </div>
          <Row v-if="detailData.type==='3'||detailData.type==='4'">
            <Col class="detail-content" span="5">
            <i class="icon"></i>参数信息：</Col>
            <Col span="19" style="color: rgba(0,0,0,0.85); margin-bottom: 30px;">
            <table border='0' cellspacing='0' cellpadding='0'>
              <tr>
                <th v-for="item in paramThData" :key="item" class="th-item">{{item}}</th>
              </tr>
              <tr>
                <td v-for="item in paramTdData" :key="item" class="tr-item"> {{item}}</td>
              </tr>
            </table>
            </Col>
          </Row>
          <div>
            <Row>
              <Col class="detail-content" span="5">
              <i class="icon"></i>现状及问题：</Col>
              <Col span="19" style="color: rgba(0,0,0,0.85); margin-bottom: 20px;">
              {{detailData.question}}</Col>
            </Row>
            <Row>
              <Col class="detail-content" span="5">
              <i class="icon"></i>需求说明：</Col>
              <Col span="19" style="color: rgba(0,0,0,0.85);">
              {{detailData.description}}
              <div class="added-explain" v-for="item in detailData.suppInstrList " :key="item.id">
                <div style="color: rgba(0,0,0,0.45)">{{item.operName}} 补充需求描述：</div>
                <div style="flex:1;max-width: 400px">
                  <div style="color: rgba(0,0,0,0.85);word-break: break-all">{{item.suppContent}}</div>
                  <div style="color: rgba(0,0,0,0.45)">{{item.operTime}}</div>
                </div>
              </div>
              </Col>
            </Row>
            <Row v-show="flag === '1'" style="text-align: right;">
              <!--<Row style="text-align: right;">-->
              <Button type="primary" @click="reCommit" :style="{'background-image':'url('+button_submit+')'}"
                      style="border:none; background-repeat: no-repeat; background-size: 100% 100%; margin-top: 30px; padding: 5px 20px; box-shadow: 0 4px 10px 0 rgba(43, 199, 198, 0.4);">
                去编辑
              </Button>
            </Row>
          </div>
        </div>
      </div>
      <div class="process-record" id="rightBox">
        <RowTitle style="margin-bottom: 32px;" title-cn="处理记录" title-en="Processed Record"></RowTitle>
        <!--<div style="max-height">-->
        <div>
          <div v-if="showProgress" style="max-height: 420px; overflow: auto!important; padding-bottom: 10px;">
            <div style="display: flex; flex-direction: row; color: rgba(0,0,0,0.45); font-size: 8px;"
                 v-if="!demandCompleted">
              <div
                style="width: 6em; margin-right: 10px; margin-top: 5px; text-align: right; font-size: 8px; color: rgba(0,0,0,0.85); word-wrap: break-word;"></div>
              <div style="display: flex; flex-direction: column; align-items: center">
                <i class="icon_process" :style="{'background-image':'url('+icon_process+')'}"></i>
                <div style="flex: 1;border-left: 1px rgb(216,216,216) solid"></div>
              </div>
              <div style="display: flex; flex-direction: column; margin: 0 0 20px 10px;">
                <div style="width: 18em; word-wrap: break-word; line-height: 24px; color: gray; font-size: 8px;">
                  <b
                    style="font-size: 14px; color: #2bc7c6; line-height: 30px;"><span>当前处理人：</span></b><span>{{ reqProcessInfo.nextOperName
                  }}</span>
                </div>
              </div>
            </div>
            <div style="display: flex; flex-direction: row; color: rgba(0,0,0,0.45); font-size: 8px;"
                 v-for="(item,index) in reqProcessInfo.progList" :key="item.index">
              <div style="width: 6em; margin-right: 10px;  margin-top: 5px; text-align: right; word-wrap: break-word;">
                {{item.createTime}}
              </div>
              <div style="display: flex; flex-direction: column; align-items: center">
                <i v-if="demandCompleted&&index===0" class="icon_process"
                   :style="{'background-image':'url('+icon_process+')'}"></i>
                <i v-else class="icon_process" :style="{'background-image':'url('+icon_process_gray+')'}"></i>
                <div v-if='index !== (reqProcessInfo.progList.length-1)'
                     style="flex: 1;border-left: 1px rgb(216,216,216) solid"></div>
              </div>
              <div style="display: flex; flex-direction: column; margin: 0 0 20px 10px;">
                <b style="font-size: 14px; line-height: 30px;"
                   :style="{color: demandCompleted&&index===0?'#2bc7c6':''}">{{item.handleTag}}</b>
                <div style="width: 18em; word-wrap: break-word; line-height: 24px; color: gray; font-size: 8px;">
                  <div style="margin-top: 10px">
                    <span v-if="item.role==='1'||item.role==='5'">需求提交人：</span>
                    <span v-else-if="item.role==='3'||item.role==='0'">需求处理人：</span>
                    <span v-else-if="item.role==='2'">需求接口人：</span>
                    <span v-else>处理人：</span>
                    {{item.operatorName}}
                  </div>
                  <div style="margin-top: 10px" v-if="item.comments">处理意见：{{item.comments}}</div>
                  <div style="margin-top: 10px" v-if="item.cloudUrl">方案链接：<a :href="item.cloudUrl">{{item.cloudUrl}}</a>
                  </div>
                  <div style="margin-top: 10px; display: flex; flex-direction: column; flex-wrap: wrap"
                       v-if="item.images.length !== 0">
                    <div>方案图片：</div>
                    <div style="display: flex; flex-direction: row; flex-wrap: wrap">
                      <img v-for="(image,i) in item.thumbs" :src="image"
                           style="cursor: pointer; width: 40px; height: 40px; margin-right: 5px"
                           :key="i" @click="bigImg2(item.images,i)"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ImgView v-if="showBigImg2" v-on:childByValue="childByValue2" :imageVisible="showBigImg2" :index="num2"
                     :imgList="bigImages2" :formImgList="bigImages2"></ImgView>

          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: center; width: 100%;">
      <div class="scheme-process" v-show="reqStatus === '7' || reqStatus === '10'">
        <!--<div class="scheme-process">-->
        <RowTitle style="margin-bottom: 32px;" title-cn="方案处理" title-en="Process Scheme"></RowTitle>
        <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="100">
          <FormItem label="处理选择" prop="type">
            <RadioGroup v-model="formValidate1.type" :rules="ruleValidate1">
              <Radio label="0">确认方案</Radio>
              <Radio label="1">驳回方案</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem v-show="formValidate1.type !== '1'" align="right">
            <Button class="confirm-button" type="primary" @click="handleSubmit('formValidate1')"
                    :style="{'background-image':'url('+button_query+')'}"
                    style="border: none; margin-left: 8px; background-repeat: no-repeat; background-size: 100% 100%; padding: 5px 15px; box-shadow: 0px 4px 10px 0px rgba(43, 199, 198, 0.4); border: none;">
              确认
            </Button>
          </FormItem>
        </Form>
        <Form v-show="formValidate1.type === '1'" ref="formValidate2" :model="formValidate2" :rules="ruleValidate2"
              :label-width="100">
          <FormItem label="处理意见" prop="comments">
            <Input v-model="formValidate2.comments" type="textarea" :autosize="{minRows: 5,maxRows: 5}"
                   placeholder="请描述处理意见" :maxlength="500"></Input>
            <span style="position: absolute;right: 10px;bottom: 0">{{500 - formValidate2.comments.length}}</span>
          </FormItem>
          <FormItem label="图片上传" prop="imgs">
            <div class="demo-upload-list" v-for="(item, index) in formValidate2.imgs" :key="item.url">
              <img class="demo-upload-list-delete" src="../../assets/demand/picture_close.png"
                   @click.stop="handleRemove(item, index)">
              <img class="demo-upload-img" :src="item.url" @click="handleView(item.url,index)" style="cursor: pointer">
            </div>
            <Upload
              v-if="formValidate2.imgs.length<5"
              ref="upload"
              :show-upload-list="false"
              :format="['jpg','jpeg','png','JPG','JPEG','PNG']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              type="drag"
              action=""
              style="display: inline-block; width:58px; margin-right: 13px;">
              <div style="width: 58px; height: 58px; line-height: 58px;">
                <Icon type="md-add" size="20"></Icon>
              </div>
            </Upload>
            <span
              style="color: rgba(0,0,0,0.45)">共{{formValidate2.imgs.length}}张（{{imgSize / 1024 >= 1048 ? (imgSize / 1024 / 1024).toFixed(1) + 'M' : (imgSize / 1024).toFixed(0) + 'KB'}}）,还能上传{{5 - formValidate2.imgs.length}}张</span>
          </FormItem>
          <FormItem label="补充链接" prop="cloudUrl">
            <Input v-model="formValidate2.cloudUrl" type="text" placeholder="请输入补充参考链接"></Input>
          </FormItem>
          <FormItem align="right">
            <Button class="confirm-button" type="primary" @click="handleSubmit('formValidate2')"
                    :style="{'background-image':'url('+button_query+')'}"
                    style="border: none; margin-left: 8px; background-repeat: no-repeat; background-size: 100% 100%; padding: 5px 15px; box-shadow: 0px 4px 10px 0px rgba(43, 199, 198, 0.4); border: none;">
              确认
            </Button>
          </FormItem>
        </Form>

        <ImgView v-if="imageVisible" v-on:childByValue="childByValue3" :imageVisible="imageVisible" :index="showIndex2"
                 :imgList="uploadImgList" :formImgList="formValidate2.imgs"></ImgView>

      </div>
    </div>
    <Modal v-model="successVisible" :closable="false" :scrollable="true" :mask-closable="false" width="460">
      <div style="text-align: center">
        <img src="@/assets/demand/icon_demand_success.png">
        <p v-if="formValidate1.type === '1'"
           style="margin-top: 16px;font-size: 20px;color: #2bc7c6;font-family: 'Microsoft YaHei'">需求驳回成功</p>
        <p v-if="formValidate1.type === '0'"
           style="margin-top: 16px;font-size: 20px;color: #2bc7c6;font-family: 'Microsoft YaHei'">方案确认成功</p>
        <p style="margin-top: 16px;font-size: 16px;color: rgba(0,0,0,0.65);font-family: 'Microsoft YaHei'">
          登录裹包官网/APP，可以随时了解需求进度哦^_^</p>
      </div>
      <div slot="footer" style="text-align: center;margin-bottom: 20px">
        <Button type="primary" @click="toDemandList">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import bg from '../../assets/bg_demand.png'
  import { getRequireDetail, rejectRequire, confirmRequire } from '../../api/demand'
  import RowTitle from '../../components/RowTitle'
  import ImgView from '../../components/ImgView'

  // 详情
  import button_submit from '../../assets/demand/button_report.png'

  // 方案

  import button_query from '../../assets/demand/button_query.png'

  // 处理记录
  import icon_process from '../../assets/demand/icon_process.png'
  import icon_process_gray from '../../assets/demand/icon_process_gray.png'

  export default {
    name: "DemandDetail",
    props: ['detail'],
    data() {
      return {
        bg: bg,
        height: 0,
        active: '',
        detailData: [],
        id: this.$route.query.id,
        flag: this.$route.query.flag,
        reqProcessInfo: '',
        reqSn: '',
        reqStatus: '',

        showIndex: 0,
        imgListSource: [],
        imgList: [],
        imgListSourceBig: [],
        imgListBig: [],
        button_submit: button_submit,
        reqType: '',
        showBigImg: false,
        num: 0,
        showBigImg2: false,
        num2: 0,
        bigImages1: [],
        bigImages2: [],

        icon_process: icon_process,
        icon_process_gray: icon_process_gray,
        record: '',
        showProgress: true,
        uploadImgList: [],
        showIndex2: 0,
        createTime: '',

        button_query: button_query,
        imgSize: 0,
        imgSizeList: [],
        formValidate1: {
          type: ''
        },
        formValidate2: {
          comments: '',
          imgs: [],
          cloudUrl: '',
          uploadList: []
        },
        imageVisible: false,
        cancelVisible: false,
        successVisible: false,
        ruleValidate1: {
          type: [
            { required: true, message: '请选择处理方式', trigger: 'change' },
          ]
        },
        ruleValidate2: {
          comments: [
            { required: true, message: '请填写处理意见', trigger: 'change' },
          ]
        }


      }
    },
    computed: {
      demandCompleted: function () {
        return this.reqStatus === '3' || this.reqStatus === '11'
      },
      paramThData: function () {
        let thDataList = []
        if (this.detailData.type === '3') {//新客户需求
          switch (this.detailData.forecastType) {
            case 0://收入预估
              thDataList.push('收入预估/月')
              break
            case 1://票件量预估
              thDataList.push('票件量预估/月')
              break
          }
        } else if (this.detailData.type === '4') {//老客户深耕
          thDataList.push('票件量/月')
          thDataList.push('损坏票数/月')
          thDataList.push('理赔金额/月')
        }
        thDataList.push('尺寸大小/票')
        thDataList.push('重量/票')
        return thDataList
      },
      paramTdData: function () {
        let tdDataList = []
        if (this.detailData.type === '3') {//新客户需求
          let effectForecast = this.detailData.effectForecast + (this.detailData.forecastType === 0 ? '元' : '票')
          tdDataList.push(effectForecast)
        } else if (this.detailData.type === '4') {//老客户深耕
          tdDataList.push(`${this.detailData.monthWaybillAmt}票`)
          tdDataList.push(`${this.detailData.monthBreakageAmt}票`)
          tdDataList.push(`${this.detailData.monthClaims}元`)
        }
        tdDataList.push(`${this.detailData.length}CM*${this.detailData.width}CM*${this.detailData.height}CM`)
        tdDataList.push(`${this.detailData.weight}KG`)
        return tdDataList
      }
    },
    components: {
      RowTitle,
      ImgView
    },
    created() {
      this.getDemandDetail(this.$route.query.id)
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList
    },
    methods: {
      childByValue1(childValue) {
        this.showBigImg = childValue
      },
      childByValue2(childValue) {
        this.showBigImg2 = childValue
      },
      childByValue3(childValue) {
        this.imageVisible = childValue
      },
      getDemandDetail(id) {
        getRequireDetail({
          id: id
        }).then(res => {
          this.detailData = res.data
          this.reqProcessInfo = this.detailData.reqProgressList
          this.createTime = this.reqProcessInfo.progList[0].createTime
          this.reqSn = res.data.reqSn
          this.reqStatus = res.data.reqStatus
          this.imgListSource = this.detailData.images
          this.imgList = this.detailData.thumbs.slice(this.showIndex, this.showIndex + 2)
          this.imgListSourceBig = this.detailData.images
          this.imgListBig = this.detailData.images.slice(this.showIndex, this.showIndex + 2)
          this.reqType = this.handleType(this.detailData.type)
          // console.log(this.createTime)
        }).catch(err => {
          console.log(err)
        })
      },

      // 详情
      changePic(type) {
        switch (type) {
          case 1://左移
            this.showIndex = this.showIndex - 2
            break
          case 2://右移
            this.showIndex = this.showIndex + 2
            break
        }
        this.imgList = this.imgListSource.slice(this.showIndex, this.showIndex + 2)
      },
      reCommit() {
        this.$router.push({
          name: 'RecommitDemand',
          query: { detail: this.detailData }
        })
      },
      handleType(type) {
        switch (type) {
          case '0':
            return '方案需求'
          case '1':
            return '包材需求'
          case '2':
            return '展会/活动需求'
          case '3':
            return '方案需求-新客户开发'
          case '4':
            return '方案需求-老客户深耕'
        }
      },
      bigImg(images, index) {
        this.showBigImg = true
        this.bigImages1 = images
        this.num = index
      },
      bigImg2(images, index) {
        this.showBigImg2 = true
        this.bigImages2 = images
        this.num2 = index
      },

      // 方案
      toDemandList() {
        this.$router.push({
          name: 'DemandList'
        })
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const form = new FormData()
            form.append('reqSn', this.reqSn)
            Object.keys(this.formValidate2).forEach(key => {
              if (key === 'imgs') {
                let imgs = this.formValidate2[key]
                imgs.forEach(item => {
                  form.append(key, item.rawFile)
                })
              } else {
                form.append(key, this.formValidate2[key])
              }
            })
            if (this.formValidate1.type === "1") {
              rejectRequire(form).then(response => {
                if (response.status === 'SUCCESS') this.successVisible = true
              }).catch(err => {
                console.log(err)
              })
            } else {
              confirmRequire({
                reqSn: this.reqSn
              }).then(response => {
                if (response.status === 'SUCCESS') this.successVisible = true
              }).catch(err => {
                console.log(err)
              })
            }
          } else {
            this.$Message.warning('请检查必填内容是否填写完整')
          }
        })
      },
      handleReset() {
        this.cancelVisible = true
      },
      resetFields(name) {
        this.$refs[name].resetFields()
        this.formValidate2.imgs = []
        this.cancelVisible = false
        this.successVisible = false
      },
      handleView(url, index) {
        this.imageVisible = true
        this.showIndex2 = index
      },

      handleRemove(file, index) {
        this.formValidate2.imgs.splice(this.formValidate2.imgs.indexOf(file), 1)
        this.uploadImgList = this.formValidate2.imgs.map(img => img.url)
        this.imgSize = this.imgSize - this.imgSizeList[index]
        this.imgSizeList.splice(index, 1)
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + '格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件' + file.name + '太大，不能超过 2M。'
        })
      },
      handleBeforeUpload(file) {
        console.log(file)
        const check = this.uploadList.length < 5
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传5张图片。'
          })
          return false
        }
        //过滤文件格式
        if (file.name.toLowerCase().indexOf('png') === -1 && file.name.toLowerCase().indexOf('jpg') === -1 && file.name.toLowerCase().indexOf('jpeg') === -1) {
          return
        }
        if (file.size / 1024 > 2048) {
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件' + file.name + '太大，不能超过 2M。'
          })
          return false
        }
        this.imgSizeList.push(file.size)
        this.imgSize += file.size
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          var data = {}
          data.url = reader.result
          data.rawFile = file
          this.formValidate2.imgs.push(data)
          this.uploadImgList = this.formValidate2.imgs.map(img => img.url)
          return false
        }
        return false
      }
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
    height: 100%
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  /* 面包屑导航 */
  .breadcrumb {
    margin-top: 24px;
    width: 82%;
    height: 60px;
    line-height: 60px;
    padding-left: 40px;
    background: white;
    box-shadow: 0px 6px 10px 0px rgba(28, 60, 69, 0.25);
  }

  /* 详情 */
  .demand-detail {
    margin-top: 20px;
    margin-bottom: 32px;
    margin-right: 2%;
    background: white;
    width: 50%;
    padding: 30px 30px 50px;
    box-shadow: 0px 6px 10px 0px rgba(28, 60, 69, 0.25);
  }

  .detail-content {
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 20px;
    padding-left: 24px;
  }

  .icon {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-image: url(../../assets/demand/label_circle.png);
    background-size: 50% 50%;
    background-position: center center;
    background-repeat: no-repeat;
    margin-right: 5px;
  }

  .image-area {
    width: 150px;
    height: 120px;
    text-align: center;
    margin: 0 5px;
  }

  .image-area img {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  /* 处理记录 */
  .process-record {
    display: table-cell;
    margin-top: 20px;
    margin-bottom: 32px;
    background: white;
    width: 30%;
    padding: 30px;
    box-shadow: 0 6px 10px 0 rgba(28, 60, 69, 0.25);
  }

  .icon_process {
    display: block;
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-size: 100%;
  }

  /* 方案处理 */
  .scheme-process {
    display: table-cell;
    /*margin-top: 12px;*/
    margin-bottom: 50px;
    background: white;
    width: 82%;
    height: 90%;
    padding: 30px;
    box-shadow: 0 6px 10px 0 rgba(28, 60, 69, 0.25);
  }

  .demo-upload-list {
    position: relative;
    display: inline-block;
    width: 68px;
    height: 68px;
    text-align: center;
    line-height: 6px;
    overflow: hidden;
    background: #fff;
    margin-right: 5px;
  }

  .demo-upload-list .demo-upload-img {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 60px;
  }

  .demo-upload-list-delete {
    cursor: pointer;
    position: absolute;
    top: 2px;
    right: 2px;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background: #fff;
    z-index: 100;
    border: 2px solid #fff;
  }

  .confirm-button {
    border: none;
    margin-left: 8px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 5px 15px;
    box-shadow: 0 4px 10px 0 rgba(43, 199, 198, 0.4);
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

  .added-explain {
    display: flex;
    flex-direction: row;
    line-height: 25px;
  }

  .added-explain:first-child {
    border-top: 1px solid #eeeeee;
    margin-top: 16px;
    padding-top: 12px;
  }
</style>