<template>
  <div class="page-content">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="材料配置" name="material">
        <app-material-tab :materialObject="materialObject"></app-material-tab>
      </el-tab-pane>

      <el-tab-pane label="方案配置" name="scheme">
        <app-scheme-tab :schemeObject="schemeObject"></app-scheme-tab>
      </el-tab-pane>

      <el-tab-pane label="分类配置" name="classification">
        <app-classification-tab :classificationObject="classificationObject"></app-classification-tab>
      </el-tab-pane>

      <el-tab-pane label="搜索配置" name="search">
        <app-search-tab :searchObject="searchObject"></app-search-tab>
      </el-tab-pane>

      <el-tab-pane label="包装碳排配置表" name="packcarbon">
        <app-packCarbon-tab :packCarbonObject="packCarbonObject"></app-packCarbon-tab>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
  import MyTable from '../../../components/MyTable/my-table'
  import MaterialTab from './material'
  import SchemeTab from './scheme'
  import ClassificationTab from './classification'
  import SearchTab from './search'
  import packCarbonTab from './packCarbon'
  import {
    getClassificationTree,
    getMaterialList,
    getSchemeList,
    getSearchList,
    getPackCarbonList
  } from '../../../api/scheme-and-material'

  export default {
    name: 'scheme-configuration',
    components: {
      'app-table': MyTable,
      'app-material-tab': MaterialTab,
      'app-scheme-tab': SchemeTab,
      'app-classification-tab': ClassificationTab,
      'app-search-tab': SearchTab,
      'app-packCarbon-tab': packCarbonTab
    },
    data() {
      return {
        activeName: 'material',
        materialForm: {
          materialCode: '',
          materialName: ''
        },
        pageSize: 10,

        materialObject: {
          materialData: [],
          totalMaterial: 0
        },
        currentMaterialPage: 1,

        schemeObject: {
          schemeData: [],
          totalScheme: 0
        },
        currentSchemePage: 1,

        classificationObject: {},

        searchObject: {
          searchData: [],
          totalSearch: 0
        },
        packCarbonObject: {
          packCarbonData: [],
          totalPackCarbon: 0
        },
        currentSearchPage: 1
      }
    },
    created() {
      this.fetchMaterialData()
    },
    methods: {
      fetchMaterialData() {
        const params = {
          jumpPage: 1,
          pageSize: this.pageSize
        }
        getMaterialList(params).then(res => {
          this.materialObject = {
            materialData: res.data.recoreds,
            totalMaterial: res.data.total
          }
        }).catch(err => {
          console.log('获取材料配置列表出错: ', err)
        })
      },

      fetchSchemeData() {
        const params = {
          jumpPage: 1,
          pageSize: this.pageSize
        }
        getSchemeList(params).then(res => {
          this.schemeObject = {
            schemeData: res.data.recoreds,
            totalScheme: res.data.total
          }
        }).catch(err => {
          console.log('获取方案配置列表出错: ', err)
        })
      },

      fetchClassificationData() {
        getClassificationTree().then(res => {
          console.log(res)
          this.classificationObject = {
            treeData: res.data
          }
        }).catch(err => {
          console.log('获取分类配置列表出错: ', err)
        })
      },

      fetchSearchData() {
        const params = {
          jumpPage: 1,
          pageSize: this.pageSize
        }
        getSearchList(params).then(res => {
          this.searchObject = {
            searchData: res.data.recoreds,
            totalSearch: res.data.total
          }
        }).catch(err => {
          console.log('获取搜索配置列表出错: ', err)
        })
      },
      fetchPackCarbonData() {
        const params = {
          jumpPage: 1,
          pageSize: this.pageSize
        }
        getPackCarbonList(params).then(res => {
          this.packCarbonObject = {
            packCarbonData: res.data.recoreds,
            totalPackCarbon: res.data.total
          }
        }).catch(err => {
          console.log('获取搜索包装碳排配置列表出错: ', err)
        })
      },

      handleTabClick(tabInstance) {
        switch (tabInstance.name) {
          case 'material' :
            this.fetchMaterialData()
            break
          case 'scheme' :
            this.fetchSchemeData()
            break
          case 'classification' :
            this.fetchClassificationData()
            break
          case 'search' :
            this.fetchSearchData()
            break
          case 'packcarbon' :
            this.fetchPackCarbonData()
            break
        }
      }
    }
  }
</script>

<style scoped>

</style>