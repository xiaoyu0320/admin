<template>
  <div class="AscOrderList">
     <div style="margin: 15px 0;">
      <el-select v-model="oreName" placeholder="订单编号">
      <el-option
        v-for="item in oreList"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <el-input
        placeholder="请输入手机号"
        v-model="userAccunt"
        style="width:180px"
      >
      </el-input>
     <el-date-picker
      v-model="value1"
      @change="getTime"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
     <el-select v-model="source" placeholder="来源">
      <el-option
        v-for="item in sourceList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
     <el-checkbox v-model="stop" true-label="1" false-label="">排除停矿挖机</el-checkbox>
      <el-button
        type="primary"
        class="search__btn"
        @click="search()"
      >搜索</el-button>
       <el-button
        type="success"
        class="search__btn"
        @click="clear()"
      >清空</el-button>
    </div>
    <div class="asc-opeate">
      <el-button>导出订单</el-button> <label>艾点兑换总额：8000</label>
    </div>
    <div class="main">
      <el-table :data="orderList" border stripe style="width: 99.9% !important; " height="600">
        <el-table-column label="#" prop="id" width="100"></el-table-column>
        <el-table-column label="订单号" prop="name"></el-table-column>
        <el-table-column label="第三方订单号" prop="spec" width="150"></el-table-column>
        <el-table-column label="店铺" prop="invest" width="150"></el-table-column>
        <el-table-column prop="img" label="店铺ID" width="100">
          <template slot-scope="scope">
            <img class="goodsImg" :src="scope.row.img" alt />
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="mobile" width="150"></el-table-column>
        <el-table-column label="收件人" prop="running_time" width="150"></el-table-column>
        <el-table-column label="手机" prop="output" width="150"></el-table-column>
        <el-table-column label="实付金额" prop="hashrate" width="150"></el-table-column>
        <el-table-column label="艾点" prop="asc"  width="150">
        </el-table-column>
        <el-table-column label="订单状态" prop="cycle" width="150"></el-table-column>
        <el-table-column label="提交时间" prop="status_name" width="150"></el-table-column>
        <el-table-column label="操作" prop="source_name" width="180">
          <template slot-scope="scope">
            <span>详情</span>
            <span>备注</span>
            <span>作废</span>
          </template>
        </el-table-column>
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
import { AscorderList, AscList } from 'api'
export default {
  data () {
    return {
      page: 1,
      orderList: [],
      total: null,
      userAccunt: '',
      oreList: [],
      oreName: '',
      stampSting: '',
      sourceList: [{
        value: 1,
        label: '个人租赁'
      }, {
        value: 2,
        label: '注册奖励'
      }],
      source: '',
      value1: [],
      info: {},
      stop: ''
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.orderList = []
      this._AscorderList()
    },
    // 获取时间范围
    getTime (val) {
      this.stampSting = this.getstamp(val[0]) + '-' + this.getstamp(val[1])
      console.log(this.stampSting)
    },
    getstring (dataTime) {
      const d = new Date(dataTime)
      const resDate =
        d.getFullYear() +
        '-' +
        this.p(d.getMonth() + 1) +
        '-' +
        this.p(d.getDate())
      return resDate
    },
    p (s) {
      return s < 10 ? '0' + s : s
    },
    getstamp (dataTime) {
      var thisTime = this.getstring(dataTime)

      thisTime = thisTime.replace(/-/g, '/')
      var time = new Date(thisTime)
      time = time.getTime() / 1000
      return time
    },
    _AscorderList () {
      let obj = {}
      obj.page = this.page
      if (this.userAccunt) {
        obj.mobile = this.userAccunt
      }
      if (this.oreName) {
        obj.mine_id = this.oreName
      }
      if (this.source) {
        obj.source = this.source
      }
      if (this.stampSting) {
        obj.between_time = this.stampSting
      }
      if (this.stop) {
        obj.status = Number(this.stop)
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      })
      AscorderList(obj).then(res => {
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
    clear () {
      this.userAccunt = ''
      this.oreName = ''
      this.source = ''
      this.stampSting = ''
      this.stop = ''
      this.search()
    },
    search () {
      this.page = 1
      this.orderList = []
      this._AscorderList()
    },
    countNumber (item) {
      if (item) { return (Number(item.total_output) * Number(item.price)).toFixed(2) }
    }
  },
  created () {
    this._AscorderList()
    AscList({
      page: -1
    }).then(res => {
      this.oreList = res.data.list
    })
  }
}
</script>
<style scoped>
.AscOrderList .goodsImg {
  width: 60px;
  height: 60px;
}
.pd-r15 {
  padding-right:15px
}
.asc-opeate {
  margin-bottom: 15px
}
</style>
