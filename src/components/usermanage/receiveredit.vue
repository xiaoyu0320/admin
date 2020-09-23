<!--  -->
<template>
<div class="masked" @click="close">
  <div class="dialog" @click.stop="stopBubbling" v-loading="loading">
     <div class="title">{{returnTitle()}}</div>
     <div class="item">
        <div class="head">开户人:</div>
        <el-input v-model="postInfo.user" placeholder="请输入开户人"></el-input>
     </div>
     <div class="item">
        <div class="head">开户行卡号:</div>
        <el-input v-model="postInfo.account" type="number" placeholder="请输入开户行的卡号"></el-input>
     </div>
     <div class="item">
        <div class="head">开户行:</div>
        <el-input v-model="postInfo.bank"  placeholder="请输入开户行"></el-input>
     </div>
     <div class="item">
        <div class="head">银行类型:</div>
        <el-select v-model="postInfo.bank_type" placeholder="请选择开户行">
          <el-option v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
     </div>
     <div class="item">
        <div class="head">开户支行:</div>
        <el-input v-model="postInfo.sub_branch" placeholder="请输入开户行支行"></el-input>
     </div>
     <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
     </div>
  </div>
</div>
</template>

<script>
import { addAccount } from 'api'
export default {
  components: {},
  data () {
    return {
      postInfo: {
        user: '',
        bank_type: '',
        sub_branch: '',
        account: '',
        bank: ''
      },
      options: [
        {
          value: 1,
          label: '工商银行'
        },
        {
          value: 2,
          label: '建设银行'
        },
        {
          value: 3,
          label: '招商银行'
        },
        {
          value: 4,
          label: '交通银行'
        },
        {
          value: 5,
          label: '农业银行'
        },
        {
          value: 6,
          label: '平安银行'
        },
        {
          value: 7,
          label: '华夏银行'
        },
        {
          value: 8,
          label: '兴业银行'
        }
      ],
      loading: false
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    type: [String, Number]
  },
  computed: {},
  watch: {},
  methods: {
    returnTitle () {
      return this.type === 0 ? '新增账户' : '编辑账户'
    },
    confirm () {
      // 新增的接口
      if (!this.postInfo.user.trim()) {
        this.$message({
          type: 'info',
          message: '请输入开户人!'
        })
        return
      }
      if (!this.postInfo.bank) {
        this.$message({
          type: 'info',
          message: '请选择开户行!'
        })
        return
      }
      if (!this.postInfo.account.trim()) {
        this.$message({
          type: 'info',
          message: '请输入开户卡号!'
        })
        return
      }
      if (!this.postInfo.bank_type) {
        this.$message({
          type: 'info',
          message: '请选择银行类型!'
        })
        return
      }
      if (!this.postInfo.sub_branch.trim()) {
        this.$message({
          type: 'info',
          message: '请输入开户支行!'
        })
        return
      }
      if (this.type === 0) {
        let obj = this.postInfo
        addAccount(obj).then(res => {
          this.$emit('confirmDialog', true)
        })
      } else {
        let obj = this.postInfo
        obj.id = this.item.id
        addAccount(obj).then(res => {
          this.$emit('confirmDialog', true)
        })
      }
    },
    close () {
      // 向外部传递一个关闭弹窗的动作
      this.$emit('closeDiaglog', true)
    }
  },
  created () {
    if (this.type === 1) {
      const { postInfo, item } = this
      postInfo.user = item.account_user
      postInfo.bank_type = Number(item.bank_type)
      postInfo.sub_branch = item.sub_branch
      postInfo.account = item.account
      postInfo.bank = item.bank_name
    }
  },
  mounted () {
  },
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
@import './dialog.scss'
</style>
