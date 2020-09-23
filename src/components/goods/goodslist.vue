<!--  -->
<template>
<div class='app-container'>
  <div class="top">
    <el-input v-model="keyword" placeholder="请输入商品名称/ID"></el-input>
    <el-button type="primary" @click.prevent="search">搜索</el-button>
  </div>
  <el-table :data="list" border stripe>
    <el-table-column
      label="商品"
      width="300px"
      >
      <template slot-scope="scope">
        <div class="goods-inner-wrap">
           <div class="img-wrap">
             <img :src="scope.row.primary_img.original_pic" alt="">
           </div>
           <div class="info">
            <p>{{scope.row.title}}</p>
            <p>供货价:¥{{scope.row.cost_price}}</p>
            <p>销售价:¥{{scope.row.sale_price}}</p>
            <p>市场价:¥{{scope.row.market_price}}</p>
           </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="stock"
      label="库存"
      width="100px"
    >
    </el-table-column>
    <el-table-column
      prop="start_time"
      label="开始时间">
    </el-table-column>
    <el-table-column
      prop="end_time"
      label="结束时间">
    </el-table-column>
    <el-table-column
      prop="status_name"
      width="100px"
      label="状态">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button
          @click.prevent="edit(scope)"
          type="text"
          size="small">
          编辑
        </el-button>
        <el-button
          @click.prevent="audit(scope)"
          type="text"
          v-if="type==0"
          size="small">
          审核
        </el-button>
        <el-button
          @click.prevent="operation(scope,1)"
          type="text"
          v-if="scope.row.status==3"
          size="small">
          开启
        </el-button>
        <el-button
          @click.prevent="operation(scope,0)"
          type="text"
          v-if="scope.row.status==1"
          size="small">
          暂停
        </el-button>
        <el-button
          @click.prevent="setprice(scope)"
          type="text"
          v-if="type==1"
          size="small">
          设置价格
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
     background
      layout="prev, pager, next"
      :hide-on-single-page="hideOn"
      @current-change="changePage"
      :total="total">
  </el-pagination>
  <div class="masked" v-if="dialog" >
    <div class="dialog">
      <editgoods :id="editId" :type="1" @confirmDialog="confirmDialog"  @closeDiaglog="closeDiaglog"></editgoods>
    </div>
  </div>
   <setprice v-if="dialogPrice" :item="item" @confirmDialog="confirmSetprice"  @closeDiaglog="closeDiaglog"></setprice>
</div>
</template>

<script>
import { goodsList, setGoodsStatus, goodsAudit } from 'api'
import editgoods from '@c/goods/editgoods'
import setprice from '@c/goods/setprice'
export default {
  components: {
    editgoods, setprice
  },
  props: {
    type: [String, Number]
  },
  data () {
    return {
      keyword: '',
      page: 1,
      total: 10,
      list: [],
      dialog: false,
      editId: 0,
      hideOn: true,
      dialogPrice: false,
      item: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    setprice (item) {
      this.item = null
      this.item = item.row
      this.dialogPrice = true
    },
    confirmDialog () {
      this.dialog = false
      this.getlist()
    },
    confirmSetprice () {
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.getlist()
      this.dialogPrice = false
    },
    closeDiaglog () {
      this.dialog = false
      this.dialogPrice = false
    },
    edit (item) {
      this.editId = item.row.id
      this.dialog = true
    },
    audit (item) {
      this.$confirm(`确认通过"${item.row.title}"商品`, {
        confirmButtonText: '通过',
        cancelButtonText: '拒绝',
        type: 'info'
      }).then(() => {
        goodsAudit({ id: item.row.id, status: 1 }).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getlist()
        })
      }).catch(() => {
        goodsAudit({ id: item.row.id, status: 2 }).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getlist()
        })
      })
    },
    /**
     * @param {Object} item 对象内容
     * @param {Number} type 0表示操作的是要暂停 1表示操作的是要开启
     */
    operation (item, type) {
      let obj = {}
      obj.id = item.row.id
      if (type == 0) {
        obj.status = 3
      }
      if (type == 1) {
        obj.status = 1
      }
      setGoodsStatus(obj).then(res => {
        this.$message({
          type: 'success',
          message: '设置成功'
        })
        this.getlist()
      })
    },
    returnStatus (val) {
      switch (val) {
        case 0: return '待审核'
        case 1: return '清货中'
        case 2: return '审核不通过'
        case 4: return '已结束'
      }
    },
    changePage (val) {
      this.page = val
      this.getlist()
    },
    getlist () {
      let obj = {}
      obj.keyword = this.keyword
      obj.page = this.page
      obj.type = this.type
      goodsList(obj).then(res => {
        this.list = res.data.list
        this.total = res.data.page_count
      })
    },
    search () {
      this.page = 1
      this.getlist()
    }
  },
  created () {
    this.getlist()
  }
}
</script>
<style lang='scss' scoped>
  .top{
    display: flex;
    margin-bottom: 10px;
    .el-input{
      width:200px;
      margin-right: 20px;
    }
  }
  .goods-inner-wrap{
    display: flex;
    width: 240px;
    .img-wrap{
      width: 100px;
      height: 100px;
      overflow: hidden;
      margin-right: 10px;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .info{
      flex: 1;
      overflow: hidden;
    }
  }
  .masked{
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 99;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.7);
    .dialog{
      width: 800px;
      max-height: 600px;
      background: #fff;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 3px;
      box-shadow: 0 10x 30x rgba($color: #000000, $alpha: .3);
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: scroll;
      padding: 30px;
    }
  }
</style>
