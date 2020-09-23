<!--  -->
<template>
<div class='masked'>
  <div class="dialog">
    <div class="express-title">{{returnTitle()}}</div>
    <div class="inner">
      <div class="module">
        <div class="guide">
          <span></span>
          <p>模版基础信息</p>
        </div>
        <div class="content">
          <div class="head">模版名称</div>
          <el-input class="body" v-model="title" placeholder="请输入模版名称" maxlength="50" type="text" show-word-limit></el-input>
        </div>
      </div>
      <div class="module">
        <div class="guide">
          <span></span>
          <p>包邮配送区域<i>(勾选表示包邮)</i></p>
        </div>
        <div class="content-wrap">
          <el-checkbox v-model="allChecked" style="margin-bottom:15px" @change="checkAll">全部</el-checkbox>
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="item.nid" v-for="(item, index) in parcelList" :key="index">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="module">
        <div class="guide">
          <span></span>
          <p>买家付邮费区域</p>
        </div>
        <div class="content-wrap">
            <div class="charge-item" v-for="(item, index) in noParcelList" :key="index">
              <div class="name">
                <p>{{item.name}}</p>
                <div>
                  <el-checkbox style="width:auto" v-model="item.no_delivery" label="不配送" @change="isBan(item,index)"></el-checkbox>
                </div>
              </div>
              <div class="_body">
                <div>
                    <el-input v-model="item.within" placeholder="请输入件数"></el-input>件内
                    <el-input v-model="item.within_cost" placeholder="请输入价格"></el-input>元
                    <div class="width70"></div>
                    每增加
                    <el-input v-model="item.increase" placeholder="请输入件数"></el-input>件内，
                    增加运费
                    <el-input v-model="item.increase_cost" placeholder="请输入价格"></el-input>元
                </div>
                <div>
                  <el-checkbox v-model="item.free" label="包邮条件" @change="openfree(item,index)"></el-checkbox>
                  满
                  <el-input v-model="item.free_condition" placeholder="请输入数量"></el-input>
                  <el-select v-model="item.unit" placeholder="请选择">
                    <el-option v-for="item1 in item.options"
                      :key="item1.value"
                      :label="item1.label"
                      :value="item1.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
    </div>
  </div>
</div>
</template>

