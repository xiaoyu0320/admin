<!--  -->
<template>
  <div class="masked" @click="close">
    <div class="dialog" @click.stop="stopBubbling" v-loading="loading">
      <div class="title">{{returnTitle()}}</div>
      <div class="item">
        <div class="head">收货人:</div>
        <el-input v-model="postInfo.name" placeholder="请输入收货人姓名"></el-input>
      </div>
      <div class="item">
        <div class="head">手机号:</div>
        <el-input type="" v-model="postInfo.mobile" placeholder="请输入手机号"></el-input>
      </div>
      <div class="item">
         <div class="head">收货地址</div>
         <el-select v-model="postInfo.province_nid" placeholder="请选择省份" @change="handleItemChange(1)">
           <el-option v-for="item in proviceArr"
             :key="item.nid"
             :label="item.name"
             :value="item.nid">
           </el-option>
         </el-select>
         <el-select v-model="postInfo.city_nid" value-key="nid" v-if="cityArr.length > 0" placeholder="请选择市" @change="handleItemChange(2)">
           <el-option v-for="item in cityArr"
             :key="item.nid"
             :label="item.name"
             :value="item.nid">
           </el-option>
         </el-select>
         <el-select v-model="postInfo.county_nid" value-key="nid" v-if="areaArr.length > 0" placeholder="请选择县" @change="handleItemChange(3)">
           <el-option v-for="item in areaArr"
             :key="item.nid"
             :label="item.name"
             :value="item.nid">
           </el-option>
         </el-select>
         <el-select v-model="postInfo.town_nid" value-key="nid" v-if="countyArr.length > 0" placeholder="请选择区">
           <el-option v-for="item in countyArr"
             :key="item.nid"
             :label="item.name"
             :value="item.nid">
           </el-option>
         </el-select>
      </div>
      <div class="item">
        <div class="head">收货人详细地址:</div>
        <el-input v-model="postInfo.address" placeholder="请输入收货人详细地址"></el-input>
      </div>
      <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
     </div>
    </div>
  </div>
</template>

<script>
import { province, addressChildren, cofirmAddAddress, confirmEditAddress, editAddressInfo } from 'api'
export default {
  components: {},
  data () {
    return {
      loading: false,
      postInfo: {
        name: '',
        mobile: '',
        address: '',
        province_nid: '',
        city_nid: '',
        county_nid: '',
        town_nid: ''
      },
      proviceArr: [], // provice Arr
      cityArr: [], // city Arr
      areaArr: [], // area Arr
      countyArr: [], // county Arr
      props: {
        label: 'name',
        value: 'nid',
        children: 'cities'
      }
    }
  },
  props: {
    id: [String, Number],
    type: [String, Number]
  },
  computed: {},
  watch: {},
  methods: {
    returnTitle () {
      return this.type === 0 ? '新增退货地址' : '编辑退货地址'
    },
    close () {
      // 向外部传递一个关闭弹窗的动作
      this.$emit('closeDiaglog', true)
    },
    confirm () {
      if (this.postInfo.name === '') {
        this.$message({
          type: 'info',
          message: '请输入收货人!'
        })
        return
      }
      if (this.postInfo.mobile === '') {
        this.$message({
          type: 'info',
          message: '请输入手机号!'
        })
        return
      }
      if (this.postInfo.province_nid === '') {
        this.$message({
          type: 'info',
          message: '请选择省份!'
        })
        return
      }
      if (this.postInfo.city_nid === '') {
        this.$message({
          type: 'info',
          message: '请选择城市!'
        })
        return
      }
      if (this.postInfo.county_nid === '') {
        this.$message({
          type: 'info',
          message: '请选择城区!'
        })
        return
      }
      if (this.postInfo.address === '') {
        this.$message({
          type: 'info',
          message: '请填写详细地址!'
        })
        return
      }
      let obj = {}
      obj = this.postInfo
      if (this.postInfo.town_nid === '') {
        obj.town_nid = 0
      }
      if (this.type === 0) {
        cofirmAddAddress(obj).then(res => {
          this.$emit('confirmDialog', true)
        })
      } else {
        obj.id = this.id
        confirmEditAddress(obj).then(res => {
          this.$emit('confirmDialog', true)
        })
      }
    },
    getEditInfo () {
      this.loading = true
      editAddressInfo({ id: this.id }).then(res => {
        this.loading = false;
        ({ address: this.postInfo.address, city_nid: this.postInfo.city_nid, county_nid: this.postInfo.county_nid, mobile: this.postInfo.mobile, name: this.postInfo.name, province_nid: this.postInfo.province_nid, town_nid: this.postInfo.town_nid } = res.data)
        this.proviceArr = res.data.province_list
        this.cityArr = res.data.city_list
        this.areaArr = res.data.county_list
        this.countyArr = res.data.town_list
      })
    },
    getSelectAdd () {
      province({}).then(res => {
        this.proviceArr = res.data
      })
    },
    // 下拉的判断选项 表示选中的是哪个值 1234 表示对应的是第几个
    handleItemChange (val) {
      let nid = 0
      switch (val) {
        case 1:
          this.cityArr = []
          this.areaArr = []
          this.countyArr = []
          nid = this.postInfo.province_nid
          this.postInfo.city_nid = ''
          this.postInfo.county_nid = ''
          this.postInfo.town_nid = ''
          break
        case 2:
          this.areaArr = []
          this.countyArr = []
          nid = this.postInfo.city_nid
          this.postInfo.county_nid = ''
          this.postInfo.town_nid = ''
          break
        case 3:
          this.countyArr = []
          nid = this.postInfo.county_nid
          this.postInfo.town_nid = ''
          break
      }
      addressChildren({ nid: nid }).then(res => {
        switch (val) {
          case 1: this.cityArr = res.data; break
          case 2: this.areaArr = res.data; break
          case 3: this.countyArr = res.data; break
        }
      })
    }
  },
  created () {
    // 如果是新增的情况处理对应的情况
    if (this.type === 0) {
      this.getSelectAdd()
    } else {
      this.getEditInfo()
    }
  },
  mounted () {
  },
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
  @import './dialog.scss';
  .masked{
    .dialog{
      width: 655px;
      .head{
        width: 90px;
      }
      .el-select{
          margin-right: 10px;
          &:last-child{
            margin-right: 0;
          }
      }
    }
  }
</style>
