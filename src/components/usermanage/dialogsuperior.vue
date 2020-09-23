<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">设置上级</div>
    <div class="item">
      <div class="head">昵称:</div>
      <div class="body">{{item.nickname}}</div>
    </div>
    <div class="item">
      <div class="head">手机号:</div>
      <div class="body">{{item.mobile}}</div>
    </div>
    <div class="item">
      <div class="head">上级:</div>
      <div class="body">{{item.parent}}</div>
    </div>
    <div class="item">
      <div class="head">设置上级:</div>
      <el-select v-model="mobile" placeholder="请输入上级手机号">
        <el-option v-for="item in options"
          :key="item"
          :label="item"
          :value="item">
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
import { setCleanParent, getSetParentList } from 'api'
export default {
  components: {},
  data () {
    return {
      mobile: '',
      options: []
    }
  },
  props: {
    item: Object,
    default: () => {}
  },
  computed: {},
  watch: {},
  methods: {
    toGetSetParentList () {

    },
    close () {
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      if (!this.mobile) {
        this.$message({
          type: 'info',
          message: '手机号不能为空'
        })
        return
      }
      const obj = {
        'uuid': this.item.uid,
        'clean_mobile': this.mobile
      }
      console.log(obj)
      setCleanParent(obj).then(res => {
        this.$emit('confirmDialog', {})
      })
    }
  },
  async created () {
    let _Arr = await getSetParentList({ uuid: this.item.uid })
    this.options = _Arr.data
  }
}
</script>
<style lang='scss' scoped>
  @import './dialog.scss'
</style>
