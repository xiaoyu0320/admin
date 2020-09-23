<!--  -->
<template>
  <div class="info">

    <div class="info__list">
      <p class="info__list--txt">售后订单：{{showList.dno}} 原订单号：{{showList.order_no}}</p>
      <p class="info__list--txt">当前状态：{{showList.rstatus_name}}</p>
      <p class="info__list--txt">收货地址：{{showList.address_info}}</p>
      <p
        class="info__list--txt"
        v-if="typeName == '退货退款'"
      >物流公司：{{showList.express_name}}</p>
      <p
        class="info__list--txt"
        v-if="typeName == '退货退款'"
      >运单号码：{{showList.express_no}}</p>
      <p class="info__list--info">退货原因：{{showList.re_note}}</p>
      <div
        v-if="showList.rstatus == '3'"
        style="margin-bottom:10px"
      >
        <p class="info__list--txt">退货信息</p>
        <p class="info__list--txt">退货地址：{{showList.raddress_info}}</p>
        <p class="info__list--txt">物流公司：{{showList.rexpress_name}}</p>
        <p class="info__list--txt">运单号码：{{showList.rexpress_no}}</p>

      </div>
    </div>
    <div class="info__table">
      <el-table
        :data="showList.order_goods"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="goods_title"
          label="商品名称"
          width="300px"
        >
          <template slot-scope="scope">
            <div class="detail__pic--box">
              <img :src="scope.row.goods_primary_img.middle_pic">
              <div class="detail__pic--txt">
                <p>{{scope.row.goods_title}}</p>
                <p>商品款号：{{scope.row.goods_code}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="option_name"
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
    <div  v-if=" showList.rstatus== '0' " class="info__opeate">
      <el-button
        @click="aggren()"
        v-if="typeName == '仅退款' "
      >同意</el-button>
      <el-button
        @click="aggren()"
        v-if="typeName == '退货退款'"
      >同意并退回</el-button>
      <el-button @click="reject(1)">拒绝</el-button>
      <el-button
        @click="reject(2)"
        v-if="typeName == '仅退款'"
      >拒绝并发货</el-button>
    </div>
    <div
      class="info__opeate"
      v-else-if="showList.rstatus== '1'&& typeName == '退货退款'"
    >
      <el-button @click="finish()">确认收货</el-button>
    </div>
    <div
      class="info__opeate"
      v-else-if="showList.rstatus== '4'&& typeName == '退货退款'"
    >
      <el-button @click="finish()">确认退款</el-button>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { returnsDetail, audit } from 'api'
export default {
  // import引入的组件需要注入到对象中才能使用
  props: {
    id: {
      type: String,
      default: ''
    },
    typeName: {
      type: String,
      default: ''

    }
  },
  data () {
    // 这里存放数据
    return {
      showList: {},
      progressActive: 2,
      confirmStatus: '确认收货',
      sureVisabled: false,
      money: null
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    id (val) {
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
      obj.id = this.id
      returnsDetail(obj).then(res => {
        if (res.code == 200) {
          this.showList = res.data
          if (this.showList.rstatus == '4' && this.typeName == '退货退款') {
            this.confirmStatus = '确认退款'
          }
        }
      })
    },
    // 同意退款
    aggren () {
      this.$emit('callback', { status: true, type: 1 })
      this.showList = {}
      this.getList()
    },
    // 拒绝退款
    reject (reson) {
      // reson 1 拒绝 2 拒绝并退款
      this.$emit('callback', { status: true, type: 2, rexpress_no: this.showList.rexpress_no, reject: reson })
    },
    // 确认退款
    finish () {
      if (this.confirmStatus == '确认收货') {
        this.$confirm('是否已收货', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj = {}
          obj.id = this.id
          obj.status = 4
          audit(obj).then(res => {
            if (res.code == 200) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.confirmStatus = '确认退款'
              this.$emit('callback', { close: true })
            } else {
              this.$message.error(res.msg)
            }
          })
        })
      } else if (this.confirmStatus == '确认退款') {
        this.$emit('callback', { status: true, type: 3, showList: this.showList })
      }
    }

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    console.log(this.id)
    this.getList()
  }
}
</script>
<style scoped lang="scss">
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
.detail__pic--box {
  display: flex;
  align-items: center;
  img{
    width: 100px;
    height:auto;
    display: block;
    margin:0 auto;
  }
}
.detail__pic--txt {
  margin-left: 20px;
}
.info__opeate {
  margin-top: 20px;
  text-align: center;
}
</style>
