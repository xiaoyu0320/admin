<template>
  <div class="AscConfig">
    <el-form
      :inline="true"
      class="formData"
    >
      <el-form-item
        v-for="(item,index) in AscList"
        :label="item.name"
        :key="index"
        v-show="item.name"
        class="poso-absoluete"
      >
        <el-input
          v-model="item.value"
          placeholder="请输入手续费"
        ></el-input>
        <label class="pos-lable">{{item.remarks}}</label>
      </el-form-item>
      <el-form-item style="padding-left:120px">
        <el-button
          type="primary"
          @click="onSubmit"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { AscConfig, AscConfigPost } from 'api'
export default {
  // import引入的组件需要注入到对象中才能使用
  data () {
    // 这里存放数据
    return {
      AscList: [],
      content: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 提交
    onSubmit () {
      let ascInfo = JSON.stringify(this.AscList)
      let obj = {
        setting: ascInfo
      }
      AscConfigPost(obj).then(res => {
        if (res.code === 200) {
          this.$message({
            showClose: true,
            message: res.msg
          })
          this._AscConfig()
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 获取矿机配置
    _AscConfig () {
      AscConfig({}).then(res => {
        if (res.code === 200) {
          if (res.data.list.length != 0) {
            this.AscList = res.data.list
          }
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          })
        }
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this._AscConfig()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
.el-form--inline .el-form-item{
  display: flex;
}
.el-form {
  /deep/ .el-form-item__label{
    width:120px;
  }
  /deep/ .pos-lable{
    color: #999;
  }
}
</style>
