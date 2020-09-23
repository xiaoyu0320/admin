<!--  -->
<template>
  <div class="masked" @click="close">
    <div class="dialog" @click.stop="stopBubbling">
      <div class="title">{{returnTitle()}}</div>
      <div class="item">
        <div class="head">等级名称:</div>
        <el-input type="" v-model="levelname" placeholder="请输入等级名称"></el-input>
      </div>
      <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
     </div>
    </div>
  </div>
</template>

<script>
import { addEditLevel } from 'api'
export default {
  components: {},
  data () {
    return {
      levelname: ''
    }
  },
  props: {
    id: [String, Number],
    type: [String, Number],
    levelName: [String]
  },
  computed: {},
  watch: {},
  methods: {
    returnTitle () {
      return this.type === 0 ? '新增团长等级' : '编辑团长等级'
    },
    close () {
      // 向外部传递一个关闭弹窗的动作
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      if (!this.levelname) {
        this.$message({
          type: 'info',
          messaoge: '请输入等级名称'
        })
      }
      let obj = {}
      if (this.id !== 0) {
        obj.id = this.id
      }
      obj.level_name = this.levelname
      addEditLevel(obj).then(res => {
        this.$emit('confirmDialog', true)
      })
    }
  },
  created () {
    this.levelname = this.levelName
  }
}
</script>
<style lang='scss' scoped>
  @import '../dialog/dialog.scss';
  .dialog{
    min-height: auto!important;
  }
</style>
