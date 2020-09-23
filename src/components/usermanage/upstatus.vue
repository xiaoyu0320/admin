<template>
  <div class="masked" @click="close">
    <div class="dialog" @click.stop="stopBubbling">
      <div class="dialog" @click.stop="stopBubbling">
        <i class="el-icon-close" @click="close"></i>
        <div class="title">上传商家资质</div>
        <div class="updetail">
          <template v-for="(item, index) in masterImglist">
            <upimage @getImage="getImage" :item="item" :key="'img' + index" />
          </template>
        </div>
        <div class="bottom-wrap upbottom">
          <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
          <el-button class="centerbutton" plain @click.prevent="close">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { license } from 'api'
import upimage from '@c/usermanage/upimage'
export default {
  components: {
    upimage
  },
  data () {
    return {
      masterImglist: [{ name: '*营业执照图片', param: 'license' }, { name: '*食品许可证图片', param: 'food' }, { name: '*开户行许可证图片', param: 'bank' }, { name: '*身份证正面', param: 'positive_card' }, { name: '*身份证反面', param: 'negative_card' }, { name: '*其他证件', param: 'other' }],
      group: { license: '', food: '', bank: '', positive_card: '', negative_card: '', other: '' }
    }
  },
  methods: {
    getImage (item) {
      for (let key in this.group) {
        if (key === item.param) {
          this.group[key] = item.url
        }
      }
    },
    confirm () {
      let { group } = this
      if (!group.license.trim()) {
        this.$message({
          type: 'info',
          message: '请上传营业执照图片!'
        })
        return
      }
      if (!group.food.trim()) {
        this.$message({
          type: 'info',
          message: '请上传食品许可证图片!'
        })
        return
      }
      if (!group.bank.trim()) {
        this.$message({
          type: 'info',
          message: '请上传开户行许可证图片!'
        })
        return
      }
      if (!group.positive_card.trim()) {
        this.$message({
          type: 'info',
          message: '请上传身份证正面!'
        })
        return
      }
      if (!group.negative_card.trim()) {
        this.$message({
          type: 'info',
          message: '请上传身份证反面!'
        })
        return
      }
      license(group).then(res => {
        this.$message({
          type: 'success',
          info: '上传成功'
        })
        this.close()
      })
    },
    close () {
      // 向外部传递一个关闭弹窗的动作
      this.$emit('closeDiaglog', true)
    }
  }
}
</script>
<style lang="scss" scoped>
  .masked{
    .dialog{
      .uphead{
        margin-top: 20px;
      }
    }
    .updetail{
      width: 100%;
      height: 75vh;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .upbottom{
      margin-top: 30px;
      text-align: center;
    }
  }
</style>
<style lang='scss' scoped>
@import './dialog.scss'
</style>
