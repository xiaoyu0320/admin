
<template>
  <div class="ascDetail">
    <div class="clearEdit__info">
      <!-- <div
        class="clearEdit__info-item"
        v-for="(item,i) in list"
        :key="i"
      >
        <label class="clearEdit__info--label"> {{Object.keys(item)[0]}}</label>
        <div class="clearEdit__info--content">
          <el-input
            v-model="item.value"
            :disabled="item.editVisabled"
          ></el-input>
        </div>
      </div> -->
      <template>
        <el-table
          :data="list"
          height="600px"
          style="width: 100%"
        >
          <el-table-column
            prop="coin"
            label="coin"
          ></el-table-column>
          <el-table-column
            prop="contract"
            label="contract"
          ></el-table-column>
          <el-table-column label="createtime">
            <template slot-scope="scope">
              {{formatTime(scope.row.createtime)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="fhbid"
            label="fhbid"
          ></el-table-column>
          <el-table-column
            prop="hash"
            label="hash"
          ></el-table-column>
          <el-table-column
            prop="memo"
            label="memo"
          ></el-table-column>
          <el-table-column
            prop="uid"
            label="uid"
          ></el-table-column>

        </el-table>
        <div class="store__pagecount">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pageCount"
            :current-page.sync="page"
            :page-size="1500"
            @current-change="pageChange()"
          ></el-pagination>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { coinLog } from 'api'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    parameId: {
      type: String,
      default: '',
      page: 1,
      pageCount: null
    }
  },
  data () {
    // 这里存放数据
    return {
      shopObj: {},
      list: [],
      keyArr: [],
      valueArr: []
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    parameId (val) {
      if (val) {
        this.list = []
        this.getlist()
      }
    }
  },
  // 方法集合
  methods: {
    pageChange () {
      this.list = []
      this.getlist()
    },
    getlist () {
      coinLog({
        managerUid: this.parameId,
        page: this.page
      }).then(res => {
        this.list = res.data.list
        this.pageCount = res.data.count
      })
    },
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
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getlist()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { }
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
.ascDetail {
  padding-bottom: 40px;
}
</style>
