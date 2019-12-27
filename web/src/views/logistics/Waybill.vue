<template>
  <div class="waybill">
    <div class="waybill-cont">
      <div style="width:1300px;height:590px;margin:0 auto;background-color:#fff;font-size:14px;">
        <div style="height:70px;padding:20px 66px;background:#fff;box-shadow:0px 4px 15px 0px rgba(0, 0, 0, 0.1);line-height:30px">
          <div style="float:left;color:#000">
            <span style="opacity:0.85;">顺丰运单号：</span>
            <Tooltip offset=12 style="height: 20px;margin-right:30px;color:#fff" placement="top-end" max-width="400px" content="仅计算轨迹碳排放，如需计算包装碳排放，请勾选“使用包材信息”">
              <input type="text" v-model.trim="value" placeholder="您可以输入运单号进行查询" style="width:185px;height:30px;padding:5px 6px;border:1px solid rgba(239,242,250,1);border-radius:2px;background:rgba(242,245,251,1);"/>
              <img style="vertical-align: middle;margin-left:10px" width="16" height="16" src="../../assets/scheme/icon_price_hint_white_2x.png" alt="温馨提示"/>
            </Tooltip>
            <Checkbox v-model="isUseBox" @on-change="checked">使用包材信息</Checkbox>
            <Modal v-model="isShow" class="packmaterials_modal" width="1054" @on-ok="materialDialogOk" @on-cancel="materialDialogCancel" :loading="saving">
              <div class="matCategory-modal" style="position: relative;padding:100px 61px 0;font-size:16px;">
                <span style="margin-right:12px">物料类别</span>
                <span style="font-family:STXihei;opacity:0.2;">Pack Materials</span>
                <div style="width:64px;height:3px;margin-top:9px;background-color:#2BC7C6"></div>
                <img src="../../assets/icon_rectangle.png" alt style="position: absolute;top:90px;left:49px;width:12px;"/>
                <div style="height:auto;max-height:462px;text-align:center">
                  <Row style="height:42px;line-height:42px;font-size:14px;">
                    <i-col span="2">序号</i-col>
                    <i-col span="3" offset="1">物料类别</i-col>
                    <i-col span="6" offset="2">型号</i-col>
                    <i-col span="4" offset="1">数量</i-col>
                    <i-col span="4" offset="1">操作</i-col>
                  </Row>
                  <i-form v-model="dialogDataList" :rules="formRules" ref="form">
                    <Row type="flex" justify="center" v-for="(item, index) in tableList" :key="index" style="height:42px;line-height:42px">
                      <i-col span="2">{{(page-1)*pageSize + index + 1}}</i-col>
                      <i-col span="3" offset="1">
                        <FormItem :prop="'dialogDataList.'+index+'.matCategory'">
                          <Select :transfer="true" size="small" v-model="item.matCategory" @on-change="val=>{cateValueHasChange(val, index)} ">
                            <Option v-for="item in cateDataList" :key="item.id" :value="item.matCategory">{{item.matCategory}}</Option>
                          </Select>
                        </FormItem>
                      </i-col>
                      <i-col span="6" offset="2">
                        <FormItem :prop="'dialogDataList.'+index+'.matName'">
                          <Select :transfer="true" size="small" v-model="item.matName">
                            <Option v-for="m in modalData[item.matCategory]" :key="m.id" :value="m.id">{{m.matName}}</Option>
                          </Select>
                        </FormItem>
                      </i-col>
                      <i-col span="4" offset="1">
                        <FormItem :prop="'dialogDataList.'+index+'.number'" :rules="formRules.number">
                          <i-button style="margin-right:10px;padding:0 8px;border:none;background-color: transparent;font-size:18px;color:#2BC7C6" @click="subNumber(item)">-</i-button>
                          <i-input style="width:45px;line-height:20px;text-align:center;color:#ADADAD" size="small" v-model="item.number"/>
                          <i-button style="margin-left:10px;font-size:18px;padding:0 8px;border:none;background-color: transparent;color:#2BC7C6" @click="addNumber(item)">+</i-button>
                        </FormItem>
                      </i-col>
                      <i-col span="4" offset="1">
                        <i-button style="border:none;color:#2BC7C6;background-color: transparent" size="small" @click="remove(index)" v-if="dialogDataList.length > 1">删除</i-button>
                        <i-button style="margin-left:10px;color:#2BC7C6;border:none;background-color: transparent;text-align:right" size="small" @click="newly(index)"
                          v-if="((page-1)*pageSize + index) === dialogDataList.length-1 && dataIsComplate(item)">新增下一行</i-button>
                      </i-col>
                    </Row>
                  </i-form>
                </div>
                <Page :styles="{marginTop:'20px',textAlign:'center'}" :current.sync="page" :total="Total" show-total show-elevator @on-change="hanlePageChange" @on-page-size-change="onPageSizeChange"/>
              </div>
            </Modal>
            <i-button @click="calcuteCarbonData" style="width:46px;height:26px;padding:0;border:none;background:linear-gradient(45deg,rgba(55,186,208,1) 0%,rgba(0,232,171,1) 99%);color: #fff;"
            >计算</i-button>
          </div>
          <Modal v-model="isShowBatchQuery" class-name="batchinquiry-modal" width="1054" @on-ok="batchQueryOk" :loading="batchQueryLoading">
            <div style="position: relative;padding:100px 60px 0;font-size:16px;color:#000">
              <span style="margin-right:12px; opacity:0.85;">批量查询</span>
              <span style="font-family:STXihei;opacity:0.2;">Batch Inquiry</span>
              <div style="width:64px;height:3px;margin-top:9px;background-color:#2BC7C6"></div>
              <img src="../../assets/icon_rectangle.png" alt style="position: absolute;top:90px;left:49px;width:12px;"/>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :format="['xls','xlsx']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleUpload"
                :action="uploadUrl"
              >
                <div style="line-height:44px;">
                  <span style="opacity:0.85;">批量导入：</span>
                  <input size="small" style="width:289px;height:30px;border-radius:2px;background:rgba(242,245,251,1);border:1px solid rgba(239,242,250,1)" v-model="fileName" disabled="disabled"/>
                  <i-button style="width:46px;height:26px;padding:0;margin-left:12px;background:linear-gradient(45deg,rgba(55,186,208,1) 0%,rgba(0,232,171,1) 99%);box-shadow:0px 4px 10px 0px rgba(43,199,198,0.4);border:none;color:#fff">浏览</i-button>
                </div>
              </Upload>
            </div>
            <div style="margin-top:44px;font-size:14px;line-height:24px;text-align:center;color:#adadad">
              <span style="font-weight:bold">备注:</span>请使用
              <a style="border-bottom:1px solid #2BC7C6;font-weight:bold;color:#2BC7C6" :href="downloadUrl">批量模板</a>并按格式填写，以方便进行批量运单轨迹碳排放量计算。
            </div>
          </Modal>
          <div class="right-btn" style="float:right">
            <i-button class="commbtn download-btn" style="margin-right:10px;">
              批量模板下载
              <a :href="downloadUrl" download target="__blank"></a>
            </i-button>
            <i-button class="commbtn uploadbtn" style="margin-right:10px;" icon="ios-cloud-upload-outline" @click="showBatchQuery" >批量上传</i-button>
            <i-button class="commbtn" @click="jump">结果下载</i-button>
            <div style="display:inline-block;width:10px">
              <Tooltip v-if="undown > 0 || calculating > 0" top=10 placement="top" width=500 style="position: relative;top:10px;left:-16px;width:6px;height:6px;background-color:rgb(255,87,110);border-radius:50%;" >
                <div slot="content">您当前有{{calculating}}条数据在计算中，有{{undown}}条数据待下载</div>
              </Tooltip>
            </div>  
          </div>
        </div>
        <div style="height:520px;text-align:center;position:relative;color:#000">
          <div style="float:left;width:416px;height:100%;">
            <img src="../../assets/logistics/co2-ico.png" alt style="margin-top:46px;width:86px" />
            <div style="margin-top:17px;font-size:20px;font-weight:bold">碳排放量</div>
            <div style="font-size:14px;opacity:0.45;">CARBON EMISSION</div>
            <div style="font-weight:bold;font-size:30px;">{{carbonValue}}</div>
            <div style="margin-top:30px;">Kgco2e</div>
            <div style="width:346px;margin:48px auto 0;text-align:left;line-height:24px;font-size:14px;opacity:0.45;">
              <div style="font-weight:bold">备注：</div>
              <div>
                1、后台测算，传输需要3-4S，请您耐心等候。
                <br />2、页面仅支持单票计算，如需批量测算，请点击右上方
                <br />&nbsp;&nbsp;“批量查询”。批量查询模板，按需下载。
                <br />3、碳排放量，是估值，如有疑问，请与我们联系：
                <br />&nbsp;&nbsp;&nbsp;&nbsp;suzhaohua@sfmail.sf-express.com
              </div>
            </div>
          </div>
          <div id="map" style="float:left;width:884px;height:100%;"></div>
          <div style="position:absolute;bottom:0;left:424px;z-index:9;background: rgb(205,228,236)">
            <img src="../../assets/logistics/logo.png" alt style="width:100%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavLayout from "../navlayout/NavLayout";
