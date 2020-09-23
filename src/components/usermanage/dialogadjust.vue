<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">查看详情</div>
    <div class="item">
      <div class="head">昵称:</div>
      <div class="body">{{item.nickname}}</div>
    </div>
    <div class="item">
      <div class="head">手机号:</div>
      <div class="body">{{item.mobile}}</div>
    </div>
    <div class="item">
      <div class="head">余额:</div>
      <div class="body">{{item.clean_amount}}</div>
    </div>
    <div class="item">
      <div class="head">调整后余额:</div>
      <el-input v-model="amount" placeholder="请输入调整后的余额"></el-input>
    </div>
    <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
     </div>
  </div>
</div>
</template>

<script>
import { adjustBalance } from 'api'
export default {
  components: {},
  data () {
    return {
      amount: ''
    }
  },
  props: {
    item: Object,
    default: () => {}
  },
  computed: {},
  watch: {},
  methods: {
    close () {
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      if (!this.amount) {
        this.$message({
          type: 'info',
          message: '调整金额不能为空'
        })
        return
      }
      const obj = {
        'uuid': this.item.uid,
        'balance': this.amount
      }
      adjustBalance(obj).then(res => {
        this.$emit('confirmDialog', {})
      })
    }
  },
  created () {
  }
}
</script>
<style lang='scss' scoped>
  @import './dialog.scss'
</style>
