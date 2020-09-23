<template>
  <div class="AscOrderList">
     <div style="margin: 15px 0;">
      <el-input
        placeholder="请输入手机号"
        v-model="userAccunt"
        style="width:180px"
      >
      </el-input>
      <el-select v-model="oreName" placeholder="选择矿机">
      <el-option
        v-for="item in oreList"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
     <el-select v-model="source" placeholder="来源">
      <el-option
        v-for="item in sourceList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
     <el-date-picker
      v-model="value1"
      @change="getTime"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
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
    <div style="margin-bottom:15px">
      <span class="pd-r15">已租矿机总量：{{info.count}}台</span>
      <span class="pd-r15">租用矿机ASC总数量：{{info.total_invest}}枚</span>
      <span class="pd-r15">当前矿池总算力（时）：{{info.total_hashrate}}</span>
      <span class="pd-r15">在挖矿机总量：{{info.valid_count}}台</span>
      <span class="pd-r15">停挖矿机总量：{{info.expired_count}}台</span>
    </div>
    <div class="main">
      <el-table :data="orderList" border stripe style="width: 99.9% !important; " height="600">
        <el-table-column label="#" prop="id" width="100"></el-table-column>
        <el-table-column label="矿机名称" prop="name"></el-table-column>
        <el-table-column label="矿机型号" prop="spec" width="150"></el-table-column>
        <el-table-column label="投资(￥)" prop="invest" width="150"></el-table-column>
        <el-table-column prop="img" label="矿机封面" width="100">
          <template slot-scope="scope">
            <img class="goodsImg" :src="scope.row.img" alt />
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="mobile" width="150"></el-table-column>
        <el-table-column label="已运行时间(时)" prop="running_time" width="150"></el-table-column>
        <el-table-column label="矿产量(天)" prop="output" width="150"></el-table-column>
        <el-table-column label="算力值(时)" prop="hashrate" width="150"></el-table-column>
      <el-table-column label="租赁价(枚)" prop="asc"  width="150">
        </el-table-column>
        <el-table-column label="周期(时)" prop="cycle" width="150"></el-table-column>
        <el-table-column label="收益率" prop="yield" width="150">
           <template slot-scope="scope">
             <div v-if="scope.row.type == '2'"> {{scope.row.yield}}枚 </div>
              <div v-else> {{scope.row.yield}} 倍 </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status_name" width="150"></el-table-column>
        <el-table-column label="总产量(枚)" prop="total_output" width="200"></el-table-column>
        <el-table-column label="总价(￥)"  width="150">
          <template slot-scope="scope">
              {{countNumber(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column label="来源" prop="source_name"></el-table-column>
        <el-table-column label="创建时间" prop="create_time" width="200"></el-table-column>
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
</style>
