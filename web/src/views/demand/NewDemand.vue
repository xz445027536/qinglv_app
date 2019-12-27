<template>
  <div class="demand-area">
    <div class="new-demand">
      <row-title style="margin-bottom: 32px;" title-cn="需求上报" title-en="Report Demand"></row-title>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120"
            style="font-size: 12px;padding: 0px 40px" label-position="left">
        <FormItem label="需求类型" prop="type" key="type">
          <RadioGroup v-model="formValidate.type">
            <Radio label="3">方案需求-新客户开发</Radio>
            <Radio label="4">方案需求-老客户深耕</Radio>
            <Radio label="1">包材需求</Radio>
            <Radio label="2">展会/活动需求</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="需求标题" prop="title" key="title">
          <Input v-model="formValidate.title" placeholder="请描述您的需求" :maxlength="10"></Input>
          <span style="position: absolute;right: 10px">{{10 - formValidate.title.length}}</span>
        </FormItem>
        <FormItem label="托寄物内容" prop="goodsContent" key="goodsContent"
                  v-if="formValidate.type==='3'||formValidate.type==='4'">
          <Input v-model="formValidate.goodsContent" placeholder="请描述托您的拖寄物内容" :maxlength="50"></Input>
          <span style="position: absolute;right: 10px">{{50 - formValidate.goodsContent.length}}</span>
        </FormItem>
        <template v-if="formValidate.type==='3'">
          <FormItem label="效果预估" prop="forecastType" key="forecastType" style="margin-bottom: 5px">
            <RadioGroup v-model="formValidate.forecastType">
              <Radio label='0'>收入预估(元)/月</Radio>
              <Radio label='1'>票件量预估(票)/月</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem prop="effectForecast" key="effectForecast">
            <InputNumber v-model="formValidate.effectForecast" placeholder="请预估该客户每月带来的收入或者票件数量"
                         style="width: 100%" :max="99999999" :min="0"></InputNumber>
          </FormItem>
        </template>
        <template v-if="formValidate.type==='4'">
          <FormItem label="票件量(票)/月" prop="monthWaybillAmt" key="monthWaybillAmt">
            <InputNumber v-model="formValidate.monthWaybillAmt" placeholder="请填写该客户目前每月的票件数量" style="width: 100%"
                         :max="99999999" :min="0"></InputNumber>
          </FormItem>
          <FormItem label="损坏票数(票)/月" prop="monthBreakageAmt" key="monthBreakageAmt">
            <InputNumber v-model="formValidate.monthBreakageAmt" placeholder="请填写该客户目前每月损坏的票件数量" style="width: 100%"
                         :max="99999999" :min="0"></InputNumber>
          </FormItem>
          <FormItem label="理赔金额(元)/月" prop="monthClaims" key="monthClaims">
            <InputNumber v-model="formValidate.monthClaims" placeholder="请填写该客户目前每月的理赔金额" style="width: 100%"
                         :max="99999999" :min="0"></InputNumber>
          </FormItem>
        </template>
        <template v-if="formValidate.type==='3'||formValidate.type==='4'">
          <FormItem label="尺寸(CM)/票" required>
            <div style="display: flex;color: rgba(0,0,0,0.45)">
              <div style="display: flex;flex: 1">长
                <FormItem prop="length" key="length" style="flex: 1;margin: 0 16px 0 10px">
                  <InputNumber v-model="formValidate.length" placeholder="请输入长度" style="width: 100%" :max="99999999"
                               :min="0"></InputNumber>
                </FormItem>
              </div>
              <div style="display: flex;flex:1">宽
                <FormItem prop="width" key="width" style="flex: 1;margin: 0 16px 0 10px">
                  <InputNumber v-model="formValidate.width" placeholder="请输入宽度" style="width: 100%" :max="99999999"
                               :min="0"></InputNumber>
                </FormItem>
              </div>
              <div style="display: flex;flex: 1">高
                <FormItem prop="height" key="height" style="flex: 1;margin: 0 0 0 10px">
                  <InputNumber v-model="formValidate.height" placeholder="请输入高度" style="width: 100%" :max="99999999"
                               :min="0"></InputNumber>
                </FormItem>
              </div>
            </div>
          </FormItem>
          <FormItem label="重量(KG)/票" prop="weight" key="weight">
            <InputNumber placeholder="请填写每票快递的重量" v-model="formValidate.weight" style="width: 100%" :max="99999999"
                         :min="0"></InputNumber>
          </FormItem>
        </template>
        <FormItem label="现状及问题" prop="question" key="question">
          <Input v-model="formValidate.question" type="textarea" :autosize="{minRows: 5,maxRows: 5}"
                 placeholder="请描述具体现状及问题" :maxlength="200"></Input>
          <span style="position: absolute;right: 10px;bottom: 0">{{200 - formValidate.question.length}}</span>
        </FormItem>
        <FormItem label="需求说明" prop="description" key="description">
          <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 5,maxRows: 5}"
                 placeholder="请描述具体需求" :maxlength="200"></Input>
          <span style="position: absolute;right: 10px;bottom: 0">{{200 - formValidate.description.length}}</span>
        </FormItem>
        <FormItem label="期望完成日期" prop="expectFinishDate" key="expectFinishDate">
          <DatePicker type="date" :options="dataOptions" placeholder="选择日期"
                      v-model="formValidate.expectFinishDate"></DatePicker>
        </FormItem>
        <FormItem label="物品图片" prop="images" key="images">
          <div class="upload-list" v-for="(item, index) in formValidate.images" :key="item.url">
            <img class="upload-list-delete" src="../../assets/demand/picture_close.png"
                 @click.stop="handleRemove(item,index)">
            <img class="upload-img" :src="item.url" @click="handleView(item.url,index)" style="cursor: pointer">
          </div>
          <Upload
            v-if="formValidate.images.length<5"
            ref="upload"
            :show-upload-list="false"
            :format="['jpg','jpeg','png','JPG','JPEG','PNG']"
            :max-size="2048"
            :on-exceeded-size="handleMaxSize"
            :on-format-error="handleFormatError"
            :before-upload="handleBeforeUpload"
            type="drag"
            action=""
            style="display: inline-block;width: 58px; margin-right: 13px;">
            <div style="width: 58px; height: 58px; line-height: 58px;">
              <Icon type="md-add" size="20"></Icon>
            </div>
          </Upload>
          <span
            style="color: rgba(0,0,0,0.45)">共{{formValidate.images.length}}张（{{imgSize / 1024 >= 1048 ? (imgSize / 1024 / 1024).toFixed(1) + 'M' : (imgSize / 1024).toFixed(0) + 'KB'}}）,还能上传{{5 - formValidate.images.length}}张</span>
        </FormItem>
        <FormItem align="right">
          <Button @click="handleReset()"
                  style="border: 1px solid #2bc7c6; margin-right: 12px; color: #2bc7c6; background-repeat: no-repeat; background-size: 100% 100%; padding: 4px 19px;">
            取消
          </Button>
          <Button type="primary" @click="handleSubmit('formValidate')" :disabled="submitDisabled"
                  :style="{'background-image':'url('+button_query+')'}"
                  style="border: none; background-repeat: no-repeat; background-size: 100% 100%; padding: 5px 20px; box-shadow: 0px 4px 10px 0px rgba(43, 199, 198, 0.4);">
            提交
          </Button>
        </FormItem>
      </Form>
    </div>
    <ImgView v-if="imageVisible" v-on:childByValue="childByValue" :imageVisible="imageVisible" :index="showIndex"
             :imgList="uploadImgList" :formImgList="formValidate.images"></ImgView>

    <Modal v-model="cancelVisible" :closable="false" :mask-closable="false" width="460">
      <div style="text-align: center">
        <img src="@/assets/demand/icon_demand_cancel.png">
        <p style="margin-top: 16px;font-size: 20px;color: #2bc7c6;font-family: 'Microsoft YaHei'">取消需求上报</p>
        <p style="margin-top: 16px;font-size: 16px;color: rgba(0,0,0,0.65);font-family: 'Microsoft YaHei'">
          您所填写的内容将会被清空！</p>
      </div>
      <div slot="footer" style="text-align: center;margin-bottom: 20px">
        <Button @click="cancelVisible = false">取消</Button>
        <Button type="primary" @click="toDemandList">确定</Button>
      </div>
    </Modal>
    <Modal v-model="successVisible" :closable="false" :scrollable="true" :mask-closable="false" width="460">
      <div style="text-align: center">
        <img src="@/assets/demand/icon_demand_success.png">
        <p style="margin-top: 16px;font-size: 20px;color: #2bc7c6;font-family: 'Microsoft YaHei'">需求上报成功</p>
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
  import button_query from '../../assets/demand/button_query.png'
  import RowTitle from '../../components/RowTitle'
  import ImgView from '../../components/ImgView'
  import { requireCommit } from '../../api/demand'

  export default {
    components: {
      RowTitle,
      ImgView
    },
    data() {
      const numValidate = (rule, value, callback) => {
        if (value <= 0) {
          callback(new Error('请输入大于0的数值'));
        } else {
          callback();
        }
      };
      return {
        button_query: button_query,
        formValidate: {
          type: '',//需求类型
          title: '',//需求标题
          goodsContent: '',//托寄物内容
          forecastType: '0',//效果预估类型
          effectForecast: 0,//效果预估值
          monthWaybillAmt: 0,//月票件量
          monthBreakageAmt: 0,//月损坏量
          monthClaims: 0,//月理赔金额
          length: 0,//长
          width: 0,//宽
          height: 0,//高
          weight: 0,//重量
          question: '',//现状问题
          description: '',//需求描述
          expectFinishDate: '',//期望完成日期
          images: []//物品图片
        },
        imgSize: 0,
        imgSizeList: [],
        imgUrl: '',
        imageVisible: false,
        cancelVisible: false,
        successVisible: false,
        uploadList: [],
        submitDisabled: false,
        showIndex: 0,
        showBigImg: false,
        bigImages: [],
        uploadImgList: [],
        dataOptions: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000
          }
        },
        ruleValidate: {
          type: [
            { required: true, message: '请选择需求类型', trigger: 'change' }
          ],
          title: [
            { required: true, message: '请输入需求标题', trigger: 'blur' },
          ],
          goodsContent: [
            { required: true, message: '请输入托寄物内容', trigger: 'blur' },
          ],
          forecastType: [
            { required: true, message: '请选择预估类型', trigger: 'change' },
          ],
          effectForecast: [
            { required: true, type: 'number', message: '请输入收入或票件数量', trigger: 'change' },
            { validator: numValidate, trigger: 'change' }
          ],
          monthWaybillAmt: [
            { required: true, type: 'number', message: '请输入票件量', trigger: 'change' },
            { validator: numValidate, trigger: 'change' }
          ],
          monthBreakageAmt: [
            { required: true, type: 'number', message: '请输入损坏量', trigger: 'change' },
            { validator: numValidate, trigger: 'change' }
          ],
          monthClaims: [
            { required: true, type: 'number', message: '请输入理赔金额', trigger: 'change' },
            { validator: numValidate, trigger: 'change' }
          ],
          length: [
            { required: true, type: 'number', message: '请输入长度', trigger: 'change' },
            { validator: numValidate, trigger: 'change' }
          ],
          width: [
            { required: true, type: 'number', message: '请输入宽度', trigger: 'change' },
            { validator: numValidate, trigger: 'change' }
          ],
          height: [
            { required: true, type: 'number', message: '请输入高度', trigger: 'change' },
            { validator: numValidate, trigger: 'change' }
          ],
          weight: [
            { required: true, type: 'number', message: '请输入重量', trigger: 'change' },
            { validator: numValidate, trigger: 'change' }
          ],
          question: [
            { required: true, message: '请输入现状及问题', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入需求说明', trigger: 'blur' }
          ],
          expectFinishDate: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ]
        }
      }
    },
    watch: {
      'formValidate.type': function (to) {
        this.resetFields('formValidate')
        this.formValidate.type = to
      },
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList
      if (!(this.currentUserRole$ === '1' || this.currentUserRole$ === '5')) {//非app管理员或普通用户
        this.$Message.error('管理员无法提交需求')
        this.submitDisabled = true
      }
    },
    methods: {
      childByValue(childValue) {
        this.imageVisible = childValue
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const form = new FormData()
            Object.keys(this.formValidate).forEach(key => {
              if (key === 'images') {
                let images = this.formValidate[key]
                images.forEach(item => {
                  form.append(key, item.rawFile)
                })
              } else {
                form.append(key, this.formValidate[key])
              }
            })
            requireCommit(form).then(response => {
              if (response.status === 'SUCCESS') this.successVisible = true
            })
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
        this.formValidate.images = []
        this.cancelVisible = false
        this.successVisible = false
      },
      handleView(url, index) {
        this.imageVisible = true
        this.showIndex = index
      },
      handleRemove(file, index) {
        this.formValidate.images.splice(this.formValidate.images.indexOf(file), 1)
        this.uploadImgList = this.formValidate.images.map(img => img.url)
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
        // console.log(this.imgSizeList)
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          var data = {}
          data.url = reader.result
          data.rawFile = file
          this.formValidate.images.push(data)
          this.uploadImgList = this.formValidate.images.map(img => img.url)
          return false
        }
        return false
      },
      toDemandList() {
        this.$router.push({
          name: 'DemandList'
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
    justify-content: center;
    position: relative;
    overflow: auto !important
  }

  .new-demand {
    margin-top: 24px;
    margin-bottom: 50px;
    background: white;
    z-index: 200;
    width: 90%;
    height: 90%;
    padding: 30px;
    box-shadow: 0px 6px 10px 0px rgba(28, 60, 69, 0.25);
  }

  .upload-list {
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

  .upload-list .upload-img {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 60px;
  }

  .upload-list-delete {
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

  .line-form-item ivu-form-item-error-tip {
    margin-left: 100px;
  }
</style>
