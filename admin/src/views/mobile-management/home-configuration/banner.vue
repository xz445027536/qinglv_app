<template>
  <div>
    <div v-if="!showDetail">
      <div class="card-title" style="margin: 0 1%">
        <b>轮播图片</b>
        <el-button type="primary" plain size="small" @click="showAddDialog">新增轮播位</el-button>
      </div>
      <el-card class="box-card" v-for="(item,index) in bannerData" :key="item.id">
        <div slot="header" class="card-title">
          <span>轮播图{{index + 1}}</span>
          <el-button style="float: right" type="danger" size="small" plain @click="onDeleteClick(item.id,item.seqNum)">
            删除当前轮播位
          </el-button>
        </div>
        <el-form>
          <el-form-item label="轮播图片:">
            <img :src="item.bannerImg"/>
            <el-upload
              class="change-button"
              action=""
              :auto-upload="false"
              :on-change="onBannerImageChange"
              :show-file-list="false">
              <el-button size="medium" type="primary" @click="clickUpload(item)">修改图片</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="轮播跳转页:">
            <!--<el-button size="medium" @click="onDetailClick(item,'轮播图'+(index+1)+'跳转页面')">去查看</el-button>-->
            <div style="display: flex;flex-direction: column">
              <el-select v-model="item.jumpType" placeholder='请选择落地页内容' style="width: 30%">
                <el-option
                  v-for="item in jumpTypes"
                  :key="item.jumpType"
                  :label="item.label"
                  :value="item.jumpType">
                </el-option>
              </el-select>
              <el-input v-if="item.jumpType==0" style="margin-top: 20px;width: 50%" placeholder="请输入对应网址"
                        v-model="item.h5Url"></el-input>
              <el-upload
                v-else
                class="uploader-detail"
                :auto-upload="false"
                style="margin-top: 20px"
                action=""
                :on-change="onDetailImageChange"
                :show-file-list="false">
                <img :src="item.clickImg" v-if="item.clickImg" class="uploader-detail-content"
                     @click="detailImageClick(item)"/>
                <div class="uploader-detail-content" v-else @click="detailImageClick(item)">
                  <i class="el-icon-plus" style="font-size: 28px"></i>
                  <span class="el-upload__tip">建议上传图片的</span>
                  <span class="el-upload__tip">宽度为375倍数长度不限制</span>
                </div>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
      <el-button type=" primary
            " @click="saveAndUpdate" style="float: right;margin-top: 20px">同步至APP
      </el-button>
      <el-dialog
        :close-on-click-modal="false"
        title="新增轮播位"
        :visible.sync="dialogVisible"
        width="600px">
        <el-form labelWidth="90px">
          <el-form-item label="轮播图片:">
            <el-upload
              class="uploader"
              action=""
              :auto-upload="false"
              :on-change="onNewBannerImageChange"
              :show-file-list="false">
              <img :src="imgUrl" v-if="imgUrl" class="new-image"/>
              <div class="uploader-content" v-else>
                <div class="el-upload__tip">限单张 大小需为</div>
                <i class="el-icon-plus" style="font-size: 28px"></i>
                <div class="el-upload__tip">750*326</div>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="轮播跳转页:">
            <div style="display: flex;flex-direction: column">
              <el-select v-model="newBannerData.jumpType" placeholder='请选择落地页内容' style="width: 50%">
                <el-option
                  v-for="item in jumpTypes"
                  :key="item.jumpType"
                  :label="item.label"
                  :value="item.jumpType">
                </el-option>
              </el-select>
              <el-input v-if="newBannerData.jumpType==='0'" style="margin-top: 20px;width: 80%" placeholder="请输入对应网址"
                        v-model="newBannerData.h5Url"></el-input>
              <el-upload
                v-else
                class="uploader-detail"
                :auto-upload="false"
                style="margin-top: 20px"
                action=""
                :on-change="onNewDetailImageChange"
                :show-file-list="false">
                <img :src="newBannerData.clickImg" v-if="newBannerData.clickImg" class="uploader-detail-content"/>
                <div class="uploader-detail-content">
                  <i class="el-icon-plus" style="font-size: 28px"></i>
                  <span class="el-upload__tip">建议上传图片的</span>
                  <span class="el-upload__tip">宽度为375倍数长度不限制</span>
                </div>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBanner">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <banner-detail v-else :html="htmlData" :title="title" @submit="bannerDetailUpdate"
                   @cancel="showDetail = false"></banner-detail>
  </div>
</template>

