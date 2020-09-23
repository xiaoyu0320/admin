<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">编辑</div>
    <div class="item">
      <div class="head">昵称:</div>
      <el-input v-model="nickname" placeholder="请输入用户昵称"></el-input>
    </div>
    <div class="item">
      <div class="head">手机号:</div>
      <el-input v-model="mobile" placeholder="请输入手机号"></el-input>
    </div>
    <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
import { editSuser } from 'api'
export default {
  props: {
    item: Object,
    default: () => {}
  },
  components: {},
  data () {
    return {
      nickname: '',
      mobile: '',
      uid: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    close () {
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      if (!this.nickname) {
        this.$message({
          type: 'info',
          message: '昵称不能为空'
        })
        return
      }
      if (!this.nickname) {
        this.$message({
          type: 'info',
          message: 'mobile不能为空'
        })
        return
      }
      let obj = {}
      obj.clean_mobile = this.mobile
      obj.nickname = this.nickname
      obj.uuid = this.uid
      editSuser(obj).then(res => {
        this.$emit('confirmDialog', {})
      })
    }
  },
  created () {
    this.nickname = this.item.nickname
    this.mobile = this.item.mobile
    this.uid = this.item.uid
  }
}
</script>
<style lang='scss' scoped>
@import './dialog.scss'
</style>
