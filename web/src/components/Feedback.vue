<template>
  <div>
    <div class="feed-back" @click="feedbackVisible = true">
      <Icon class="feed-back-icon" type="ios-create-outline"/>
    </div>
    <BackTop></BackTop>
    <Modal v-model="feedbackVisible" @on-visible-change="handleVisibleChange" :closable="false" :mask-closable="false" width="600">
      <p slot="header" style="text-align: center;font-size: 16px">意见反馈</p>
      <div>
        <p style="font-size: 14px;color: black">您在访问过程中的任何问题，欢迎反馈给我们</p>
        <p style="font-size: 14px;margin-bottom: 10px">
          如果您有包装相关的需求欢迎前往
          <span @click="goDemand" style="color: #2ec1bd;cursor: pointer;text-decoration: underline">需求站点</span>
          告诉我们
        </p>
        <Form ref="feedbackData" :model="feedbackData" :rules="ruleValidate">
          <FormItem label="" prop="content">
            <div style="position: relative;">
              <Input v-model="feedbackData.content" type="textarea" :autosize="{minRows: 5,maxRows: 14}"
                placeholder="请描述您遇到的问题，提交意见/建议，以便我们更好的改进" :maxlength="500"></Input>
              <span :style="{ color: feedbackData.content.length < 500? 'rgba(0, 0, 0, 0.45)' : 'red' }" style="position: absolute; right: 8px; bottom: -28px;">
                ({{feedbackData.content.length > 500 ? 500 : feedbackData.content.length}}/500)</span>
            </div>
          </FormItem>
          <FormItem label="" prop="images" style="margin-bottom: 0;">
            <div class="demo-upload-list" v-for="item in feedbackData.images" :key="item.url">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </div>
            <Upload
              v-if="feedbackData.images.length===0"
              ref="upload"
              :show-upload-list="false"
              :format="['jpg','jpeg','png','JPG','JPEG','PNG']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              type="drag"
              action=""
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="md-add" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align: center;margin-bottom: 20px">
        <Button @click="feedbackVisible = false">取消</Button>
        <Button type="primary" @click="submitFeedback">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import { feedback } from '../api/common'

  export default {
    data() {
      return {
        feedbackVisible: false,
        feedbackData: { content: '', images: [] },
        ruleValidate: {
          content: [
            { required: true, message: '请填写您的意见', trigger: 'blur' },
            { min: 10, message: '意见/建议反馈意见至少 10 个字哦', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      submitFeedback() {
        this.$refs['feedbackData'].validate((valid) => {
          if (valid) {
            const form = new FormData()
            form.append('source', '0') // '0' -- web, '1' -- app, '2' -- 丰声微服务
            form.append('content', this.feedbackData.content)
            form.append('webHead', navigator.userAgent)
            if (this.feedbackData.images.length > 0) {
              this.feedbackData.images.forEach((item) => {
                form.append('images', item.rawFile)
              })
            }
            feedback(form).then(response => {
              if (response.status === 'SUCCESS') {
                this.feedbackVisible = false
                this.$Message.success(response.message)
              }
            })
          }
        })
      },
      handleVisibleChange(visible) {
        console.log('handleVisibleChange: ', visible)
        if (!visible) {
          this.feedbackData = { content: '', images: [] }
        }
      },
      goDemand() {
        this.feedbackVisible = false
        this.$router.push({
          name: 'NewDemand'
        })
        // this.$router.push({ name: 'DemandList' })
      },
      handleRemove(file) {
        this.feedbackData.images.splice(this.feedbackData.images.indexOf(file), 1);
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
        });
      },
      handleBeforeUpload(file) {
        //过滤文件格式
        if (file.name.toLowerCase().indexOf('png') === -1 && file.name.toLowerCase().indexOf('jpg') === -1 && file.name.toLowerCase().indexOf('jpeg') === -1) {
          return
        }
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          var data = {}
          data.url = reader.result
          data.rawFile = file
          this.feedbackData.images.push(data)
          return false
        }
        return false
      }
    }
  }
</script>

<style scoped lang="less">
  .feed-back {
    z-index: 10;
    position: fixed;
    cursor: pointer;
    bottom: 80px;
    right: 30px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 2px;
    &-icon {
      display: inline-block;
      font-family: "Ionicons";
      speak: none;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      text-rendering: auto;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      vertical-align: middle;
      color: #fff;
      font-size: 24px;
      padding: 8px 12px;
    }
  }

  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>