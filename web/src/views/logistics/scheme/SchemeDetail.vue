<template>
  <div
    :style="{'background-image': `url('${bg}')`}"
    style="background-repeat: repeat-y; background-size: 100% 100%;"
  >
    <div v-if="schemeObject !== null">
      <div class="scheme-first">
        <div class="left-part">
          <div class="scheme-title">
            <div style="max-width: 550px;">
              <div
                class="scheme-title-font nowrap-ellipsis"
                :title="schemeObject.solutionName"
              >{{schemeObject.solutionName}}</div>

              <div class="title-underline"></div>
            </div>
            <!-- <div class="collect-and-share">
            <div v-if="!isCollected" class="collect-container" @click="handleCollectIconClick">
              <div class="collect-icon"></div>
              <div>
                <span class="collect-and-share-text clickable">收藏</span>
              </div>
            </div>

            <div v-else class="collect-container" @click="handleUnCollectIconClick">
              <div class="collected-icon"></div>
              <div>
                <span class="collect-and-share-text clickable">已收藏</span>
              </div>
            </div>

            <div class="share-container" @click="handleShareIconClick">
              <div class="share-icon"></div>
              <div>
                <span class="collect-and-share-text clickable">分享</span>
              </div>
            </div>

            </div>-->
            <!-- <Modal title="用丰声或微信扫一扫分享当前方案" v-model="shareModal" class-name="vertical-center-modal">
              <div class="center-flex-container"> -->
                <!--<VueQrcode :value="`http://pkglab-spsp.sit.sf-express.com/spsp-app/share/index.html?solutionId=${schemeId}`" :options="{ size: 256 }"></VueQrcode>-->
                <!-- <VueQrcode :value="`${sharePrefix}${schemeId}`" :options="{ size: 256 }"></VueQrcode>
              </div>
              <div slot="footer"> -->
                <!--<Button type="primary" size="large" long @click="shareModal = false">确定</Button>-->
              <!-- </div>
            </Modal> -->
          </div>
          <div class="explosive-image-container">
            <img :src="schemeObject.packCmpltImg" alt="爆炸图" width="780" height="268" />
          </div>
          <div class="material-container">
            <div
              class="material-image-container"
              v-for="(material, index) in schemeObject.solPackMats"
              :style="{ 'padding-top': index > 1 ? '52px' : '0', 'height': index > 1 ? '160px' : '108px' }"
              :key="material.matId"
            >
              <div style="position: relative;">
                <img width="120" height="90" :src="material.matImg" alt="材料图片" />
                <div v-if="material.specialMatFlag" class="special-material-id">特色包材</div>
              </div>
              <div style="width: 100%" class="material-detail-text-container">
                <div class="material-detail-title-container">
                  <div class="font-icon-flex-row-container">
                    <div class="material-detail-name nowrap-ellipsis">
                      <span :title="material.matName">{{material.matName}}</span>
                    </div>

                    <div v-if="material.specialMatFlag" class="to-special-material">
                      <img
                        :title="'查看该特色包材'"
                        @click="toSpecialMaterial(material.matId)"
                        width="12"
                        height="12"
                        src="../../../assets/scheme/icon_to_special_material_2x.png"
                        alt="前往特色包材"
                      />
                    </div>
                  </div>
                  <div class="material-detail-count">{{`x ${Number(material.count)}`}}</div>
                </div>

                <div class="material-detail-content-container">
                  <div style="margin-bottom: 6px;">规格：{{material.matSize}}</div>
                  <div style="margin-bottom: 6px;">价格：￥{{material.unitPrice}}/{{material.matUnit}}</div>
                  <div>物料编码：{{material.matCode}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="price-container" style="height:40px;line-height:40px">
            <div style="float:left">
              <span
                class="price-label-font"
                style="vertical-align: middle; margin-right: 20px;"
              >方案单价:</span>
              <span class="price-label-font" style="vertical-align: middle; margin-right: 6px;">￥</span>
              <span
                class="price-number-font"
                style="vertical-align: middle;"
              >{{schemeObject.cost.toFixed(2)}}</span>
            </div>
            <div style="float:right;font-size:18px;">
              <span>单套方案碳排放量：&nbsp;Kgco2e&nbsp;</span>
              <span
                style="font-size:28px;color:#2BC7C6;font-weight:bold"
              >{{schemeObject.unitCarbon}}</span>
            </div>
          </div>
        </div>

        <div class="right-part">
          <row-title title-cn="方案计算" title-en></row-title>
          <div class="delivery-count-container">
            <div class="delivery-tip-font">请输入托寄物的数量</div>
            <div style="margin-top: 32px;">
              <InputNumberAlter
                ref="countNumberInput"
                v-model="schemeObject.solQty"
                @on-blur="handleCountBlur"
                :min="0"
                :max="999"
                style="width: 144px; height: 45px;"
              ></InputNumberAlter>
            </div>

            <div class="package-info-container" style="margin-top:44px;margin-bottom:20px">
              <div class="package-needed-font">所需包材套数：</div>
              <div style>
                <span
                  style="vertical-align: middle; margin-right: 4px;font-size:28px;font-family:Impact;"
                >{{countMultiple}}</span>
                <span style="vertical-align: middle;font-size:18px;">套</span>
              </div>
            </div>

            <div style="width:100%;margin-bottom:60px">
              <span style="display:inline-block;width:143px;font-size:18px;text-align:left">节省总碳排放量</span>
              <span style="display:inline-block;width:80px;font-size:18px;">Kgco2e</span>
              <span
                style="display:inline-block;width:85px;font-size:30px;font-family:Impact;text-align:right"
              >{{(schemeObject.unitCarbon * schemeObject.solQty).toFixed(2)}}</span>
            </div>

            <div class="material-text-detail-container">
              <div
                v-for="(material, index) in schemeObject.solPackMats"
                :style="{ 'margin-top': index > 0 ? '12px' : '' }"
                class="material-single-container"
                :key="material.matId"
              >
                <div class="material-name">{{material.matName}}</div>
                <div
                  style="margin-right: 4px;"
                  class="material-count"
                >x{{countMultiple * Number(material.count)}}</div>
              </div>
            </div>

            <div class="material-single-container" style="margin-top: 40px; margin-right: -10px;">
              <div style="flex-shrink: 1;margin-left:10px">
                <Tooltip style="height: 20px;" placement="top-end" content="此价格仅供参考，最终以采购价格为准">
                  <div style="width: 30px;">
                    <img
                      style="vertical-align: middle;"
                      width="20"
                      height="20"
                      src="../../../assets/scheme/icon_price_hint_white_2x.png"
                      alt="价格提示"
                    />
                  </div>
                </Tooltip>
                <span style="font-family:Impact;font-size:18px;">方案总价:</span>
              </div>
              <div style="flex-shrink: 1;">
                <span class="price-label-font" style="margin-right: 6px; vertical-align: middle;">￥</span>
                <span
                  style="margin-right: 8px; vertical-align: middle;font-size:30px;font-family:Impact;"
                >{{(countMultiple * schemeObject.cost).toFixed(2)}}</span>
              </div>
            </div>
          </div>
        </div>

        <!--<div class="count-and-price">-->
        <!--<div class="count-flex-container">-->
        <!--<div class="count-and-price-text">-->
        <!--托寄物数量：-->
        <!--</div>-->
        <!--<div @click="goodsCountDown" class="count-down-icon"></div>-->
        <!--<Input ref="countInput" v-model="schemeObject.solQty" @on-change="handleGoodsCountChange"-->
        <!--@on-blur="handleGoodsCountBlur" number class="goods-count-input"/>-->
        <!--<div @click="goodsCountUp" class="count-up-icon"></div>-->
        <!--</div>-->
        <!--<div class="price-label-text">-->
        <!--<span>方案价格：</span>-->
        <!--<span class="price-text">-->
        <!--￥{{(countMultiple * schemeObject.cost).toFixed(2)}}-->
        <!--</span>-->

        <!--<Tooltip-->
        <!--style="height: 20px; vertical-align: middle;"-->
        <!--placement="top"-->
        <!--content="此价格仅供参考，最终以采购价格为准">-->
        <!--<img width="20" height="20" src="../../assets/scheme/icon_price_hint_2x.png" alt="价格提示">-->
        <!--</Tooltip>-->
        <!--</div>-->
        <!--</div>-->
      </div>

      <div class="scheme-second">
        <div class="anchor-content">
          <div v-if="recommendList.length > 0" style="margin-top: 40px;" id="recommend">
            <RowTitle title-cn="相关方案" title-en="Recommended Scheme"></RowTitle>

            <div class="recommend-list">
              <Icon
                v-if="recommendList.length > 3"
                :style="{ cursor: recommendShowIndex > 0 ? 'pointer' : 'not-allowed'}"
                :color="recommendShowIndex > 0 ? '#2bc7c6' : 'rgba(0, 0, 0, 0.2)'"
                size="36"
                @click="recommendLeftClick"
                type="ios-arrow-dropleft"
              />
              <div v-else style="width: 36px;"></div>
              <div class="recommend-flex-container fill-remaining-space">
                <SchemeCard
                  style="width: 33.3%;"
                  v-for="(item, index) in recommendShowList"
                  :style="{ marginRight: index === 2 ? '0' : '14px'}"
                  :key="item.solutionId"
                  :item="item"
                ></SchemeCard>
              </div>
              <Icon
                v-if="recommendList.length > 3"
                :style="{ cursor: recommendList.length - recommendShowIndex > 3 ? 'pointer' : 'not-allowed'}"
                :color="recommendList.length - recommendShowIndex > 3 ? '#2bc7c6' : 'rgba(0, 0, 0, 0.2)'"
                size="36"
                @click="recommendRightClick"
                type="ios-arrow-dropright"
              />
              <div v-else style="width: 36px;"></div>
            </div>
          </div>
          <div style="margin-top: 40px;" id="process">
            <RowTitle title-cn="包装说明" title-en="Packing Instruction"></RowTitle>

            <div style="margin-top: 20px; min-height: 400px;" class="center-column-flex-container">
              <div v-if="imageOrVideo === 'image'" style="position: relative;">
                <img width="460" height="261" :src="currentProcessImage.imgUrl" alt="包装过程图" />

                <!--<video-->
                <!--v-else-->
                <!--height="333"-->
                <!--width="500"-->
                <!--controls-->
                <!--controlsList='nodownload'-->
                <!--oncontextmenu="return false"-->
                <!--:src="schemeObject.videoUrl"></video>-->

                <div class="instruction-float-block">
                  <div class="instruction-pointer">{{currentImageIndex + 1}}</div>
                  <!--<img width="12" height="12" src="../../assets/scheme/icon_instruction_pointer.png" alt="包装过程说明">-->
                  <div class="instruction-text">
                    <div>{{currentProcessImage.processDesc}}</div>
                    <div
                      class="instruction-index-text"
                    >{{`(${currentImageIndex + 1}/${processImages.length})`}}</div>
                    <div class="sequence-control">
                      <!--<div class="arrow-size" :class="{ 'left-arrow-disabled': currentImageIndex === 0, 'left-arrow': currentImageIndex > 0 }"></div>-->
                      <div class="arrow-size" :class="leftArrowClass" @click="onLeftArrowClick"></div>
                      <div
                        style="margin-left: 16px;"
                        class="arrow-size"
                        :class="rightArrowClass"
                        @click="onRightArrowClick"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="imageOrVideo === 'image'" ref="thumbnails" class="process-image-gallery">
                <!--<video v-if="schemeObject.videoUrl" :src="schemeObject.videoUrl" height="52.19" width="92"></video>-->
                <img
                  width="92"
                  v-for="(image, index) in processImages"
                  :ref="image.imgId"
                  :key="image.imgId"
                  :src="image.imgUrl"
                  :style="{ border: image.isSelected ? '4px solid #2bc7c6' : '' }"
                  @click="handleThumbnailClick(image, index)"
                  alt="包装过程小图"
                />
                <!--<div class="image-absolute-block" style="left: 0;" ref="imageContainer">-->
              </div>

              <video
                v-if="imageOrVideo === 'video'"
                height="420"
                width="600"
                controls
                controlslist="nodownload"
                oncontextmenu="return false"
                :src="schemeObject.videoUrl"
              ></video>
              <div v-if="schemeObject.videoUrl" style="margin-top: 16px;">
                <RadioGroup v-model="imageOrVideo" type="button">
                  <Radio label="image">图片</Radio>
                  <Radio @on-change="handleVideoRadioChange" label="video">视频</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div v-if="schemeObject.instruSupp.length > 0" class="notice-container" id="notice">
            <RowTitle title-cn="补充说明" title-en="Supplemental Instruction"></RowTitle>
            <div class="notice-area">
              <!--<span v-html="schemeObject.noticeDetail"></span>-->

              <div
                :style="{ 'border-top': noticeIndex === 0 ? '1px solid #eeeeee' : ''}"
                class="notice-flex-container"
                v-for="(notice, noticeIndex) in noticeInfo"
                :key="noticeIndex"
              >
                <div class="notice-icon" style="flex: none;">
                  <img width="64" height="64" :src="notice.instruIcon" :alt="notice.instruTitle" />
                  <div style="margin-top: 20px;">{{notice.instruTitle}}</div>
                </div>

                <div class="notice-content fill-remaining-space">
                  <div
                    class="heading-content"
                    v-for="(content, contentIndex) in notice.instruContent"
                    :key="contentIndex"
                  >
                    <span class="heading-font" v-if="content.heading">{{content.heading}}</span>
                    <div v-for="(ol, olIndex) in content.orderedList" :key="olIndex">
                      <p
                        :style="{ 'margin-top': olIndex === 0 ? '0' : '12px' }"
                        class="content-font"
                      >
                        {{olIndex + 1}}、
                        {{ol}}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div style="height: 60vh;" class="center-column-flex-container">
        <img src="../../../assets/scheme/bg_empty.png" alt="暂时没有方案" />
        <span class="empty-text">暂时没有方案</span>
      </div>
    </div>
  </div>
</template>

<script>
import bg from "../../../assets/bg_demand.png";
import RowTitle from "../../../components/RowTitle";
import SchemeCard from "../../../components/SchemeCard";
import InputNumberAlter from "../../../components/InputNumberAlter";
// import config from '../../config/index'
import VueQrcode from "@xkeshi/vue-qrcode";
import {
  collectScheme,
  commentScheme,
  deleteComment,
  getSchemeDetail,
  getSimilarScheme,
  replyComment,
  unCollectScheme
} from "../../../api/scheme";
import { parseTime } from "../../../utils";

export default {
  name: "SchemeDetail",
  components: {
    RowTitle,
    SchemeCard,
    InputNumberAlter,
    VueQrcode
  },
  data() {
    return {
      bg,
      sharePrefix: process.env.VUE_APP_SHARE_PREFIX,
      baseImageUrl: process.env.VUE_APP_BASE_IMAGE_URL,
      saveCarbon: 0,
      parseTime,
      countMultiple: 1,
      shareModal: false,
      schemeId: "",
      schemeObject: {
        favStates: 0,
        cost: 0,
        solQty: 0,
        packCmpltImg: "",
        solPackMats: [],
        prcsImgs: [
          {
            processDesc: ""
          }
        ],
        videoUrl: "",
        instruSupp: [],
        // noticeAbstract: '',
        comments: [
          {
            reply: [],
            expand: false
          }
        ]
      },

      noticeInfo: [
        {
          instruContent: [
            {
              heading: "",
              orderedList: []
            }
          ]
        }
      ],
      originalQuantity: 1,
      expandDetail: false,
      anchorName: "",
      recommendList: [],
      recommendShowIndex: 0,
      currentImageIndex: 0,
      processImages: [],
      imageOrVideo: "image",
      currentProcessImage: {},
      myComment: "",
      visibleList: [{ replyVisible: false }],
      isReplyDialogVisible: false,
      currentComment: {},
      currentReplyContent: "",

      isSecondReplyDialogVisible: false,
      currentReply: {},
      currentSecondReplyContent: "",

      // 当前方案是否已收藏
      isCollected: false
    };
  },
  watch: {
    "$route.params.id": "refreshData",
    "schemeObject.solQty": "handleQuantityChange"
  },
  computed: {
    currentUser() {
      return this.$store.state.name;
    },

    recommendShowList: {
      get: function() {
        if (this.recommendList.length <= 3) {
          return this.recommendList;
        } else {
          return this.recommendList.slice(
            this.recommendShowIndex,
            this.recommendShowIndex + 3
          );
        }
      }
    },

    buttonBackground: {
      get: function() {
        return this.myComment.length > 0
          ? { "left-arrow": true }
          : { "left-arrow-disabled": true };
      }
    },

    leftArrowClass: {
      get: function() {
        return this.currentImageIndex > 0
          ? { "left-arrow": true }
          : { "left-arrow-disabled": true };
      }
    },

    rightArrowClass: {
      get: function() {
        return this.currentImageIndex + 1 < this.processImages.length
          ? { "right-arrow": true }
          : { "right-arrow-disabled": true };
      }
    }
  },
  created() {
    this.schemeId = this.$route.params.id;
    this.fetchSchemeDetailData();
  },
  methods: {
    fetchSchemeDetailData(fetchDataAfterReply = false) {
      getSchemeDetail(this.schemeId).then(res => {
        this.schemeObject = res.data;
        if (this.schemeObject !== null) {
          this.isCollected = !!this.schemeObject.favStates;
          this.noticeInfo = this.schemeObject.instruSupp.map(notice => {
            notice.instruContent = JSON.parse(notice.instruContent);
            //  notice.instruIcon = `${this.baseImageUrl}${notice.instruIcon}`
            return notice;
          });
          this.schemeObject.comments = this.schemeObject.comments.map(
            comment => {
              comment.reply.map(reply =>
                Object.assign(reply, { secondReplyContent: "" })
              );
              if (
                fetchDataAfterReply &&
                comment.commentId === this.currentComment.commentId
              ) {
                Object.assign(comment, { expand: true });
              } else {
                Object.assign(comment, { expand: false });
              }
              return Object.assign(comment, { replyContent: "" });
            }
          );
          this.visibleList = this.schemeObject.comments.map(comment => {
            return {
              // eslint-disable-next-line
              secondReplyVisibleList: comment.reply.map(reply => {
                return {
                  secondReplyVisible: false
                };
              }),
              replyVisible: false
            };
          });
          this.originalQuantity = this.schemeObject.solQty;

          // 托寄物数量置为 0
          // this.$refs['countInput'].$emit('input', 0)
          // this.countMultiple = 0

          this.imageOrvideo = this.schemeObject.videoUrl ? "video" : "image";
          this.processImages = this.schemeObject.prcsImgs.map(item =>
            Object.assign(item, { isSelected: false })
          );
          if( this.imageOrvideo === "image" && this.processImages.length === 0){
            return
          }else {
            if (this.imageOrvideo === "image") {
              this.processImages[0].isSelected = true;
            }
            this.currentProcessImage = this.processImages[0];
          }
          // if (this.imageOrvideo === "image") {
          //   this.processImages[0].isSelected = true;
          // }
          //this.currentProcessImage = this.processImages[0];
        }
      });

      getSimilarScheme(this.schemeId).then(res => {
        // console.log('getSimilarScheme: ', res)
        if (res.data && res.data.length > 0) {
          this.recommendList = res.data;
        }
      });
    },

    refreshData() {
      //console.log("refresh");
      // scrollTo(0, 0)
      this.schemeId = this.$route.params.id;
      this.fetchSchemeDetailData();
    },

    handleQuantityChange() {
      //console.log('solQty: ', this.schemeObject.solQty)
      if (this.schemeObject !== null) {
        this.countMultiple = Math.ceil(
          this.schemeObject.solQty / this.originalQuantity
        );
      }
    },

    handleCountBlur() {
      if (!this.schemeObject.solQty) {
        this.schemeObject.solQty = 0;
        this.$refs["countNumberInput"].$emit("input", 0);
        this.saveCarbon =
          this.schemeObject.unitCarbon * this.schemeObject.solQty;
      }
    },

    // 收藏当前方案
    handleCollectIconClick() {
      collectScheme(this.schemeId)
        .then(res => {
          //console.log("collectScheme: ", res);
          this.$Message.success("已收藏该方案，可在我的收藏列表中查看");
          this.fetchSchemeDetailData();
        })
        .catch(err => {
          console.log("collectScheme: ", err);
        });
    },

    // 取消收藏当前方案
    handleUnCollectIconClick() {
      unCollectScheme(this.schemeId)
        .then(res => {
          console.log("unCollectScheme: ", res);
          this.$Message.success("已取消收藏该方案");
          this.fetchSchemeDetailData();
        })
        .catch(err => {
          console.log("unCollectScheme: ", err);
        });
    },

    handleShareIconClick() {
      this.shareModal = true;

      const input = document.createElement("input");
      input.setAttribute("readonly", "readonly");
      // input.setAttribute('value', `${process.env.VUE_APP_SHARE_PREFIX}${this.schemeId}`)
      input.setAttribute("value", `${this.sharePrefix}${this.schemeId}`);
      document.body.appendChild(input);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        this.$Message.success({
          content: "当前方案链接已复制到剪贴板，可直接粘贴发送分享！",
          duration: 2.5
        });
      }
      document.body.removeChild(input);
    },

    handleExpandClick() {
      this.expandDetail = !this.expandDetail;
    },

    toSpecialMaterial(matId) {
      this.$router.push({ name: "MaterialDetail", params: { matId: matId } });
    },
    // goodsCountUp() {
    //   const inputScrollWidth = this.$refs['countInput'].$el.children[1].scrollWidth
    //   this.schemeObject.solQty++
    //   this.countMultiple = Math.ceil(this.schemeObject.solQty / this.originalQuantity)
    //   this.$refs['countInput'].$el.style.width = inputScrollWidth > 36 ? `${inputScrollWidth}px` : '36px'
    // },

    // goodsCountDown() {
    //   if (this.schemeObject.solQty > 0) {
    //     this.schemeObject.solQty--
    //     this.countMultiple = Math.ceil(this.schemeObject.solQty / this.originalQuantity)
    //     const inputScrollWidth = this.$refs['countInput'].$el.children[1].scrollWidth
    //     this.$refs['countInput'].$el.style.width = inputScrollWidth > 36 ? `${inputScrollWidth}px` : '36px'
    //   }
    // },

    // handleGoodsCountChange(val) {
    //   // console.log('event: ', val)
    //   // console.log('handleGoodsCountChange: ', val.target.value)
    //   // console.log('countInput: ', this.$refs['countInput'].$el.children[1].scrollWidth)
    //   // console.log('scrollWidth: ', this.$refs['countInput'].$el.scrollWidth)
    //   // console.log('minWidth: ', this.$refs['countInput'].$el.style.minWidth)
    //   // console.log('width: ', this.$refs['countInput'].$el.style.width)
    //   // console.log('style: ', this.$refs['countInput'].$el.style)
    //   // const inputScrollWidth = this.$refs['countInput'].$el.children[1].scrollWidth
    //   // console.log('inputScrollWidth', inputScrollWidth)
    //   if (val.target.value.length > 3) {
    //     console.log('value: ', val.target.value)
    //     this.$refs['countInput'].$el.style.width = `${36 + val.target.value.length * 8}px`
    //   } else {
    //     this.$refs['countInput'].$el.style.width = '36px'
    //   }
    //   // this.$refs['countInput'].$el.style.width = inputScrollWidth > 36 ? `${inputScrollWidth}px` : '36px'
    //   console.log('type: ', typeof this.schemeObject.solQty)
    //   if ((typeof this.schemeObject.solQty) === 'number') {
    //     this.countMultiple = Math.ceil(this.schemeObject.solQty / this.originalQuantity)
    //   }
    // },

    // handleGoodsCountBlur(val) {
    //   if ((typeof val.target._value) === 'number') {
    //     this.$refs['countInput'].$emit('input', val.target._value.toFixed(0))
    //   } else {
    //     this.$refs['countInput'].$emit('input', 0)
    //   }
    // },

    // toAnchor(selector) {
    //   const anchor = this.$el.querySelector(selector)
    //   console.log('toAnchor: ', anchor.offsetTop)
    //   // let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    //   document.documentElement.scrollTop = anchor.offsetTop - 70
    //   document.body.scrollTop = anchor.offsetTop - 70
    //   // scrollTop = anchor.offsetTop - 70
    // },

    recommendLeftClick() {
      if (this.recommendShowIndex > 0) {
        this.recommendShowIndex--;
      }
      console.log("recommendShowIndex: ", this.recommendShowIndex);
    },

    recommendRightClick() {
      if (this.recommendList.length - this.recommendShowIndex > 3) {
        this.recommendShowIndex++;
      }
      console.log("recommendShowIndex: ", this.recommendShowIndex);
    },

    handleVideoRadioChange(newValue) {
      console.log("handleVideoRadioChange: ", newValue);
    },

    onLeftArrowClick() {
      console.log("onLeftArrowClick: ", this.currentImageIndex);
      if (this.currentImageIndex === 0) return;
      this.processImages[this.currentImageIndex].isSelected = false;
      this.currentImageIndex--;
      this.processImages[this.currentImageIndex].isSelected = true;
      this.currentProcessImage = this.processImages[this.currentImageIndex];
      const image = this.$refs[
        this.processImages[this.currentImageIndex].imgId
      ][0];
      image.scrollIntoViewIfNeeded();
      // image.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    },

    onRightArrowClick() {
      console.log("onRightArrowClick: ", this.currentImageIndex);
      if (this.currentImageIndex + 1 >= this.processImages.length) return;
      this.processImages[this.currentImageIndex].isSelected = false;
      this.currentImageIndex++;
      this.processImages[this.currentImageIndex].isSelected = true;
      this.currentProcessImage = this.processImages[this.currentImageIndex];
      const image = this.$refs[
        this.processImages[this.currentImageIndex].imgId
      ][0];
      image.scrollIntoViewIfNeeded();
      // image.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    },

    handleThumbnailClick(image, imageIndex) {
      // const imageContainer = this.$refs['imageContainer']
      console.log("$refs: ", this.$refs);
      // console.log('imageContainer: ', imageContainer)
      // console.log('left: ', imageContainer.style.left)
      // imageContainer.style.left = '-60px'
      // console.log('imageContainer: ', imageContainer.attributes.style)

      // const temp = this.$refs[image.imgId]
      // const temp = this.$refs[image.imgId][0].offsetLeft
      // const thumbnails = this.$refs['thumbnails']
      // thumbnails.scrollRight = 200

      console.log("offsetLeft: ", this.$refs[image.imgId][0].offsetLeft);
      console.log("offsetParent: ", this.$refs[image.imgId][0].offsetParent);
      console.log("image: ", this.$refs[image.imgId]);
      // console.log('test1: ', thumbnails)
      console.log("imageIndex: ", imageIndex);
      this.imageOrVideo = "image";
      this.processImages.map((item, index) => {
        item.isSelected = imageIndex === index;
        return item;
      });
      image.isSelected = true;
      this.$set(this.processImages, imageIndex, image);
      this.currentProcessImage = this.processImages[imageIndex];
      this.currentImageIndex = imageIndex;
    },

    addComment() {
      commentScheme(this.schemeId, this.myComment)
        .then(res => {
          console.log(res);
          this.$Message.success(res.message);
          this.myComment = "";
          this.fetchSchemeDetailData();
        })
        .catch(err => {
          console.log("commentScheme: ", err);
        });
    },

    getTimeDifference(commentTime) {
      if (commentTime === undefined) {
        return "";
      }
      let timeDesc = "";
      let timeDifference = Math.floor((+new Date() - commentTime) / 1000);
      // web 端和后端没有统一时间，可能出现时间差为负值，此时返回 '1 秒前'
      // if (timeDifference < 0) {
      //   return '1 秒前'
      // }
      // console.log('timeDifference: ', timeDifference)
      if (timeDifference < 60) {
        // timeDesc = `${timeDifference} 秒前`
        timeDesc = "刚刚";
      } else {
        timeDifference = Math.floor(timeDifference / 60);
        if (timeDifference < 60) {
          timeDesc = `${timeDifference} 分钟前`;
        } else {
          timeDifference = Math.floor(timeDifference / 60);
          if (timeDifference < 24) {
            timeDesc = `${timeDifference} 小时前`;
          } else {
            timeDesc = this.parseTime(commentTime / 1000);
          }
        }
      }
      return timeDesc;
    },

    openReplyDialog(comment) {
      this.currentComment = comment;
      this.currentReplyContent = "";
      this.isReplyDialogVisible = true;
    },

    deleteComment(commentId) {
      deleteComment(commentId, 0)
        .then(res => {
          this.$Message.success(res.message);
          this.fetchSchemeDetailData();
        })
        .catch(err => {
          console.log("deleteComment: ", err);
        });
    },

    openSecondReplyDialog(comment, reply) {
      this.currentComment = comment;
      this.currentReply = reply;
      this.currentSecondReplyContent = "";
      this.isSecondReplyDialogVisible = true;
    },

    deleteReply(replyId) {
      deleteComment(replyId, 1)
        .then(res => {
          this.$Message.success(res.message);
          this.fetchSchemeDetailData();
        })
        .catch(err => {
          console.log("deleteComment: ", err);
        });
    },

    cancelDelete() {
      this.$Message.info("已取消删除");
    },

    handleCommentVisibleChange(visible) {
      if (visible) {
        this.$nextTick(() => {
          this.$refs.commentModalInput.focus();
        });
      }
    },

    handleReplyVisibleChange(visible) {
      if (visible) {
        this.$nextTick(() => {
          this.$refs.replyModalInput.focus();
        });
      }
    },

    onCommentOk() {
      const replyTag = 0;
      replyComment(
        this.currentComment.commentId,
        this.currentReplyContent,
        this.currentComment.empNo,
        replyTag
      )
        .then(res => {
          this.isReplyDialogVisible = false;
          this.$Message.success(res.message);
          this.fetchSchemeDetailData(true);
        })
        .catch(err => {
          this.$Message.error(err);
          console.log("replyComment: ", err);
        });
    },

    onReplyOk() {
      const replyTag = 1;
      console.log("currentReply: ", this.currentReply);
      replyComment(
        this.currentComment.commentId,
        this.currentSecondReplyContent,
        this.currentReply.replyFromEmpNo,
        replyTag
      )
        .then(res => {
          this.isSecondReplyDialogVisible = false;
          this.$Message.success(res.message);
          this.fetchSchemeDetailData(true);
        })
        .catch(err => {
          this.$Message.error(err);
          console.log("replyComment: ", err);
        });
    },

    onCommentCancel() {
      this.isReplyDialogVisible = false;
      this.$Message.info("已取消回复");
    },

    onReplyCancel() {
      this.isSecondReplyDialogVisible = false;
      this.$Message.info("已取消回复");
    },

    handleReplyExpandClick(comment) {
      comment.expand = !comment.expand;
      this.schemeObject.comments = this.schemeObject.comments.map(c => c);
    }
  }
};
</script>

<style scoped lang="less">
/*.expand-control /deep/ .ivu-btn {*/
/*border: 0*/
/*}*/

/*.my-comment /deep/ .ivu-btn {*/
/*border: 0*/
/*}*/

/*.custom-modal-footer /deep/ .ivu-btn {*/
/*border: 0*/
/*}*/

/deep/ .ivu-btn {
  border: 0;
}

/deep/ .ivu-btn:focus {
  box-shadow: 0 0;
}

/*方案详情第一部分*/
.scheme-first {
  margin: 18px 70px;
  height: 820px;
  display: flex;
  flex-direction: row;

  /*详情第一部分左半部分*/
  .left-part {
    background-color: white;
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.1);
    width: 908px;
    /*width: 880px;*/
    height: 820px;
    padding: 44px 64px;

    /*标题*/
    .scheme-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .scheme-title-font {
        font: 20px "Microsoft YaHei";
        color: rgba(0, 0, 0, 0.85);
      }

      .title-underline {
        margin-top: 6px;
        /*width: 32px;*/
        /*background: linear-gradient(to right, #37bad0, #00e8ab);*/
        background: linear-gradient(
          to right,
          rgb(105, 228, 175),
          rgb(95, 184, 205)
        );
        height: 3px;
      }

      .collect-and-share {
        display: flex;
        flex-direction: row;
        /*justify-content: space-between;*/
        align-items: center;

        .collect-and-share-text {
          padding-left: 8px;
          font: 16px "Microsoft YaHei";
          color: rgba(0, 0, 0, 0.45);
        }

        .clickable {
          cursor: pointer;
        }

        .collect-container {
          display: flex;
          flex-direction: row;
          /*justify-content: space-between;*/
          align-items: center;

          .collect-icon {
            width: 17px;
            height: 16px;
            background-image: url(../../../assets/scheme/icon_collect.png);
            /*background-image: url(../../assets/scheme/icon_collect_colored.png);*/
            background-size: cover;
            cursor: pointer;
          }

          &:hover .collect-icon {
            background-image: url(../../../assets/scheme/icon_collect_colored.png);
            background-size: cover;
          }

          .collected-icon {
            width: 17px;
            height: 16px;
            background-image: url(../../../assets/scheme/icon_collect_colored.png);
            background-size: cover;
            cursor: pointer;
          }

          &:hover .collected-icon {
            background-image: url(../../../assets/scheme/icon_collect.png);
            background-size: cover;
          }
        }

        .share-container {
          display: flex;
          flex-direction: row;
          /*justify-content: space-between;*/
          align-items: center;

          .share-icon {
            width: 19px;
            height: 18px;
            background-image: url(../../../assets/scheme/icon_share_colored.png);
            background-size: cover;
            cursor: pointer;
            margin-left: 32px;
          }
        }
      }
    }

    /*方案爆炸图*/
    .explosive-image-container {
      margin-top: 24px;
      width: 780px;
      height: 268px;
    }

    /*材料*/
    .material-container {
      display: flex;
      flex-wrap: wrap;
      /*width: 780px;*/
      height: 268px;
      margin-top: 52px;
      overflow-x: hidden;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 4px;
      }

      .material-image-container {
        padding-right: 60px;
        width: 50%;
        display: flex;
        align-items: center;

        .special-material-id {
          position: absolute;
          left: -14px;
          top: 0.3px;
          font: 12px "Microsoft YaHei";
          transform: scale(0.8);
          color: #ffffff;
          background: url("../../../assets/scheme/bg_scheme_id_2x.png")
            no-repeat;
          /*background-size: cover;*/
          background-size: 110px 24px;
          height: 48px;
          padding: 0 6px 0 10px;
          /*text-align: left;*/
        }

        .material-detail-text-container {
          margin-left: 22px;

          .material-detail-title-container {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .font-icon-flex-row-container {
              display: flex;
              flex-direction: row;
              align-items: center;

              .material-detail-name {
                max-width: 150px;
                font: 14px "Microsoft YaHei";
                color: rgba(0, 0, 0, 0.85);
              }

              .to-special-material {
                height: 12px;
                margin: 0 8px;
                cursor: pointer;
              }
            }

            .material-detail-count {
              white-space: nowrap;
              font: 24px "Microsoft YaHei";
              color: #2bc7c6;
            }
          }

          .material-detail-content-container {
            margin-top: 12px;
            font: 10px "Microsoft YaHei";
            color: rgba(0, 0, 0, 0.45);
          }
        }
      }
    }

    /*方案价格*/
    .price-container {
      margin-top: 52px;

      .price-label-font {
        font: 18px "Microsoft YaHei";
        color: rgba(0, 0, 0, 0.85);
      }

      .price-number-font {
        font: bold 28px "Microsoft YaHei";
        color: #2bc7c6;
      }
    }
  }
}

