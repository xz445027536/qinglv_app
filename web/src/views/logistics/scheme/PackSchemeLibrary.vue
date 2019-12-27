<template>
  <div class="packschemelibrary">
    <div
      :style="{'background-image': `url('${bg}')`}"
      class="column-container"
      style="background-repeat: no-repeat; background-size:100% 100%; min-height: 80vh;"
    >
      <div style="margin-left: 70px;">
        <Menu
          ref="menu"
          class="fixed-menu"
          style="background-color: white; box-shadow: 4px 0 15px 0 rgba(0, 0, 0, 0.1); width: 200px;"
          accordion
          @on-select="handleMenuSelect"
          @on-open-change="handleOpenChange"
          :active-name="menuActiveName"
          :open-names="openNames"
        >
          <div style="height: 15px;"></div>
          <!--<MenuItem class="all-class" @click.native="fetchAllClassData" name="所有分类">-->
          <!--<MenuItem class="all-class" name="all">-->
          <!--<span style="width: 100px; font-size: 14px;" class="menu-item-flex-container">-->
          <!--<span>所有分类</span>-->
          <!--&lt;!&ndash;<img style="vertical-align: middle; margin-left: 10px;" height="20" src="../../assets/scheme/icon_all_class_2x.png" alt="所有分类">&ndash;&gt;-->
          <!--</span>-->
          <!--</MenuItem>-->

          <!--<MenuItem v-for="fatherClass in menuList" :key="fatherClass.catId" :name="fatherClass.catId">-->
          <!--<span class="menu-item-flex-container">-->
          <!--<span>{{fatherClass.catName}}</span>-->
          <!--<img style="vertical-align: middle; margin-left: 10px; margin-right: 16px;" width="26" height="26" :src="fatherClass.catImg" alt="分类图标">-->
          <!--</span>-->
          <!--</MenuItem>-->
          <!--<div style="height: 108px;"></div>-->

          <Submenu
            v-for="fatherClass in menuList"
            :key="fatherClass.catId"
            :name="fatherClass.catId"
          >
            <template slot="title">
              <span style="width: 125px;" class="menu-item-flex-container">
                <!--<span class="menu-item-flex-container">-->
                <span>{{fatherClass.catName}}</span>
                <img
                  style="vertical-align: middle; margin-left: 10px;"
                  width="26"
                  height="26"
                  :src="fatherClass.catImg"
                  alt="分类图标"
                />
              </span>
            </template>

            <!--<MenuItem @click.native="handleMenuItemClick(childClass)" v-for="childClass in fatherClass.childCatas" :key="childClass.catId" :name="childClass.catId">-->
            <MenuItem
              v-for="childClass in fatherClass.childCatas"
              :key="childClass.catId"
              :name="childClass.catId"        
            >
              <span
                style="width: 70px; font-size: 12px;"
                class="menu-item-flex-container"
              >{{childClass.catName}}</span>
            </MenuItem>
          </Submenu>

          <div style="height: 108px;"></div>
        </Menu>
      </div>

      <!--方案库列表容器的 margin 属性-->
      <div style="margin: 2px 70px 46px 246px; width: 100%;">
        <!--<router-view :key="key"/>-->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import bg from "../../../assets/bg_demand.png";
import RowTitle from "../../../components/RowTitle";
import { getClassificationTree } from "../../../api/scheme";
import NavLayout from "../../navlayout/NavLayout";

