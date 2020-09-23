<!--  -->
<template>
  <div class="info">
    <div
      class="info__progress"
      v-if="showList.status == 0 || showList.status ==1 || showList.status ==2 "
    >
      <el-steps
        :active="progressActive"
        align-center
      >
        <el-step
          title="待付款"
          :description="showList.create_time"
        ></el-step>
        <el-step
          title="待发货"
          :description="showList.pay_time "
        ></el-step>
        <el-step
          title="已发货"
          :description="showList.delivery_time"
        ></el-step>
      </el-steps>
    </div>
    <div class="info__list">
      <p class="info__list--txt">当前状态：{{showList.status_name}}</p>
      <p class="info__list--txt">订单号:{{showList.order_no}}</p>
      <p class="info__list--info">收货地址：{{showList.address_info}}</p>
    </div>
    <div class="info__table">
      <el-table
        :data="showList.order_detail"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="goods_title"
          label="商品名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="spec_cname"
          label="商品属性"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="实付金额"
        ></el-table-column>
        <el-table-column
          prop="qty"
          label="数量"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { orderDetail } from 'api'
export default {
  // import引入的组件需要注入到对象中才能使用
  props: {
    id: {
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
  // 方法集合
  methods: {
    getList () {
      let obj = {}
      obj.id = this.id
      orderDetail(obj).then(res => {
        this.showList = res.data
        if (this.showList.status == 0) {
          this.progressActive = 1
        } else if (this.showList.status == 1) {
          this.progressActive = 2
        } else if (this.showList.status == 2) {
          this.progressActive = 3
        }
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getList()
  }
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
</style>