.material-text-detail-container::-webkit-scrollbar {
  width: 4px;
}

.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.material-name {
  font: 14px "Microsoft YaHei";
  color: rgba(0, 0, 0, 0.45);
}

.material-count {
  white-space: nowrap;
  /*margin-right: 30px;*/
  font: 18px "Microsoft YaHei";
  color: #2bc7c6;
}

.right-part {
  background-color: white;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.1);
  margin-left: 18px;
  width: 374px;
  height: 820px;
  padding: 30px 32px 55px 32px;

  .delivery-count-container {
    margin-top: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .delivery-tip-font {
      font: 16px "Microsoft YaHei";
      color: rgba(0, 0, 0, 0.65);
    }

    .package-info-container {
      flex-shrink: 0;
      /*height: 25px;*/
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .package-needed-font {
        font: 18px "Microsoft YaHei";
        color: rgba(0, 0, 0, 0.85);
      }

      .package-count-font {
        font: bold 28px "Microsoft YaHei";
        color: #2bc7c6;
      }
    }

    .material-text-detail-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
      height: 275px;

      .material-single-container {
        flex-shrink: 0;
        /*height: 25px;*/
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .material-name {
          font: 14px "Microsoft YaHei";
          color: rgba(0, 0, 0, 0.45);
        }

        .material-count {
          white-space: nowrap;
          /*margin-right: 30px;*/
          font: 18px "Microsoft YaHei";
          color: #2bc7c6;
        }
      }
    }

    .material-single-container {
      flex-shrink: 0;
      /*height: 25px;*/
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .price-label-font {
        font: 18px "Microsoft YaHei";
        color: rgba(0, 0, 0, 0.85);
      }

      .price-total-font {
        font: bold 30px "Microsoft YaHei";
        color: #2bc7c6;
      }
    }
  }
}

