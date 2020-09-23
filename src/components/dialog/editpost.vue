<!--  -->
<template>
<div class="masked" @click="close">
  <div class="dialog" @click.stop="stopBubbling" v-loading="loading">
     <div class="title">{{returnTitle()}}</div>
     <div class="item">
        <div class="head">开户人:</div>
        <el-input v-model="postInfo.card_name" placeholder="请输入开户人"></el-input>
     </div>
     <div class="item">
        <div class="head">开户行卡号:</div>
        <el-input v-model="postInfo.card_no" type="number" placeholder="请输入开户行的卡号"></el-input>
     </div>
     <div class="item">
        <div class="head">开户行:</div>
        <el-select v-model="postInfo.type" placeholder="请选择开户行">
          <el-option v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
     </div>
     <div class="item">
        <div class="head">开户支行:</div>
        <el-input v-model="postInfo.sub_branch" placeholder="请输入开户行支行"></el-input>
     </div>
     <div class="button-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
     </div>
  </div>
</div>
</template>

<script>
import { addPost, editPost, editPostConfirm } from 'api'
export default {
  components: {},
  data () {
    return {
      postInfo: {
        card_name: '',
        type: '',
        sub_branch: '',
        card_no: ''
      },
      options: [
        {
          value: 1,
          label: '工商银行'
        },
        {
          value: 2,
          label: '建设银行'
        },
        {
          value: 3,
          label: '招商银行'
        },
        {
          value: 4,
          label: '交通银行'
        },
        {
          value: 5,
          label: '农业银行'
        },
        {
          value: 6,
          label: '平安银行'
        },
        {
          value: 7,
          label: '华夏银行'
        }
      ],
      loading: false
    }
  },
  props: {
    id: [String, Number],
    type: [String, Number]
  },
  computed: {},
  watch: {},
  methods: {
    getPostInfo () {
      editPost({ id: this.id }).then(res => {
        let info = this.postInfo;
        ({ card_name: info.card_name, type: info.type, card_no: info.card_no, sub_branch: info.sub_branch } = res.data)
      })
    },
    returnTitle () {
      return this.type === 0 ? '新增银行卡' : '编辑银行卡'
    },
    confirm () {
      // 新增的接口
      if (!this.postInfo.card_name.trim()) {
        this.$message({
          type: 'info',
          message: '请输入开户人!'
        })
        return
      }
      if (!this.postInfo.card_no.trim()) {
        this.$message({
          type: 'info',
          message: '请输入开户卡号!'
        })
        return
      }
      if (!this.postInfo.type) {
        this.$message({
          type: 'info',
          message: '请选择银行!'
        })
        return
      }
      if (!this.postInfo.sub_branch.trim()) {
        this.$message({
          type: 'info',
          message: '请输入开户支行!'
        })
        return
      }
      if (this.type === 0) {
        addPost(this.postInfo).then(res => {
          this.$emit('confirmDialog', true)
        })
      } else {
        let obj = this.postInfo
        obj.id = this.id
        editPostConfirm(obj).then(res => {
          this.$emit('confirmDialog', true)
        })
      }
    },
    close () {
      // 向外部传递一个关闭弹窗的动作
      this.$emit('closeDiaglog', true)
    }
  },
  created () {
    if (this.type === 1) {
      this.getPostInfo()
    }
  },
  mounted () {
  },
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
@import './dialog.scss'
</style>
