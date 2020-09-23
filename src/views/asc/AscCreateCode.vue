<template>
  <div class="ascManage">
    <div class="asc__table">
      <div style="margin-top: 15px;">
        <el-input
          placeholder="请输入用户账号"
          v-model="userAccunt"
        >
          <template slot="prepend">用户账户</template>

        </el-input>
        <el-button
          type="primary"
          class="search__btn"
          @click="search()"
        >搜索</el-button>

      </div>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="650px"
        >
          <el-table-column
            label="nickname"
            width="180"
          >
            <template slot-scope="scope">
              <div class="detail__pic--box">
                <div class="detail__pic--txt">
                  <p>{{scope.row.nickname}}</p>
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
            prop="money"
            label="money"
          ></el-table-column>
          <el-table-column
            prop="mobile"
            label="mobile"
          ></el-table-column>
          <el-table-column
            prop="cpu"
            label="cpu"
          ></el-table-column>
          <el-table-column
            prop="net"
            label="net"
          ></el-table-column>
          <el-table-column
            prop="owner"
            label="owner"
          ></el-table-column>
          <el-table-column
            prop="ram"
            label="ram"
          ></el-table-column>
          <el-table-column
            prop="eosaccount"
            label="eosaccount"
          ></el-table-column>
          <el-table-column
            prop="addr"
            label="addr"
          ></el-table-column>
          <el-table-column
            prop="active"
            label="active"
          ></el-table-column>
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="detail(scope.row.id)">详情</el-button>
            </template>
          </el-table-column>-->
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
import { AscaccountLog } from 'api'
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
      obj.page = this.page
      if (this.userAccunt) {
        obj.keywords = this.userAccunt
      }
      AscaccountLog(obj).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.pageCount = res.data.count
        }
      })
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
