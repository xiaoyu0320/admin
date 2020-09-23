
<template>
  <div class="ascManage">
    <div style="margin-top: 15px;display:flex;align-items:center;justify-content: space-between;">
      <el-input
        placeholder="请输入用户账户"
        v-model="userAccunt"
      >
        <template slot="prepend">用户账户</template>

      </el-input>
      <el-button
        type="primary"
        class="search__btn"
        @click="search()"
      >搜索</el-button>

      <span class="count">基石总数：{{moneyTotel}}</span>
      <span class="count">left总数：{{totalleft}}</span>
      <span class="count">已释放总数：{{sf}}</span>
      <el-button
        type="primary"
        @click="addStore=true"
      >添加基石</el-button>

    </div>
    <div class="asc__table">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="650px"
        >
          <el-table-column
            label="用户信息"
            width="120"
          >
            <template slot-scope="scope">
              <div class="detail__pic--box">
                <div class="detail__pic--txt">
                  <p>{{scope.row.nickname}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="180"
          >
            <template slot-scope="scope">{{formatTime(scope.row.starttime)}}</template>
          </el-table-column>
          <el-table-column
            label="最后释放时间"
            width="180"
          >
            <template
              slot-scope="scope"
              v-if="scope.row.lastbacktime != 0"
            >{{formatTime(scope.row.lastbacktime)}}</template>
          </el-table-column>
          <el-table-column
            prop="frozeweek"
            label="frozeweek"
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="用户账号"
          ></el-table-column>
          <el-table-column
            prop="left"
            label="left"
          ></el-table-column>
          <el-table-column
            prop="money"
            label="money"
          ></el-table-column>
          <el-table-column
            prop="speed"
            label="speed"
          ></el-table-column>
          <el-table-column
            prop="speed"
            label="释放量"
          >
            <template slot-scope="scope">
              {{Number(scope.row.money) - Number(scope.row.left) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="tokenValue"
            label="tokenValue"
          ></el-table-column>
          <el-table-column
            prop="contract"
            label="contract"
          >
            <template slot-scope="scope">
              {{contractName(scope.row.contract)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="detail(scope.row.id)"
              >详情</el-button>
              <el-button
                type="primary"
                size="small"
                @click="del(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="store__pagecount">

          <el-pagination
            background
            layout="prev, pager, next"
            :total="pageCount"
            :current-page.sync="page"
            :page-size="15"
            @current-change="pageChange()"
          ></el-pagination>
        </div>
      </template>
      <el-dialog
        title="详情"
        :visible.sync="ascVisible"
        width="760px"
      >
        <baas-detail :parameId="parameId" />
      </el-dialog>
      <el-dialog
        title="添加基石"
        :visible.sync="addStore"
        width="760px"
      >
        <add-store-code
          @callback="status"
          :getInfo="getInfo"
        />
        <el-dialog
          title="选择用户"
          :visible.sync="changeUser"
          width="1200px"
          v-if="changeUser"
          append-to-body
        >
          <asc-user-manage @infor="infor" />
        </el-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BaasDetail from './BaasDetail.vue'
import AddStoreCode from './AddStoreCode.vue'
import AscUserManage from './AscUserManage.vue'
import { baseFrozeLog, delBaseFrozeLog } from 'api'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    BaasDetail,
    AddStoreCode,
    AscUserManage
  },
  data () {
    // 这里存放数据
    return {
      page: 1,
      tableData: [],
      pageCount: null,
      parameId: '',
      ascVisible: false,
      addStore: false,
      userAccunt: '',
      changeUser: false,
      getInfo: {},
      showFlag: '',
      moneyTotel: 0,
      totalleft: 0,
      sf: 0
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    contractName (str) {
      switch (str) {
        case 'ETH':
          this.title = 'ETH'
          break
        case '0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74':
          this.title = 'WTC'
          break
        case 'eosio.token':
          this.title = 'EOS'
          break
        case '0xdac17f958d2ee523a2206206994597c13d831ec7':
          this.title = 'USDT'
          break
        case 'BTC':
          this.title = 'BTC'
          break
        default:
      }
    },
    search () {
      this.tableData = []
      this.getlist()
    },
    formatTime (str) {
      str = str + '000'
      str = parseInt(str)
      let time = new Date(str)
      let Y = time.getFullYear()
      let M =
        parseInt(time.getMonth()) + 1 > 9
          ? parseInt(time.getMonth()) + 1
          : '0' + (parseInt(time.getMonth()) + 1)
      let D = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
      return `${Y}/${M}/${D}`
    },
    detail (id) {
      console.log(id)
      this.ascVisible = true
      this.parameId = id
    },
    pageChange () {
      this.tableData = []
      this.getlist()
    },
    getlist () {
      let obj = {}
      obj.page = this.page
      if (this.userAccunt) {
        obj.keywords = this.userAccunt
      }
      baseFrozeLog(obj).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.pageCount = res.data.count
          this.moneyTotel = res.data.totalmoney
          this.totalleft = res.data.totalleft

          this.sf = res.data.totalmoney - res.data.totalleft
          console.log(this.moneyTotel, this.totalleft, this.sf)
        }
      })
    },
    status (val) {
      this.changeUser = val
      this.addStore = val
    },
    infor (val) {
      console.log(val)
      this.changeUser = val.status
      this.getInfo = val.arr[0]
    },
    del (id) {
      let obj = {}
      obj.id = id
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBaseFrozeLog(obj).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.tableData = []
            this.getlist()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getlist()
  },

  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },

  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scope>
.asc__overflow {
  height: 70px;
  overflow: auto;
}
.detail__pic--box {
  display: flex;
  align-items: center;
}
.detail__pic--box img {
  display: block;
  width: 50px;
  height: auto;
  margin: 0 auto;
}
.detail__pic--box p {
  text-align: left;
}
.detail__pic--txt {
  margin-left: 20px;
}
.count {
  float: right;
  padding: 0 15px;
}
</style>
<style >
.el-input-group {
  max-width: 316px;
}
</style>