import { getMatNames, getCategorys, calculateByNo, getNumsUndown } from "@/api/track";
export default {
  name: "waybill",
  components: { NavLayout },
  computed: {
    uploadUrl() {
      return process.env.VUE_APP_BASE_URL + "carbondial/import";
    },
    tableList() {
      let start = (this.page - 1) * this.pageSize;
      let end = start + this.pageSize;
      let res = [];
      let i = 0;
      while (i < this.pageSize && start + i < this.dialogDataList.length) {
        res.push(this.dialogDataList[start + i]);
        i++;
      }
      return res;
    },
    downloadUrl(){
      return process.env.VUE_APP_BASE_FILEDOWNLOAD_URL +"excels/template/waybillTemplate.xlsx" 
    }
  },
  data() {
    const validateNumber = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("请输入数量"));
      } else if (value === 0) {
        callback(new Error("数量不能为0"));
      } else {
        callback();
      }
    };
    return {
      map: null,
      polyline: null,
      vectorLayer: null,
      saving: false,
      value: "",
      carbonValue: "--",
      modal: false,
      isShow: false,
      isUseBox: false,
      isShowBatchQuery: false,
      batchQueryLoading: true,
      fileName: "",
      file: null,
      dialogDataList: [
        {
          number: 1,
          matCategory: "",
          matName: ""
        }
      ],
      cateDataList: null,
      modalData: {},
      formRules: {
        matCategory: [
          {
            required: true,
            message: "请选择物料类别",
            trigger: "blur"
          }
        ],
        matName: [
          {
            required: true,
            message: "请选择物料型号",
            trigger: "blur"
          }
        ],
        number: [{ validator: validateNumber, trigger: "blur" }]
      },
      carbonResData: null,
      Total: 0,
      pageSize: 10,
      page: 1,
      undown: 0,//可下载文件数量
      calculating: 0 //正在计算中的文件数量
    };
  },
  methods: {
    dataIsComplate(item){
      return item.matCategory !== '' && item.matName !== '' && item.number > 0
    },
    batchQueryOk() {
      if (this.file === null) {
        this.$Message.error("请选择文件");
        this.batchQueryLoading = false;
        setTimeout(() => {
          this.batchQueryLoading = true;
        }, 500);
        return;
      }
      this.batchQueryLoading = true;
      this.$refs.upload.post(this.file);
      //console.log(this.res);
    },
    handleUpload(file) {
      this.file = file;
      this.fileName = file.name;
      return false;
    },
    showBatchQuery() {
      this.isShowBatchQuery = true;
    },
    subNumber(item) {
      if (item.number > 1) {
        item.number--;
      }
    },
    addNumber(item) {
      item.number++;
    },
    //删除按钮事件
    remove(index) {
      // if (this.dialogDataList.length === 1) {
      //   this.$Message.error("至少保留一行");
      //   return;
      // }
      index = (this.page - 1) * this.pageSize + index;
      this.dialogDataList.splice(index, 1);
      this.Total = this.dialogDataList.length;
      //console.log(index);
    },
    //新增一行按钮事件
    newly(index) {
      this.dialogDataList.push({
        number: 1,
        matCategory: "",
        matName: ""
      });
      this.Total = this.dialogDataList.length;
    },
    getCategory() {
      getMatNames()
        .then(res => {
          this.cateDataList = res.data;
        })
        .catch(err => {});
    },
    getModalData(val) {
      getCategorys({
        matCategory: val
      })
        .then(res => {
          let data = JSON.parse(JSON.stringify(this.modalData));
          data[val] = res.data;
          this.modalData = data;
        })
        .catch(err => {});
    },
    cateValueHasChange(val, index) {
      let item = this.dialogDataList[index];
      item.matName = "";
      if (!this.modalData.hasOwnProperty(val)) {
        this.getModalData(val);
      }
    },
    materialDialogOk() {
      let res = [];
      this.dialogDataList.forEach(item => {
        if (
          item.matCategory !== "" &&
          item.matName !== "" &&
          item.number !== 0
        ) {
          res.push(item);
        }
      });
      this.dialogDataList = res;
      this.isUseBox = res.length > 0;
    },
    checked(val) {
      this.isShow = val;
      if (val && this.dialogDataList.length === 0) {
        this.dialogDataList = [
          {
            number: 1,
            matCategory: "",
            matName: ""
          }
        ];
      }
    },
    materialDialogCancel() {
      this.dialogDataList =[]
      this.isUseBox=false
      this.Total=this.dialogDataList.length
      this.page=1
    },
    calcuteCarbonData() {
      let text = this.value.trim();
      if (text.length === 0) {
        this.$Modal.error({
          width: 460,
          render: h => {
            return h(
              "div",
              {
                style: {
                  padding: "34px 64px",
                  textAlign: "center"
                }
              },
              [
                h("img", {
                  style: {
                    width: "292px",
                    height: "159px",
                    verticalAlign: "middle"
                  },
                  attrs: {
                    src: require("../../assets/demand/icon_demand_cancel.png")
                  }
                }),
                h(
                  "div",
                  {
                    style: {
                      marginTop: "30px",
                      fontSize: "20px",
                      color: "#FDB24A"
                    }
                  },
                  "运单号不能为空！"
                ),
                h(
                  "div",
                  {
                    style: {
                      marginTop: "17px",
                      fontSize: "14px",
                      color: "#ADADAD"
                    }
                  },
                  "请输入正确的运单号！"
                )
              ]
            );
          },
          okText: "返回",
          cancelText: ""
        });
        return;
      }
      let carbonMatBos = [];
      if (this.isUseBox) {
        this.dialogDataList.forEach(item => {
          if (
            item.matCategory !== "" &&
            item.matName !== "" &&
            item.number !== 0
          ) {
            carbonMatBos.push({
              matConfigId: item.matName,
              num: item.number
            });
          }
        });
      }
      let params = {
        waybillNo: this.value,
        carbonMatBos
      };
      this.carbonResData = null;
      const _this = this;
      calculateByNo(params)
        .then(res => {
          this.carbonResData = res.data;
          this.handleCarbonDataFromRemote();
        })
        .catch(err => {
          //console.log("catch err", err);
          this.$Modal.error({
            width: 460,
            render: h => {
              return h(
                "div",
                {
                  style: {
                    padding: "34px 64px",
                    textAlign: "center"
                  }
                },
                [
                  h("img", {
                    style: {
                      width: "292px",
                      height: "159px",
                      verticalAlign: "middle"
                    },
                    attrs: {
                      src: require("../../assets/demand/icon_demand_cancel.png")
                    }
                  }),
                  h(
                    "div",
                    {
                      style: {
                        marginTop: "30px",
                        fontSize: "20px",
                        color: "#FDB24A"
                      }
                    },"无此运单号"
                  ),
                  h(
                    "div",
                    {
                      style: {
                        marginTop: "17px",
                        fontSize: "14px",
                        color: "#ADADAD"
                      }
                    },"请确认此运单号准确无误。"
                  )
                ]
              );
            },
            okText: "返回",
            cancelText: ""
          });
        });
      this.dialogDataList =[]
      this.isUseBox=false
      this.Total=this.dialogDataList.length
      this.page=1
    },
    handleCarbonDataFromRemote() {
      if (this.vectorLayer !== null) {
        this.vectorLayer.clear();
      }
      if (this.polyline !== null) {
        this.polyline.remove();
      }
      this.carbonValue = parseFloat(this.carbonResData.carbonValue).toFixed(2);
      var markerLayer = SFMap.vectorLayer({ map: this.map }),
        destZone = null,
        srcZone = null;
      this.vectorLayer = markerLayer;
      if (this.carbonResData.destZone.indexOf("NULL") < 0) {
        destZone = this.carbonResData.destZone.split(",");
        var myIcon = SFMap.circleIcon({ className: "end" });
        let endmarker = SFMap.marker([destZone[1], destZone[0]], {
          iconIndex: "end"
        });
        markerLayer.addLayer(endmarker);
      }
      if (this.carbonResData.srcZone.indexOf("NULL") < 0) {
        srcZone = this.carbonResData.srcZone.split(",");
        let marker = SFMap.marker([srcZone[1], srcZone[0]], {
          iconIndex: "start"
        });
        markerLayer.addLayer(marker);
      }

      if (
        this.carbonResData.destZone.indexOf("NULL") < 0 &&
        this.carbonResData.srcZone.indexOf("NULL") < 0
      ) {
        var latlngs = [[srcZone[1], srcZone[0]], [destZone[1], destZone[0]]];
        this.polyline = SFMap.polyline(latlngs, {
          map: this.map,
          color: '#62b500',
          showSymbol: true
        })
        this.map.panTo([srcZone[1], srcZone[0]], 10);
      }
    },
    jump() {
      //返回按钮事件
      this.$router.push("./Download");
    },
    //上传失败
    uploadError() {
      this.isShowBatchQuery = false;
      this.fileName = '';
      this.file = null;
      this.$Modal.error({
        width: 520,
        render: h => {
          return h(
            "div",
            {
              style: {
                padding: "34px 84px",
                textAlign: "center"
              }
            },
            [
              h("img", {
                style: {
                  width: "292px",
                  height: "159px",
                  verticalAlign: "middle"
                },
                attrs: {
                  src: require("../../assets/logistics/modal_error.png")
                }
              }),
              h(
                "div",
                {
                  style: {
                    marginTop: "30px",
                    fontSize: "20px",
                    color: "#E8382F"
                  }
                },
                "上传失败"
              ),
              h(
                "div",
                {
                  style: {
                    marginTop: "17px",
                    fontSize: "14px",
                    color: "#ADADAD"
                  }
                },
                "可返回批量查询页面，重新上传。"
              )
            ]
          );
        },
        okText: "返回",
        cancelText: ""
      });
    },
    //上传成功
    uploadSuccess(res, file) {
      this.isShowBatchQuery = false;
      this.fileName = '';
      this.file = null;
      if (res.status === "ERROR") {
        return this.$Modal.error({
          width:460,
          render: h => {
            return h(
              "div",
              {
                style: {
                  padding: "18px 52px",
                  textAlign: "center"
                }
              },
              [
                h("img", {
                  style: {
                    width: "292px",
                    height: "159px",
                    verticalAlign: "middle"
                  },
                  attrs: {
                    src: require("../../assets/logistics/modal_error.png")
                  }
                }),
                h(
                  "div",
                  {
                    style: {
                      marginTop: "30px",
                      fontSize: "19px",
                      color: "#E8382F"
                    }
                  },
                  res.message + "，请重新导入！"
                )
              ]
            );
          }
        });
      } else {
        this.$Modal.success({
          width: 460,
          render: h => {
            return h(
              "div",
              {
                style: {
                  padding: "18px 52px",
                  textAlign: "center"
                }
              },
              [
                h("img", {
                  style: {
                    width: "292px",
                    height: "159px",
                    verticalAlign: "middle"
                  },
                  attrs: {
                    src: require("../../assets/logistics/modal_success.png")
                  }
                }),
                h(
                  "div",
                  {
                    style: {
                      marginTop: "30px",
                      fontSize: "20px",
                      color: "#2BC7C6"
                    }
                  },
                  "上传成功"
                ),
                h(
                  "div",
                  {
                    style: {
                      marginTop: "14px",
                      fontSize: "14px",
                      color: "#ADADAD",
                      lineHeight: "24px"
                    }
                  },
                  [
                    h("span", "请到"),
                    h(
                      "a",
                      {
                        style: {
                          color: "#2BC7C6",
                          borderBottom: "1px solid #2BC7C6",
                          fontWeight: "bold"
                        },
                        on: {
                          click: val => {
                            this.$router.push({ name: "Download" });
                            this.$Modal.remove();
                          }
                        }
                      },
                      "结果下载"
                    ),
                    h("span", "，随时了解查询进度哦^_^")
                  ]
                )
              ]
            );
          },
          onOk:()=>{
            this.getNumsUndownData()
          }
        });
      }
    },
    //文件格式错误弹窗
    handleFormatError() {
      this.isShowBatchQuery = false;
      this.fileName = '';
      this.file = null;
      this.$Modal.error({
        width: 460,
        render: h => {
          return h(
            "div",
            {
              style: {
                padding: "18px 52px",
                textAlign: "center"
              }
            },
            [
              h("img", {
                style: {
                  width: "292px",
                  height: "159px",
                  verticalAlign: "middle"
                },
                attrs: {
                  src: require("../../assets/logistics/modal_error.png")
                }
              }),
              h(
                "div",
                {
                  style: {
                    marginTop: "30px",
                    fontSize: "20px",
                    color: "#E8382F"
                  }
                },
                "上传失败"
              ),
              h(
                "div",
                {
                  style: {
                    marginTop: "17px",
                    fontSize: "14px",
                    color: "#ADADAD"
                  }
                },
                "文件格式错误，请返回批量上传页面，重新上传。"
              )
            ]
          );
        },
        okText: "返回",
        cancelText: ""
      });
    },
    //超出文件大小弹窗
    handleMaxSize() {
      this.isShowBatchQuery = false;
      this.fileName = '';
      this.file = null;
      this.$Modal.error({
        width: 460,
        render: h => {
          return h(
            "div",
            {
              style: {
                padding: "18px 52px",
                textAlign: "center"
              }
            },
            [
              h("img", {
                style: {
                  width: "292px",
                  height: "159px",
                  verticalAlign: "middle"
                },
                attrs: {
                  src: require("../../assets/logistics/modal_error.png")
                }
              }),
              h(
                "div",
                {
                  style: {
                    marginTop: "30px",
                    fontSize: "20px",
                    color: "#E8382F"
                  }
                },
                "上传失败"
              ),
              h(
                "div",
                {
                  style: {
                    marginTop: "17px",
                    fontSize: "14px",
                    color: "#ADADAD"
                  }
                },
                "超出文件大小，请返回批量上传页面，重新上传。"
              )
            ]
          );
        },
        okText: "返回",
        cancelText: ""
      });
    },
    hanlePageChange(page) {
      this.page = page;
    },
    onPageSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    getNumsUndownData(){
      getNumsUndown().then(res=>{
        this.calculating=res.data.calculating
        this.undown=res.data.undown
        this.timer=setInterval(() =>{
          if(this.calculating !== 0){
            clearInterval(this.timer)   
            //console.log(this.calculating,this.undown);
          }
        },1000)
         
      })
    }
  },
  created() {
    this.getNumsUndownData();
  },
  destroyed(){
    clearInterval(this.timer)
    this.timer=null
  },
  mounted() {
    this.getCategory();
    this.map = SFMap.map("map", {
      center: [37.8447, 103.4616],
      zoom: 4
    })
  }
}
</script>
<style lang="less">
.waybill-cont {
  height: 610px;
  background: url("../../assets/bg.png") no-repeat 0 -249px;
  button,
  input {
    outline: none;
  }
  .ivu-btn:focus {
    box-shadow: none;
  }
  .download-btn {
    position: relative;
    a {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .right-btn > .commbtn {
    width: 86px;
    height: 26px;
    padding: 0;
    border-color: #2bc7c6;
    background-color: #fff;
    color: #2bc7c6;
  }
  .right-btn > .commbtn:hover {
    background: linear-gradient(
      45deg,
      rgba(55, 186, 208, 1) 0%,
      rgba(0, 232, 171, 1) 99%
    );
    box-shadow: 0px 4px 10px 0px rgba(43, 199, 198, 0.4);
    border: none;
    color: #fff;
  }
  .right-btn > .uploadbtn > i:before {
    content: "";
  }
  .right-btn > .uploadbtn > span {
    margin-left: 0;
  }
  .right-btn .ivu-badge{
    top:-8px;
    left: -14px;
  }
  .right-btn .ivu-badge .ivu-badge-dot{
    width: 6px;
    height: 6px;
    box-shadow: none;
  }
  ::-webkit-input-placeholder {
    color: #000;
    opacity: 0.45;
  }
  .ivu-checkbox-wrapper .ivu-checkbox {
    outline: none;
  }
  .right-btn .ivu-tooltip .ivu-tooltip-rel{
    top:-20px;
  }
  .right-btn .ivu-tooltip .ivu-tooltip-content .ivu-tooltip-inner{
    max-width: 320px;
  }
}
.packmaterials_modal {
  .ivu-btn:focus {
    box-shadow: none;
  }
  .ivu-modal {
    .ivu-input-small {
      text-align: center;
    }
    .ivu-modal-footer {
      padding-top: 42px;
      padding-bottom: 98px;
      text-align: center;
    }
    .ivu-modal-footer > .ivu-btn {
      width: 104px;
      height: 32px;
      padding: 0;
      border: 1px solid #2bc7c6;
      color: #2bc7c6;
    }
    .ivu-modal-footer > .ivu-btn-primary {
      background: linear-gradient(
        45deg,
        rgba(55, 186, 208, 1) 0%,
        rgba(0, 232, 171, 1) 99%
      );
      box-shadow: 0px 4px 10px 0px rgba(43, 199, 198, 0.4);
      border: none;
      color: #fff;
    }
    .matCategory-modal .ivu-row-flex:nth-of-type(odd) {
      background-color: #ebfcff;
    }
    .matCategory-modal .ivu-row-flex:nth-of-type(even) {
      background-color: #fff;
    }
    .matCategory-modal .ivu-form-item {
      margin-bottom: 0;
    }
    .matCategory-modal .ivu-form .ivu-btn-small:focus {
      box-shadow: none;
    }
    .matCategory-modal .ivu-form-item-content {
      line-height: 42px;
    }
  }
}

.batchinquiry-modal .ivu-upload {
  margin-top: 16px;
  text-align: center;
  input,
  button {
    outline: none;
  }
  .ivu-btn:focus {
    box-shadow: none;
  }
  .ivu-input:focus {
    box-shadow: none;
  }
  .ivu-modal-close > .ivu-icon::before {
    color: #2bc7c6;
  }
}
.batchinquiry-modal {
  .ivu-modal-footer {
    padding-top: 48px;
    padding-bottom: 140px;
    text-align: center;
    .ivu-btn {
      width: 104px;
      height: 32px;
      padding: 0;
    }
    .ivu-btn-text {
      border: 1px solid rgba(43, 199, 198, 1);
      color: #2bc7c6;
    }
    .ivu-btn-primary {
      background: linear-gradient(
        45deg,
        rgba(55, 186, 208, 1) 0%,
        rgba(0, 232, 171, 1) 99%
      );
      box-shadow: 0px 4px 10px 0px rgba(43, 199, 198, 0.4);
      border: none;
    }
  }
}
.ivu-modal-confirm-footer {
  margin-bottom: 28px;
  margin-top: 15px;
  text-align: center;
  .ivu-btn {
    width: 104px;
    height: 32px;
    padding: 0;
    background: linear-gradient(
      45deg,
      rgba(55, 186, 208, 1) 0%,
      rgba(0, 232, 171, 1) 99%
    );
    box-shadow: 0px 4px 10px 0px rgba(43, 199, 198, 0.4);
    font-size: 12px;
  }
  .ivu-btn-primary{
    border: none
  }
}

.ivu-message {
  margin-top: 200px;
}
.ivu-message .ivu-message-error .ivu-icon::before {
  content: "";
}
</style>