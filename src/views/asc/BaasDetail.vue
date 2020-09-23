
<template>
  <div class="ascDetail">
    <div class="clearEdit__info">
      <div
        class="clearEdit__info-item"
        v-for="(item,i) in arr"
        :key="i"
      >
        <label class="clearEdit__info--label">{{item.name}}</label>
        <div class="clearEdit__info--content">
          <el-input
            v-model="item.value"
            :disabled="item.editVisabled"
          ></el-input>
        </div>
      </div>
    </div>
    <el-button
      type="primary"
      @click="save()"
    >保存</el-button>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { baseFrozeLogDetail, editBaseFrozeLog } from 'api'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    parameId: {
      type: String,
      default: null
    }
  },
  data () {
    // 这里存放数据
    return {
      shopObj: {},
      arr: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    parameId (val) {
      if (val) {
        this.getlist()
      }
    }
  },
  // 方法集合
  methods: {
    getlist () {
      baseFrozeLogDetail({
        id: this.parameId
      }).then(res => {
        if (res.code == 200) {
          this.arr = Object.keys(res.data).map(key => {
            if (key == 'money' || key == 'frozeweek' || key == 'speed' || key == 'left' || key == 'starttime') {
              return { name: key, value: res.data[key], editVisabled: false }
            } else {
              return { name: key, value: res.data[key], editVisabled: true }
            }
          })
        }
      })
    },
    save () {
      this.$confirm('是否保存当前配置', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {}
        obj.id = this.parameId
        this.arr.map(data => {
          if (data.name == 'money') {
            obj.money = data.value ? data.value : '0' + data.value.toString()
          } else if (data.name == 'frozeweek') {
            obj.frozeweek = data.value ? data.value : '0' + data.value.toString()
          } else if (data.name == 'speed') {
            obj.speed = data.value ? data.value : '0' + data.value.toString()
          } else if (data.name == 'left') {
            obj.left = data.value ? data.value : '0' + data.value.toString()
          } else if (data.name == 'starttime') {
            obj.starttime = data.value ? data.value : '0' + data.value.toString()
          }
        })

        editBaseFrozeLog(obj).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getlist()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
}
</script>
<style scoped>
.clearEdit__info-item {
  margin-bottom: 20px;
}
.clearEdit__info--label {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  width: 100px;
  display: block;
}
.clearEdit__info--content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
  margin-left: 100px;
}
.clearEdit__info--content .el-input {
  margin: 0;
  width: 350px !important;
}
</style>
