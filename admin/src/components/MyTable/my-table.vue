<template>
  <el-table
    style="width: 100%"
    :highlight-current-row="true"
    :data="data"
    :row-style="rowStyle"
    :v-loading.body="isLoading"
    :border="border"
    :max-height="maxHeight">
    <template>
      <slot v-if="expand" name="expand"></slot>
    </template>
    <template v-for="colConfig in colConfigs">
      <slot v-if="colConfig.slot" :name="colConfig.slot">
      </slot>
      <component
        v-else-if="colConfig.component"
        :is="colConfig.component"
        :col-config="colConfig">
      </component>
      <el-table-column v-else v-bind="colConfig" align="center">
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
  export default {
    name: 'my-table',
    props: {
      colConfigs: {
        type: Array,
        required: true
      },
      expand: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        required: true
      },
      stripe: {
        type: Boolean,
        default: true
      },
      rowStyle: {
        type: Function
      },
      border: Boolean,
      isLoading: Boolean,
      maxHeight: [String, Number]
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
