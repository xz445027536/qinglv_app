<template>
  <div>
    <div class="pack-cont">
      <div class="pack" style="width:1300px;height:558px;margin:0 auto;background-color:#fff;color:#000;text-align:center">
        <div style="padding-top:103px">
          <p style="font-size:36px">
            <span style="font-weight:bold">包装</span>碳表盘
          </p>
          <p style="letter-spacing:11px;font-size:14px;opacity:0.45;">PACKING CALCULATE</p>
        </div>
        <div style="line-height:30px;margin-top:86px;">
          <span style="font-size:14px">托寄物名称：</span>
          <i-input v-model.trim="itemName" placeholder="您可以输入托寄物名称" style="width: 386px;height:30px"></i-input>
          <i-button @click="searchByName" style="margin-left:8px;background:linear-gradient(45deg,rgba(55,186,208,1) 0%,rgba(0,232,171,1) 99%);box-shadow:0px 4px 10px 0px rgba(43,199,198,0.4);border:none" type="success">查询</i-button>
        </div>
        <div class="text" style="display:flex;justify-content:center;align-items:center;margin:40px;font-size:20px;">或</div>
        <div style="position:relative;z-index:1;line-height:30px">
          <span style="font-size:14px">托寄物品类：</span>
          <i-select v-model="itemType" style="width:386px;height:30px" placeholder="您可以选择品类">
            <i-option v-for="item in menuList" :key="item.catId" :value="item.catId">{{ item.catName }}</i-option>
          </i-select>
          <i-button @click="searchByCat" style="margin-left:8px;background:linear-gradient(45deg,rgba(55,186,208,1) 0%,rgba(0,232,171,1) 99%);box-shadow:0px 4px 10px 0px rgba(43,199,198,0.4);border:none" type="success">查询</i-button>
        </div>
        <div style="margin-top:50px;opacity:0.45;line-height:24px;font-size:14px;">
          <span style="font-weight:bold;">备注：</span>包装碳表盘，对接现有智慧包装方案库，可通过托寄物的名称或托寄物的品类进行查询，查询结果仅供参考。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavLayout from "../navlayout/NavLayout";
import { getClassificationTree, getSchemeByName } from "@/api/scheme";
export default {
  components: { NavLayout },
  data() {
    return {
      itemName: "",
      //itemName:this.$route.query.searchWord,
      itemType: "",
      menuList: null
    };
  },
  methods: {
    searchByName() {
      if (this.itemName.length === 0) {
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
                  "托寄物名称不能为空！"
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
                  "请输入正确的托寄物名称！"
                )
              ]
            );
          },
          okText: "返回",
          cancelText: ""
        });
        return;
      }
      getSchemeByName(this.itemName, 1, 999)
      .then(res => {
        if (res.data[0].length === 0) {
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
                      src: require("../../assets/scheme/bg_delete_alert_2x.png")
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
                    "暂无此托寄物"
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
                    "现在方案库里暂无此托寄物，敬请期待。"
                  )
                ]
              );
            },
            okText: "返回",
            ancelText: ""
          });
          return;
        } else {
          let data = res.data[0];
          if (res.data.length === 1 ) {
            this.$router.push({
              name: 'PackSchemeDetail',
              params: { id: data.goodsId }
            });
          } else {
          this.$router.push({
            name: "PackGood2",
            params: {
              id: data.firstCat,
              goodId: data.goodsId,
              name: data.goodsName,
              secId: data.secCat
            }
          })
          //this.$router.push('/search/list?searchWord=' + this.itemName)
        }
      }})
      .catch(err => {
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
                    src: require("../../assets/scheme/bg_delete_alert_2x.png")
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
                  "暂无此托寄物"
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
                  "现在方案库里暂无此托寄物，敬请期待。"
                )
              ]
            );
          },
          okText: "返回",
          cancelText: ""
        })
        return
      });
    },
    searchByCat() {
      if (this.itemType === "") {
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
                    src: require("../../assets/scheme/bg_delete_alert_2x.png")
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
                  "托寄物品类为空"
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
                  "请选择托寄物品类。"
                )
              ]
            );
          },
          okText: "返回",
          cancelText: ""
        });
        return;
      }
      // let path = "/scheme/schemeLibrary/class/" + this.itemType + "/all";
      // this.$router.push(path);
      this.$router.push({
        name: "PackClass",
        params: {
          id: this.itemType,
          childrenId: "all"
        }
      });
      console.log("this.itemType", this.itemType);
    }
  },
  mounted() {
    getClassificationTree().then(res => {
      this.menuList = res.data;
      //console.log(res.data);
    });
  }
};
</script>
<style lang="less" scoped>
.pack-cont {
  height: 580px;
  background: url("../../assets/bg.png") no-repeat 0 -249px;
}
.pack {
  input.ivu-input:hover {
    border-color: #000 !important;
  }
  .text::before,
  .text::after {
    content: "";
    width: 49%;
    height: 1px;
    background-color: #000;
    opacity: 0.05;
  }
  .text::before {
    margin-right: 1%;
  }
  .text::after {
    margin-left: 1%;
  }
  .ivu-select {
    text-align: left;
    // opacity:0.45;
    color: #000;
  }
  .ivu-select-item-selected,
  .ivu-select-item-selected:hover {
    color: #000;
  }
}
</style>
<style lang="less">
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
    line-height: 32px;
    font-size: 12px;
  }
}
</style>