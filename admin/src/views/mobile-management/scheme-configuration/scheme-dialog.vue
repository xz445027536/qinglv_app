<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    style="padding: 10px 20px;"
    :visible.sync="visible"
    @open="onDialogOpen"
    @close="onDialogClose"
    :before-close="onCancelClick"
    width="62%">
    <el-form
      label-position="right"
      ref="schemeForm"
      label-width="20%"
      :model="schemeForm"
      :rules="rules"
      status-icon>
      <!--<el-form-item label="方案 id">-->
        <!--<el-input :readonly="actionType === 0" style="width: 80%;" v-model="schemeForm.solutionCode" placeholder="请输入方案 id">-->
        <!--</el-input>-->
      <!--</el-form-item>-->

      <el-form-item label="方案名称" prop="solutionName">
        <el-input ref="solutionNameInput" :readonly="actionType === 0" style="width: 80%;" v-model="schemeForm.solutionName" placeholder="请输入方案名称">
        </el-input>
      </el-form-item>

      <el-form-item label="托寄物">
        <el-input :readonly="actionType === 0" style="width: 80%;" v-model="schemeForm.deliverGoods" placeholder="请输入托寄物">
        </el-input>
      </el-form-item>

      <el-form-item label="托寄物数量" prop="solQty">
        <el-input-number
          :disabled="actionType === 0"
          v-model="schemeForm.solQty"
          :min="0"
          placeholder="请输入托寄物数量">
        </el-input-number>
      </el-form-item>

      <el-form-item label="托寄物单位" prop="solUnit">
        <el-input :readonly="actionType === 0" style="width: 80%;" v-model="schemeForm.solUnit" placeholder="请输入托寄物单位">
        </el-input>
      </el-form-item>

      <el-form-item label="方案标签">
        <el-tag
          v-for="label in schemeForm.labels"
          :key="label.labelName"
          :closable="actionType !== 0"
          :disable-transitions="false"
          @close="handleTagClose(label)">
          {{label.labelName}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          :maxlength="5"
          @keyup.enter.native.trim="handleInputConfirm"
          @blur="handleInputConfirm">
        </el-input>
        <el-button
          v-if="actionType !== 0"
          :disabled="schemeForm.labels.length >= 3"
          class="button-new-tag"
          size="small"
          @click="showInput">+ New Tag</el-button>

        <!--<el-tooltip v-else class="item" effect="dark" content="最多添加 3 个标签" placement="top">-->
          <!--<el-button-->
            <!--v-if="actionType !== 0"-->
            <!--:disabled="schemeForm.labels.length >= 3"-->
            <!--class="button-new-tag"-->
            <!--size="small"-->
            <!--@click="showInput">+ New Tag</el-button>-->
        <!--</el-tooltip>-->
        <el-alert
          class="tag-length-alert"
          v-if="showTagLengthAlert || showTagRepeatAlert"
          :title="alertText"
          type="warning"
          center
          :closable="false"
          show-icon>
        </el-alert>
      </el-form-item>

      <el-form-item label="包含材料" prop="materials">
        <el-select
          :disabled="actionType === 0"
          @change="onMaterialChange"
          multiple
          filterable
          value-key="matId"
          style="width: 80%;"
          v-model="schemeForm.materials"
          placeholder="请选择包含材料">
          <el-option
            v-for="item in materialOptions"
            :value="item"
            :key="item.matId"
            :label="item.matName">
          </el-option>
        </el-select>
        <div class="count-flex-container">
          <div style="display: flex; margin-top: 12px; width: 50%; align-items: center;" v-for="material in schemeForm.materials">
            <div style="width: 43%; margin-right: 12px;">{{material.matName}}</div>
            <el-input-number
              :disabled="actionType === 0"
              v-model="material.matCount"
              @change="handleMaterialCountChange"
              size="small"
              :min="1"
              :max="99"
              label="描述文字"></el-input-number>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="方案总价">
        <span style="width: 40%;">{{`${schemeForm.unitPrice} 元`}}</span>
      </el-form-item>

      <el-form-item label="碳排放值">
        <span style="width: 40%;">{{schemeForm.unitCarbon}}</span>
      </el-form-item>

      <el-form-item class="is-required" label="搜索列表图" prop="searchListPic">
        <el-upload
          :disabled="actionType === 0"
          class="search-image-size image-uploader"
          accept="image/jpeg,image/jpg,image/png"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onSearchImageChange">
          <img
            v-if="searchImageUrl"
            :src="searchImageUrl"
            :style="{ cursor: actionType === 0 ? 'not-allowed' : ''}"
            class="search-image-size">
          <div v-else class="search-image-size image-uploader-tip-container">
            <div class="el-upload__tip">限单张 大小需为</div>
            <i class="el-icon-plus" style="font-size: 20px;"></i>
            <div class="el-upload__tip">260*196</div>
          </div>
        </el-upload>

        <div v-if="searchImageUrl" class="el-upload__tip">点击图片更换新图，大小需为 <b>260*196</b></div>

      </el-form-item>

      <el-form-item label="热门方案图">
        <el-upload
          :disabled="actionType === 0"
          class="hot-image-size image-uploader"
          accept="image/jpeg,image/jpg,image/png"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onHotImageChange"
          :on-success="handleHotUploadSuccess"
          :before-upload="beforeHotUpload">
          <img
            v-if="hotImageUrl"
            :src="hotImageUrl"
            :style="{ cursor: actionType === 0 ? 'not-allowed' : ''}"
            class="hot-image-size">
          <div v-else class="hot-image-size image-uploader-tip-container">
            <div class="el-upload__tip">限单张 大小需为</div>
            <i class="el-icon-plus" style="font-size: 20px;"></i>
            <div class="el-upload__tip">148*148</div>
          </div>
        </el-upload>

        <div v-if="hotImageUrl" class="el-upload__tip">点击图片更换新图，大小需为 <b>148*148</b></div>
      </el-form-item>

      <el-form-item class="is-required" label="爆炸图" prop="explosiveSchemePic">
        <el-upload
          :disabled="actionType === 0"
          class="explosive-image-size image-uploader"
          accept="image/jpeg,image/jpg,image/png"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onExplosiveChange"
          :on-success="handleExplosiveUploadSuccess"
          :before-upload="beforeExplosiveUpload">
          <img
            v-if="explosiveImageUrl"
            :src="explosiveImageUrl"
            :style="{ cursor: actionType === 0 ? 'not-allowed' : ''}"
            class="explosive-image-size">
          <div v-else class="explosive-image-size image-uploader-tip-container">
            <div class="el-upload__tip">限单张 大小需为</div>
            <i class="el-icon-plus" style="font-size: 26px;"></i>
            <div class="el-upload__tip">750*260</div>
          </div>
        </el-upload>

        <div v-if="explosiveImageUrl" class="el-upload__tip">点击图片更换新图，大小需为 <b>750*260</b></div>

      </el-form-item>

      <el-form-item class="is-required" label="包装说明" prop="packingProcess">
        <div>
          <el-checkbox disabled size="small" @change="handlePhotoCheckbox" v-model="byPhotos" label="图片说明" border></el-checkbox>
          <el-checkbox :disabled="actionType === 0" size="small" @change="handleVideoCheckbox" v-model="byVideo" label="视频展示" border></el-checkbox>
        </div>

        <input
          style="position: absolute; opacity: 0;"
          type="file"
          ref="packing-image-file-input"
          @change="updatePackingImage"
          accept="image/jpg,image/jpeg,image/x-png">
        <div class="packing-image-grid-container" v-if="packImageUrlList.length > 0">
          <div
            class="packing-image-item"
            :class="{ 'border-put-tip': image.showPutTip, 'border-drag-tip': image.showDragTip}"
            draggable="true"
            @dragstart="(dragEvent) => packItemDragStart(image, index, dragEvent)"
            @dragover.prevent="(dragEvent) => packItemDragOver(image, index, dragEvent)"
            @dragenter="(dragEvent) => packItemDragEnter(image, index, dragEvent)"
            @dragleave="(dragEvent) => packItemDragLeave(image, index, dragEvent)"
            @dragend="(dragEvent) => packItemDragEnd(image, index, dragEvent)"
            @drop="(dragEvent) => packItemDrop(image, index, dragEvent)"
            v-for="(image, index) in packImageUrlList">
            <div class="image-desc-flex-container">
              <span>{{index + 1}}、</span>
              <div v-if="!image.isPackImageDescEdit">{{image.processDesc}}</div>
              <el-button
                v-if="actionType !== 0 && !image.isPackImageDescEdit"
                circle
                size="mini"
                type="primary"
                icon="el-icon-edit"
                style="transform: scale(0.8); margin-left: 6px; align-self: center;"
                @click="handleEditAction(index)">
              </el-button>

              <div v-if="image.isPackImageDescEdit">
                <el-input :ref="`descInput${index}`" placeholder="请输入包装说明，完成后点击 ✓ 按钮" style="width: 228px;" size="mini" v-model="image.processDesc" :maxlength="16"></el-input>
                <!--<el-button type="text" icon="el-icon-check" style="margin-left: 4px;" @click="confirmImageDesc(image.seqNumber)"></el-button>-->
                <el-button style="font-size: 10px; transform: scale(0.8);" circle size="mini" type="primary" icon="el-icon-check" @click="confirmImageDesc(index)"></el-button>
                <!--<el-button type="text" size="small" @click="cancelEditImageDesc(image.seqNumber)">取消</el-button>-->
              </div>
            </div>
            <div style="position: relative;">
              <img
                :style="{ cursor: actionType === 0 ? 'not-allowed' : 'pointer'}"
                @click="actionType === 0 ? '' : uploadEventDelegate(index, image)"
                class="packing-image"
                :key="image.imgUrl"
                :src="image.imgUrl">
              <i
                v-if="actionType !== 0"
                class="el-icon-error corner-icon"
                @click="deletePackImage(image)"></i>
              <!--<div v-if="actionType !== 0" class="image-mask center-flex-container">-->
              <!--&lt;!&ndash;<i title="修改图片" class="el-icon-edit-outline corner-icon" @click="deletePackImage(image)"></i>&ndash;&gt;-->
              <!--&lt;!&ndash;<i title="删除图片" class="el-icon-error corner-icon" @click="deletePackImage(image)"></i>&ndash;&gt;-->
              <!--<el-button title="修改图片" type="primary" icon="el-icon-edit" @click="uploadEventDelegate(index, image)" circle></el-button>-->
              <!--<el-button title="删除图片" type="danger" icon="el-icon-delete" circle @click="deletePackImage(image)"></el-button>-->
              <!--</div>-->
            </div>
          </div>
        </div>

        <el-upload
          v-if="actionType !== 0"
          accept="image/jpeg,image/jpg,image/png"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onPackingImageChange"
          :on-success="handlePackingUploadSuccess"
          :before-upload="beforePackingUpload">
          <el-button :disabled="packImageUrlList.length >= 10" slot="trigger" size="small" type="primary">添加图片</el-button>
          <div slot="tip" class="el-upload__tip">
            请按包装先后顺序添加 <b>2-10</b> 张图片（尺寸大小需为 <b>460*261</b>）及图片说明（字数不超过 16）
            <br>可直接通过<b>拖拽</b>修改图片顺序
          </div>
        </el-upload>

        <div v-if="byVideo" style="position: relative;">

          <video v-if="videoUrl" controls controlsList='nodownload' :src="videoUrl" height="320" width="480"></video>

          <el-progress v-if="isUploading" style="width: 480px; margin-bottom: 8px;" :text-inside="true" :stroke-width="18" :percentage="progress"></el-progress>

          <el-upload
            v-if="actionType !== 0"
            ref="videoUpload"
            style="width: 480px;"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="saveVideoFile"
            :auto-upload="true"
            :show-file-list="false"
            :on-change="handleVideoFileChange"
            accept="video/mp4">
            <el-button v-if="!hasVideoFile" size="small" type="primary">添加视频</el-button>
            <div v-if="!hasVideoFile" slot="tip" class="el-upload__tip">选择包装说明视频(.mp4 格式)后将开始上传，文件较大时可能耗时较长，请耐心等待。</div>
          </el-upload>
          <el-button
            v-if="hasVideoFile && actionType !== 0"
            class="side-button"
            size="small"
            @click="handleVideoFileRemove"
            type="danger">删除视频</el-button>
        </div>

      </el-form-item>

      <el-form-item label="补充说明">
        <div style="margin-top: 8px;" v-for="(item, index) in noticeList" :key="index">
          <el-button style="margin-bottom: 12px;" :disabled="actionType === 0 || noticeList.length >= 3" size="small" @click="insertNoticeItem(index)" type="primary">插入一项</el-button>
          <el-card
            :shadow="'hover'"
            class="box-card"
            style="width: 80%;">
            <div slot="header" class="header-flex-container">
              <el-upload
                class="notice-icon-uploader"
                style="margin-right: 12px;"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                :on-change="(file, fileList) => handleNoticeIconChange(file, fileList, item)"
                :show-file-list="false">
                <img v-if="item.iconUrl" :src="item.iconUrl" class="notice-icon">
                <i v-else class="el-icon-plus notice-icon-icon"></i>
              </el-upload>
              <el-form-item prop="noticeTitle">
                <el-input
                  :ref="`noticeTitleInput${index}`"
                  :readonly="actionType === 0"
                  placeholder="请输入主题,不能为空"
                  style="width: 260px;"
                  :maxlength="20"
                  size="large"
                  @blur="handleThemeBlur($event, item, index)"
                  v-model="item.title"></el-input>
              </el-form-item>

              <div class="fill-remain"></div>
              <el-button v-if="actionType !== 0" @click="deleteNoticeItem(item)" type="text">删除该项</el-button>
            </div>
            <div class="notice-flex-row-container">
              <div style="margin-left: 24px;">
                <div class="single-item-container" v-for="(noticeContent, headIndex) in item.content" :key="headIndex">
                  <div style="display: flex;">
                    <div style="width: 50px;">标题 {{headIndex + 1}}</div>
                    <el-input
                      :ref="`listTitleInput${index}-${headIndex}`"
                      :readonly="actionType === 0"
                      placeholder="请输入标题，无标题可以为空"
                      style="width: 370px;"
                      size="medium"
                      :maxlength="20"
                      v-model="noticeContent.heading"></el-input>
                    <!--<span>{{noticeContent.heading.length}}</span>-->
                    <i v-if="actionType !== 0" style="margin-top: 12px; margin-left: 3px;" @click="deleteNoticeHeading(noticeContent, item)" class="el-icon-circle-close"></i>
                  </div>

                  <div style="margin-left: 50px;">
                    <div class="ordered-list-flex-container" v-for="(listItem, listIndex) in noticeContent.orderedList">
                      <div>{{listIndex + 1}}、</div>
                      <el-input
                        :ref="`listContentInput${index}-${headIndex}-${listIndex}`"
                        :readonly="actionType === 0"
                        type="textarea"
                        :maxlength="500"
                        autosize
                        placeholder="请输入条目内容"
                        style="width: 325px;"
                        size="mini"
                        v-model="noticeContent.orderedList[listIndex]"></el-input>
                      <i v-if="actionType !== 0" style="margin-top: 12px; margin-left: 3px;" @click="deleteOrderedListItem(listItem, noticeContent)" class="el-icon-circle-close"></i>
                    </div>

                    <el-button style="margin-left: 20px;" v-if="actionType !== 0" size="small" type="text" @click="addOrderedList(index, headIndex, noticeContent)">新增条目列表</el-button>
                  </div>

                </div>

                <div>
                  <el-button v-if="actionType !== 0" size="medium" type="text" @click="addNoticeHeading(index, item)">新增标题 {{item.content.length + 1}}</el-button>
                </div>
              </div>

            </div>
          </el-card>
        </div>

        <div>
          <el-button style="margin-top: 12px;" :disabled="actionType === 0 || noticeList.length >= 3" size="small" @click="addNoticeItem" type="primary">添加一项</el-button>
        </div>
      </el-form-item>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button v-if="actionType === 0" size="medium" type="primary" @click="onEditClick">编 辑</el-button>
      <el-button v-if="actionType === 0" size="medium" type="primary" @click="onDeleteClick">删 除</el-button>
      <el-button size="medium" @click="onCancelClick">{{actionType === 0 ? '关 闭' : '取 消'}}</el-button>
      <el-button :loading="submitting" v-if="actionType !== 0" size="medium" type="primary" @click="onOkClick">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  const VIEW = 0
  const EDIT = 1
  const ADD = 2

  import {
    deletePackingVideo,
    getMaterialOption,
    getSchemeDetail,
    uploadPackingVideo
  } from '../../../api/scheme-and-material'

  export default {
    name: 'scheme-dialog',
    props: {
      dialogVisible: {
        type: Boolean
      },
      isSubmitting: {
        type: Boolean,
        default: false
      },
      dialogTitle: {
        type: String,
        required: true
      },
      actionType: {
        // type { 0: '查看(详情)', 1: '编辑', 2: '新增'}
        type: Number,
        required: true
      },
      selectedSchemeId: {
        // type: Number,
        required: true
      }
    },
    data() {
      return {
        onUploadProgress: progressEvent => {
          this.progress = (progressEvent.loaded / progressEvent.total * 100 | 0)
          console.log('progress: ', this.progress)
        },
        isUploading: false,
        progress: 0,
        count: 1,
        submitControl: false,
        imageDialogVisible: false,
        dialogImageUrl: '',
        schemeForm: {
          // solutionCode: '',
          solutionName: '',
          deliverGoods: '',
          solQty: 0,
          solUnit: '',
          labels: [],
          materials: [],
          unitPrice: '',
          unitCarbon: '',
          noticeDetail: ''
        },
        inputVisible: false,
        alertText: '',
        showTagLengthAlert: false,
        showTagRepeatAlert: false,
        inputValue: '',
        rules: {
          // solutionCode: [
          //   { required: true, message: '方案 id 不能为空!', trigger: 'change' }
          // ],
          solutionName: [
            { required: true, message: '方案名称不能为空!', trigger: 'change' }
          ],
          solQty: [
            { required: true, message: '托寄物数量不能为空!', trigger: 'change' }
          ],
          solUnit: [
            { required: true, message: '托寄物单位不能为空!', trigger: 'change' }
          ],
          labels: [
            { required: true, message: '方案标签不能为空!', trigger: 'blur' }
          ]
        },
        materialOptions: [],
        materialConfig: [],
        materialInfo: [],
        materialCountListBackup: [],

        searchImageUrl: '', // 搜索列表图 对应后端 solListImg
        hasSearchImageFile: false,
        searchImageFile: '',

        hotImageUrl: '', // 热门方案图 对应后端 goodsSolImg
        hasHotImageFile: false,
        hotImageFile: '',

        explosiveImageUrl: '', // 爆炸图 对应后端 packCmpltImg
        hasExplosiveImageFile: false,
        explosiveImageFile: '',

        byPhotos: true,
        nextSequenceNumber: 0, // 用来标记包装说明图的顺序
        isPackImageDescEdit: false,
        packImageUrl: '', // 包装说明图 对应后端 packProcessImgs
        currentPackingImageIndex: -1, // 当前编辑的图片对象索引
        currentPackingImage: {}, // 当前编辑的图片对象
        packImageUrlList: [],

        currentDragPackItem: {},
        currentDragPackItemIndex: -1,

        byVideo: false,
        videoUrl: '',
        videoHeight: '',
        videoWidth: '',
        videoDuration: '',
        hasVideoFile: false,
        hasNewVideoFile: false,
        videoFile: '',
        videoInfo: {},

        noticeList: [], // 补充说明数据
        deleteIds: []
      }
    },
    computed: {
      visible: {
        get() {
          return this.dialogVisible
        }
      },
      submitting: {
        get() {
          return this.isSubmitting
        }
      },
      title: {
        get() {
          return this.dialogTitle
        }
      },
      type: {
        get() {
          return this.actionType
        }
      },
      solutionId: {
        get() {
          return this.selectedSchemeId
        }
      }
    },
    created() {},
    methods: {
      onDialogOpen() {
        this.$nextTick(() => {
          this.$refs['schemeForm'].resetFields()
          if (this.actionType === ADD) {
            this.schemeForm = {
              // solutionCode: '',
              solutionName: '',
              solQty: 0,
              solUnit: '',
              labels: [],
              materials: [],
              unitPrice: 0,
              unitCarbon: 0
              // noticeDetail: ''
            }
            this.$refs['solutionNameInput'].focus()
          }
        })
        console.log(this.actionType)
        getMaterialOption().then(res => {
          this.materialOptions = res.data
        }).catch(err => {
          console.log('获取可选材料列表出错: ', err)
        })
        if (this.actionType === VIEW || this.actionType === EDIT) {
          getSchemeDetail(this.solutionId).then(res => {
            this.schemeForm = res.data
            this.handleImageAndVideoData(res.data)
            this.handleNoticeData(res.data.solutionInstructionList)
            this.schemeForm.unitPrice = this.schemeForm.materials.reduce((accumulator, currentValue) => {
              return accumulator + currentValue.matCount * currentValue.unitPrice
            }, 0).toFixed(2)
            this.schemeForm.unitCarbon = this.schemeForm.materials.reduce((total, carbon) => {
              return total + carbon.matCarbon * carbon.matCount
            }, 0).toFixed(2)
            console.log(this.schemeForm.unitCarbon)
          }).catch(err => {
            console.log('获取方案配置详情出错: ', err)
          })
        }
      },

      onDialogClose() {
        console.log('onDialogClose')
        this.isUploading = false
        this.progress = 0
        this.byPhotos = true
        this.byVideo = false
        this.showTagLengthAlert = false
        this.showTagRepeatAlert = false
        this.inputVisible = false
        this.inputValue = ''
        this.searchImageUrl = ''
        this.searchImageFile = ''
        this.hasSearchImageFile = false
        this.hotImageUrl = ''
        this.hotImageFile = ''
        this.hasHotImageFile = false
        this.explosiveImageUrl = ''
        this.explosiveImageFile = ''
        this.hasExplosiveImageFile = false
        this.packImageUrlList = []
        this.nextSequenceNumber = 0
        this.videoFile = ''
        this.videoUrl = ''
        this.videoHeight = ''
        this.videoWidth = ''
        this.videoDuration = ''
        this.hasVideoFile = false
        this.hasNewVideoFile = false
        this.noticeList = []
        this.deleteIds = []
      },

      handleImageAndVideoData(data) {
        this.searchImageUrl = data.solListImg
        this.hotImageUrl = data.goodsSolImg
        this.explosiveImageUrl = data.packCmpltImg
        this.packImageUrlList = data.packProcessImgs.map((image, index) => {
          image.seqNumber = index + 1
          Object.assign(image, { isPackImageDescEdit: false })
          return image
        })
        this.nextSequenceNumber = this.packImageUrlList.length
        if (data.packProcesVideoUrl) {
          this.byVideo = true
          this.hasVideoFile = true
          this.videoUrl = data.packProcesVideoUrl
          this.videoHeight = data.packProcesVideoHeight
          this.videoWidth = data.packProcesVideoWidth
          this.videoDuration = data.packProcesVideoDuration
        }
      },

      handleNoticeData(noticeData) {
        this.noticeList = noticeData.map(notice => {
          return {
            id: notice.id,
            title: notice.instruTitle,
            iconUrl: notice.instruIconUrl,
            content: JSON.parse(notice.instruContent)
          }
        })
      },

      handleTagClose(label) {
        this.schemeForm.labels.splice(this.schemeForm.labels.indexOf(label), 1)
      },

      handleInputConfirm() {
        const inputValue = this.inputValue
        if (inputValue) {
          if (inputValue.length > 5) {
            this.showTagLengthAlert = true
            this.alertText = '标签名称长度不得超过 5'
            this.$refs.saveTagInput.$refs.input.focus()
            return
          }
          if (this.schemeForm.labels.map(item => item.labelName).includes(inputValue)) {
            this.showTagRepeatAlert = true
            this.alertText = '标签已存在'
            this.$refs.saveTagInput.$refs.input.focus()
            return
          }
          this.showTagLengthAlert = false
          this.showTagRepeatAlert = false
          this.schemeForm.labels.push({
            labelId: '',
            labelName: inputValue
          })
        }
        this.inputVisible = false
        this.inputValue = ''
      },

      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      getMaterialCount(materialId) {
        const temp = this.materialCountListBackup.filter(item => item.id === materialId)
        return temp.length > 0 ? temp[0].count : 1
      },

      onMaterialChange(val) {
        this.schemeForm.unitPrice = val.reduce((accumulator, currentValue) => {
          if (!currentValue.matCount) {
            currentValue.matCount = 1
          }
          return accumulator + currentValue.matCount * currentValue.unitPrice
        }, 0).toFixed(2)
        this.schemeForm.unitCarbon = val.reduce((total, carbon) => {
          if (!carbon.matCount) {
            carbon.matCount = 1
          }
          return total + carbon.matCarbon * carbon.matCount
        }, 0).toFixed(2)
      },

      handleMaterialCountChange(val) {
        this.schemeForm.unitPrice = this.schemeForm.materials.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.matCount * currentValue.unitPrice
        }, 0).toFixed(2)
        this.schemeForm.unitCarbon = this.schemeForm.materials.reduce((total, carbon) => {
          return total + carbon.matCarbon * carbon.matCount
        }, 0).toFixed(2)
      },

      onSearchImageChange(file, fileList) {
        const isImage = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png')
        if (!isImage) {
          this.$message.warning('文件格式不符合要求')
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const image = new Image()
          image.onload = () => {
            console.log('width:', image.width)
            console.log('height:', image.height)
            if (image.width !== 260) {
              this.$message.warning('图片宽度不符合要求')
            } else if (image.height !== 196) {
              this.$message.warning('图片长度不符合要求')
            } else {
              this.$message.success('图片符合要求 点击图片可进行更换')
              this.hasSearchImageFile = true
              this.searchImageUrl = file.url
              this.searchImageFile = file.raw
            }
          }
          image.src = data
        }
        reader.readAsDataURL(file.raw)
      },

      beforeHotUpload(file) {},

      onHotImageChange(file, fileList) {
        const isImage = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png')
        if (!isImage) {
          this.$message.warning('文件格式不符合要求')
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const image = new Image()
          image.onload = () => {
            console.log('width:', image.width)
            console.log('height:', image.height)
            if (image.width !== 148) {
              this.$message.warning('图片宽度不符合要求')
            } else if (image.height !== 148) {
              this.$message.warning('图片长度不符合要求')
            } else {
              this.$message.success('图片符合要求 点击图片可进行更换')
              this.hasHotImageFile = true
              this.hotImageUrl = file.url
              this.hotImageFile = file.raw
            }
          }
          image.src = data
        }
        reader.readAsDataURL(file.raw)
      },

      handleHotUploadSuccess(res, file) {},

      beforeExplosiveUpload(file) {},

      onExplosiveChange(file, fileList) {
        const isImage = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png')
        if (!isImage) {
          this.$message.warning('文件格式不符合要求')
          return
        }
        console.log('file: ', file)
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const image = new Image()
          image.onload = () => {
            console.log('width:', image.width)
            console.log('height:', image.height)
            if (image.width !== 750) {
              this.$message.warning('图片宽度不符合要求')
            } else if (image.height !== 260) {
              this.$message.warning('图片长度不符合要求')
            } else {
              this.$message.success('图片符合要求 点击图片可进行更换')
              this.hasExplosiveImageFile = true
              this.explosiveImageUrl = file.url
              this.explosiveImageFile = file.raw
            }
          }
          image.src = data
        }
        reader.readAsDataURL(file.raw)
      },

      handleExplosiveUploadSuccess(res, file) {},

      handlePhotoCheckbox(byPhotos) {
        console.log('handlePhotoCheckbox: ', !this.byPhotos && !this.byVideo)
        if (!this.byPhotos && !this.byVideo) {
          this.$message.warning('图片与视频请至少选择一种')
          this.byPhotos = !byPhotos
        }
      },

      handleVideoCheckbox(byVideo) {
        console.log('handleVideoCheckbox: ', !this.byPhotos && !this.byVideo)
        if (!this.byPhotos && !this.byVideo) {
          this.$message.warning('图片与视频请至少选择一种')
          this.byVideo = !byVideo
        }
      },

      packItemDragStart(image, index, event) {
        // console.log('currentDragPackItem: ', image)
        // console.log('currentPackingImageIndex: ', index)
        console.log(`第${index}张图拖拽开始`)
        image.showDragTip = true
        this.packImageUrlList.splice(index, 1, image)

        this.currentDragPackItem = { ...image }
        this.currentDragPackItemIndex = index
      },

      packItemDragOver(image, index, event) {
        console.log(`拖拽至第${index}张图中`)
        image.showPutTip = true
        this.packImageUrlList.splice(index, 1, image)
      },

      packItemDragEnter(image, index, event) {
        // console.log(`拖拽进入第${index}张图`)
        image.showPutTip = true
        this.packImageUrlList.splice(index, 1, image)
      },

      packItemDragLeave(image, index, event) {
        console.log(`拖拽离开第${index}张图`)
        image.showPutTip = false
        this.packImageUrlList.splice(index, 1, image)
      },

      packItemDragEnd(image, index, event) {
        console.log(`第${index}张图拖拽结束`)
        // image.showPutTip = false
        // this.packImageUrlList.splice(index, 1, image)
      },

      packItemDrop(image, index, event) {
        console.log('拖拽放置: ', `第${this.currentDragPackItemIndex}个和第${index}个对调`)
        console.log('currentDragItem: ', this.currentDragPackItemIndex, this.currentDragPackItem)
        image.showPutTip = false

        const sourcePackItem = { ...this.packImageUrlList[this.currentDragPackItemIndex], seqNumber: image.seqNumber, showDragTip: false }
        const targetPackItem = { ...image, seqNumber: this.packImageUrlList[this.currentDragPackItemIndex].seqNumber }

        console.log('拖拽源: ', sourcePackItem.processDesc)
        console.log('拖拽进入目标: ', targetPackItem.processDesc)

        // this.$nextTick(() => {
        //   this.$set(this.packImageUrlList, this.currentDragPackItemIndex, targetPackItem)
        //   console.log(`拖拽目标 替换为 拖拽源: ${sourcePackItem.processDesc}`)
        //
        //   this.$set(this.packImageUrlList, index, sourcePackItem)
        //   console.log(`拖拽源 替换为 拖拽目标: ${targetPackItem.processDesc}`)
        // })

        this.$set(this.packImageUrlList, this.currentDragPackItemIndex, targetPackItem)
        console.log(`拖拽目标 替换为 拖拽源: ${sourcePackItem.processDesc}`)

        this.$set(this.packImageUrlList, index, sourcePackItem)
        console.log(`拖拽源 替换为 拖拽目标: ${targetPackItem.processDesc}`)

        // this.packImageUrlList.splice(this.currentDragPackItemIndex, 1, targetPackItem)
        // this.packImageUrlList.splice(index, 1, sourcePackItem)
        // console.log('packImageUrlList: ', this.packImageUrlList)
      },

      onPackingImageChange(file, fileList) {
        const isImage = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/jpg' || file.raw.type === 'image/png')
        if (!isImage) {
          this.$message.warning('文件格式不符合要求')
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const image = new Image()
          image.onload = () => {
            console.log('width:', image.width)
            console.log('height:', image.height)
            if (image.width !== 460) {
              this.$message.warning('图片宽度不符合要求')
            } else if (image.height !== 261) {
              this.$message.warning('图片长度不符合要求')
            } else {
              this.$message.success('图片符合要求 请输入包装图片说明 点击图片可进行更换')
              this.packImageUrlList.push({
                imgUrl: file.url,
                imageFile: file.raw,
                seqNumber: this.nextSequenceNumber++,
                isPackImageDescEdit: true,
                processDesc: ''
              })
              this.$nextTick(() => {
                this.$refs[`descInput${this.packImageUrlList.length - 1}`][0].$refs.input.focus()
              })
            }
          }
          image.src = data
        }
        reader.readAsDataURL(file.raw)
      },

      beforePackingUpload(file) {},

      handleEditAction(seqNumber) {
        this.packImageUrlList[seqNumber].isPackImageDescEdit = true
        this.packImageUrlList = this.packImageUrlList.map(image => image)
      },

      confirmImageDesc(seqNumber) {
        this.packImageUrlList[seqNumber].isPackImageDescEdit = false
        this.packImageUrlList = this.packImageUrlList.map(image => image)
      },

      uploadEventDelegate(index, image) {
        console.log('uploadEventDelegate: ', index, image)
        this.currentPackingImageIndex = index
        this.currentPackingImage = image
        this.$refs['packing-image-file-input'].click()
      },

      updatePackingImage() {
        const currentPackingImageFile = this.$refs['packing-image-file-input'].files[0]
        console.log('updatePackingImage: ', currentPackingImageFile)

        const isImage = (currentPackingImageFile.type === 'image/jpeg' || currentPackingImageFile.type === 'image/jpg' || currentPackingImageFile.type === 'image/png')
        if (!isImage) {
          this.$message.warning('文件格式不符合要求')
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const image = new Image()
          image.onload = () => {
            console.log('width:', image.width)
            console.log('height:', image.height)
            if (image.width !== 460) {
              this.$message.warning('图片宽度不符合要求')
            } else if (image.height !== 261) {
              this.$message.warning('图片长度不符合要求')
            } else {
              this.$message.success('图片修改成功')
              const packingImageObj = {
                imgUrl: URL.createObjectURL(currentPackingImageFile),
                imageFile: currentPackingImageFile,
                seqNumber: this.currentPackingImage.seqNumber,
                isPackImageDescEdit: false,
                processDesc: this.currentPackingImage.processDesc
              }
              this.packImageUrlList.splice(this.currentPackingImageIndex, 1, packingImageObj)
            }
          }
          image.src = data
        }
        reader.readAsDataURL(currentPackingImageFile)
      },

      deletePackImage(image) {
        console.log('image: ', image.seqNumber)
        this.$confirm('确定删除该图片？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.packImageUrlList.map((item, index) => {
            if (index >= image.seqNumber) {
              item.seqNumber--
            }
            return item
          })
          this.packImageUrlList.splice(this.packImageUrlList.indexOf(image), 1)
          this.nextSequenceNumber--
          console.log('nextSequenceNumber: ', this.nextSequenceNumber)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
      },

      handlePackingUploadSuccess(res, file) {},

      saveVideoFile() {
        console.log('saveVideoFile')
        this.isUploading = true
        uploadPackingVideo(this.videoFile, null, this.onUploadProgress).then(res => {
          console.log(res)
          const videoInfo = res.data
          this.videoUrl = videoInfo.packProcesVideoUrl
          this.videoHeight = videoInfo.height
          this.videoWidth = videoInfo.width
          this.videoDuration = videoInfo.duration
          this.hasVideoFile = true
          this.hasNewVideoFile = true
          this.$message.success('视频文件上传成功')
          setTimeout(() => {
            this.isUploading = false
          }, 3000)
        }).catch(err => {
          console.log('上传视频出错: ', err)
        })
      },

      handleVideoFileChange(file) {
        if (file.raw.type !== 'video/mp4') {
          this.$message.warning('文件格式不符合要求')
          return
        }
        console.log('handleVideoFileChange: ', file)
        // this.videoUrl = file.url
        this.videoFile = file.raw
        this.saveVideoFile()
      },

      handleVideoFileRemove() {
        console.log('handleVideoFileRemove')
        this.$confirm('确定删除该视频？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          deletePackingVideo(this.videoUrl).then(res => {
            this.videoUrl = ''
            this.videoFile = ''
            this.hasVideoFile = false
            this.hasNewVideoFile = false
            this.isUploading = false
            this.process = 0
          }).catch(err => {
            console.log('视频删除出错: ', err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
      },

      insertNoticeItem(index) {
        console.log('insertNoticeItem', index)
        const noticeDefaultIconUrlList = process.env.NOTICE_DEFAULT_ICON_URL_LIST
        const noticeInfo = {
          title: '',
          iconUrl: noticeDefaultIconUrlList[index],
          iconFile: '',
          content: [
            {
              heading: '',
              orderedList: ['']
            }
          ]
        }
        this.noticeList.splice(index, 0, noticeInfo)
        this.$nextTick(() => {
          this.$refs[`noticeTitleInput${index}`][0].$refs.input.focus()
        })
      },

      addNoticeItem() {
        console.log('addNoticeItem')
        const noticeDefaultTitleList = ['适用范围', '温控要求', '其他注意事项']
        const noticeDefaultIconUrlList = process.env.NOTICE_DEFAULT_ICON_URL_LIST
        const noticeInfo = {
          title: noticeDefaultTitleList[this.noticeList.length],
          iconUrl: noticeDefaultIconUrlList[this.noticeList.length],
          iconFile: '',
          content: [
            {
              heading: '',
              orderedList: ['']
            }
          ]
        }
        this.noticeList.push(noticeInfo)
        this.$nextTick(() => {
          this.$refs[`noticeTitleInput${this.noticeList.length - 1}`][0].$refs.input.focus()
        })
      },

      handleThemeBlur(event, item, index) {
        console.log('handleThemeBlur: ', event, index)
        if (event.target.value.length === 0) {
          const noticeDefaultTitleList = ['适用范围', '温控要求', '其他注意事项']
          this.$message.warning('主题不能为空，已重置为默认值')
          // event.target.value = noticeDefaultTitleList[index]
          item.title = noticeDefaultTitleList[index]
          // event.target.value = '适用范围'
        }
      },

      deleteNoticeItem(item) {
        console.log('deleteNoticeItem: ', item.id)
        this.noticeList.splice(this.noticeList.indexOf(item), 1)
        if (item.id) {
          this.deleteIds.push(item.id)
        }
      },

      handleNoticeIconChange(file, fileList, item) {
        console.log('handleNoticeIconChange: ', file)
        console.log('item: ', item)
        item.iconUrl = file.url
        item.iconFile = file.raw
      },

      addNoticeHeading(index, item) {
        item.content.push(
          {
            heading: '',
            orderedList: ['']
          }
        )
        this.$nextTick(() => {
          this.$refs[`listTitleInput${index}-${item.content.length - 1}`][0].$refs.input.focus()
        })
      },

      deleteNoticeHeading(noticeContent, item) {
        this.$confirm('不需要标题时可以为空，删除标题同时会删除标题下的条目列表，确定要删除吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          item.content.splice(item.content.indexOf(noticeContent), 1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
      },

      addOrderedList(index, headIndex, noticeContent) {
        noticeContent.orderedList.push('')
        this.$nextTick(() => {
          this.$refs[`listContentInput${index}-${headIndex}-${noticeContent.orderedList.length - 1}`][0].$refs.textarea.focus()
        })
      },

      deleteOrderedListItem(listItem, noticeContent) {
        console.log(listItem, noticeContent)
        noticeContent.orderedList.splice(noticeContent.orderedList.indexOf(listItem), 1)
      },

      validate() {
        let formData = ''
        if (this.actionType === EDIT) {
          this.$refs['schemeForm'].validate(valid => {
            if (this.packImageUrlList.some(image => image.isPackImageDescEdit)) {
              this.$message.warning('请完成包装图片的说明')
              this.$emit('submittingStatus', false)
              return
            }
            if (this.packImageUrlList.length < 2) {
              this.$message.warning('请上传至少两张包装说明图')
              this.$emit('submittingStatus', false)
              return
            }
            if (this.byVideo) {
              if (!this.hasVideoFile) {
                this.$message.warning('请上传包装说明视频')
                this.$emit('submittingStatus', false)
                return
              }
            }
            if (valid) {
              console.log('valid')
              formData = this.buildEditFormData()
              this.$emit('ok', formData)
            } else {
              console.log('invalid edit')
              this.$message.error('请补全信息通过表单校验!')
              this.$emit('submittingStatus', false)
            }
          })
        } else if (this.actionType === ADD) {
          this.$refs['schemeForm'].validate(valid => {
            if (valid) {
              if (!this.hasSearchImageFile) {
                this.$message.warning('请上传搜索列表图')
                this.$emit('submittingStatus', false)
                return
              }
              // 热门方案图由必填改为非必填
              // if (!this.hasHotImageFile) {
              //   this.$message.warning('请上传热门方案图')
              //   this.$emit('submittingStatus', false)
              //   return
              // }
              if (!this.hasExplosiveImageFile) {
                this.$message.warning('请上传爆炸图')
                this.$emit('submittingStatus', false)
                return
              }
              if (this.packImageUrlList.some(image => image.isPackImageDescEdit)) {
                this.$message.warning('请完成包装过程的说明')
                this.$emit('submittingStatus', false)
                return
              }
              if (this.packImageUrlList.length < 2) {
                this.$message.warning('请上传至少两张包装过程图')
                this.$emit('submittingStatus', false)
                return
              }
              if (this.byVideo) {
                if (!this.hasVideoFile) {
                  this.$message.warning('请上传包装过程视频')
                  this.$emit('submittingStatus', false)
                  return
                }
              }
              console.log('valid')
              formData = this.buildAddFormData()
              this.$emit('ok', formData)
            } else {
              console.log('invalid add')
              this.$message.error('请补全信息通过表单校验!')
              this.$emit('submittingStatus', false)
            }
          })
        }
      },

      buildEditFormData() {
        const formData = new FormData()

        // 搜索列表图片数据处理 url 或者 file
        console.log('hasSearchImageFile: ', this.hasSearchImageFile)

        if (this.hasSearchImageFile) {
          console.log('solListImg: ', this.searchImageFile)
          formData.append('solListImg', this.searchImageFile)
          // Object.assign(this.schemeForm, { goodsSolImg: this.hotImageFile })
        } else {
          console.log('solListImgUrl: ', this.searchImageUrl)
          formData.append('solListImgUrl', this.searchImageUrl)
          // Object.assign(this.schemeForm, { goodsSolImgUrl: this.hotImageUrl })
        }

        // 热门图片数据处理 url 或者 file
        if (this.hasHotImageFile) {
          formData.append('goodsSolImg', this.hotImageFile)
          // Object.assign(this.schemeForm, { goodsSolImg: this.hotImageFile })
        } else if (this.hotImageUrl) {
          formData.append('goodsSolImgUrl', this.hotImageUrl)
          // Object.assign(this.schemeForm, { goodsSolImgUrl: this.hotImageUrl })
        }

        // 爆炸图图片数据处理 url 或者 file
        if (this.hasExplosiveImageFile) {
          formData.append('packCmpltImg', this.explosiveImageFile)
          // Object.assign(this.schemeForm, { packCmpltImg: this.explosiveImageFile })
        } else {
          formData.append('packCmpltImgUrl', this.explosiveImageUrl)
          // Object.assign(this.schemeForm, { packCmpltImgUrl: this.explosiveImageUrl })
        }

        // 包装说明数据处理 图片、视频
        // 添加包装说明图
        formData.append('processImgUrls', JSON.stringify(this.packImageUrlList.filter(item => item.imgId)))
        console.log('过程图 urls: ', this.packImageUrlList.filter(item => item.imgId))
        this.packImageUrlList.filter(item => item.imageFile).forEach(item => {
          // const keyName = `${item.seqNumber}_${item.processDesc}`
          const fileKeyName = `processImg[${item.seqNumber}]`
          const descKeyName = `processDesc[${item.seqNumber}]`
          formData.append(fileKeyName, item.imageFile)
          formData.append(descKeyName, item.processDesc)
          console.log(item.seqNumber, item.imageFile)
        })

        // 添加包装说明视频
        if (this.byVideo) {
          formData.append('packProcesVideoUrl', this.videoUrl)
          formData.append('packProcesVideoHeight', this.videoHeight)
          formData.append('packProcesVideoWidth', this.videoWidth)
          formData.append('packProcesVideoDuration', this.videoDuration)
        }

        formData.append('solutionId', this.schemeForm.solutionId)
        formData.append('solutionCode', this.schemeForm.solutionCode)
        formData.append('solutionName', this.schemeForm.solutionName)
        if (this.schemeForm.deliverGoods) {
          formData.append('deliverGoods', this.schemeForm.deliverGoods)
        }
        formData.append('solQty', this.schemeForm.solQty.toString())
        formData.append('solUnit', this.schemeForm.solUnit)
        formData.append('unitPrice', this.schemeForm.unitPrice.toString())
        formData.append('unitCarbon', this.schemeForm.unitCarbon.toString())
        formData.append('labels', JSON.stringify(this.schemeForm.labels))
        formData.append('materials', JSON.stringify(this.schemeForm.materials))
        // formData.append('noticeDetail', this.schemeForm.noticeDetail)
        // 处理补充说明内容，剔除条目内容为空的项目
        this.noticeList = this.noticeList.filter(notice => {
          notice.content = notice.content.filter(item => {
            item.orderedList = item.orderedList.filter(ol => ol.length > 0)
            if (item.orderedList.length > 0 || item.heading) {
              return true
            } else {
              if (notice.id) {
                this.deleteIds.push(notice.id)
              }
              return false
            }
          })

          return notice.content.length > 0
        })

        this.noticeList.forEach((notice, index) => {
          if (notice.id) {
            formData.append(`solutionInstruction[${index}].id`, notice.id)
          }
          if (notice.iconFile) {
            formData.append(`solutionInstruction[${index}].instruIcon`, notice.iconFile)
          } else {
            formData.append(`solutionInstruction[${index}].instruIconUrl`, notice.iconUrl)
          }
          formData.append(`solutionInstruction[${index}].instruTitle`, notice.title)
          formData.append(`solutionInstruction[${index}].instruContent`, JSON.stringify(notice.content))
        })
        if (this.deleteIds.length > 0) {
          formData.append('deleteIds', JSON.stringify(this.deleteIds))
        }

        return formData
      },

      buildAddFormData() {
        const formData = new FormData()

        formData.append('solListImg', this.searchImageFile)
        if (this.hasHotImageFile) {
          formData.append('goodsSolImg', this.hotImageFile)
        }
        formData.append('packCmpltImg', this.explosiveImageFile)

        // 包装说明数据处理
        // 添加包装说明图
        this.packImageUrlList.forEach((item, index) => {
          const fileKeyName = `processImg[${item.seqNumber}]`
          const descKeyName = `processDesc[${item.seqNumber}]`
          formData.append(fileKeyName, item.imageFile)
          formData.append(descKeyName, item.processDesc)
        })

        // 添加包装说明视频
        if (this.byVideo) {
          formData.append('packProcesVideoUrl', this.videoUrl)
          formData.append('packProcesVideoHeight', this.videoHeight)
          formData.append('packProcesVideoWidth', this.videoWidth)
          formData.append('packProcesVideoDuration', this.videoDuration)
        }

        // formData.append('solutionCode', this.schemeForm.solutionCode)
        formData.append('solutionName', this.schemeForm.solutionName)
        if (this.schemeForm.deliverGoods) {
          formData.append('deliverGoods', this.schemeForm.deliverGoods)
        }
        formData.append('solQty', this.schemeForm.solQty.toString())
        formData.append('solUnit', this.schemeForm.solUnit)
        formData.append('unitPrice', this.schemeForm.unitPrice.toString())
        formData.append('labels', JSON.stringify(this.schemeForm.labels))
        formData.append('materials', JSON.stringify(this.schemeForm.materials))
        // 处理补充说明内容，剔除条目内容为空的项目
        this.noticeList = this.noticeList.filter(notice => {
          notice.content = notice.content.filter(item => {
            item.orderedList = item.orderedList.filter(ol => ol.length > 0)
            return item.orderedList.length > 0
          })

          return notice.content.length > 0
        })

        this.noticeList.forEach((notice, index) => {
          if (notice.iconFile) {
            formData.append(`solutionInstruction[${index}].instruIcon`, notice.iconFile)
          } else {
            formData.append(`solutionInstruction[${index}].instruIconUrl`, notice.iconUrl)
          }
          formData.append(`solutionInstruction[${index}].instruTitle`, notice.title)
          formData.append(`solutionInstruction[${index}].instruContent`, JSON.stringify(notice.content))
        })

        return formData
      },

      onCancelClick() {
        if (this.hasNewVideoFile) {
          this.$confirm('视频文件已上传且方案未保存，离开后会删除新上传的视频，是否确认?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deletePackingVideo(this.videoUrl).then(res => {
              this.videoUrl = ''
              this.videoFile = ''
              this.hasVideoFile = false
              this.$emit('cancel')
            }).catch(err => {
              console.log('视频删除出错: ', err)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消该操作'
            })
          })
        } else {
          this.$emit('cancel')
        }
      },

      onOkClick() {
        if (this.submitControl === true) {
          return
        }
        this.submitControl = true
        this.$emit('submittingStatus', true)
        console.log(`you click ok for ${this.count++} times`, +new Date())
        setTimeout(() => {
          this.submitControl = false
        }, 200)
        this.schemeForm.materials = this.schemeForm.materials.map(material => {
          if (!material.id) {
            Object.assign(material, { id: '' })
          }
          return material
        })
        this.validate()
      },

      onEditClick() {
        this.$emit('changeToEdit')
        // this.editor.$textElem.attr('contenteditable', true)
      },

      onDeleteClick() {
        this.$emit('delete', this.solutionId)
      }
    }
  }
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .tag-length-alert {
    height: 32px;
    width: 75%;
    margin-top: 6px;
  }

  .search-image-size {
    width: 195px;
    height: 147px;
  }

  .hot-image-size {
    width: 111px;
    height: 111px;
  }

  .explosive-image-size {
    width: 375px;
    height: 130px;
  }

  .packing-image {
    width: 230px;
    height: 130px;
    margin-top: 8px;
    margin-left: 20px;
    border-radius: 6px;
    border: 1px dashed #d9d9d9;
  }

  .packing-image:hover {
    border-color: #409EFF;
  }

  .image-mask {
    position: absolute;
    top: 8px;
    left: 20px;
    width: 230px;
    height: 130px;
    border-radius: 6px;
    background: rgba(101, 101, 101, 0.6);
    color: #ffffff;
    opacity: 0;
  }

  .center-flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-mask:hover {
    opacity: 1;
  }

  .packing-image-grid-container {
    width: 90%;
    display: grid;
    /*justify-items: center;*/
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    /*grid-column-gap: 10px;*/
    grid-row-gap: 10px;
    margin-bottom: 10px;
  }

  .packing-image-item {
    padding: 2px 8px;
  }

  .border-drag-tip {
    border: 3px dashed lightblue;
    border-radius: 6px;
  }

  .border-put-tip {
    border: 3px dashed lightpink;
    border-radius: 6px;
  }

  .image-desc-flex-container {
    display: flex;
    flex-direction: row;
  }

  /*.corner-icon {*/
    /*cursor: pointer;*/
    /*!*position: absolute;*!*/
    /*!*top: -3px;*!*/
    /*!*left: 240px;*!*/
    /*font-size: 32px;*/
    /*margin: 12px;*/
  /*}*/

  .corner-icon {
    cursor: pointer;
    position: absolute;
    top: -3px;
    left: 240px;
    font-size: 22px;
  }

  .el-icon-error:hover {
    color: #f56c6c;
  }

  .side-button {
    position: absolute;
    bottom: 5px;
    /*top: 5px;*/
    /*left: 92px;*/
  }

  .count-flex-container {
    width: 80%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .notice-flex-row-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .single-item-container + .single-item-container {
    margin-top: 20px;
  }

  .notice-icon-uploader {
    width: 64px;
    height: 64px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .notice-icon-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .notice-icon-icon {
    font-size: 28px;
    color: #8c939d;
    width: 64px;
    height: 64px;
    line-height: 64px;
    text-align: center;
  }
  .notice-icon {
    width: 64px;
    height: 64px;
    display: block;
  }

  .ordered-list-flex-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    /*align-items: flex-start;*/
    align-items: baseline;
  }

  .el-card + .el-card {
    margin-top: 8px;
  }

  .el-card >>> .el-card__header {
    padding: 2px 12px;
  }

  .el-icon-circle-close:hover {
    color: #66b1ff;
  }

  .header-flex-container {
    height: 80px;
    display: flex;
    align-items: center;
  }
</style>