.count-and-price {
  margin-top: 28px;
  padding: 0 84px;
  height: 64px;
  box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.count-up-icon {
  margin-left: 16px;
  width: 20px;
  height: 20px;
  background-image: url(../../../assets/scheme/icon_count_up.png);
  background-size: cover;
  cursor: pointer;
}

.count-up-icon:hover {
  background-image: url(../../../assets/scheme/icon_count_up_colored.png);
  background-size: cover;
}

.count-down-icon {
  margin-left: 22px;
  width: 20px;
  height: 20px;
  background-image: url(../../../assets/scheme/icon_count_down.png);
  background-size: cover;
  cursor: pointer;
}

.count-down-icon:hover {
  background-image: url(../../../assets/scheme/icon_count_down_colored.png);
  background-size: cover;
}

.goods-count-input {
  width: 36px;
  margin-left: 16px;
}

.goods-count-input /deep/ .ivu-input {
  text-align: center;
}

.price-label-text {
  font: 14px "Microsoft YaHei";
  color: #808080;
}

.price-text {
  font: 26px "Arial-BoldMt";
  font-weight: bold;
  color: #2bc7c6;
  margin-left: 22px;
  margin-right: 24px;
  vertical-align: middle;
}

.scheme-second {
  margin: 18px 70px;
  background-color: white;
  /*display: flex;*/
  /*flex-direction: column;*/
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.1);
}

