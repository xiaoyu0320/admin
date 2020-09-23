<!--  -->
<template>
  <div class="info">
    <div v-if="showList">
      <div class="info__list">
        <p class="info__list--txt">订单号:{{orderNumber2}}</p>
        <p class="info__list--info">
          物流公司{{showList.expName}}
          <span>快递单号：{{showList.number}}</span>
        </p>
      </div>
      <div class="info__table">
        <ul
          class="info__list-ul"
          v-for=" (item,i) in showList.list"
          :key="i"
        >
          <li class="info__list-item">{{item.time}} {{item.status}}</li>
        </ul>
      </div>
    </div>
    <div
      v-else
      class="empty"
    >暂无数据</div>
  </div>
</template>

<script>
import { expressTrace } from '@/api/api'
export default {
  // import引入的组件需要注入到对象中才能使用
  props: {
    number: {
      type: String
    },
    orderNumber2: {
      type: String
    }
  },
  data () {
    // 这里存放数据
    return {
      showList: {},
      progressActive: 2
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    number (val) {
      if (val) {
        this.showList = {}
        this.getList()
      }
    }
  },
  // 方法集合
  methods: {
    getList () {
      let obj = {}
      obj.express_no = this.number
      expressTrace(obj).then(res => {
        if (res.code == 200) {
          this.showList = res.data
        } else {
          this.showList = ''
        }
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    console.log(this.id)
    this.getList()
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
<style scoped>
.info__progress {
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 5px;
}
.info__list--txt {
  margin-top: 10px;
}
.info__list--info {
  background: #f5f7fa;
  padding: 20px;
  margin: 15px 0 20px;
}
.empty {
  padding: 20px;
  text-align: center;
}
.info__list-item {
  margin-bottom: 10px;
}
</style>
