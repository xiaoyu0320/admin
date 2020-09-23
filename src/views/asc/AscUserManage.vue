
<template>
  <div class="ascManage">
    <div style="margin-top: 15px;">
      <el-input
        placeholder="手机号/昵称/邀请码/真实姓名/pa"
        v-model="userAccunt"
        style="width:300px"
      >
      </el-input>
      <el-button
        type="primary"
        class="search__btn"
        @click="search()"
      >搜索</el-button>
      <span style="float: right;margin-top: 15px;">用户总数：{{pageCount}}</span>
    </div>

    <div class="asc__table">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="650px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="用户信息"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
                {{scope.row.nickname}}
              <div class="detail__pic--box">
                <!-- <img :src="scope.row.avatar" /> -->
                <div class="detail__pic--txt">
                  <p></p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createtime"
            label="创建时间"
            width="180"
          >
          </el-table-column>

          <el-table-column
            prop="invite_code"
            label="邀请码"
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="用户账号"
          ></el-table-column>

          <el-table-column
            prop="pa"
            label="pa"
          >
          </el-table-column>
          <!-- <el-table-column prop="password" label="登入密码"></el-table-column> -->

          <!-- <el-table-column label="私钥">
            <template slot-scope="scope">
              <div class="asc__overflow">{{scope.row.privatekey}}</div>
            </template>
          </el-table-column>-->
          <el-table-column
            prop="realname"
            label="实名"
          ></el-table-column>
          <el-table-column label="操作" width="300px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="detail(scope.row.uid)"
              >资金日志</el-button>
              <el-button
                type="primary"
                size="small"
                @click="frzzen(scope.row,1)"
               v-if="scope.row.del_flag != 1">禁用</el-button>
               <el-button
                type="primary"
                size="small"
                @click="frzzen(scope.row,0)"
               v-if="scope.row.del_flag != 0">解冻</el-button>
              <el-button type="primary" size="small" v-if="scope.row.isadmin== '0'"   @click.native="ban(scope,1)">设置管理员</el-button>
               <!-- <el-button type="primary" size="small"  v-if="scope.row.isadmin== '1'"    @click.native="ban(scope,0)">禁用</el-button> -->
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
        title="资金日志"
        :visible.sync="ascVisible"
        width="850px"
      >
        <asc-detail :parameId="parameId" />
      </el-dialog>
    </div>
     <editpart v-if="dialogpart" :item="item"  @confirmDialog="confirmDialogPart"  @closeDiaglog="closeDiaglog"></editpart>
  </div>
</template>

<script>
import { AscUserManager, setCleanStatus, resetSupplierPass, setAdmin } from 'api'
import editpart from '@c/role/editpart'
import AscDetail from './AscDetail.vue'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    AscDetail,
    editpart
    // QrcodeVue
  },
  data () {
    // 这里存放数据
    return {
      page: 1,
      tableData: [],
      pageCount: null,
      ascVisible: false,
      parameId: '',
      userAccunt: '',
      dialogpart: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    ban (item, type) {
      let text = type == 1 ? `确认设置该用户为管理员吗` : `确认禁用该管理员吗`
      this.$confirm(text, {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(res => {
        setAdmin({ managerUid: item.row.uid, isadmin: type }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.search()
        })
      })
    },
    reset (item) {
      this.$confirm('确认重置为123456', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(res => {
        const obj = {
          uuid: item.row.uid
        }
        resetSupplierPass(obj).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getList()
        })
      })
    },
    set (item) {
      this.item = item.row
      this.dialogpart = true
    },
    handleSelectionChange (val) {
      if (val) {
        this.$emit('infor', { status: false, arr: val })
      }
    },
    search () {
      this.tableData = []
      this.getlist()
    },
    pageChange () {
      this.tableData = []
      this.getlist()
    },
    getlist () {
      let obj = {}
      obj.type = 0
      obj.page = this.page
      if (this.userAccunt) {
        obj.keywords = this.userAccunt
      }
      AscUserManager(obj).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.pageCount = res.data.count
        }
      })
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
    detail (uid) {
      this.ascVisible = true
      this.parameId = uid
    },
    frzzen (str, op) {
      this.$confirm('是否禁用当前账户', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setCleanStatus({
          del_flag: op,
          managerUid: str.uid
        }).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          }
          this.search()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
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
</style>
