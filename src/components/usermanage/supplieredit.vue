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
      <div class="head">管理员账号:</div>
      <el-input v-model="mobile" placeholder="请输入管理员"></el-input>
    </div>
    <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
import { editSupplier } from 'api'
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
      if (!this.mobile) {
        this.$message({
          type: 'info',
          message: '管理员账号不能为空'
        })
        return
      }
      let obj = {}
      obj.clean_mobile = this.mobile
      obj.supplier = this.nickname
      obj.uuid = this.uid
      editSupplier(obj).then(res => {
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
