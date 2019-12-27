<template>
  <div class="download">
    <div class="download-cont">
      <div style="width:1300px;height:849px;margin:0 auto;background-color:#fff;box-shadow:0px 4px 15px 0px rgba(0, 0, 0, 0.1);text-align:center">
        <div style="position: relative;padding:110px 76px 57px 64px;">
          <div style="line-height:20px;text-align:left">
            <span style="margin-right:12px;font-size:20px;">
              <i style="font-style:normal">结果</i>下载
            </span>
            <span style="font-size:18px;font-family:STXihei;color:rgba(68,68,68,1);opacity:0.2;">Result Download</span>
          </div>
          <div style="width:42px;height:4px;margin-top:10px;margin-bottom:15px;background:linear-gradient(90deg,rgba(55,186,208,1),rgba(0,232,171,1));"></div>
          <img src="../../assets/icon_rectangle.png" alt style="position: absolute;top:97px;left:55px;width:12px;height:12px;"/>
          <i-table stripe width="100%" height="464"
            :row-class-name="rowClassName"
            :columns="columns"
            :data="dataList"
            align="center">
          </i-table>
          <Page :current.sync="page" :total="total" show-total show-elevator @on-change="hanlePageChange" @on-page-size-change="onPageSizeChange" style="margin-top:20px"></Page> 
        </div> 
        <i-button style="width:104px;height:32px;border:1px solid #2BC7C6;border-radius:2px;outline:none;color:#2BC7C6;background-color:#fff;margin-bottom:80px" @click="back">返回</i-button>
      </div>
    </div>
  </div>
</template>
<script>
import NavLayout from "../navlayout/NavLayout";
import { queryFileList, deleteDown, updateNumById } from "@/api/track";
export default {
  name: "Download",
  components: { NavLayout },
  data() {
    return {
      columns: [
        {
          title: "序号",
          align: "center",
          width:100,
          render: (h, params) => {
            return h("span", [(this.page-1)*10+ params.index+1]);
          }
        },
        {
          title: "文件名",
          key: "fileName",
          align: "center",
          width:300
        },
        {
          title: "提交时间",
          key: "createTime",
          align: "center",
          width:200
        },
        {
          title: "下载期限",
          key: "expiresTime",
          align: "center",
          width:200
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          width:150,
          render: (h, params) => {
            let item = this.getFileStatue(params.row);
            return h("span", [item.text]);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            let item = this.getFileStatue(params.row);
            let divs = [];
            if (item.status === 1 && params.row.url !== null && params.row.url !== "") {
              divs.push(
                h("a",{
                    attrs: {
                      href: process.env.VUE_APP_BASE_FILEDOWNLOAD_URL + params.row.url,
                      download: "",
                      target: "__blank"
                    },
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      color: "#2BC7C6",
                      backgroundColor: "transparent",
                      border: "none",
                      marginRight: "15px"
                    },
                    on:{
                      click:()=>{
                        this.getUpdateNumById(params.row)                       
                      }
                    }
                  },"下载"
                ),
                h("i-button",{
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    color: "#2BC7C6",
                    backgroundColor: "transparent",
                    border: "none"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row);
                      this.modalShow=true;
                    }
                  }
                },"删除"
              ))
            }else {
              divs.push(
                h("a",{
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    color: "#adadad",
                    backgroundColor: "transparent",
                    border: "none",
                    marginRight: "15px"
                  }
                },"下载"),
                h("i-button",{
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    color: "#adadad",
                    backgroundColor: "transparent",
                    border: "none"
                  }
                },"删除"
              ))
            }
            return h("div", divs);
          }
        }
      ],
      dataList: [],
      total:0,
      pageSize:10,
      page: 1,
      modalShow:false,
      downNum:0
    }
  },
  methods: {
    onPageSizeChange(pageSize){
      this.pageSize = pageSize;
      this.getDownloadDataList()
    },
    hanlePageChange(page) {
      this.page = page;
      this.getDownloadDataList()
    },
    getFileStatue(row) {
      let expiresTime = row.expiresTime;
      expiresTime = expiresTime.replace("-", "/");
      expiresTime = expiresTime.replace("-", "/");
      expiresTime = new Date(expiresTime).getTime();
      let today = new Date().getTime();
      let res = {};
      let text = "";
      if (today > expiresTime) {
        res.text = "已失效";
        res.status = -1;
      } else if (row.status === 0) {
        res.text = "计算中";
        res.status = 0;
      } else if (row.status === 1) {
        res.text = "可操作";
        res.status = 1;
      } else {
        res.text = "未知";
        res.status = -1;
      }
      return res;
    },
    getDownloadDataList() {
      queryFileList({
        jumpPage: this.page,
        pageSize: this.pageSize
      }).then(res => {
        this.total = res.data.total
        this.dataList = res.data.records;
      }).catch(err => {
        this.$Message.error("结果下载列表获取失败！")
      });
    },
    rowClassName(row, index) {
      if (index % 2 == 0) {
        return "ivu-table-stripe-even";
      } else return "ivu-table-stripe-odd";
    },
    back() {
      this.$router.push("./Waybill");
    },
    remove(row) {
      this.$Message.warning({
        duration:0,
        closable:false,
        render: h => {
          return h("div",
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
                  src: require("../../assets/scheme/bg_delete_alert_2x.png")
                }
              }),
              h("div",
                {
                  style: {
                    marginTop: "30px",
                    marginBottom: "30px",
                    fontSize: "20px",
                    color: "#adadad"
                  }
                },"是否删除当前行数据？"
              ),
              h("i-button",
                {
                  style:{
                    width:'104px',
                    height:'32px',
                    padding:0,
                    borderColor:'#2BC7C6',
                    color:'#2BC7C6'
                  },
                  on:{
                    click:()=>{
                      this.$Message.destroy()
                    }
                  }
                },'取消'
              ),
              h("i-button",
                {
                  style:{
                    width:'104px',
                    height:'32px',
                    marginLeft:'20px',
                    padding:0,
                    background:'linear-gradient(45deg,rgba(55,186,208,1) 0%,rgba(0,232,171,1) 99%)',
                    boxShadow:'0px 4px 10px 0px rgba(43,199,198,0.4)',
                    color:'#fff',
                    border:'none'
                  },
                  on:{
                    click:()=>{
                      deleteDown(row.id).then(()=>{
                        this.getDownloadDataList()
                        this.$Message.destroy()
                      })
                    }
                  }
                },'确定'
              )
            ]
          )
        }
      })
    },
    getUpdateNumById(row){
      updateNumById(row.id).then(res =>{
        console.log(res);
      })
    }
  },
  mounted() {
    this.getDownloadDataList();
  }
}
</script>
<style lang="less">
.download-cont {
  height: 880px;
  background: url("../../assets/bg.png") no-repeat 0 -249px;
  .ivu-table-wrapper {
    th,td {
      border-right: none;
    }
  }
  .ivu-table-stripe-even td {
    background-color: #ebfcff !important;
  }
  .ivu-table-stripe-odd td {
    background-color: #fff !important;
  }
  .ivu-btn-primary:focus {
    box-shadow: none;
  }
}
.ivu-message{
  position: fixed;
  z-index: 1000;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 100px;
  text-align: center;
  pointer-events:painted;
}
.ivu-message .ivu-message-warning .ivu-icon::before{
  content: ""
}
.ivu-message .ivu-message-notice-content-text .ivu-btn:nth-child(2):hover{
  border:none;
}
</style>