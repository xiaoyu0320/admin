<!--  -->
<template>
<div class='app-container'>
  <div class="top mb20">
     <el-input placeholder="请输入内容" v-model="keywords">
        <template slot="prepend">请输入关键字</template>
     </el-input>
     <el-button type="primary" size="medium" @click.native="search">搜索</el-button>
  </div>
  <el-table :data="list" border stripe class="mb20" style="width:100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      label="提现账户"
      prop="transfer_account"
      width="200px"
      >
    </el-table-column>
    <el-table-column
      label="银行"
      prop="card_info"
       width="200px"
      >
    </el-table-column>
    <el-table-column
      label="开户人"
      prop="card_name"
       width="100px"
      >
    </el-table-column>
    <el-table-column
      label="提现金额"
      prop="transfer_amount"
       width="100px"
      >
    </el-table-column>
    <el-table-column
      label="收款人"
      prop="card_name"
       width="200px"
      >
    </el-table-column>
    <el-table-column
      label="手机"
      prop="mobile"
       width="200px"
      >
    </el-table-column>
    <el-table-column
      label="申请时间"
       width="200px"
      prop="addtime"
      >
    </el-table-column>
    <el-table-column
      label="客服拒绝理由"
      prop="refuse_msg"
       width="200px"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      width="200px"
      fixed="right"
      >
      <template slot-scope="data">
        <el-button type="primary" v-if="data.row.status!=0" size="small" @click="edit(0,data.row)">通过</el-button>
        <el-button type="warning" v-if="data.row.status!=0" size="small" @click="edit(1,data.row)">拒绝</el-button>
        <p v-if="data.row.status==0">该申请已处理</p>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      background
      layout="prev, pager, next"
      :hide-on-single-page="single"
      @current-change="changePage"
      :total="total">
    </el-pagination>
    <div v-if="dialog" class="masked">
       <div class="dialog">
         <div class="title">请填写拒绝理由</div>
         <textarea class="content" v-model="content" placeholder="请填写输入理由"></textarea>
         <div class="button-wrap">
            <el-button type="primary" size="medium" @click.native="confirm" class="centerbutton">确认</el-button>
            <el-button  @click.native="close" size="medium" class="centerbutton">取消</el-button>
         </div>
       </div>
    </div>
</div>
</template>

<script>
import { FinanceGetWithdrawList, checkWithdraw } from 'api'
export default {
  components: {},
  data () {
    return {
      list: [],
      single: false,
      loading: false,
      page: 1,
      total: 1,
      keywords: '',
      dialog: false,
      content: '',
      item: null
    }
  },
  props: {
    type: Number
  },
  computed: {},
  watch: {},
  methods: {
    edit (type, item) {
      switch (Number(type)) {
        case 0:
          this.$confirm('确认通过', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            checkWithdraw({ id: item.id, check_status: 1 }).then(res => {
              this.$message({
                type: 'success',
                message: '审核成功'
              })
              this.dialog = false
              this.getList()
            })
          }).catch(() => {
          })
          break
        case 1:
          this.item = item
          this.dialog = true
          break
      }
    },
    confirm () {
      const obj = {
        id: this.item.id,
        check_status: 2,
        refuse_msg: this.content
      }
      checkWithdraw(obj).then(res => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.dialog = false
        this.getList()
      })
    },
    close () {
      this.item = null
      this.dialog = false
    },
    changePage (val) {
      this.page = val
      this.getList()
    },
    search () {
      this.page = 1
      this.getList()
    },
    getList () {
      const obj = {
        role: this.type,
        page: this.page,
        keywords: this.keywords
      }
      this.loading = true
      FinanceGetWithdrawList(obj).then(res => {
        const { data } = res
        if (this.total != data.count) {
          this.total = data.count
        }
        this.list = data.list
        this.loading = false
      })
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
    width: 350px;
    margin-right: 20px;
  }
}
.masked{
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 99;
  top: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.7);
  .dialog{
    width: 400px;
    min-height: 250px;
    background: #fff;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 3px;
    box-shadow: 0 10x 30x rgba($color: #000000, $alpha: .3);
    box-sizing: border-box;
    padding: 35px;
    .title{
      text-align: center;
    }
    .content{
      width: 250px;
      min-height: 50px;
      resize: none;
      display: block;
      margin: 20px auto 0;
      border: 1px solid #eee;
      padding: 10px;
      border-radius: 5px;
      overflow: hidden;
    }
  }
  .button-wrap{
      margin-top: 20px;
      text-align: center;
      .centerbutton{
        display: inline-block;
        margin: 0 10px;
      }
  }
}
</style>
