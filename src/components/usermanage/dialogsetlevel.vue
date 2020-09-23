<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">设置等级</div>
    <div class="item">
      <div class="head">昵称:</div>
      <div class="body">{{item.nickname}}</div>
    </div>
    <div class="item">
      <div class="head">手机号:</div>
      <div class="body">{{item.mobile}}</div>
    </div>
    <div class="item">
      <div class="head">
        设置等级:
      </div>
      <el-select v-model="levelStatus" placeholder="请选择等级">
        <el-option v-for="item in options"
          :key="item.id"
          :label="item.clean_level_name"
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
import { setCleanLevel } from 'api'
export default {
  components: {},
  data () {
    return {
      options: [],
      levelStatus: '',
      uuid: ''
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {},
  watch: {},
  methods: {
    close () {
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      if (!this.levelStatus) {
        this.$message({
          type: 'info',
          message: '调整金额不能为空'
        })
        return
      }
      const obj = {
        'level': this.levelStatus,
        'uuid': [this.uuid]
      }
      setCleanLevel(obj).then(res => {
        this.$emit('confirmDialog', {})
      })
    }
  },
  created () {
    this.options = this.list
    this.levelStatus = this.item.clean_level
    this.uuid = this.item.uid
  }
}
</script>
<style lang='scss' scoped>
  @import './dialog.scss'
</style>
