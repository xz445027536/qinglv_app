<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
      <el-button
        :disabled="(roleCode === '0' && currentUserRole$ !== '0')"
        style="float: right; padding: 3px 0"
        icon="el-icon-circle-plus"
        type="text"
        @click="onAddClick">添加</el-button>
    </div>
    <div v-if="cardData.length === 0">暂无数据</div>
    <div v-else class="grid-container">
        <span class="grid-item" v-for="role in cardData">
          <i class="iconfont icon-user"></i>
          <span class="item-text">{{role.userName}}  {{role.userCode}}
          </span>
          <i @click="onDeleteClick(role.id)" class="grid-icon el-icon-circle-close"></i>
        </span>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'role-card',
    props: {
      title: {
        required: true,
        type: String
      },
      cardData: {
        required: true,
        type: Array
      },
      roleCode: {
        required: true,
        type: String
      }
    },
    data() {
      return {}
    },
    created() {
      console.log('currentUserRole$: ', this.currentUserRole$)
    },
    methods: {
      onAddClick() {
        this.$emit('add', { title: this.title, roleCode: this.roleCode })
      },

      onDeleteClick(id) {
        this.$emit('delete', id)
      }
    }
  }
</script>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    grid-column-gap: 10px;
    grid-row-gap: 15px;
  }

  .grid-item:hover {
    color: #66b1ff;
  }

  .grid-item:hover .grid-icon {
    visibility: visible;
  }

  .grid-icon {
    visibility: hidden;
  }

  .grid-icon:hover {
    color: #f56c6c;
  }
</style>