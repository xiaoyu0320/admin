<!--  -->
<template>
<div class='app-container' >
   <div style="margin: 15px 0;">
      <el-input
        placeholder="请输入手机号"
        v-model="searchContent"
        style="width:300px"
      >
      </el-input>
      <el-button
        type="primary"
        class="search__btn"
        @click="search()"
      >搜索</el-button>
    </div>
   <div class="levellist">
      <el-table :data="tableData" border stripe>
        <el-table-column
          prop="mobile"
          label="申请人手机号">
        </el-table-column>
         <el-table-column
          prop="nickname"
          label="申请人昵称">
        </el-table-column>
         <el-table-column
          prop="idcard_a"
          label="身份证正面">
          <template slot-scope="scope" >
             <img :src="scope.row.idcard_a.small_pic" @click="showImg(scope.row.idcard_a.original_pic)" style="width:120px;height:95px">
          </template>
        </el-table-column>
         <el-table-column
          prop="idcard_b"
          label="身份证反面">
          <template slot-scope="scope">
             <img :src="scope.row.idcard_b.small_pic" @click="showImg(scope.row.idcard_b.original_pic)" style="width:120px;height:95px">
          </template>
        </el-table-column>
         <el-table-column
          prop="handheld"
          label="手持身份证照片">
           <template slot-scope="scope">
             <img :src="scope.row.handheld.small_pic" @click="showImg(scope.row.handheld.original_pic)" style="width:120px;height:95px">
          </template>
        </el-table-column>
         <el-table-column
          prop="realname"
          label="实名认证">
        </el-table-column>
         <el-table-column
          prop="idno"
          label="身份证">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="申请时间">
        </el-table-column>
          <el-table-column
          prop="review_time"
          label="审核时间">
        </el-table-column>
         <el-table-column
          prop="reason"
          label="拒绝原因">
        </el-table-column>
         <el-table-column
          prop="status_name"
          label="审核状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button plain size="small" round @click.native="edit(scope.row)" :disabled="scope.row.status!=0">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="身份证"
        :visible.sync="imgVisabled"
        width="30%"
        >
        <el-image :src="url">
          <div slot="placeholder" class="image-slot" style="width:100%;text-align:center">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </el-dialog>
       <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :total="total"
        :page-size="15"
        style="margin-top:20px"
        >
      </el-pagination>
      <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      width="40%"
     >
      <el-row :gutter="20" style="margin-bottom:15px">
       <el-col :span="3"><div class="grid-label">拒绝理由</div></el-col>
       <el-col :span="6"><div class="grid-content"><el-input v-model="reson" placeholder="请输入拒绝理由"></el-input></div></el-col>
      </el-row>
      <el-row :gutter="20">
       <el-col :span="3"><div class="grid-label">拒绝理由</div></el-col>
       <el-col :span="6"><div class="grid-content" style="padding-top:5px">
          <el-radio v-model="radio" label="1">通过</el-radio>
          <el-radio v-model="radio" label="2">拒绝</el-radio>
        </div></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
   </div>

</div>
</template>

<script>
import { Certification, reviewCertification } from 'api'
export default {
  components: {},
  data () {
    return {
      tableData: [],
      total: null,
      page: 1,
      dialogVisible: false,
      imgVisabled: false,
      reson: '',
      radio: '1',
      id: '',
      url: '',
      searchContent: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    search () {
      this.tableData = []
      this.list()
    },
    list () {
      let obj = {}
      if (this.searchContent) {
        obj.keywords = this.searchContent
      }
      obj.page = this.page
      Certification(obj).then(res => {
        if (res.code == 200) {
          console.log(res)
          this.tableData = res.data.list
          this.total = res.data.count
        }
      })
    },
    edit (item) {
      this.dialogVisible = true
      this.id = item.id
    },
    showImg (src) {
      this.url = src
      this.imgVisabled = true
    },
    sure () {
      let obj = {}
      obj.id = this.id
      obj.reason = this.reson
      obj.status = this.radio
      reviewCertification(obj).then(res => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.dialogVisible = false
          this.tableData = []
          this.list()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changePage (val) {
      this.page = val
      this.list()
    }
  },
  created () {
    this.list()
  },
  mounted () {

  },
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
  .app-container{
    .item{
      margin-top: 20px;
      text-align: center;
      ._item{
        display: inline-flex;
        .head{
          width: 100px;
          font-size: 16px;
          color: #353535;
          text-align: left;
          margin-right:20px;
        }
      }
    }
  }
  .button-wrap{
    text-align: center;
    margin-top: 30px;
    .centerbutton{
      display: inline-block;
      margin: 0 10px;
    }
  }
.grid-label {
  padding-top:5px
}

</style>
