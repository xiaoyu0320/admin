<template>
  <div class="AscOrderList">
     <div style="margin: 15px 0;">
       关键词：
      <el-input
        placeholder="商品名称/商品货号/商品SKU"
        v-model="keywords"
        style="width:180px"
      ></el-input>
    <el-cascader :options="options"
                  v-model="category_id"
                  :show-all-levels="false"
                  :change-on-select="true"
                ></el-cascader>
      <el-select v-model="asc_del_flag" placeholder="商品状态">
      <el-option
        v-for="item in asc_del_list"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div style="margin:15px 0;display:flex;align-items: center;">
      <div class="asc-zone" style="margin-right:30px">
         销售价：
        <el-input v-model="sale1"  style="width:90px" ></el-input>  <label>至</label> <el-input v-model="sale2" style="width:90px" ></el-input> 元
       </div>
       <div class="asc-zone" style="margin-right:30px">
         库存： <el-input  v-model="sale3" style="width:90px" type="text"></el-input> <label>至</label> <el-input style="width:90px" v-model="sale4"  type="text"></el-input>
       </div>
        <el-checkbox v-model="stop" true-label="1" false-label="" style="margin-right:30px">是否首页推荐</el-checkbox>
         <el-button
        type="primary"
        class="search__btn"
        @click="search()"
      >查询</el-button>
       <el-button
        type="success"
        class="search__btn"
        @click="clear()"
      >重置</el-button>
    </div>

    <div class="main">
      <el-table :data="orderList" border stripe style="width: 99.9% !important; " height="600">
         <el-table-column
        type="selection"
        width="55"></el-table-column>
        <el-table-column label="商品名称/货号/编号" style="width:300px" >
          <template slot-scope="scope">
              <div class="asc-shop">
                 <div class="asc-left" style="margin-right:15px">
                    <img :src="scope.row.original_pic" style="width:100px">
                 </div>
                 <div class="asd-right">
                    <p>{{scope.row.title}}</p>
                     <p>编号：{{scope.row.id}}</p>
                 </div>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="销售价" prop="price" width="150"></el-table-column>
        <el-table-column label="供货价" prop="oprice" width="150"></el-table-column>
        <el-table-column label="利润" prop="profit"  width="150"></el-table-column>
        <el-table-column label="总库存" prop="stock_num" width="150"></el-table-column>
        <el-table-column label="销量" prop="sales" width="150"></el-table-column>
        <el-table-column label="商品状态" prop="flag_name" width="150"></el-table-column>
        <el-table-column label="操作" prop="source_name" width="180">
          <template slot-scope="scope">
            <span>首页推荐</span>
            <span>查看</span>
            <span>下架</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-align: right;padding:20px 0;"
        class="page"
        background
        layout="total, prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="15"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
  </div>
</template>
<script>
import { goodsIndex, categoryList } from 'api'
export default {
  data () {
    return {
      page: 1,
      sale1: '',
      sale2: '',
      sale3: '',
      sale4: '',
      orderList: [],
      total: null,
      keywords: '',
      oreList: [],
      oreName: '',
      stampSting: '',
      sourceList: [{
        value: 1,
        label: '个人租赁'
      }, {
        value: 2,
        label: '注册奖励'
      }],
      source: '',
      value1: [],
      info: {},
      stop: '',
      asc_del_flag: '',
      asc_del_list: [{
        value: 0,
        label: '上架'
      }, {
        value: 1,
        label: '下架'
      }],
      category_id: [],
      category_list: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.orderList = []
      this._AscorderList()
    },
    // 获取时间范围
    getTime (val) {
      this.stampSting = this.getstamp(val[0]) + '-' + this.getstamp(val[1])
      console.log(this.stampSting)
    },
    getstring (dataTime) {
      const d = new Date(dataTime)
      const resDate =
        d.getFullYear() +
        '-' +
        this.p(d.getMonth() + 1) +
        '-' +
        this.p(d.getDate())
      return resDate
    },
    p (s) {
      return s < 10 ? '0' + s : s
    },
    getstamp (dataTime) {
      var thisTime = this.getstring(dataTime)

      thisTime = thisTime.replace(/-/g, '/')
      var time = new Date(thisTime)
      time = time.getTime() / 1000
      return time
    },
    _AscorderList () {
      let obj = {}
      obj.page = this.page
      if (this.keywords) {
        obj.keywords = this.keywords
      }
      if (this.sale1 && this.sale2) {
        obj.price = this.sale1 + '-' + this.sale2
      }
      if (this.sale3 && this.sale4) {
        obj.stock = this.sale1 + '-' + this.sale2
      }
      if (this.stampSting) {
        obj.between_time = this.stampSting
      }
      // if (this.category_id.length > 0) {
      //   obj.category_id = this.category_id
      // }
      if (this.asc_del_flag) {
        obj.asc_del_flag = this.asc_del_flag
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      })
      goodsIndex(obj).then(res => {
        if (res.code == 200) {
          loading.close()
          this.orderList = res.data.list
          this.total = res.data.count
          this.info = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    clear () {
      this.userAccunt = ''
      this.oreName = ''
      this.source = ''
      this.stampSting = ''
      this.stop = ''
      this.search()
    },
    search () {
      this.page = 1
      this.orderList = []
      this._AscorderList()
    },
    countNumber (item) {
      if (item) { return (Number(item.total_output) * Number(item.price)).toFixed(2) }
    }
  },
  created () {
    this._AscorderList()
    categoryList({}).then(res => {
      this.category_list = res.data.list
    })
  }
}
</script>
<style scoped>
.AscOrderList .goodsImg {
  width: 60px;
  height: 60px;
}
.pd-r15 {
  padding-right:15px
}
.asc-opeate {
  margin-bottom: 15px
}
.asc-shop {
 display: flex;
}
</style>