.anchor-menu {
  height: 60px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.08);
  /*font: bold 16px 'Microsoft YaHei';*/
  /*color: #1ec9c2;*/
}

.anchor-header {
  height: 64px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  font: bold 16px "Microsoft YaHei";
  color: #1ec9c2;
}

.anchor-content {
  overflow: hidden;
  margin: 0 64px;
}

.recommend-list {
  display: flex;
  align-items: center;
}

.recommend-flex-container {
  display: flex;
  align-items: center;
  margin: 28px 28px 20px 28px;
}

.ivu-card + .ivu-card {
  margin-left: 10px;
}

div > img + img {
  margin-left: 6px;
}

/*div > video + img {*/
/*margin-left: 6px;*/
/*}*/

.instruction-float-block {
  position: absolute;
  top: 80px;
  left: 500px;
  /*width: 200px;*/
  display: flex;
  align-items: baseline;
}

.instruction-pointer {
  width: 20px;
  /*height: 15px;*/
  height: 21px;
  background-image: url("../../../assets/scheme/icon_instruction_pointer.png");
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.instruction-text {
  margin-left: 12px;
  width: 150px;
  font: 12px "Microsoft YaHei";
  color: rgba(0, 0, 0, 0.85);

  display: flex;
  flex-direction: column;
}

.instruction-index-text {
  /*width: 150px;*/
  margin-top: 16px;
  font: 12px "Microsoft YaHei";
  color: rgba(0, 0, 0, 0.45);
}

.sequence-control {
  margin-top: 36px;
  display: flex;
}

.arrow-size {
  width: 30px;
  height: 30px;
}

.left-arrow {
  /*background-image: url(../../assets/scheme/icon_left_arrow_2x.png);*/
  background-image: url(../../../assets/scheme/icon_left_arrow_2x_colored.png);
  background-size: cover;
  cursor: pointer;
}

.left-arrow-disabled {
  background-image: url(../../../assets/scheme/icon_left_arrow_2x.png);
  background-size: cover;
  cursor: not-allowed;
}

.left-arrow:hover {
  background-image: url(../../../assets/scheme/icon_left_arrow_2x_colored.png);
  background-size: cover;
}

.right-arrow {
  /*background-image: url(../../assets/scheme/icon_right_arrow_2x.png);*/
  background-image: url(../../../assets/scheme/icon_right_arrow_2x_colored.png);
  background-size: cover;
  cursor: pointer;
}

.right-arrow-disabled {
  background-image: url(../../../assets/scheme/icon_right_arrow_2x.png);
  background-size: cover;
  cursor: not-allowed;
}

.right-arrow:hover {
  background-image: url(../../../assets/scheme/icon_right_arrow_2x_colored.png);
  background-size: cover;
}

.process-image-gallery {
  width: 484px;
  height: 72px;
  margin-top: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  /*position: relative;*/
}

.process-image-gallery::-webkit-scrollbar {
  height: 4px;
}

.image-absolute-block {
  position: absolute;
  top: 0;
  height: 62px;
}

.instruction-grid-container {
  display: grid;
  /*justify-items: start;*/
  /*align-items: start;*/
  /*justify-content: space-between;*/
  grid-template-columns: 256px auto;
  grid-template-rows: auto;
}

.center-flex-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.notice-container {
  margin-top: 60px;
  /*max-height: 640px;*/
  overflow: hidden auto;
}

.notice-area {
  margin: 48px;
  font: 14px "Microsoft YaHei";
}

.notice-flex-container {
  display: flex;
  border-bottom: 1px solid #eeeeee;
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
}

.notice-icon {
  width: 256px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font: 14px "Microsoft YaHei";
  border-right: 1px solid #eeeeee;
}

.notice-content {
  padding: 46px 40px;
  width: 820px;
}

.heading-content + .heading-content {
  margin-top: 50px;
}

.heading-font {
  font: 14px "Microsoft YaHei";
  color: rgba(0, 0, 0, 0.85);
}

span.heading-font + div {
  margin-top: 16px;
}

.content-font {
  word-break: break-word;
  overflow-wrap: break-word;
  font: 12px "Microsoft YaHei";
  color: rgba(0, 0, 0, 0.85);
}

.notice-grid-container {
  margin-top: 24px;
  border: 1px solid #eeeeee;
  display: grid;
  /*align-items: start;*/
  /*justify-content: space-between;*/
  grid-template-columns: 256px auto;
  grid-template-rows: 150px 360px;
}

.grid-1-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
}

