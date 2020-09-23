<template>
  <div class="Ascmine">

    <div class="header">
       <div style="margin: 15px 0;">
          <el-input
            placeholder="请输入矿机名称/矿机机型"
            v-model="searchContent"
            style="width:300px"
          >
          </el-input>
          <el-button
            type="primary"
            class="search__btn"
            @click="search()"
          >搜索</el-button>
          <el-button type="primary" suffix-icon="el-icon-refresh" @click.native="add" size="large">新增</el-button>
      </div>
    </div>
    <div class="main">
      <el-table :data="AscList" border stripe style="width: 99.9% !important; " height="650">
        <el-table-column label="#" prop="id" width="50"></el-table-column>
        <el-table-column label="矿机名称" prop="name" width="150"></el-table-column>
        <el-table-column label="矿机型号" prop="spec" width="150"></el-table-column>
        <el-table-column prop="img" label="矿机封面" width="100">
          <template slot-scope="scope">
            <img class="goodsImg" :src="scope.row.img" alt />
          </template>
        </el-table-column>
        <el-table-column label="矿产量(天)" prop="output" width="150"></el-table-column>
        <el-table-column label="算力值(时)" prop="hashrate" width="150"></el-table-column>
        <el-table-column label="预计总产量" prop="total_output" width="150">
           <template slot-scope="scope">
             <div v-if="scope.row.type == '2'"> {{scope.row.total_output}}枚 </div>
              <div v-else> {{scope.row.total_output}} ￥ </div>
          </template>
        </el-table-column>
        <el-table-column label="运行周期(时)" prop="cycle" width="150"></el-table-column>
        <el-table-column label="价格"  width="150">
          <template slot-scope="scope">
             <div v-if="scope.row.type == '2'"> {{scope.row.asc}}枚 </div>
              <div v-else> {{scope.row.asc}} ￥ </div>
          </template>
        </el-table-column>
        <el-table-column label="矿机总数(台)" prop="stock" width="150"></el-table-column>
        <el-table-column label="每人限购数(台)" prop="limit_qty" width="150"></el-table-column>
        <el-table-column label="状态名" prop="status_name" width="150"></el-table-column>
        <el-table-column label="添加时间" prop="create_time" width="200"></el-table-column>
        <el-table-column label="操作" fixed="right" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="setStatus(scope.row)"
            >{{scope.row.status == 0 ? '上架' : '下架'}}</el-button>
            <el-button size="mini" type="primary" @click="edit(scope.row.id)">修改矿机</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增矿机 -->
    <el-dialog title="新增矿机" :visible.sync="checkAdd" width="48%">
      <asc-add-info @checkadd="checkadd" :AscInfo="AscInfo" />
    </el-dialog>
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { AscList, AscEdit, AscSetStatus } from 'api'
import AscAddInfo from './AscAddInfo.vue'
export default {
  // import引入的组件需要注入到对象中才能使用
  data () {
    // 这里存放数据
    return {
      page: -1,
      AscInfo: {
        name: '',
        spec: '',
        img: '',
        yield: '',
        type: '',
        // output: '',
        // hashrate: '',
        total_output: '',
        cycle: '',
        asc: '',
        stock: '',
        limit_qty: '',
        status: ''
      },
      AscList: [],
      checkAdd: false,
      searchContent: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    search () {
      this.AscList = []
      this._AscList()
    },
    checkadd (status) {
      this.checkAdd = status
      this._AscList()
    },
    edit (id) {
      let obj = {
        id: id
      }
      AscEdit(obj).then(res => {
        if (res.code == 200) {
          res.data.type = Number(res.data.type)
          this.AscInfo = res.data
          this.AscInfo.status = Number(this.AscInfo.status)
          this.checkAdd = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    setStatus (item) {
      let msg = ''
      let type = ''
      if (item.status == 0 || item.status == '0') {
        msg = '是否上架'
        type = 1
      } else {
        msg = '是否下架'
        type = 0
      }
      this.$confirm(msg, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let obj = {}
          obj.id = item.id
          obj.status = type
          AscSetStatus(obj).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this._AscList()
            }
          })
        })
        .catch(() => {})
    },
    add () {
      this.AscInfo = {
        name: '',
        spec: '',
        img: '',
        yield: '',
        type: '',
        limit_qty: '',
        stock: '',
        // output: '',
        // hashrate: '',
        total_output: '',
        cycle: '',
        asc: '',
        status: ''
      }
      this.checkAdd = true
    },
    _AscList () {
      let obj = {
        page: this.page
      }
      if (this.searchContent) {
        obj.keywords = this.searchContent
      }
      AscList(obj).then(res => {
        if (res.code == 200) {
          this.AscList = res.data.list
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  components: {
    AscAddInfo
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this._AscList()
  }

}
</script>
<style scoped>
.Ascmine .goodsImg {
  width: 60px;
  height: 60px;
}
</style>
