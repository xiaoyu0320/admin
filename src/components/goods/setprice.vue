<!--  -->
<template>
<div class='masked' @click="close">
  <div class="dialog" @click.stop="stopBubbling" v-loading="loading">
    <i class="el-icon-close" @click="close"></i>
    <div class="title">设置价格</div>
    <div class="item">
      <div class="head">商品名称:</div>
      <div class="body">{{item.title}}</div>
    </div>
    <div class="item">
      <div class="head">成本价:</div>
      <div class="body">{{item.cost_price}}</div>
    </div>
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="head">{{item.clean_level_name}}:</div>
      <el-input v-model="item.value" placeholder="请输入价格"></el-input>
    </div>
    <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
import { levelList, goodsSetPrice } from 'api'
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      list: [],
      loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    confirm () {
      const idArr = []
      const priceArr = []
      this.list.forEach(item => {
        idArr.push(item.id)
        priceArr.push(item.value ? item.value : 0)
      })
      const obj = {
        id: this.item.id,
        level_id: idArr.join(','),
        price: priceArr.join(',')
      }
      goodsSetPrice(obj).then(res => {
        this.$emit('confirmDialog', {})
      })
    },
    close () {
      this.$emit('closeDiaglog', true)
    },
    getLevel () {
      this.loading = true
      levelList({}).then(res => {
        const { list } = res.data
        list.forEach(item => {
          item.value = ''
        })
        this.list = list
        this.loading = false
      })
    }

  },
  created () {
    this.getLevel()
  }
}
</script>
<style lang='scss' scoped>
@import '../usermanage/dialog.scss';
</style>
