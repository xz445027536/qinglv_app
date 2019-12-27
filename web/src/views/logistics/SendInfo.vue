<template>
  <div class="sendinfo">
    <div class="sendinfo-cont" style>
      <div style="width:1300px;height:590px;margin:0 auto;background-color:#fff;font-size:14px;">
        <div
          style="height:70px;padding:20px 66px;background:#fff;box-shadow:0px 4px 15px 0px rgba(0, 0, 0, 0.1);line-height:30px"
        >
          <div style="float:left;width:400px;">
            <span>原寄地：</span>
            <i-form style="display:inline-block;width:142px;height:30px;margin-right:15px;">
              <Form-item label prop="provinceCode">
                <i-select
                  v-model="srcData.provinceCode"
                  placeholder="省"
                  @on-change="srcProHasChange"
                >
                  <i-option
                    v-for="p in provinceArr"
                    :key="p.provinceCode"
                    :value="p.provinceCode"
                  >{{p.provinceName}}</i-option>
                </i-select>
              </Form-item>
            </i-form>
            <i-form style="display:inline-block;width:142px;height:30px;">
              <Form-item label prop="cityCode">
                <i-select
                  v-model="srcData.cityCode"
                  placeholder="市"
                  style="height:100%"
                  @on-change="srcCityHasChange"
                >
                  <i-option
                    v-for="c in cityArr[srcData.provinceCode]"
                    :key="c.cityCode"
                    :value="c.cityCode"
                  >{{c.cityName}}</i-option>
                </i-select>
              </Form-item>
            </i-form>
          </div>
          <div style="float:left;">
            <span>目的地：</span>
            <i-form style="display:inline-block;width:142px;height:30px;margin-right:15px;">
              <Form-item label prop="city">
                <i-select
                  placeholder="省"
                  style="height:100%"
                  v-model="destData.provinceCode"
                  @on-change="destProHasChange"
                >
                  <i-option
                    v-for="p in provinceArr"
                    :key="p.provinceCode"
                    :value="p.provinceCode"
                  >{{p.provinceName}}</i-option>
                </i-select>
              </Form-item>
            </i-form>
            <i-form style="display:inline-block;width:142px;height:30px">
              <Form-item label prop="city">
                <i-select
                  placeholder="市"
                  style="height:100%"
                  v-model="destData.cityCode"
                  @on-change="destCityHasChange"
                >
                  <i-option
                    v-for="c in cityArr[destData.provinceCode]"
                    :key="c.cityCode"
                    :value="c.cityCode"
                  >{{c.cityName}}</i-option>
                </i-select>
              </Form-item>
            </i-form>
          </div>
          <i-button
            @click="searchAction"
            style="width:46px;height:26px;margin-left:15px;padding:0;background:linear-gradient(45deg,rgba(55,186,208,1) 0%,rgba(0,232,171,1) 99%);box-shadow:0px 4px 10px 0px rgba(43,199,198,0.4);color:#fff;outline:none;border:none"
          >计算</i-button>
        </div>
        <div style="height:520px;text-align:center;position:relative;color:#000">
          <div style="float:left;width:416px;height:100%;">
            <img src="../../assets/logistics/co2-ico.png" alt style="width:86px;margin-top:30px;" />
            <div style="font-size:20px;font-weight:bold">碳排放量</div>
            <div style="font-size:14px;opacity:0.45;">CARBON EMISSION</div>
            <div style="width:384px;height:32px;margin:15px auto;line-height:32px;font-size:20px;font-weight:bold">
              <div style="float:left;overflow: hidden;width:160px;height:100%;text-align:right" :title=srcCityName>{{srcCityName}}</div>
              <img src="../../assets/logistics/right_arrow.png" alt style="float:left;padding:0 10px"/>
              <div style="float:left;overflow: hidden;width:160px;height:100%;text-align:left" :title=destCityName>{{destCityName}}</div>
            </div>
            <div style="height:200px">
              <div style="width:300px;height:40px;margin:auto;line-height:40px;font-size:16px;" v-for="(item, index) in resData.tcCityFlows" :key="index">
                <div style="float:left;width:100px;height:100%;text-align:left;overflow: hidden" :title=item.productName>{{item.productName}}</div>
                <div style="float:left;width:125px;height:100%;padding-left:10px;font-size:26px;font-weight:bold;font-family:Impact;text-align:right;overflow: hidden">
                  {{parseFloat(item.carbonEmission).toFixed(2)}}
                </div>
                <div style="float:left;height:100%;padding-left:10px">Kgco2e</div>
              </div>
            </div>
            <div style="width:346px;margin:10px auto 0;text-align:left;line-height:24px;opacity:0.45;">
              <div style="font-weight:bold">备注：</div>
              <div>
                1、此结果为预估值，实际以发生运单号查询结果为准。<br/>
                2、该版本只适用于国内业务查询，国际业务尚不支持。
              </div>
            </div>
          </div>
          <div style="float:left;width:884px;height:100%;" id="map"></div>
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
import { getProvinces, getCitys, searchFlow } from "@/api/track";
export default {
  components: { NavLayout },
  data() {
    return {
      map: null,
      polyline: null,
      vectorLayer: null,
      provinceArr: [],
      cityArr: {},
      srcData: {
        provinceCode: "",
        cityCode: ""
      },
      destData: {
        provinceCode: "",
        cityCode: ""
      },
      destCityName: "--",
      srcCityName: "--",
      resData: {}
    };
  },
  methods: {
    destCityHasChange(val) {
      const _this = this;
      let list = this.cityArr[this.destData.provinceCode];
      if (list) {
        list.forEach(c => {
          if (c.cityCode === val) {
            _this.destCityName = c.cityName;
          }
        });
      }
    },
    destProHasChange(val) {
      if (!this.cityArr.hasOwnProperty(val)) {
        this.queryCityData(val);
      }

      this.destData.cityCode = "";
      this.destCityName = "--";
    },
    srcCityHasChange(val) {
      const _this = this;
      let list = this.cityArr[this.srcData.provinceCode];
      if (list) {
        list.forEach(c => {
          if (c.cityCode === val) {
            _this.srcCityName = c.cityName;
          }
        });
      }
    },
    srcProHasChange(val) {
      if (!this.cityArr.hasOwnProperty(val)) {
        this.queryCityData(val);
      }
      this.srcData.cityCode = "";
      this.srcCityName = "--";
    },
    queryCityData(provinceCode) {
      getCitys(provinceCode)
        .then(res => {
          let data = JSON.parse(JSON.stringify(this.cityArr));
          data[provinceCode] = res.data;
          this.cityArr = data;
        })
        .catch(err => {});
    },
    queryProvinceData() {
      getProvinces()
        .then(res => {
          this.provinceArr = res.data;
        })
        .catch(err => {});
    },
    handelMapData(item) {
      //console.log("handelMapData", item);
      let srcZone = null,
        destZone = null;
      var markerLayer = SFMap.vectorLayer({ map: this.map });
      this.vectorLayer = markerLayer;
      if (item.srcCityLatitude !== "null" && item.srcCityLongitude !== "null") {
        srcZone = [item.srcCityLongitude, item.srcCityLatitude];
        let marker = SFMap.marker([srcZone[1], srcZone[0]], {
          iconIndex: "start"
        });
        markerLayer.addLayer(marker);
      }
      if (
        item.destCityLatitude !== "null" &&
        item.destCityLongitude !== "null"
      ) {
        destZone = [item.destCityLongitude, item.destCityLatitude];

        let endmarker = SFMap.marker([destZone[1], destZone[0]], {
          iconIndex: "end"
        });
        markerLayer.addLayer(endmarker);
      }
      //console.log(srcZone, destZone);
      if (srcZone !== null && destZone !== null) {
        var latlngs = [[srcZone[1], srcZone[0]], [destZone[1], destZone[0]]];
        this.polyline = SFMap.polyline(latlngs, {
          map: this.map,
          color: "#62b500",
          showSymbol: true
        });

        this.map.panTo([srcZone[1], srcZone[0]], 10);
      }
      // flyTo
    },

    searchAction() {
      if (this.vectorLayer !== null) {
        this.vectorLayer.clear();
        this.vectorLayer = null;
      }
      if (this.polyline !== null) {
        this.polyline.remove();
        this.polyline = null;
      }
      searchFlow(this.srcData.cityCode, this.destData.cityCode)
        .then(res => {
          this.resData = res.data;
          if (this.resData.tcCityFlows.length > 0) {
            this.handelMapData(this.resData.tcCityFlows[0]);
          }
        })
        .catch(err => {});
    }
  },
  mounted() {
    this.queryProvinceData();
    this.map = SFMap.map("map", {
      center: [37.8447, 103.4616],
      zoom: 4
    });
  }
};
</script>
<style lang="less">
.sendinfo {
  .sendinfo-cont {
    height: 610px;
    background: url("../../assets/bg.png") no-repeat 0 -249px;
    .ivu-form {
      .ivu-form-item {
        height: 100%;
        margin-bottom: 0;
        .ivu-form-item-content {
          line-height: 30px;
        }
      }
    }
    .ivu-btn:hover {
      border-color: #2bc7c6;
    }
    .ivu-select-single .ivu-select-selection {
      height: 30px;
    }
  }
}
</style>