
<template>
  <div class='addStore'>
    <div class="clearEdit__info">
      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">投资类型</label>
        <div class="clearEdit__info--content">

          <el-select
            v-model="storeObj.baseid"
            placeholder="请选择"
            @change="handleClick"
          >
            <el-option
              v-for="item in type"
              :key="item.baseid"
              :label="item.name"
              :value="item.baseid"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">contract</label>
        <div class="clearEdit__info--content">
          <el-select
            v-model="storeObj.contract"
            placeholder="请选择"
          >
            <el-option
              v-for="item in contract"
              :key="item.contract"
              :label="item.name"
              :value="item.contract"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">money</label>
        <div class="clearEdit__info--content">
          <el-input
            v-model="storeObj.money"
            @input="changeMonet"
          ></el-input>
        </div>
      </div>
      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">待释放金额</label>
        <div class="clearEdit__info--content">
          <el-input v-model="storeObj.left"></el-input>
        </div>
      </div>

      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">操作人</label>
        <div class="clearEdit__info--content">
          <el-input v-model="storeObj.managerUid"></el-input>
          <el-button @click="open()">选择</el-button>
        </div>
      </div>

      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">创建时间</label>
        <div class="clearEdit__info--content">
          <el-date-picker
            v-model="createtime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">开始释放时间</label>
        <div class="clearEdit__info--content">
          <el-date-picker
            v-model="starttime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">最后释放时间</label>
        <div class="clearEdit__info--content">
          <el-date-picker
            v-model="lastbacktime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">speed</label>
        <div class="clearEdit__info--content">
          <el-input v-model="storeObj.speed"></el-input>
        </div>
      </div>
      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">frozeweek</label>
        <div class="clearEdit__info--content">
          <el-input v-model="storeObj.frozeweek"></el-input>
        </div>
      </div>

      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">实际转账待币</label>
        <div class="clearEdit__info--content">
          <el-input v-model="storeObj.tokenValue"></el-input>
        </div>
      </div>
      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">项目名称</label>
        <div class="clearEdit__info--content">
          <el-input
            v-model="storeObj.title"
            disabled
          ></el-input>
        </div>
      </div>
      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">mobile</label>
        <div class="clearEdit__info--content">
          <el-input
            v-model="storeObj.mobile"
            disabled
          ></el-input>
        </div>
      </div>

      <div class="clearEdit__info-item">
        <label class="clearEdit__info--label">imgUrl</label>
        <div class="clearEdit__info--content">
          <el-input
            v-model="storeObj.imgUrl"
            disabled
          ></el-input>
        </div>
      </div>

      <el-button
        type="primary"
        @click="save()"
      >保存</el-button>
    </div>

  </div>
</template>

<script>
import { addBaseFrozeLog, baseList } from 'api'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    addStore: {
      string: Boolean,
      default: false
    },
    getInfo: {
      string: Object,
      default: {}
    }
  },
  data () {
    // 这里存放数据
    return {
      createtime: '',
      lastbacktime: '',
      starttime: '',
      storeObj: {
        contract: '',
        createtime: '',
        frozeweek: 100,
        imgUrl: 'http://wallet.ascchain.com/uploads/20190805/80354a2f040f50814738e6a6e455f7bf.png',
        left: '',
        mobile: '',
        nickname: '',
        periods: '',
        speed: '',
        title: '',
        tokenValue: '',
        baseid: '',
        starttime: '',
        lastbacktime: '',
        uid: '43803fa88d96440d8fee83d168becf13',
        managerUid: '',
        money: null
      },
      changeUser: false,
      type: [],
      contract: [{
        name: 'EOS',
        contract: 'eosio.token'
      }, {
        name: 'EHT',
        contract: 'ETH'
      }, {
        name: 'WTC',
        contract: '0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74'
      }, {
        name: 'USDT',
        contract: '0xdac17f958d2ee523a2206206994597c13d831ec7'
      }],
      list: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    changeMonet (val) {
      if (val) {
        this.storeObj.left = val
      }
    },
    save () {
      this.storeObj.createtime = this.timersjc(this.createtime) / 1000
      this.storeObj.lastbacktime = this.timersjc(this.lastbacktime) / 1000
      this.storeObj.starttime = this.timersjc(this.starttime) / 1000

      addBaseFrozeLog(this.storeObj).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        this.$emit('callback', false)
      })
    },
    handleClick (val) {
      this.list.map(data => {
        if (data.id == val) {
          this.storeObj.title = data.title
          this.storeObj.imgUrl = data.imgUrl
        }
      })
    },
    contractChange (item) {
      this.storeObj.contract = item.contract
    },
    open () {
      this.$emit('callback', true)
    },
    timerTser (str) {
      var d = new Date(str)

      var datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()

      return datetime
    },
    timersjc (str) {
      let times = this.timerTser(str)

      var timestamp1 = (new Date(times)).valueOf()
      return timestamp1
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    baseList({}).then(res => {
      let arr = []
      res.data.list.map(item => {
        arr.push({
          baseid: item.id,
          name: item.title
        })
      })
      this.type = arr
      this.list = res.data
    })
  },
  // eslint-disable-next-line no-dupe-keys
  watch: {
    getInfo (val) {
      if (val) {
        this.storeObj.managerUid = val.uid
        this.storeObj.mobile = val.mobile
      }
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  }

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
<style>
.el-select .el-input {
  margin: 0;
}
</style>
