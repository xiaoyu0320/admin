<template>
  <div class="ascManage">
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入关键词"
        v-model="userAccunt"
      >
        <template slot="prepend">搜索关键词</template>
      </el-input>
      <el-button
        type="primary"
        class="search__btn"
        @click="search()"
      >搜索</el-button>
      <span style="float: right;margin-top: 15px;">用户总数：{{pageCount}}</span>
    </div>
    <div class="asc__table">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="650px"
        >
          <el-table-column
            label="contract"
            width="180"
          >
            <template slot-scope="scope">
              <div class="detail__pic--box">
                <div class="detail__pic--txt">
                  <p>{{scope.row.contract}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createtime"
            label="创建时间"
            width="180"
          >
            <template slot-scope="scope">{{formatTime(scope.row.createtime)}}</template>
          </el-table-column>
          <el-table-column
            prop="from"
            label="from"
          ></el-table-column>
          <el-table-column
            prop="hash"
            label="hash"
          ></el-table-column>
          <el-table-column
            prop="money"
            label="money"
          ></el-table-column>
          <el-table-column
            prop="quantity"
            label="quantity"
          ></el-table-column>
          <el-table-column
            prop="reason"
            label="reason"
          ></el-table-column>
          <el-table-column
            prop="to"
            label="to"
          ></el-table-column>
          <el-table-column label="status">
            <template slot-scope="scope">
              {{statusName(scope.row.status)}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button
                type="primary"
                size="small"
                @click="detail(scope.row.id)"
              >详情</el-button> -->
              <el-button
                type="primary"
                size="small"
                @click="del(scope.row.id)"
                v-if="scope.row.status == 0"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="store__pagecount">
           <el-pagination
            background
            layout="prev, pager, next"
            :total="pageCount"
            :current-page.sync="page"
            :page-size="15"
            @current-change="pageChange()"
          ></el-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { transferLog } from 'api'
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      page: 1,
      tableData: [],
      pageCount: null,
      userAccunt: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    formatTime (str) {
      str = str + '000'
      str = parseInt(str)
      let time = new Date(str)
      let Y = time.getFullYear()
      let M =
        parseInt(time.getMonth()) + 1 > 9
          ? parseInt(time.getMonth()) + 1
          : '0' + (parseInt(time.getMonth()) + 1)
      let D = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
      return `${Y}/${M}/${D}`
    },
    detail (id) {
      this.$router.push({
        path: '/main/ascDetail',
        query: {
          id: id
        }
      })
    },
    pageChange () {
      this.tableData = []
      this.getlist()
    },
    search () {
      this.tableData = []
      this.getlist()
    },
    getlist () {
      const obj = {}
      obj.type = 5
      obj.page = this.page
      if (this.userAccunt) {
        obj.keywords = this.userAccunt
      }
      transferLog(obj).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.pageCount = res.data.count
        }
      })
    },
    statusName (str) {
      switch (str) {
        case 0:
          return '待处理'
        case 1:
          return '处理中'
        case 2:
          return '成功'
        case 3:
          return '失败'
        case 5:
          return '人工操作1'
        case 8:
          return '三次尝试失败放弃'
        default:
          return '其它'
      }
    },
    del (id) {
      // let obj = {}
      // obj.id = id
      // obj.type = 5
      // obj.op = 3
      // this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   getAscManagerLog(obj).then(res => {
      //     if (res.status == 200) {
      //       this.$message({
      //         type: 'success',
      //         message: '删除成功!'
      //       })
      //       this.tableData = []
      //       this.getlist()
      //     }
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getlist()
  },

  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },

  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scope>
.asc__overflow {
  height: 70px;
  overflow: auto;
}
.detail__pic--box {
  display: flex;
  align-items: center;
}
.detail__pic--box img {
  display: block;
  width: 50px;
  height: auto;
  margin: 0 auto;
}
.detail__pic--box p {
  text-align: left;
}
.detail__pic--txt {
  margin-left: 20px;
}
</style>
