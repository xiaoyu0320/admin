<!--  -->
<template>
<div class='app-container'>
   <div class="levellist">
      <el-input
        style="width:300px;margin:20px 0;"
        placeholder="请输入内容"
        v-model="keywords"
        >
        <el-button slot="append" icon="el-icon-search" @click.native="getRegimentalList"></el-button>
      </el-input>
      <el-button style="margin-left:15px;" type="primary" @click="edit(0)" size="small">新增团长等级</el-button>
      <el-table :data="data.list" border stripe v-loading="loading">
        <el-table-column
          prop="addtime"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="clean_level_name"
          label="等级名">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button plain size="small" round @click.native="edit(1,scope.row)">编辑</el-button>
            <el-button plain size="small" round @click.native="edit(2,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
   </div>
  <dialoglevel v-if="dialogFlag" :id="id" :type="type" :levelName="levelName"  @confirmDialog="confirmDialog"  @closeDiaglog="closeDiaglog"></dialoglevel>
</div>
</template>

<script>
import { levelList, deleteLevel } from 'api'
import dialoglevel from '@c/usermanage/dialoglevel'
export default {
  components: {
    dialoglevel
  },
  data () {
    return {
      page: 1,
      total: 1,
      data: {},
      keywords: '',
      loading: false,
      type: 0,
      id: 0,
      levelName: '',
      dialogFlag: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    getRegimentalList () {
      const obj = {}
      obj.keywords = this.keywords
      this.loading = true
      levelList(obj).then(res => {
        this.data = res.data
        this.loading = false
      }, () => {
        this.loading = false
      })
    },
    /**
     * @param { Number } 0 添加 1修改 2删除
     */
    edit (type, item) {
      switch (type) {
        case 0:
          this.id = 0
          this.type = 0
          this.levelName = ''
          this.dialogFlag = true
          break
        case 1:
          this.id = item.id
          this.type = 1
          this.levelName = item.clean_level_name
          this.dialogFlag = true
          break
        case 2:
          this.$confirm('确认删除？', {
            type: 'warning'
          }).then(res => {
            deleteLevel({ level_id: item.id }).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getRegimentalList()
            })
          })
          break
      }
    },
    confirmDialog () {
      this.dialogFlag = false
      const text = this.type == 0 ? '添加成功' : '修改成功'
      this.$message({
        type: 'success',
        message: text
      })
      this.getRegimentalList()
    },
    closeDiaglog () {
      this.dialogFlag = false
    }
  },
  created () {
    this.getRegimentalList()
  }
}
</script>
<style lang='scss' scoped>
</style>
