<template>
  <div class="AscMineLogList">
     <div style="margin: 15px 0;">
      <el-input
        placeholder="请输入手机号"
        v-model="userAccunt"
        style="width:200px"
      >
      </el-input>
      <el-select v-model="value" placeholder="选择矿机名称">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="level" placeholder="选择推荐奖励等级">
      <el-option
        v-for="item in levelOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
      <el-button
        type="primary"
        class="search__btn"
        @click="search()"
      >搜索</el-button>
    </div>
    <div style="margin-bottom:15px">
      <span class="count-pd">已挖矿池资产总量：{{info.total_asc}}</span>
      <span class="count-pd">推荐奖励已发放矿池资产总产量：{{info.total_award}}</span>
      <span class="count-pd">支出矿池资产总量：{{info.total_expend}}</span>
    </div>
    <div class="main">
      <el-table :data="orderList" border stripe style="width: 99.9% !important; " height="600">
        <el-table-column label="#" prop="id" ></el-table-column>
        <el-table-column label="矿机名称" prop="log" ></el-table-column>
        <el-table-column label="价格(个)" prop="asc" ></el-table-column>
        <el-table-column label="手机号" prop="mobile" ></el-table-column>
        <el-table-column label="类型" prop="type_name" ></el-table-column>
        <el-table-column label="创建时间" prop="create_time"></el-table-column>
      </el-table>
      <el-pagination
        style="text-align: right;padding:20px 0;"
        class="page"
        background
        layout="total, prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="15"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { mineLogList, AscList } from 'api'
export default {
  data () {
    return {
      page: 1,
      orderList: [],
      total: null,
      userAccunt: '',
      options: [],
      value: '',
      levelOptions: [{
        value: '',
        label: '不限'
      }, {
        value: 1,
        label: '一级'
      }, {
        value: 2,
        label: '二级'
      }, {
        value: 3,
        label: '团队'
      }],
      level: '',
      info: {}
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.orderList = []
      this._mineLogList()
    },
    _mineLogList () {
      let obj = {}
      obj.uid = localStorage['_ad_admin_uid']
      obj.page = this.page
      if (this.userAccunt) {
        obj.mobile = this.userAccunt
      }
      if (this.value) {
        obj.mine_id = this.value
      }
      if (this.level) {
        obj.level = this.level
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      })
      mineLogList(obj).then(res => {
        if (res.code == 200) {
          loading.close()
          this.orderList = res.data.list
          this.total = res.data.count
          this.info = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    search () {
      this.page = 1
      this.orderList = []
      this._mineLogList()
    }
  },
  created () {
    this._mineLogList()
    AscList({
      page: -1
    }).then(res => {
      this.options = res.data.list
    })
  }
}
</script>
<style scoped>
.AscMineLogList .goodsImg {
  width: 60px;
  height: 60px;
}
.count-pd {
  padding-right: 30px
}
</style>