.grid-1-2 {
  border-bottom: 1px solid #eeeeee;
}

.grid-2-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #eeeeee;
}

.comment-flex-container {
  margin: 0 12%;
  display: flex;
  flex-direction: column;
}

.comment-content-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.comment-content-container-margin {
  margin-top: 40px;
}

.comment-name {
  flex-shrink: 0;
  width: 100px;
  font: 14px "Microsoft YaHei";
  color: rgba(0, 0, 0, 0.45);
}

.comment-name-padding {
  padding: 7px 40px 0 16px;
}

.comment-name-width {
  width: 100px;
}

.comment-content-wrap-container {
  display: flex;
  flex-wrap: wrap;
}

.comment-content {
  margin-top: 8px;
  margin-right: 20px;
  font: 12px "Microsoft YaHei";
  color: rgba(0, 0, 0, 0.85);
}

.comment-time {
  margin-right: 16px;
  font: 12px "Microsoft YaHei";
  color: rgba(0, 0, 0, 0.45);
}

.custom-modal-footer {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}

.icon-text-row-flex-container {
  /*display: inline-flex;*/
  display: flex;
  /*align-items: baseline;*/
  /*align-items: center;*/
}

.expand-tip {
  cursor: pointer;
  padding: 22px 20px 0 20px;
  /*padding-bottom: 40px;*/
  /*padding-top: 22px;*/
  font: 14px "Microsoft YaHei";
  color: #2bc7c6;
}

.reply-area {
  margin-top: 20px;
  padding-bottom: 20px;
  background-color: #f5f7f8;
  border: 1px #eff2fa;
}

.reply-flex-container {
  margin: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
}

.reply-name-padding {
  /*padding: 16px 16px 0 20px;*/
}

.avatar-flex-container {
  display: flex;
  flex-wrap: wrap;
  /*align-items: center;*/
}

.reply-name-font {
  font: 14px "Microsoft YaHei";
  color: rgba(0, 0, 0, 0.45);
}

.reply-content-font {
  font: 12px "Microsoft YaHei";
  color: rgba(0, 0, 0, 0.85);
}

/*.reply-content-container-margin {*/
/*margin-top: 40px;*/
/*}*/

.my-comment {
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comment-button {
  /*background-image: none;*/
  margin-left: 24px;
  margin-right: 6%;
}

.button-background {
  background-image: url("../../../assets/scheme/bg_scheme_class_item.png");
  background-size: cover;
  color: white;
  box-shadow: 0 4px 10px 0 rgba(43, 199, 198, 0.4);
}

a {
  color: #2bc7c6;
}

a:hover {
  color: #2bc7c6;
}
</style>
