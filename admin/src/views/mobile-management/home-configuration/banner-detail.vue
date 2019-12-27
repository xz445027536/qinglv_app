<template>
  <div>
    <div style="margin: 1% 0">
      <b @click="onClick(0)" class="title">轮播图片</b>
      <i class="el-icon-arrow-right"></i>
      <span style="cursor: pointer">{{title}}</span>
    </div>

    <div style="background: white;display: flex;flex-direction: row;box-sizing: border-box">
      <div style="width: 750px">
        <div id="editor" style="border: 1px #eaeaea solid"></div>
        <div id="text" style="height: 800px;border: 1px #eaeaea solid"></div>
      </div>

      <div style="position: relative">
        <img :src="iphoneBg"/>
        <div v-html="newHtml"
             style="width: 375px;height:667px;position: absolute;top:93px;left:32px;overflow-y: scroll"></div>
      </div>
    </div>
    <div style="float: right;margin-top: 30px;display: flex;">
      <el-button @click="onClick(0)">取消</el-button>
      <el-button type="primary" @click="onClick(1)">提交</el-button>
      <el-tooltip class="item" effect="dark" content="提交后需在banner配置页点击“同步至APP”生效" placement="top-end">
        <i class="el-icon-question" style="margin-left: 10px"></i>
      </el-tooltip>
    </div>

  </div>
</template>

<script>
  import iphoneBg from '@/assets/images/iphone6_box.png'
  import E from 'wangeditor'
  import { uploadPic } from '@/api/homepage.js'

  export default {
    name: 'banner-detail',
    props: ['html', 'title'],
    data() {
      return {
        newHtml: this.html.clickUrl,
        editor: null,
        iphoneBg: iphoneBg
      }
    },
    mounted() {
      this.initWangEditor()
    },
    methods: {
      initWangEditor() {
        this.editor = new E('#editor', '#text')
        this.editor.customConfig.onchange = (html) => {
          console.log(html)
          this.newHtml = html
        }
        this.editor.customConfig.debug = true
        this.editor.customConfig.uploadImgServer = this.uploadUrl
        this.editor.customConfig.uploadImgMaxLength = 1
        this.editor.customConfig.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          // 'fontName', // 字体
          // 'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          // 'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image' // 插入图片
        ]
        this.editor.customConfig.customUploadImg = (files, insert) => {
          // files 是 input 中选中的文件列表
          // insert 是获取图片 url 后，插入到编辑器的方法

          // 上传代码返回结果之后，将图片插入到编辑器中
          console.log(files)
          var form = new FormData()
          form.append('file', files[0])
          uploadPic(form).then(res => {
            insert(res.data.file)
          })
        }
        this.editor.create()
        this.editor.txt.html(this.newHtml)
      },
      onClick(type) {
        if (type === 0) {
          this.$emit('cancel')
        } else {
          this.$emit('submit', this.newHtml, this.html)
        }
      }
    }
  }
</script>

<style scoped>
  .title {
    cursor: pointer;
  }
</style>