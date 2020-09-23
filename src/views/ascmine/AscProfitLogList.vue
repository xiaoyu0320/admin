<template>
  <div class="AscProfitLogList">
     <div style="margin: 15px 0;">
      <el-input
        placeholder="请输入关键词"
        v-model="userAccunt"
        style="width:300px"
      >
      </el-input>
      <el-button
        type="primary"
        class="search__btn"
        @click="search()"
      >搜索</el-button>
    </div>
    <div class="main">
      <el-table :data="orderList" border stripe style="width: 99.9% !important; " height="600">
        <el-table-column label="#" prop="id" ></el-table-column>
        <el-table-column label="矿机名称" prop="log" ></el-table-column>
        <el-table-column label="价格(￥)" prop="asc" ></el-table-column>
        <el-table-column label="手续费" prop="handling_fee" ></el-table-column>
        <el-table-column label="手机号" prop="mobile" ></el-table-column>
        <el-table-column label="类型" prop="type_name" ></el-table-column>
        <el-table-column label="创建时间" prop="create_time" ></el-table-column>
      </el-table>
      <el-pagination
        style="text-align: right;padding:20px 0;"
        class="page"
        background
        layout="total, prev, pager, next"
        :total="total"
        :page-size="15"
        :current-page="page"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { profitLogList } from 'api'
export default {
  data () {
    return {
      page: 1,
      orderList: [],
      total: null,
      userAccunt: ''
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this._profitLogList()
    },
    _profitLogList () {
      let obj = {}
      obj.page = this.page
      if (this.userAccunt) {
        obj.keywords = this.userAccunt
      }
      profitLogList(obj).then(res => {
        if (res.code == 200) {
          console.log(res)
          this.orderList = res.data.list
          this.total = res.data.count
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    search () {
      this.orderList = []
      this._profitLogList()
    }
  },
  created () {
    this._profitLogList()
  }
}
</script>
<style scoped>
.AscProfitLogList .goodsImg {
  width: 60px;
  height: 60px;
}
</style>
