<template>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="250">
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120">
      </el-table-column>
    </el-table>
  </template>
<script>
export default {
  props: {
    parentObj: {},
    // parentMessage: {
    //   type: String,
    //   default: '默认显示的信息'
    //   // require: true // 必填
    // },
    imgurl: {
      type: String,
      default: 'https://www.ghi888.com/wp-content/uploads/2021/05/%E6%B3%B0%E5%9B%BD%E8%B5%8C%E5%8D%9A-1200x889.jpg'
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    clickItem (data) {
      console.log('child click', data)
      this.$emit('clickItemEvent', data)
    }
  }
}
</script>
