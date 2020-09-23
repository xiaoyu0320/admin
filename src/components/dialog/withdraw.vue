<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling" v-loading="loading">
    <div class="title">提现</div>
    <div class="item">
        <div class="head">金额:</div>
        <el-input disabled="disabled" :value="userinfo.amount"></el-input>
    </div>
    <div class="item">
        <div class="head">银行卡:</div>
        <el-select v-model="cardId" placeholder="请选择银行卡">
          <el-option v-for="item in options"
            :key="item.id"
            :label="item.card_info"
            :value="item.id">
          </el-option>
        </el-select>
     </div>
      <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
     </div>
  </div>
</div>
</template>

<script>
import { bankList, withdraw } from 'api'
import { mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
      loading: false,
      options: [],
      cardId: ''
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  watch: {},
  methods: {
    close () {
      // 向外部传递一个关闭弹窗的动作
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      if (this.cardId == '') {
        this.$message({
          type: 'info',
          message: '请选择银行卡'
        })
        return
      }
      withdraw({ bank_id: this.cardId }).then(res => {
        this.$emit('confirmDialog', true)
      })
    },
    getBank () {
      bankList({ page: -1 }).then(res => {
        this.options = res.data.list
      })
    }
  },
  created () {
    this.getBank()
  }
}
</script>
<style lang='scss' scoped>
@import './dialog.scss';
.masked .dialog{
  min-height: auto!important;
}
</style>
