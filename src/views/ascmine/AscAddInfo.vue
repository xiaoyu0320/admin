<template>
  <div class="info">
    <el-form
      :inline="true"
      label-position="left"
      :model="AscInfo"
      class="demo-form-inline"
      label-width="110px"
    >
      <el-form-item style="margin-top: 0px" label="矿机名称：">
        <el-input v-model="AscInfo.name" placeholder="请输入矿机名称"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 0px" label="矿机型号：">
        <el-input v-model="AscInfo.spec" placeholder="请输入矿机型号"></el-input>
      </el-form-item>
      <el-form-item style="margin: 0 10px 0 0" label="矿机图片地址：">
        <el-upload action name="imgFiles" multiple :before-upload="beforeAvatarUpload">
          <img width="120px;" v-if="AscInfo.img" :src="AscInfo.img"  style="display:inline-block;float:left"/>
          <el-button style="margin-top: 20px !important;" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin: 20px 10px 0 0" label="单位：">
        <el-select v-model="AscInfo.type" placeholder="请选择单位">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-top: 20px" label="收益率：">
        <el-input v-model="AscInfo.yield" placeholder="请输入收益率"></el-input>
      <label class="pos-right">  {{AscInfo.type == '1' ? '倍' : '枚'}}</label>
      </el-form-item>
      <!-- <el-form-item style="margin-top: 0px" label="矿产量">
        <el-input v-model="AscInfo.output" placeholder="请输入矿产量"></el-input>
      </el-form-item>
      <el-form-item style="margin-top: 0px" label="算力值">
        <el-input v-model="AscInfo.hashrate" placeholder="请输入算力值"></el-input>
      </el-form-item>-->
      <!-- <el-form-item style="margin-top: 0px" label="累计产量">
        <el-input v-model="AscInfo.total_output" placeholder="请输入累计产量"></el-input>
      </el-form-item>-->
      <el-form-item style="margin-top: 0px" label="运行周期：">
        <el-input v-model="AscInfo.cycle" placeholder="请输入运行周期"></el-input> <label class="pos-right">时</label>
      </el-form-item>
      <el-form-item style="margin-top: 0px" label="价格：">
        <el-input v-model="AscInfo.asc" placeholder="请输入价格"></el-input> <label class="pos-right" > {{AscInfo.type == '1' ? '￥' : '枚'}}</label>
      </el-form-item>
      <el-form-item style="margin-top: 0px" label="矿机总数：">
        <el-input v-model="AscInfo.stock" placeholder="请输入矿机总数"></el-input><label class="pos-right">台</label>
      </el-form-item>
      <el-form-item style="margin-top: 0px" label="每人限购数：">
        <el-input v-model="AscInfo.limit_qty" placeholder="请输入每人限购数"></el-input><label class="pos-right"> 台</label>
      </el-form-item>
      <el-form-item style="margin-top: 0px" label="矿机状态：">
        <el-radio-group style="margin-top: 5px;" v-model="AscInfo.status">
          <el-radio :label="0">下架</el-radio>
          <el-radio :label="1">上架</el-radio>
        </el-radio-group>
      </el-form-item>
      <br />
      <el-form-item style="margin-top:20px;margin-left:180px;">
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { AscAdd } from 'api'
import { geturl } from '@/utils/service'
export default {
  props: ['AscInfo'],
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      options: [
        {
          value: 1,
          label: '金本位'
        },
        {
          value: 2,
          label: '币本位'
        }
      ],
      rlues: {}
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return
      }
      this._upload(file)
    },
    async _upload (file) {
      let formData = new FormData()
      formData.append('imgFiles', file)
      formData.append('token', this.$store.state.user.token)
      formData.append('uid', this.$store.state.user.userinfo.uid)
      const xhr = new XMLHttpRequest()
      xhr.withCredentials = true
      xhr.open('POST', geturl() + '/mine/upload', true)
      xhr.send(formData)
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 304) {
          let res = JSON.parse(xhr.responseText)
          if (res.code === 200) {
            this.AscInfo.img = res.data.url
            this.$message.success(res.msg)
            return Promise.resolve(true)
          } else {
            this.$message.error(res.msg)
          }
        } else {
          this.$message(`${xhr.status} 请求错误!`)
        }
      }
    },
    onSubmit () {
      // if ((this.AscInfo.type = '金本位')) {
      //   this.AscInfo.type = 1
      // } else {
      //   this.AscInfo.type = 2
      // }

      AscAdd(this.AscInfo).then(res => {
        if (res.code == 200) {
          this.$message({
            message: '添加矿机成功',
            type: 'success'
          })
          this.$emit('checkadd', false)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    let a = geturl()
    console.log(a)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, // 生命周期 - 创建之前
  beforeMount () {}, // 生命周期 - 挂载之前
  beforeUpdate () {}, // 生命周期 - 更新之前
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {}, // 生命周期 - 销毁之前
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
.info .demo-form-inline {
  width: 500px;
  margin: 0 auto;
}
.info .el-input {
  margin-left: 0 !important;
}
.info .el-form-item {
  position: relative;
  padding-right:50px
}
.pos-right {
  position: absolute;
  right: -20px;
  top:0
}
</style>
