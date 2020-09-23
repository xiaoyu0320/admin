<!--  -->
<template>
<div class='app-container'>
   <!-- <div class="top">
      <el-input placeholder="请输入内容" v-model="name">
        <template slot="prepend">供应商名字</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="account">
        <template slot="prepend">供应商账号</template>
      </el-input>
      <el-button type="primary" size="small" @click.native="add">添加供应商</el-button>
   </div> -->
   <el-table :data="list" border stripe v-loading="loading" height="650px" class="mt20 mb20" >
        <el-table-column
          prop="id"
          label="编号"
          >
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          >
        </el-table-column>
        <el-table-column
          prop="pa"
          label="pa"
          >
        </el-table-column>
        <el-table-column
          prop="invite_code"
          label="邀请码"
          >
        </el-table-column>
         <el-table-column
          prop="group_title"
          label="所属角色"
          >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="账号"
          >
        </el-table-column>

        <el-table-column
          label="操作"
          width="250px"
          >
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="small" @click.native="edit(scope)"></el-button> -->
            <el-button type="primary" size="small"  v-if="scope.row.isadmin== '1'&&scope.row.mobile!='13606935885' " @click.native="isadmins(scope,0)">取消管理员</el-button>
            <el-button type="primary" size="small" v-if="scope.row.del_flag== '0'&&scope.row.mobile!='13606935885'" @click.native="ban(scope,1)" style="margin-bottom:15px">禁用</el-button>
            <el-button type="primary" size="small" v-if="scope.row.del_flag== '1'&&scope.row.mobile!='13606935885'" @click.native="ban(scope,0)" style="margin-bottom:15px">启用</el-button>
            <!-- <el-button type="primary" size="small" v-if="scope.row.mobile!='13606935885'" @click.native="reset(scope)">重置密码</el-button> -->
            <el-button type="primary" size="small" v-if="scope.row.mobile!='13606935885'" @click="set(scope)">角色关联</el-button>
            <el-button
                type="primary"
                size="small"
                @click="detail(scope.row.uid)"
              >资金日志</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      background
      layout="prev, pager, next"
      :hide-on-single-page="single"
      @current-change="changePage"
      :page-size="15"
      :total="total">
    </el-pagination>
    <edit v-if="dialog" :item="item"  @confirmDialog="confirmDialog"  @closeDiaglog="closeDiaglog"></edit>
    <editpart v-if="dialogpart" :item="item"  @confirmDialog="confirmDialogPart"  @closeDiaglog="closeDiaglog"></editpart>
     <el-dialog
        title="资金日志"
        :visible.sync="ascVisible"
        width="850px"
      >
        <asc-detail :parameId="parameId" />
      </el-dialog>
</div>
</template>
<script>
import { getSupplierList, addSupplier, setCleanStatus, resetSupplierPass, setAdmin } from 'api'
import edit from '@c/usermanage/supplieredit'
import editpart from '@c/role/editpart'
import AscDetail from '../asc/AscDetail.vue'
export default {
  components: {
    edit, editpart, AscDetail
  },
  data () {
    return {
      name: '',
      account: '',
      list: [],
      page: 1,
      loading: false,
      single: false,
      total: 1,
      dialog: false,
      item: null,
      dialogpart: false,
      parameId: '',
      ascVisible: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    confirmDialog () {
      this.dialog = false
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.getList()
    },
    set (item) {
      this.item = item.row
      this.dialogpart = true
    },
    confirmDialogPart () {
      this.dialogpart = false
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.list()
    },
    closeDiaglog () {
      this.item = null
      this.dialog = false
      this.dialogpart = false
    },
    detail (uid) {
      this.ascVisible = true
      this.parameId = uid
    },
    edit (item) {
      this.item = null
      this.item = item.row
      this.dialog = true
    },
    add () {
      const obj = {
        clean_mobile: this.account,
        supplier: this.name
      }
      addSupplier(obj).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.getList()
      })
    },
    ban (item, type) {
      let text = type == 0 ? `是否确认启用该管理员` : `是否禁用启用该管理员`
      this.$confirm(text, {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(res => {
        setCleanStatus({ managerUid: item.row.uid, del_flag: type }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getList()
        })
      })
    },
    isadmins (item, type) {
      let text = type == 0 ? `确认取消该管理员吗` : `确认启用该管理员吗`
      this.$confirm(text, {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(res => {
        setAdmin({ managerUid: item.row.uid, isadmin: type }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.getList()
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
    getList () {
      this.loading = true
      getSupplierList({ page: this.page }).then(res => {
        this.list = res.data.list
        this.total = res.data.count
        this.loading = false
      })
    },
    changePage (val) {
      this.page = val
      this.getList()
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
  .top{
    display: flex;
    align-items: center;
    .el-input{
      width: 400px;
      margin-right: 20px;
    }
  }
</style>