<script>
import { expressAdd, expressAddConfirm, expressEdit, expressEditConfirm } from 'api'
export default {
  name: 'editexpress',
  components: {},
  props: {
    id: [String, Number],
    type: [String, Number]
  },
  data () {
    return {
      title: '',
      allChecked: false,
      allCities: [], // 所有城市
      allCitiesId: [], // 所有城市的id
      parcelList: [], // 包邮列表
      noParcelList: new Set(), // 不包邮列表
      noParcelListId: [], // 不包邮选中的id数组
      checkList: [], // 包邮选中的id数组
      chargeModelArr: [] // 临时存储收费的内容
    }
  },
  computed: {},
  watch: {
    // 监听是否是一个空数组如果是一个空数组 就关闭全部
    checkList: {
      handler () {
        this.checkChargeList()
        // 如果是空数组的全部的按钮就关闭
        if (this.checkList.length === 0) {
          this.allChecked = false
          return
        }
        // 如果是两个数组相等的话 就表示全部选中
        if (this.checkList.length === this.parcelList.length) {
          this.allChecked = true
        } else {
          // 如果没有选中的话 本身allcheced已经是true的话 就false掉 如果不是的话 就不做其他的处理 防止线程流
          if (this.allChecked) {
            this.allChecked = false
          }
        }
      },
      deep: true
    }
  },
  methods: {
    // 开启包邮
    openfree (item, index) {
      this.$set(this.noParcelList[index], 'free', item.free)
    },
    isBan (item, index) {
      this.$set(this.noParcelList[index], 'no_delivery', item.no_delivery)
    },
    checkChargeList () {
      // 遍历选中的数组 把没有选中的数组 加到不包邮的里面去
      let selectArr = this.checkList
      let { allCities } = this
      let diffArr = this.diffArr(allCities, selectArr) // 得到没有选中的数组
      let _diff = diffArr.map(item => {
        return Object.assign({}, item, this.createNewCharge())
      })
      // 如果是空数组的话就直接赋值
      if (!this.noParcelList.length || this.noParcelList.length == 0 || _diff.length == 0) {
        this.noParcelList = _diff
      } else {
        // 如果本身存在的话通过push
        let tempory = this.noParcelList.concat(_diff) // 拼成数组 再去重
        let obj = {}
        let temporyArr = []
        for (let i = 0; i < tempory.length; i++) {
          if (!obj[tempory[i].nid]) {
            temporyArr.push(tempory[i])
            obj[tempory[i].nid] = true
          }
        }
        this.noParcelList = temporyArr
      }
      if (this.type == 1) {
        let lastDiff = this.noParcelList
        let chargeModel = this.chargeModelArr
        for (let i = 0; i < chargeModel.length; i++) {
          for (let k = 0; k < lastDiff.length; k++) {
            if (chargeModel[i].province_nid == lastDiff[k].nid) {
              lastDiff[k].within = chargeModel[i].within
              lastDiff[k].within_cost = chargeModel[i].within_cost
              lastDiff[k].increase = chargeModel[i].increase
              lastDiff[k].increase_cost = chargeModel[i].increase_cost
              lastDiff[k].free = Boolean(chargeModel[i].free)
              lastDiff[k].unit = chargeModel[i].unit
              lastDiff[k].free_condition = chargeModel[i].free_condition
              lastDiff[k].no_delivery = Boolean(chargeModel[i].no_delivery)
            }
          }
        }
        this.noParcelList = lastDiff
      }
    },
    // 数组差异化 取得两个数组的差值
    diffArr (allArr, filterArr) {
      return allArr.filter(function (i) { return filterArr.indexOf(i.nid) < 0 })
    },
    // 创建一个新的收费对象
    createNewCharge (item) {
      return {
        within: 0, // n 件以内
        within_cost: 0, // n元
        increase: 0, // 每增加n件
        increase_cost: 0, // 增加n元
        free: Boolean(1), // 是否有包邮条件 1是0否
        unit: 1, // 单位 1件 2元
        free_condition: 0, // 包邮条件，满 N元/件 包邮
        no_delivery: Boolean(0), // 是否配送
        options: [
          {
            value: 1,
            label: '件'
          },
          {
            value: 2,
            label: '元'
          }
        ]
      }
    },
    returnTitle () {
      return this.type === 0 ? '新增运费模版' : '编辑运费模版'
    },
    checkAll (val) {
      this.checkList = val ? this.allCitiesId : []
    },
    confirm () {
      if (this.title.trim() === '') {
        this.$message({
          type: 'info',
          message: '标题不能为空'
        })
        return
      }
      let noDelivery = []
      let _noParcelList = []
      this.noParcelList.forEach(item => {
        noDelivery.push(item.nid)
        let _obj = {}
        _obj.province_nid = item.nid
        _obj.within = item.within
        _obj.within_cost = item.within_cost
        _obj.increase = item.increase
        _obj.increase_cost = item.increase_cost
        _obj.free = Number(item.free)
        _obj.free_condition = item.free_condition
        _obj.no_delivery = Number(item.no_delivery)
        _obj.unit = item.unit
        _noParcelList.push(_obj)
      })
      // 增加的情况 this.$emit('confirmDialog', true)
      let obj = {}
      obj.title = this.title
      obj.freight_free = this.checkList.join(',')
      // obj.no_delivery = noDelivery.join(',')
      obj.charge_model = JSON.stringify(_noParcelList)
      if (this.type === 0) {
        expressAddConfirm(obj).then(res => {
          this.$emit('confirmDialog', true)
        })
      }
      if (this.type === 1) {
        obj.id = this.id
        expressEditConfirm(obj).then(res => {
          this.$emit('confirmDialog', true)
        })
      }
    },
    close () {
      this.$emit('closeDiaglog', true)
    },
    init () {
      if (this.type == 0) {
        expressAdd({}).then(res => {
          this.allCities = res.data
          for (let i = 0; i < res.data.length; i++) {
            this.allCitiesId.push(res.data[i]['nid'])
          }
          this.parcelList = res.data
          if (this.type === 0) {
            this.parcelList.forEach(item => {
              this.checkList.push(item.nid)
            })
          }
        })
      }
      if (this.type == 1) {
        expressEdit({ id: this.id }).then(res => {
          this.title = res.data.title
          this.checkList = res.data.freight_free // 包邮选中的
          this.chargeModelArr = res.data.charge_model
          this.parcelList = res.data.area_list
          this.allCities = res.data.area_list
          for (let i = 0; i < res.data.area_list.length; i++) {
            this.allCitiesId.push(res.data.area_list[i]['nid'])
          }
        })
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang='scss' scoped>
  .masked{
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 99;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.7);
    .dialog{
      width: 800px;
      height: 700px;
      background: #fff;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 3px;
      box-shadow: 0 10x 30x rgba($color: #000000, $alpha: .3);
      box-sizing: border-box;
      padding: 35px;
      padding-bottom: 20px;
      .inner{
        width: 100%;
        height: calc(100% - 92px);
        overflow-x: hidden;
        overflow-y: scroll;
      }
      .express-title{
        margin-bottom: 30px;
      }
      .module{
        margin-bottom: 30px;
        .guide{
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          span{
            width: 3px;
            height:18px;
            border-radius: 3px;
            display: inline-block;
            background:rgb(102, 102, 102);
            margin-right: 20px;
          }
          p{
            flex: 1;
            overflow: hidden;
            font-size: 13px;
          }
        }
      }
      .content{
        display: flex;
        align-items: center;
        .head{
          width: 80px;
          font-size: 14px;
        }
        .body{
          flex:1;
          overflow: hidden;
        }
      }
    }
    .content-wrap{
      .charge-item{
        background: #eee;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        .name{
          display: inline-block;
          margin-right: 20px;
          font-size: 14px;
        }
        ._body{
          flex: 1;
          display: flex;
          flex-direction: column;
          .el-input{
            width: 60px;
            margin: 0 10px;
            &:first-child{
              margin-left: 0;
            }
            /deep/.el-input__inner{
              height: 30px!important;
              line-height: 30px!important;
            }
          }
          .el-select{
            /deep/.el-input__inner{
              height: 30px!important;
              line-height: 30px!important;
            }
            /deep/ .el-input__icon{
                  line-height: 30px!important;
            }
          }
          &>div{
            display: flex;
            line-height: 30px!important;
            font-size: 14px;
            margin-bottom: 10px;
          }
        }
      }
    }
    .button-wrap{
      text-align: center;
      .centerbutton{
        display: inline-block;
        margin: 0 10px;
      }
    }
  }
  .el-checkbox{
    width: 130px;
  }
</style>