export default {
  name: "PackSchemeLibrary",
  components: {
    RowTitle,
    NavLayout
  },
  data() {
    return {
      toClassRoute: false,
      bg,
      menuActiveName: "",
      openNames: [],
      currentSelectedClassName: "all",
      currentSelectedClassId: "",
      titleEn: "",
      menuList: [],
      classList: [],
      currentClass: {
        catId: "",
        childCatas: [
          {
            goods: []
          }
        ]
      },
      currentClassId: "",
      currentChildrenId: "",
      currentChildrenIndex: ""
    };
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? `${this.$route.name}${+new Date()}`
        : `${this.$route}${+new Date()}`;
    }
  },
  beforeRouteUpdate(to, from, next) {

    if (to.name === "PackSchemeLibrary") {
      getClassificationTree().then(res => {
        this.menuList = res.data;

        this.currentClass = this.menuList[0];
        this.currentClassId = this.menuList[0].catId;
        this.menuActiveName = this.menuList[0].childCatas[0].catId;
        this.currentChildrenId = this.menuActiveName;
        this.currentChildrenIndex = 0;

        this.$nextTick(() => {
          this.$store.commit("SET_MENU", this.menuList);
          this.$refs.menu.updateActiveName();
          this.$router.push({
            name: "PackClass",
            params: {
              id: this.currentClassId,
              childrenId: "all"
              // childrenIndex: 0
            }
          });
        });

        next();
      });
    } else if (to.name === "PackGood2") {
      const _thit = this;
      getClassificationTree().then(res => {
        this.menuList = res.data;
        this.menuList.forEach(c => {
          if (c.catId === _thit.$route.params.id) {
            _thit.currentClass = c;
            _thit.currentClassId = c.catId;

            _thit.openNames = [c.catId];

            _thit.menuActiveName = _thit.$route.params.secId;
            _thit.currentChildrenId = _thit.menuActiveName;

            _thit.$nextTick(() => {
              _thit.$store.commit("SET_MENU", _thit.menuList);
              _thit.$refs.menu.updateOpened();
              _thit.$refs.menu.updateActiveName();
              // _thit.$router.push({
              //   name: "Good2",
              //   params: {
              //     id: _thit.currentClassId,
              //     goodId: _thit.$route.params.goodId,
              //     secId: _thit.$route.params.secId
              //     // childrenIndex: 0
              //   }
              // });
            });

            next();
          }
        });
      });
    } else {
      if (to.name === "PackClass") {
        this.$nextTick(() => {
          this.menuActiveName = to.params.id;
          this.$refs.menu.updateActiveName();
        });
      }

      next();
    }
  },
  created() {
    this.fetchMenuData();
  },
  mounted() {},
  methods: {
    fetchMenuData() {
      const _thit = this;
      getClassificationTree().then(res => {
        this.menuList = res.data;
        // this.$store.commit('SET_MENU', this.menuList)
        if (this.$route.name === "PackGood") {
          this.currentClass = "";
          this.menuActiveName = this.$route.params.id;
          this.menuList.forEach(c => {
            if (c.catId === _thit.$route.params.id) {
              _thit.currentClass = c;
              _thit.currentClassId = c.catId;

              _thit.openNames = [c.catId];

              _thit.menuActiveName = _thit.$route.params.secId;
              _thit.currentChildrenId = _thit.menuActiveName;

              _thit.$nextTick(() => {
                _thit.$store.commit("SET_MENU", _thit.menuList);
                _thit.$refs.menu.updateOpened();
                _thit.$refs.menu.updateActiveName();
                _thit.$router.push({
                  name: "PackGood",
                  params: {
                    goodId: _thit.$route.params.goodId,
                    name: _thit.$route.params.name
                  }
                });
              });
            }
          });

          // this.$nextTick(() => {
          //   this.$refs.menu.updateActiveName();
          //   this.$router.push({
          //     name: "PackGood",
          //     params: {
          //       goodId: this.$route.params.goodId,
          //       name: this.$route.params.name
          //     }
          //   });
          // });
        } else if (this.$route.name === "PackGood2") {
          // this.currentClass = "";
          this.menuActiveName = this.$route.params.id;
          this.openNames = [this.$route.params.secId];
          this.menuList.forEach(c => {
            if (c.catId === _thit.$route.params.id) {
              _thit.currentClass = c;
              _thit.currentClassId = c.catId;

              _thit.openNames = [c.catId];

              _thit.menuActiveName = _thit.$route.params.secId;
              _thit.currentChildrenId = _thit.menuActiveName;

              _thit.$nextTick(() => {
                _thit.$store.commit("SET_MENU", _thit.menuList);
                _thit.$refs.menu.updateOpened();
                _thit.$refs.menu.updateActiveName();
                _thit.$router.push({
                  name: "PackGood2",
                  params: {
                    goodId: _thit.$route.params.goodId,
                    name: _thit.$route.params.name,
                    secId: _thit.$route.params.secId
                  }
                });
              });
            }
          });
        } else {
          let resItem = null;
          this.menuList.forEach(p => {
            if (p.catId === this.$route.params.id) {
              resItem = p;
            }
          });

          this.currentClass = resItem === null ? this.menuList[0] : resItem;
          this.currentClassId = this.currentClass.catId;
          this.openNames.push(this.currentClassId);
          this.$nextTick(() => {
            this.$store.commit("SET_MENU", this.menuList);
            this.$refs.menu.updateOpened();
            // this.$refs.menu.updateActiveName()
            this.$router.push({
              name: "PackClass",
              params: {
                // id: this.menuActiveName
                id: this.currentClassId,
                childrenId: "all"
                // classInfo: this.currentClass
              }
            });
          });
        }
      });
    },

    handleMenuSelect(name) {
      //console.log("handleMenuSelect: ", name);
      //console.log("currentClass: ", this.currentClass);
      this.currentSelectedClassName = name;
      this.currentChildrenId = name;
      // this.currentChildrenIndex = this.currentClass.childCatas.findIndex(child => child.catId === name)
      // console.log('currentChildrenIndex: ', this.currentChildrenIndex)

      // this.classLevel = true
      // this.currentClass = this.menuList.find(clazz => clazz.catId === name)
      //console.log("currentClass: ", this.currentClass);
      this.$router.push({
        name: "PackClass",
        params: {
          // id: name,
          id: this.currentClassId,
          childrenId: this.currentChildrenId
          // childrenIndex: this.currentChildrenIndex
        }
      });
    },

    handleOpenChange(names) {
      //console.log("handleOpenChange: ", names);
      if (names.length === 1) {
        this.currentClassId = names[0];
        this.currentClass = this.menuList.find(
          item => item.catId === this.currentClassId
        );
        //console.log("handleOpenChange currentClass: ", this.currentClass);

        this.$router.push({
          name: "PackClass",
          params: {
            // id: this.menuActiveName
            id: this.currentClassId,
            childrenId: "all"
            // childrenIndex: 0
            // classInfo: this.currentClass
          }
        });
      }
    }

    // toSchemeDetail(id) {
    //   console.log('toSchemeDetail: ', id)
    //   this.$router.push(
    //     {
    //       name: 'SchemeDetail',
    //       params: { id: id }
    //     }
    //   )
    // }
  }
};
</script>

