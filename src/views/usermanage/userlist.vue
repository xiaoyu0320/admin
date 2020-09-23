<!--  -->
<template>
<div class='app-container app-table'>
   <div class="userlist">
     <div class="opera">
       <el-input placeholder="请输入昵称/Uid" v-model="nickname">
        <template slot="prepend">昵称/Uid</template>
      </el-input>
      <el-input placeholder="请输入内容" type="Number" v-model="mobile">
        <template slot="prepend">手机号</template>
      </el-input>
      <el-select v-model="level" placeholder="请选择等级">
        <el-option v-for="item in levelLists"
          :key="item.id"
          :label="item.clean_level_name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="vipStatus" placeholder="请选择会员状态">
        <el-option v-for="item in vipStatusList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="timerange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" @click.native="search" size="medium">搜索</el-button>
     </div>
     <!--table start-->
     <el-table :data="list" border stripe v-loading="loading">
       <el-table-column
         prop="nickname"
         label="昵称"
         width="150px;"
         >
       </el-table-column>
       <el-table-column
         prop="mobile"
         label="手机"
         width="150px"
         >
       </el-table-column>
       <el-table-column
         prop="clean_level_name"
         label="等级"
         width="100px"
         >
       </el-table-column>
       <el-table-column
         prop="clean_invite_code"
         label="推荐码"
         width="150px"
         >
       </el-table-column>
       <el-table-column
         label="状态"
         width="150px"
         >
         <template slot-scope="scope">
           {{returnStatus(scope.row.clean_del_flag)}}
         </template>
       </el-table-column>
       <el-table-column
         label="操作"
         >
         <template slot-scope="scope">
           <el-button type="primary" size="small" @click.native="edit(scope.row, 'detail')">查看</el-button>
           <el-button type="primary" size="small" @click.native="edit(scope.row,'edit')">编辑</el-button>
           <el-button type="primary" size="small" @click.native="edit(scope.row,'ban')">设置状态</el-button>
           <el-button type="primary" size="small" @click.native="edit(scope.row,'adjust')">调整余额</el-button>
           <el-button type="primary" size="small" @click.native="edit(scope.row,'level')">设置等级</el-button>
           <el-button type="primary" size="small" @click.native="edit(scope.row,'superior')">设置上级</el-button>
         </template>
       </el-table-column>
     </el-table>
     <!--table end-->
     <el-pagination
      background
      layout="prev, pager, next"
      :hide-on-single-page="single"
      @current-change="changePage"
      :total="total"
      style="margin-top:20px"
      >
    </el-pagination>
    <dialogdetail v-if="flag.detail" :item="item" @closeDiaglog="closeDiaglog"></dialogdetail>
    <dialogedit v-if="flag.edit" :item="item" @closeDiaglog="closeDiaglog" @confirmDialog="confirmEdit"></dialogedit>
    <dialogban v-if="flag.ban" :item="item"  @closeDiaglog="closeDiaglog" @confirmDialog="confirmStatus"></dialogban>
    <dialogadjust v-if="flag.adjust" :item="item" @closeDiaglog="closeDiaglog" @confirmDialog="confirmAdjust"></dialogadjust>
    <dialoglevel v-if="flag.level" :list="levelLists" :item="item" @closeDiaglog="closeDiaglog" @confirmDialog="confirmAdjust"></dialoglevel>
    <dialogsuperior v-if="flag.superior" :item="item" @closeDiaglog="closeDiaglog" @confirmDialog="confirmAdjust"></dialogsuperior>
   </div>
</div>
</template>

<script>
import { levelList, suserList } from 'api'
import dialogdetail from '@c/usermanage/dialogdetail'
import dialogedit from '@c/usermanage/dialogedit'
import dialogban from '@c/usermanage/dialogban'
import dialogadjust from '@c/usermanage/dialogadjust'
import dialoglevel from '@c/usermanage/dialogsetlevel'
import dialogsuperior from '@c/usermanage/dialogsuperior'
export default {
  components: {
    dialogdetail, dialogedit, dialogban, dialogadjust, dialoglevel, dialogsuperior
  },
  data () {
    return {
      nickname: '',
      mobile: '',
      level: '',
      levelLists: [],
      vipStatus: '',
      vipStatusList: [
        {
          label: '正常的会员',
          value: 0
        },
        {
          label: '禁用的会员',
          value: 1
        }
      ],
      timerange: '',
      list: [],
      total: 0,
      single: false,
      page: 1,
      flag: {
        detail: false,
        edit: false,
        ban: false,
        adjust: false,
        level: false,
        superior: false
      },
      item: null,
      loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    closeDiaglog () {
      this.flag.detail = false
      this.flag.edit = false
      this.flag.ban = false
      this.flag.adjust = false
      this.flag.level = false
      this.flag.superior = false
    },
    confirmAdjust () {
      this.confirmStatus()
    },
    edit (item, type) {
      this.item = null
      this.item = item
      this.flag[type] = true
    },
    confirmEdit () {
      this.$message({
        type: 'success',
        message: '修改成功'
      })
      this.closeDiaglog()
      this.search()
    },
    confirmStatus () {
      this.$message({
        type: 'success',
        message: '设置成功'
      })
      this.closeDiaglog()
      this.search()
    },
    returnStatus (type) {
      return type == 1 ? '禁用' : '启用'
    },
    changePage (val) {
      this.page = val
      this.search()
    },
    search () {
      const obj = {}
      obj.page = this.page
      obj.keywords = this.nickname
      obj.mobile = this.mobile
      obj.level = this.level
      obj.del_flag = this.vipStatus
      if (this.timerange != '') {
        obj.starttime = new Date(this.timerange[0]).getTime()
        obj.endtime = new Date(this.timerange[1]).getTime()
      }
      this.loading = true
      suserList(obj).then(res => {
        const { data } = res
        if (this.total == 0) {
          this.total = data.total_count
        }
        this.list = data.list
        this.loading = false
      })
    }
  },
  async created () {
    const _levellist = await levelList({})
    this.levelLists = _levellist.data.list
    this.search()
  }
}
</script>
<style lang='scss' scoped>
  .app-container.app-table{
    display: block;
    height: calc(100vh - 90px);
    .el-table{
      overflow-y: scroll!important;
    }
  }
  .userlist{
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
  }
  .userlist .opera{
    overflow: hidden;
    .el-input{
      width: 260px;
    }
    .el-input,.el-select,.el-date-editor,.el-button{
      margin-bottom: 20px;
      float: left;
      margin-right: 20px
    }
  }
  .el-button{
    margin-bottom: 15px
  }
</style>
