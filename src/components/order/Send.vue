
<template>
  <div class=''>
    <div class="send__box">
      <label class="send__box--label">订单编号</label>
      <div class="send__box--content">
        <el-input
          v-model="send.code"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <div class="send__box">
      <label class="send__box--label">快递名称</label>
      <div class="send__box--content">
        <el-select
          v-model="send.name"
          placeholder="请选择快递"
          size="300"
        >
          <el-option
            v-for="item in sendOptions"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="send__box">
      <label class="send__box--label">运单号</label>
      <div class="send__box--content">
        <el-input
          v-model="send.number"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <div class="send__box--opeart">
      <el-button
        type="primary"
        size="small"
        @click="sendClick()"
      >立即发货</el-button>
      <el-button
        size="small"
        @click="cancel()"
      >取消</el-button>
    </div>
  </div>
</template>

<script>
import { delivery, orderExpressList } from 'api'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    send: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    // 这里存放数据
    return {
      sendOptions: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    _orderExpressList () {
      orderExpressList({}).then(res => {
        this.sendOptions = res.data
      })
    },
    sendClick () {
      let obj = {}
      obj.id = this.id
      obj.express_code = this.send.name
      obj.express_no = this.send.number
      delivery(obj).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: '发货成功',
            type: 'success'
          })
          this.$emit('callback', false)
        }
      })
    },
    cancel () {
      this.$emit('callback', false)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this._orderExpressList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.send__box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.send__box--label {
  flex-basis: 80px;
  text-align: right;
}
.send__box--content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  padding-left: 15px;
  width: 300px;
}
.el-select.el-select--300 {
  width: 300px;
}
</style>