<style scoped>
.fixed-menu {
  position: fixed;
}

.column-container {
  display: flex;
  flex-direction: row;
}

.menu-item-flex-container {
  width: 176px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
}

>>> .ivu-menu {
  color: rgba(0, 0, 0, 0.65);
}

.ivu-menu >>> .ivu-menu-item {
  font: 12px "Microsoft YaHei";
  color: rgba(0, 0, 0, 0.65);
}

/deep/
  .ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  background: rgb(247, 218, 135);
  width: 4px;
  height: 16px;
  top: 16px;
}

/deep/ li > ul.ivu-menu {
  margin-left: 25px;
}

/deep/
  .ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: white;
  background: url("../../../assets/scheme/bg_scheme_class_item.png") no-repeat;
  background-size: cover;
  z-index: 2;
  box-shadow: 0 8px 16px 0 rgba(43, 199, 198, 0.5);
}
</style>
<style lang="less">
.packschemelibrary .fixed-menu {
  z-index: 1;
  top: 60px;
  padding-top: 40px;
}
.packschemelibrary .ivu-menu-submenu .ivu-menu-submenu-title{
  text-align:right;
}
.packschemelibrary .ivu-menu-submenu .ivu-menu-submenu-title>i:before{
  content: " "
}
li.ivu-menu-submenu ul.ivu-menu li.ivu-menu-item{
  padding-left: 34px;
}
</style>
