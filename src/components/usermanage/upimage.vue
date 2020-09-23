<template>
  <div class="items" style="margin-top:20px;">
    <div class="head uphead">
      {{item.name}}
    </div>
    <div class="_body">
      <el-upload
      class="upload-demo"
      ref="license"
      :class="{disabled:uploadDisabled}"
      :action="baseurl+'/user/upload'"
      :on-remove="handleRemove"
      :before-upload ="beforeUpload"
      :before-remove="beforeRemove"
      :on-success="imageUploadSuccess"
      :data="fileinfo"
      :limit="1"
      list-type="picture-card">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>
<script>
import { geturl } from '@/utils/service'
import { getToken } from '@/utils/auth'
import { isJpgPng } from '@/utils/validate'
export default {
  props: ['item'],
  data () {
    return {
      baseurl: geturl(),
      fileinfo: {
        uid: getToken('shop_uid'),
        token: getToken('shop_token')
      },
      file: ''
    }
  },
  methods: {
    imageUploadSuccess (response) {
      const { data: { url } } = response
      this.file = url
    },
    beforeUpload (file) {
      if (!isJpgPng(file.name)) {
        this.$message.warning(`只能上传jpg或者是png图片，请重新选择`)
        return false
      }
    },
    beforeRemove (file, fileList) {
      if (file && file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    },
    handleRemove (file, fileList) {
      this.file = ''
    }
  },
  watch: {
    file (value) {
      this.item.url = value
      this.$emit('getImage', this.item)
    }
  },
  computed: {
    uploadDisabled () {
      if (this.file === '') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style lang="scss" scope>
  .disabled .el-upload--picture-card {
    display: none;
  }
</style>
