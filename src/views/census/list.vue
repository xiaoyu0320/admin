
<template>
<div class='census'>
   <div class="cencus-title">云矿机租赁统计 （台）</div>
   <div class="cencus-list">
      <div class="cencus-item">
         <div class="circle "><img src="images/common/icon1.png" width="50px"></div>
         <p>已租赁云矿机总量</p>
         <p>{{info.count}}</p>
         <p>再挖总量: {{info.valid_count}}</p>
      </div>
      <div class="cencus-item">
         <p>大型矿机已租总量</p>
         <p>{{info.big_count}}</p>
         <p>昨日: {{info.big_ycount}}</p>
      </div>
      <div class="cencus-item">
         <p>中型矿机已租总量</p>
         <p>{{info.middle_count}}</p>
         <p>昨日: {{info.middle_ycount}}</p>
      </div>
      <div class="cencus-item">
         <p>微型矿机已租总量</p>
         <p>{{info.mini_count}}</p>
         <p>昨日: {{info.mini_ycount}}</p>
      </div>
      <div class="cencus-item">
         <p>体验矿机已租总量</p>
         <p>{{info.give_count}}</p>
         <p>昨日: {{info.give_ycount}}</p>
      </div>
   </div>
   <div class="cencus-title">矿池资产统计</div>
   <div class="cencus-list">
      <div class="cencus-item">
         <div class="circle "><img src="images/common/icon2.png" width="50px"></div>
         <p>已挖总量（含奖励）</p>
         <p>{{info.total_asc}}</p>
         <p>昨日: {{info.total_yasc}}</p>
      </div>
      <div class="cencus-item">
         <p>待释放总量（不含奖励）</p>
         <p>{{info.surplus_total_output}}</p>
         <p>明日: {{info.tsurplus_total_output}}</p>
      </div>
      <div class="cencus-item">
         <p>矿池余额（含奖励）</p>
         <p>{{info.total_balance}}</p>
         <p>昨日: {{info.total_ybalance}}</p>
      </div>
      <div class="cencus-item">
         <p>已兑换链上 （含奖励）</p>
         <p>{{info.total_exchange}}</p>
         <p>昨日: {{info.total_yexchange}}</p>
      </div>
   </div>
   <div class="cencus-title">链上资产统计</div>
   <div class="cencus-list">
      <div class="cencus-item">
         <div class="circle "><img src="images/common/icon3.png" width="50px"></div>
         <p>当前链上资产</p>
         <p>{{info.total_asc_balance}}</p>
         <p>昨日: {{info.ytotal_asc_balance}}</p>
      </div>
      <div class="cencus-item">
         <p>已兑换成矿池资产</p>
         <p>{{info.asc_recharge}}</p>
         <p>昨日: {{info.yasc_recharge}}</p>
      </div>
      <div class="cencus-item">
         <p>基石已释放</p>
         <p>{{info.base_total}}</p>
         <p>昨日: {{info.ytransfer_base_coin}}</p>
         <p>待释放: {{info.base_left}}</p>
         <p>明日: {{info.tbase_left_total}}</p>
         <p>未来一周: {{info.wbase_left_total}}</p>
      </div>
       <div class="cencus-item">
         <p>总转账</p>
         <p>{{info.transfer_coin}}</p>
         <p>昨日: {{info.ytransfer_coin}}</p>
      </div>
   </div>
</div>
</template>

<script>
import { reportIndex } from 'api'
export default {
  components: {},
  data () {
    return {
      info: {}
    }
  },
  computed: {},
  watch: {},
  // 方法集合
  methods: {

  },
  created () {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading'
    })
    reportIndex({}).then(res => {
      if (res.code == 200) {
        loading.close()
        this.info = res.data
      }
    })
  },
  mounted () {

  }
}
</script>
<style scoped>
.cencus-title {
  margin: 15px 0;
}
.cencus-list {
  display: flex;
  justify-content: space-between;
  width: 80%;
  border: 2px solid #eee;
  border-radius: 10px;
  padding: 10px
}
.cencus-item p{
  margin-bottom: 10px
}
.cencus-item {
  flex: 1;
  padding: 30px 20px
}
.cencus-item:first-child {
  position: relative;
  box-sizing: border-box;
  padding-left: 70px;
  border-right: 2px  solid #eee
}
.cencus-item:first-child .circle {
  position: absolute;
  left: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.co1 {
  background: #ddd;
}
.co2 {
  background: #29d
}
.co3 {
  background: #f56c6c
}
</style>