<script>
  import BannerDetail from './banner-detail'
  import { getBanner, delBanner, saveBanner } from '@/api/homepage.js'
  import { readImageInfo } from '@/utils/index.js'

  export default {
    name: 'banner',
    components: {
      BannerDetail,
      'banner-detail': BannerDetail
    },
    data() {
      return {
        bannerData: [],
        showDetail: false,
        dialogVisible: false,
        htmlData: {},
        title: '',
        imgUrl: '',
        newImgFile: {},
        seqNum: 10000,
        imageArr: [],
        uploadImageData: {},
        newBannerData: {
          h5Url: '',
          clickImg: '',
          jumpType: '0'
        },
        jumpTypes: [{ jumpType: '0', label: '跳转至对应链接' }, { jumpType: '1', label: '长图上传' }],
        detailImageData: {}
      }
    },
    created() {
      getBanner({ bannerType: '0' }).then(res => {
        if (res.data) {
          this.bannerData = res.data
        }
      })
    },
    methods: {
      showAddDialog() {
        if (this.bannerData.length === 3) {
          this.$message('轮播位数量不能多于3')
          return
        }
        this.imgUrl = ''
        this.newBannerData = {
          h5Url: '',
          clickImg: '',
          jumpType: '0'
        }
        this.dialogVisible = true
      },
      onDetailClick(item, title) {
        this.htmlData = item
        this.title = title
        this.showDetail = true
      },
      onDeleteClick(id, seqNum) {
        if (this.bannerData.length === 1) {
          this.$message('轮播位数量不能少于1')
          return
        }
        this.$msgbox({
          title: '删除当前轮播位？',
          message: '轮播位数量减少，且删除该轮播位上的图片，是否确定?',
          type: 'error',
          showCancelButton: true
        }).then(() => {
          if (!id) { // 删除临时添加的数据
            for (var i in this.bannerData) {
              if (this.bannerData[i].seqNum === seqNum) {
                this.bannerData.splice(i, 1)
              }
            }
          } else { // 删除服务器数据
            delBanner([id]).then(() => {
              getBanner({ bannerType: '0' }).then(res => {
                this.bannerData = res.data
              })
            })
          }
        }).catch(() => {
        })
      },
      clickUpload(data) {
        this.uploadImageData = data
      },
      detailImageClick(data) {
        this.detailImageData = data
      },
      // 新增轮播图上传图片的回调
      onNewBannerImageChange(file, fileList) {
        readImageInfo(file).then(res => {
          if (res.width === 750 && res.height === 326) {
            this.setNewImageArr(file)
          } else {
            this.$msgbox({
              title: '图片大小错误',
              message: '图片像素大小为750*326 ',
              type: 'error'
            })
          }
        })
      },
      setNewImageArr(file) {
        this.imgUrl = file.url
        this.newImgFile = file.raw
      },
      // 修改轮播图上传图片的回调
      onBannerImageChange(file, fileList) {
        readImageInfo(file).then(res => {
          if (res.width === 750 && res.height === 326) {
            this.setBannerImageArr(file)
          } else {
            this.$msgbox({
              title: '图片大小错误',
              message: '图片像素大小为750*326 ',
              type: 'error'
            })
          }
        })
      },
      setBannerImageArr(file) {
        var data = {}
        this.uploadImageData.bannerImg = file.url
        data.seqNum = this.uploadImageData.seqNum
        data.file = file.raw
        for (var i in this.imageArr) {
          if (this.imageArr[i].seqNum === data.seqNum) {
            this.imageArr.splice(i, 1)
          }
        }
        this.imageArr.push(data)
      },
      onDetailImageChange(file) {
        this.detailImageData.clickImg = file.url
        this.detailImageData.clickRawImg = file.raw
      },
      onNewDetailImageChange(file) {
        this.newBannerData.clickImg = file.url
        this.newBannerData.clickRawImg = file.raw
      },
      addBanner() {
        if (!this.imgUrl || (this.newBannerData.jumpType === '0' && !this.newBannerData.h5Url) || (this.newBannerData.jumpType === '1' && !this.newBannerData.clickImg)) {
          this.$message({
            type: 'error',
            message: '必填项不能为空'
          })
          return
        }
        this.dialogVisible = false
        var img = {}
        this.newBannerData.seqNum = this.seqNum
        this.newBannerData.bannerImg = this.imgUrl
        img.seqNum = this.newBannerData.seqNum
        img.file = this.newImgFile
        this.bannerData.push(this.newBannerData)
        this.imageArr.push(img)
        this.seqNum++
      },
      bannerDetailUpdate(html, data) {
        data.clickUrl = html
        this.showDetail = false
      },
      saveAndUpdate() {
        this.$msgbox({
          title: '同步Banner配置？',
          message: '确认后APP将会实时同步更改',
          type: 'warning',
          showCancelButton: true
        }).then(() => {
          var form = new FormData()
          for (var index in this.bannerData) {
            var data = this.bannerData[index]
            if (data.jumpType === '0') { // 跳转至对应链接
              data.clickImg = ''
              data.clickUrl = ''
              if (!data.h5Url) {
                const num = parseInt(index) + 1
                this.$message({
                  type: 'error',
                  message: `轮播图${num}跳转网址不能为空!`
                })
                return
              }
            } else if (data.jumpType === '1') { // 长图上传
              data.h5Url = ''
              if (data.clickRawImg) {
                data.clickUrl = 'clickUrl' + index
                form.append('clickUrl' + index, data.clickRawImg)
                delete data.clickRawImg
              }
            }
          }
          form.append('params', JSON.stringify(this.bannerData))
          if (this.imageArr.length > 0) {
            for (var i in this.imageArr) {
              form.append(this.imageArr[i].seqNum.toString(), this.imageArr[i].file)
            }
          }
          saveBanner(form).then(() => {
            getBanner({ bannerType: '0' }).then(res => {
              this.bannerData = res.data
              this.$message({
                type: 'success',
                message: '同步成功'
              })
            })
          })
        })
      }
    }
  }
</script>

<style scoped>
  .card-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between
  }

  .uploader {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 375px;
    height: 163px;
  }

  .uploader-detail {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 200px;
    height: 200px;
  }

  .uploader-detail-content {
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .uploader-content {
    width: 375px;
    height: 163px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .new-image {
    width: 375px;
    height: 163px;
  }

  .change-button {
    position: absolute;
    bottom: 0;
    right: 20px
  }

  .box-card {
    margin: 1%
  }
</style>