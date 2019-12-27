<template>
  <div>
    <div>
      <el-button :disabled="editMode || addMode" size="small" type="primary" @click="addSearchConfig">新增</el-button>
      <!--<span class="el-upload__tip" v-if="tableData.length >= 5">搜索配置项数量达到 5 后无法新增</span>-->
    </div>

    <app-table
      :data="tableData"
      :colConfigs="searchColConfigs">
      <el-table-column
        type="index"
        slot="index"
        width="80"
        label="序号"
        sortable
        align="center">
      </el-table-column>

      <el-table-column slot="searchTxt" label="搜索词" align="center">
        <template slot-scope="{ row }">
          <div v-if="!row.editMode">
            {{row.searchTxt}}
          </div>
          <div v-else>
            <el-input size="medium" v-model="row.searchTxt" @change="handleSearchTextChange" placeholder="请输入搜索词"></el-input>
          </div>
          <!--<div>{{row}}</div>-->
        </template>
      </el-table-column>

      <el-table-column slot="solutionName" label="链接方案" align="center">
        <template slot-scope="{ row }">
          <div v-if="!row.editMode">
            {{row.solutionName}}
          </div>
          <div v-else>
            <el-select
              :loading="isLoading"
              @change="handleSchemeSelectChange($event, row)"
              style="width: 100%;"
              filterable
              value-key="solutionId"
              size="medium"
              v-model="row.solutionName"
              placeholder="请选择链接方案">
              <el-option
                v-for="item in schemeOptions"
                :value="item"
                :key="item.solutionId"
                :label="item.solutionName">
              </el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" slot="action" label="操作" align="center" min-width="150">
        <template slot-scope="{ row }">
          <div v-if="!row.editMode" class="link">
            <el-button type="text" size="medium" :disabled="editMode || addMode" @click="editSearchConfig(row)">编辑</el-button>
            <el-button type="text" size="medium" :disabled="editMode || addMode" @click="deleteSearchConfig(row.id)">删除</el-button>
          </div>
          <div v-else>
            <el-button size="medium" type="primary" @click="editConfirmClick(row)">确 定</el-button>
            <el-button size="medium" @click="editCancelClick(row)">取 消</el-button>
          </div>
        </template>
      </el-table-column>
    </app-table>

    <div>
      <el-pagination
        class="pagination-style"
        @current-change="handleSearchChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--<div>editMode: {{editMode}}</div>-->
    <!--<div>addMode: {{addMode}}</div>-->
    <!--<div>currentRowInstance: {{currentRowInstance}}</div>-->
  </div>
</template>

<script>
  import MyTable from '../../../components/MyTable/my-table'
  import {
    deleteSearch,
    getSchemeListBySearchTerms,
    getSearchList, saveSearch,
    updateSearch
  } from '../../../api/scheme-and-material'

  export default {
    name: 'search',
    components: {
      'app-table': MyTable
    },
    props: {
      searchObject: {
        type: Object,
        required: true
      }
    },
    computed: {
      tableData: {
        get() {
          return this.searchObject.searchData
        },
        set(newData) {
          this.searchObject.searchData = newData
        }
      },
      total: {
        get() {
          return this.searchObject.totalSearch
        },
        set(newValue) {
          this.searchObject.totalSearch = newValue
        }
      }
    },
    data() {
      return {
        isLoading: false,
        editMode: false,
        addMode: false,
        currentPage: 1,
        pageSize: 10,
        currentRowInstance: {},
        schemeOptions: [],
        searchColConfigs: [
          {
            slot: 'index'
          },
          {
            slot: 'searchTxt'
          },
          {
            slot: 'solutionName'
          },
          {
            slot: 'action'
          }
        ]
      }
    },
    created() {
      this.fetchSearchData(1)
      this.getAllScheme()
    },
    methods: {
      fetchSearchData(currentPage) {
        const params = {
          jumpPage: currentPage,
          pageSize: this.pageSize
        }
        getSearchList(params).then(res => {
          this.tableData = res.data.recoreds
          this.total = res.data.total
        }).catch(err => {
          console.log('获取搜索配置列表出错: ', err)
        })
      },

      getAllScheme() {
        getSchemeListBySearchTerms('').then(res => {
          this.schemeOptions = res.data
          // if (this.schemeOptions.length === 0) {
          //   row.solutionName = ''
          // }
        }).catch(err => {
          console.log('根据搜索词获取方案列表出错: ', err)
        })
      },

      handleSearchChange(currentPage) {
        this.fetchSearchData(currentPage)
      },

      addSearchConfig() {
        this.addMode = true
        this.currentRowInstance = {
          searchTxt: null,
          solutionName: '',
          editMode: true
        }
        this.tableData.unshift(this.currentRowInstance)
        // this.$nextTick(() => {
        //   console.log('searchColumn: ', this.$refs['searchColumn'])
        //   console.log('table: ', this.$refs['table'])
        // })
      },

      handleSearchTextChange(val) {
        console.log('val: ', val)
      },

      onFocus(row) {
        this.isLoading = true
        getSchemeListBySearchTerms(row.searchTxt).then(res => {
          this.isLoading = false
          this.schemeOptions = res.data
          if (this.schemeOptions.length === 0) {
            row.solutionName = ''
          }
        }).catch(err => {
          console.log('根据搜索词获取方案列表出错: ', err)
        })
      },

      handleSchemeSelectChange(item, rowInstance) {
        rowInstance.solutionId = item.solutionId
        rowInstance.solutionName = item.solutionName
      },

      editSearchConfig(rowInstance) {
        Object.assign(this.currentRowInstance, rowInstance)
        rowInstance.editMode = true
        this.editMode = true

        // this.$nextTick(() => {
        //   console.log(this.$refs['searchTxtInput'].$refs.input)
        //   this.$refs['searchTxtInput'].$refs.input.focus()
        // })
      },

      editCancelClick(rowInstance) {
        if (this.addMode) {
          console.log('从新增模式离开')
          this.tableData.shift()
          this.addMode = false
        } else if (this.editMode) {
          console.log('从编辑模式离开')
          this.fetchSearchData(this.currentPage)
          // Object.assign(rowInstance, this.currentRowInstance)
          // rowInstance.editMode = false
          this.editMode = false
        }
        this.currentRowInstance = {}
        this.isLoading = false
      },

      editConfirmClick(rowInstance) {
        if (this.addMode) {
          // 调用新增接口
          saveSearch(rowInstance).then(res => {
            this.$message.success(res.message)
            this.fetchSearchData(this.currentPage)
          }).catch(err => {
            this.fetchSearchData(this.currentPage)
            console.log('新增搜索出错: ', err)
          })
          this.currentRowInstance.editMode = false
          this.addMode = false
        } else if (this.editMode) {
          // 调用编辑接口
          updateSearch(rowInstance).then(res => {
            this.$message.success(res.message)
            this.fetchSearchData(this.currentPage)
            // rowInstance.editMode = false
            this.editMode = false
          }).catch(err => {
            this.fetchSearchData(this.currentPage)
            this.editMode = false
            // rowInstance.editMode = true
            console.log('更新搜索出错: ', err)
          })
        }
        this.currentRowInstance = {}
      },

      deleteSearchConfig(id) {
        this.$confirm('确认要删除该搜索配置吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteSearch(id).then(res => {
            this.$message.success(res.message)
            this.fetchSearchData(this.currentPage)
          }).catch(err => {
            console.log('删除该搜索配置出错', err)
          }).finally(() => {
            this.editMode = false
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消该操作'
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>