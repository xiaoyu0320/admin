<!--  -->
<template>
  <div class="editgoods">
    <div class='top-tips'>{{returnTitle()}}</div>
    <div class="item">
      <div class="item-top">
        <span class="flag"></span>
        <span class="flag-title">基本信息</span>
      </div>
      <div class="items">
         <div class="head">
           *商品标题
         </div>
         <el-input v-model="goods.title" placeholder="请输入标题" maxlength="60" show-word-limit></el-input>
      </div>
      <div class="items">
         <div class="head">
           描述
         </div>
         <el-input v-model="goods.simple_desc" placeholder="请输入描述"></el-input>
      </div>
      <div class="items">
        <div class="head">
          *有效时间
        </div>
        <div class="time-wrap">
          <el-date-picker
            v-model="goods.timerage"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="items">
         <div class="head">
           *款号
         </div>
         <el-input v-model="goods.goods_code" placeholder="请输入款号"></el-input>
      </div>
      <div class="item-top">
        <span class="flag"></span>
        <span class="flag-title">销售信息</span>
      </div>
      <div class="items selspec">
        <div class="head">
          *商品规格
        </div>
        <div>
          <el-button :class="[haveSelSpec(item.id) ? 'active':'']" v-for="(item,index) in spec_category" :key="index" @click.native="selectSpec(item)">{{item.name}}</el-button>
        </div>
      </div>
      <div class="selspec_item dp-flex" v-for="(item, index) in spec_category" v-show="haveSelSpec(item.id)" :key="'spec'+index">
        <div class="_head">
            {{item.name}}
        </div>
        <div ref="saveTagInputInner" v-if="type==0">
          <el-tag
            :key="'tag'+index2"
            v-for="(tag, index2) in item.children"
            closable
            :disable-transitions="false"
            @close="handleClose(index, index2, tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="item.inputVisible"
            v-model="item.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(index)"
            @blur="handleInputConfirm(index)"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">+ New Tag</el-button>
        </div>
        <div ref="saveTagInputInner2" v-if="type==1">
          <el-tag
            :key="'tag'+index2"
            v-for="(tag, index2) in item.children"
            closable
            :disable-transitions="false"
            @close="handleClose2(index, index2, tag)">
            {{tag.name}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="item.inputVisible"
            v-model="item.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm2(index)"
            @blur="handleInputConfirm2(index)"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">+ New Tag</el-button>
        </div>
      </div>
      <!-- 规格排列 -->
      <div class="items">
        <div class="head">*价格及库存</div>
        <div class="body">
          <div class="sku-body">
            <div class="skuhead">
              <div class="sku-item" v-for="(item, index) in spec_category" v-show="haveSelSpec(item.id)" :key="'skut'+index">
                {{item.name}}
              </div>
              <div class="sku-item">
                库存
              </div>
            </div>
            <div class="sku-col-item" v-for="(item, index) in skuList" :key="'skuitem'+index">
              <div class="sku-item" v-if="item.item0!=undefined">
                {{item.item0}}
              </div>
              <div class="sku-item"  v-if="item.item1!=undefined">
                {{item.item1}}
              </div>
              <div class="sku-item" v-if="item.item2!=undefined">
                {{item.item2}}
              </div>
              <div class="sku-item">
                <el-input v-model="item.stock" min="0" placeholder="请输入库存"></el-input>
              </div>
            </div>
          </div>
           <el-button class="refresuButton" @click.prevent="refreshSku">点击刷新规格</el-button>
        </div>
      </div>
      <div class="items">
         <div class="head">
           *市场价
         </div>
         <el-input class="el-number" min="0" v-model="goods.market_price" placeholder="请输入市场价" type="number"></el-input>
      </div>
      <div class="items">
         <div class="head">
           *销售价
         </div>
         <el-input class="el-number" min="0" v-model="goods.sale_price" placeholder="请输入销售价" type="number"></el-input>
      </div>
      <div class="items">
         <div class="head">
           *供货价
         </div>
         <el-input class="el-number" min="0" v-model="goods.cost_price" placeholder="请输入供货价" type="number"></el-input>
      </div>
      <div class="item-top">
        <span class="flag"></span>
        <span class="flag-title">图片信息</span>
      </div>
      <div class="items">
        <div class="head">
           *商品主图
        </div>
        <div class="_body">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="baseurl+'/goods/upload'"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload = "beforeUpload"
            :before-remove="beforeRemove"
            :data="fileinfo"
            multiple
            :limit="9"
            :on-exceed="handleExceed"
            :file-list="masterImglist"
            list-type="picture-card">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </div>
      <div class="item-top">
        <span class="flag"></span>
        <span class="flag-title">其他信息</span>
      </div>
      <div class="items">
         <div class="head">
           *运费模版
         </div>
         <el-select v-model="expressId" placeholder="请选择">
           <el-option v-for="item in express_list"
             :key="item.id"
             :label="item.title"
             :value="item.id">
           </el-option>
         </el-select>
      </div>
    </div>
    <div class="items">
      <div class="head">支持售后</div>
      <el-checkbox v-model="afterSale" label=" 支持售后"></el-checkbox>
    </div>
    <div class="bottom-wrap">
        <el-button class="centerbutton" type="primary" plain @click.prevent="confirm">确认</el-button>
        <el-button class="centerbutton" v-if="type==1" plain @click.prevent="close">取消</el-button>
    </div>
  </div>
</template>

<script>
import { specExpress, confrimAddGoods, specsGroup, editGoods, confrimEditGoods } from 'api'
import { geturl } from '@/utils/service'
import { deepClone } from '@/utils/utils'
import { getToken } from '@/utils/auth'
import { isJpgPng } from '@/utils/validate'
export default {
  components: {},
  props: {
    id: [String, Number],
    type: [String, Number]
  },
  data () {
    return {
      baseurl: geturl(),
      fileinfo: {
        uid: getToken('shop_uid'),
        token: getToken('shop_token')
      },
      goods: {
        title: '',
        timerage: '',
        simple_desc: '',
        goods_code: '',
        market_price: '', // 市场价
        sale_price: '', // 销售价
        cost_price: '' // 供货价
      },
      spec_category: [], // 规格分类
      selSpec_category: [], // 选中的规格分类
      express_list: [], // 快递模版列表
      expressId: '',
      afterSale: false,
      masterImglist: [], // 商品主图
      skuList: [] // 商品规格数组
    }
  },
  computed: {},
  watch: {},
  methods: {
    resetData () {
      this.goods = {
        title: '',
        timerage: '',
        simple_desc: '',
        goods_code: '',
        market_price: '', // 市场价
        sale_price: '', // 销售价
        cost_price: '' // 供货价
      }
      this.spec_category = [] // 规格分类
      this.selSpec_category = [] // 选中的规格分类
      this.express_list = [] // 快递模版列表
      this.expressId = ''
      this.afterSale = false
      this.masterImglist = [] // 商品主图
      this.skuList = [] // 商品规格数组
      this.$refs.upload.clearFiles()
    },
    refreshSku () {
      this.getSpecsGroup()
    },
    beforeUpload (file) {
      if (!isJpgPng(file.name)) {
        this.$message.warning(`只能上传jpg或者是png图片，请重新选择`)
        return false
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      if (file && file.status === 'success') {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    },
    // dialog close
    close () {
      this.$emit('closeDiaglog', true)
    },
    editConfirm () {
      let specCid = []
      for (let i = 0; i < this.selSpec_category.length; i++) {
        specCid.push(this.selSpec_category[i]['id'])
      }
      let newSpec = this.skuList
      let _newSpec = []
      for (let i = 0; i < newSpec.length; i++) {
        let _tArr = []
        for (const key in newSpec[i]) {
          // 如果是有内容的话
          if (newSpec[i][key]) {
            _tArr.push(newSpec[i][key])
          }
        }
        _newSpec.push(_tArr)
      }
      let fileimg = this.$refs.upload.uploadFiles
      let _fileimg = []
      for (let i = 0; i < fileimg.length; i++) {
        if (fileimg[i].response) {
          _fileimg.push(fileimg[i].response.data.url)
        } else {
          _fileimg.push(fileimg[i].original_pic)
        }
      }
      let spec = []
      for (let i = 0; i < this.spec_category.length; i++) {
        // 判断是否被选中 如果被选中就不参与组合
        if (this.haveSelSpec(this.spec_category[i]['id']) && this.spec_category[i]['children'].length > 0) {
          spec.push(this.spec_category[i]['children'])
        }
      }
      let obj = {}
      obj.title = this.goods.title
      obj.id = this.id
      obj.simple_desc = this.goods.simple_desc
      obj.start_time = new Date(this.goods.timerage[0]).getTime() / 1000
      obj.end_time = new Date(this.goods.timerage[1]).getTime() / 1000
      obj.goods_code = this.goods.goods_code
      obj.market_price = this.goods.market_price
      obj.sale_price = this.goods.sale_price
      obj.cost_price = this.goods.cost_price
      obj.spec_cid = specCid.join(',')
      obj.spec = JSON.stringify(spec)
      obj.spec_group = JSON.stringify(_newSpec)
      obj.express_id = this.expressId == '' ? 0 : this.expressId
      obj.after_sale = Number(this.afterSale)
      obj.img_list = JSON.stringify(_fileimg)
      confrimEditGoods(obj).then(res => {
        this.resetData()
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        if (this.type === 1) {
          this.$emit('confirmDialog', true)
        }
      })
    },
    confirm () {
      let newSpec = this.skuList
      let _newSpec = []
      for (let i = 0; i < newSpec.length; i++) {
        let _tArr = []
        for (const key in newSpec[i]) {
          // 如果是有内容的话
          if (newSpec[i][key]) {
            _tArr.push(newSpec[i][key])
          }
        }
        _newSpec.push(_tArr)
      }

      let fileimg = this.$refs.upload.uploadFiles
      let _fileimg = []
      for (let i = 0; i < fileimg.length; i++) {
        if (fileimg[i].response) {
          _fileimg.push(fileimg[i].response.data.url)
        } else {
          _fileimg.push(fileimg[i].original_pic)
        }
      }
      if (this.goods.title.trim() == '') {
        this.$message({
          type: 'info',
          message: '请输入标题'
        })
        return
      }
      if (this.goods.timerage == '') {
        this.$message({
          type: 'info',
          message: '请选择时间'
        })
        return
      }
      if (this.goods.goods_code == '') {
        this.$message({
          type: 'info',
          message: '请输入商品款号'
        })
        return
      }
      if (this.goods.market_price == '') {
        this.$message({
          type: 'info',
          message: '请输入市场价'
        })
        return
      }
      if (this.goods.sale_price == '') {
        this.$message({
          type: 'info',
          message: '请输入销售价'
        })
        return
      }
      if (this.goods.cost_price == '') {
        this.$message({
          type: 'info',
          message: '请输入供货价'
        })
        return
      }
      if (_fileimg.length == 0) {
        this.$message({
          type: 'info',
          message: '请输入选择商品图'
        })
        return
      }
      // 如果是编辑的话 对编辑进行特殊处理
      if (this.type == 1) {
        this.editConfirm()
        return
      }
      let specCid = []
      for (let i = 0; i < this.selSpec_category.length; i++) {
        specCid.push(this.selSpec_category[i]['id'])
      }
      let spec = []
      for (let i = 0; i < this.spec_category.length; i++) {
        // 判断是否被选中 如果被选中就不参与组合
        if (this.haveSelSpec(this.spec_category[i]['id']) && this.spec_category[i]['children'].length > 0) {
          spec.push(this.spec_category[i]['children'])
        }
      }
      let obj = {}
      obj.title = this.goods.title
      obj.simple_desc = this.goods.simple_desc
      obj.start_time = new Date(this.goods.timerage[0]).getTime() / 1000
      obj.end_time = new Date(this.goods.timerage[1]).getTime() / 1000
      obj.goods_code = this.goods.goods_code
      obj.market_price = this.goods.market_price
      obj.sale_price = this.goods.sale_price
      obj.cost_price = this.goods.cost_price
      obj.spec_cid = specCid.join(',')
      obj.spec = JSON.stringify(spec)
      obj.spec_group = JSON.stringify(_newSpec)
      obj.express_id = this.expressId == '' ? 0 : this.expressId
      obj.after_sale = Number(this.afterSale)
      obj.img_list = JSON.stringify(_fileimg)
      confrimAddGoods(obj).then(res => {
        this.$message({
          type: 'success',
          info: '添加成功'
        })
        this.resetData()
      })
    },
    /**
     * click close icon  remove tag
     * @param {Number} index parent layer index
     * @param {Number} index2 currenttarget index
     * @param {String} item currenttarget
     */
    handleClose (index, index2, item) {
      console.log(this.spec_category[index].children[index2])
      this.spec_category[index].children.splice(this.spec_category[index].children.indexOf(item), 1)
    },
    handleClose2 (index, index2, item) {
      this.spec_category[index].children.splice(index2, 1)
    },
    // click new tag event
    showInput (index) {
      this.$set(this.spec_category[index], 'inputVisible', true)
      this.$nextTick(() => {
        if (this.$refs.saveTagInputInner) {
          this.$refs.saveTagInputInner[index].querySelector('.el-input__inner').focus()
        }
        if (this.$refs.saveTagInputInner2) {
          this.$refs.saveTagInputInner2[index].querySelector('.el-input__inner').focus()
        }
      })
    },
    // input enter or blur event
    handleInputConfirm (index) {
      let inputValue = this.spec_category[index].inputValue
      if (inputValue) {
        let children = this.spec_category[index].children
        children.push(inputValue)
        this.$set(this.spec_category[index], 'children', children)
      }
      this.$set(this.spec_category[index], 'inputVisible', false)
      this.$set(this.spec_category[index], 'inputValue', '')
    },
    // input enter or blur event
    handleInputConfirm2 (index) {
      let inputValue = this.spec_category[index].inputValue
      if (inputValue) {
        let children = this.spec_category[index].children
        let obj = {
          id: 0,
          name: inputValue
        }
        children.push(obj)
        this.$set(this.spec_category[index], 'children', children)
      }
      this.$set(this.spec_category[index], 'inputVisible', false)
      this.$set(this.spec_category[index], 'inputValue', '')
    },
    returnTitle () {
      return this.type === 0 ? '新建清货商品' : '编辑清货商品'
    },
    selectSpec (item) {
      let index = this.selSpec_category.findIndex((item2) => {
        return item2.id == item.id
      })
      // remove
      if (index > -1) {
        if (this.selSpec_category.length == 1) {
          this.$message({
            type: 'info',
            message: '至少选中一个规格!'
          })
          return
        }
        this.selSpec_category.splice(index, 1)
      } else {
        // add
        this.selSpec_category.push(this.createSpecItem(item))
      }
    },
    // determine whether specifications have been selected
    haveSelSpec (id) {
      return this.selSpec_category.some((item) => {
        if (item.id == id) {
          return true
        }
      })
    },
    // create new specItem
    createSpecItem (item) {
      let obj = deepClone(item)
      obj.children = [] // create  an array edit specification
      obj.inputVisible = false
      obj.inputValue = ''
      return obj
    },
    // get edit info
    getEditInfo () {
      editGoods({ id: this.id }).then(res => {
        const data = res.data
        this.goods = {
          title: data.title,
          timerage: [data.start_time, data.end_time],
          simple_desc: data.simple_desc,
          goods_code: data.goods_code,
          market_price: data.market_price, // 市场价
          sale_price: data.sale_price, // 销售价
          cost_price: data.cost_price // 供货价
        }
        data.spec_category.forEach(item => {
          item.inputVisible = false
          item.inputValue = ''
        })
        this.spec_category = data.spec_category // 规格分类
        let selSpecCategory = []
        for (let i = 0; i < data.spec_category.length; i++) {
          if (data.spec_category[i].selected) {
            selSpecCategory.push(data.spec_category[i])
          }
        }
        this.selSpec_category = selSpecCategory // 选中的规格分类
        this.express_list = data.express_list // 快递模版列表
        this.expressId = data.express_tpl
        this.afterSale = Boolean(Number(data.after_sale))
        this.masterImglist = data.img_list // 商品主图
        let _skulist = []
        for (let i = 0; i < data.option.length; i++) {
          let obj = {}
          if (data.option[i].s1 != 0) {
            obj.item0 = data.option[i].s1
          } else {
            obj.item0 = undefined
          }
          if (data.option[i].s2 != 0) {
            obj.item1 = data.option[i].s2
          } else {
            obj.item1 = undefined
          }
          if (data.option[i].s3 != 0) {
            obj.item2 = data.option[i].s3
          } else {
            obj.item2 = undefined
          }
          obj.stock = data.option[i].stock
          _skulist.push(obj)
        }
        this.skuList = _skulist // 商品规格数组
      })
    },
    // get spec and express
    getSpecExpress () {
      specExpress({}).then(res => {
        let { data } = res
        // 如果是新增的话
        if (this.type === 0) {
          data.spec_category.forEach(item => {
            item.children = []
            item.inputVisible = false
            item.inputValue = ''
            this.selSpec_category.push(item)
          })
          console.log(data)
        }
        ({ spec_category: this.spec_category, express_list: this.express_list } = data)
      })
    },
    // get specification group
    getSpecsGroup () {
      let arr = []
      for (let i = 0; i < this.spec_category.length; i++) {
        // 判断是否被选中 如果被选中就不参与组合
        if (this.haveSelSpec(this.spec_category[i]['id']) && this.spec_category[i]['children'].length > 0) {
          if (this.type == 0) {
            arr.push(this.spec_category[i]['children'])
          }
          if (this.type == 1) {
            let _arr = []
            this.spec_category[i]['children'].forEach(item => {
              _arr.push(item.name)
            })
            arr.push(_arr)
          }
        }
      }
      specsGroup({ spec: JSON.stringify(arr) }).then(res => {
        let arr = []
        let data = res.data
        for (let i = 0; i < res.data.length; i++) {
          let obj = {}
          obj.item0 = data[i].split(',')[0]
          obj.item1 = data[i].split(',')[1]
          obj.item2 = data[i].split(',')[2]
          obj.stock = 0
          arr.push(obj)
        }
        this.skuList = arr
      })
    }
  },
  created () {
    if (this.type === 0) {
      this.getSpecExpress()
    }
    if (this.type === 1) {
      this.getEditInfo()
    }
  }
}
</script>
<style lang='scss' scoped>
  .editgoods{
    .item{
      .item-top{
        display: flex;
        align-items: center;
        margin: 30px 0 20px;
        .flag{
          width: 3px;
          height: 18px;
          background: rgb(102, 102, 102);
          display: inline-block;
          margin-right: 20px;
        }
      }
    }
    .items{
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-bottom: 20px;
      .head{
        margin-right: 20px;
        width: 100px;
      }
      ._body{
        flex: 1;
        overflow: hidden;
      }
      .el-number{
        flex:none!important;
        width: 200px;

      }
      .el-input,.time-wrap{
        flex: 1;
        overflow: hidden;
        margin-right: 100px;
      }
    }
    .selspec{
      align-items: flex-start;
      .active{
        background: #409eff;
        color: #fff;
        border-color: #409eff
      }
    }
    .selspec_item{
      align-items: center;
      margin-bottom: 15px;
      ._head{
        font-size: 14px;
        width: 100px;
        margin-right: 20px;
      }
    }
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
     }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
     }
  }
  .bottom-wrap{
    text-align: center;
    .centerbutton{
      display: inline-block;
      margin: 0 10px;
    }
  }
  .sku-body{
    background: #f5f5f5;
    padding:10px;
    border-radius: 5px;
    width: 400px;
    .sku-col-item{
      margin-top: 10px;
      align-items: center;
    }
    .skuhead,.sku-col-item{
      display: flex;
      .el-input__inner{
        height: 30px;
        line-height: 30px;
      }
      .sku-item{
        flex: 1;
        overflow: hidden;
        text-align: center;
      }
    }
  }
  .refresuButton{
    margin-top: 10px;
  }
</style>
