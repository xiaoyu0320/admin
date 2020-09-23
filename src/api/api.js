
import { http } from '../utils/service'

// 登录模块
export const toLogin = data => {
  return http('/login/doLogin', data)
}
// 获取用户信息
export const toGetInfo = data => {
  return http('/user/getuserinfo', data)
}
// account log
export const accountLog = data => {
  return http('/user/getmoneylog', data)
}
// account withdraw
export const withdraw = data => {
  return http('/user/withdraw', data)
}
// 退出
export const toLogout = data => {
  return http('/user/logout', data)
}
// 修改密码
export const editPassword = data => {
  return http('/user/password', data)
}
// 获取银行卡列表
export const bankList = data => {
  return http('/bank/list', data)
}
// 确认新增银行卡
export const addPost = data => {
  return http('/bank/addpost', data)
}
// 删除银行卡
export const deletePost = data => {
  return http('/bank/delete', data)
}
// 修改银行卡
export const editPost = data => {
  return http('/bank/edit', data)
}
// 确认修改银行卡
export const editPostConfirm = data => {
  return http('/bank/editpost', data)
}
// 获取地址列表
export const addressList = data => {
  return http('/address/list', data)
}
// 三级联动地址 省
export const province = data => {
  return http('/address/add', data)
}
// 三级联动 获取下级
export const addressChildren = data => {
  return http('/address/getChildren', data)
}
// 确认新增退货地址
export const cofirmAddAddress = data => {
  return http('/address/addPost', data)
}
// 设为默认退货地址
export const setDefault = data => {
  return http('/address/setdefault', data)
}
// 确认修改退货地址
export const confirmEditAddress = data => {
  return http('/address/editpost', data)
}
// 获取修改地址的信息
export const editAddressInfo = data => {
  return http('/address/edit', data)
}
// 删除地址
export const deleteAddress = data => {
  return http('/address/delete', data)
}
// 获取分类和快递模版
export const specExpress = data => {
  return http('/goods/add', data)
}
// confrim publish goods
export const confrimAddGoods = data => {
  return http('/goods/addpost', data)
}
// edit goods
export const editGoods = data => {
  return http('/goods/edit', data)
}
// confirm edit goods
export const confrimEditGoods = data => {
  return http('/goods/editpost', data)
}
/**
 * get goods specsGroup
 * @param {String} spec  规格名称，按分类分组，json串
 */
export const specsGroup = data => {
  return http('/goods/getSpecGroup', data)
}
/**
 * goods list
 * @param {String/Number}  type [可选] 0待审核，1清货中，2审核不通过，4已结束。不传表示全部
 * @param {Number} page [可选] 默认1 -1表示全部
 */
export const goodsList = data => {
  return http('/goods/list', data)
}
// 商品审核
export const goodsAudit = data => {
  return http('/goods/audit', data)
}
// set goods status
export const setGoodsStatus = data => {
  return http('/goods/setstatus', data)
}
// express list
export const expressList = data => {
  return http('/express/list', data)
}
// express add
export const expressAdd = data => {
  return http('/express/add', data)
}
// express confirm add
export const expressAddConfirm = data => {
  return http('/express/addPost', data)
}
// express edit
export const expressEdit = data => {
  return http('/express/edit', data)
}
// express confirm edit
export const expressEditConfirm = data => {
  return http('/express/editpost', data)
}
// express delete
export const expressDelete = data => {
  return http('/express/delete', data)
}
// 上传
export const upload = data => {
  return http('/goods/upload', data)
}
// 商品统计
export const goodsreport = data => {
  return http('/goods/report', data)
}
// 订单列表
export const orderList = data => {
  return http('/order/list', data)
}
// 订单详情
export const orderDetail = data => {
  return http('/order/detail', data)
}
// 物流追踪
export const expressTrace = data => {
  return http('/order/expressTrace', data)
}

// 快递列表
export const orderExpressList = data => {
  return http('/order/expressList', data)
}
// 发货
export const delivery = data => {
  return http('/order/delivery', data)
}
// 订单统计
export const orderreport = data => {
  return http('/order/report', data)
}
// 批量发货列表
export const deliveryList = data => {
  return http('/delivery_log/list', data)
}
// 失败记录
export const failList = data => {
  return http('/delivery_log/failList', data)
}
// 售后订单列表
export const returnsList = data => {
  return http('/returns_order/list', data)
}
// 售后详情
export const returnsDetail = data => {
  return http('/returns_order/detail', data)
}
// 售后单退款
export const refund = data => {
  return http('/returns_order/refund', data)
}
// 售后单审核
export const audit = data => {
  return http('/returns_order/audit', data)
}
// 售后统计
export const returnsreport = data => {
  return http('/returns_order/report', data)
}
// 批量发货
export const batchDelivery = data => {
  return http('/delivery_log/batchDelivery', data)
}
// 等级列表
export const levelList = data => {
  return http('/Level/getCleanLevel', data)
}
// 删除团长等级
export const deleteLevel = data => {
  return http('/Level/delCleanLevel', data)
}
// 添加编辑团长等级
export const addEditLevel = data => {
  return http('/Level/addCleanLevel', data)
}
// 获取团长、供应商列表
export const suserList = data => {
  return http('/suser/getCleanList', data)
}
// 编辑团长手机号昵称
export const editSuser = data => {
  return http('/suser/editClean', data)
}
// 设置团长等级
export const setCleanLevel = data => {
  return http('/suser/setCleanLevel', data)
}
// 调整团长余额
export const adjustBalance = data => {
  return http('/suser/adjustBalance', data)
}
// 获取上级列表
export const getSetParentList = data => {
  return http('/suser/getSetParentList', data)
}
// 设置团长上级
export const setCleanParent = data => {
  return http('/suser/setCleanParent', data)
}
// 取消团长上级
export const cancelParent = data => {
  return http('/suser/cancleParent', data)
}
// 启用用户
export const setCleanStatus = data => {
  return http('/user/setStatus', data)
}
// 设置/取消管理员
export const setAdmin = data => {
  return http('/user/setAdmin', data)
}
// 添加供应商
export const addSupplier = data => {
  return http('/suser/addSupplier', data)
}
// 编辑供应商
export const editSupplier = data => {
  return http('/suser/editSupplier', data)
}
// 重设供应商密码
export const resetSupplierPass = data => {
  return http('/suser/resetSupplierPass', data)
}
// 获取权限列表
export const powewlist = data => {
  return http('/suser/getPowerList', data)
}
// 设置供应商权限
export const setpower = data => {
  return http('/user/setPower', data)
}
// 角色列表
export const AuthGroupList = data => {
  return http('/auth/groupList', data)
}
// 新增角色
export const AuthAddGroupPost = data => {
  return http('/auth/addGroupPost', data)
}
// 编辑角色
export const AuthEditGroup = data => {
  return http('/auth/editGroup', data)
}
// 确认编辑角色
export const AuthEditGroupPost = data => {
  return http('/auth/editGroupPost', data)
}
// 权限展示列表
export const AuthMenuList = data => {
  return http('/auth/menuList', data)
}
// 编辑菜单
export const AuthEditMenu = data => {
  return http('auth/editMenu', data)
}
// 确认新增菜单
export const addMenuPost = data => {
  return http('auth/addMenuPost', data)
}
// 编辑新增菜单
export const editMenuPost = data => {
  return http('auth/editMenuPost', data)
}
// 删除菜单
export const authMenuDelete = data => {
  return http('auth/menuDelete', data)
}
// 菜单设置状态
export const setMenuStatus = data => {
  return http('auth/setMenuStatus', data)
}
// 设置团长价格
export const goodsSetPrice = data => {
  return http('goods/setPrice', data)
}
// 收款账户列表
export const cleanGetAccountList = data => {
  return http('Account/getAccountList', data)
}
// 删除收款账户
export const cleanDelAccount = data => {
  return http('Account/delAccount', data)
}
// 添加编辑收款账户
export const addAccount = data => {
  return http('Account/addAccount', data)
}
// 提现审核
export const checkWithdraw = data => {
  return http('Finance/checkWithdraw', data)
}
/** 提现记录
 * @param {String} page 页数
 * @param {String} status 状态,可选,0审核中，1通过，2拒绝，不传默认所有
 * @param {String} role 页数   角色，可选，1团长，2供应商,默认1
 */
export const FinanceGetWithdrawList = data => {
  return http('Finance/getWithdrawList', data)
}
// 充值记录
export const getRechargeList = data => {
  return http('Finance/getRechargeList', data)
}
// 授权
export const authList = data => {
  return http('auth/auth', data)
}
// 确认授权
export const authPost = data => {
  return http('auth/authpost', data)
}
export const getSupplierList = data => {
  return http('user/adminList', data)
}
// 获取支付宝微信配置信息
export const getConfig = data => {
  return http('Config/getConfig', data)
}
// 微信配置
export const setWxConfig = data => {
  return http('Config/setWxConfig', data)
}
// 支付宝配置
export const setZfbConfig = data => {
  return http('Config/setZfbConfig', data)
}
// 上传营业执照
export const license = data => {
  return http('user/license', data)
}
// 矿机列表
export function AscList (obj) {
  return http('mine/list', obj)
}
// 新增矿机
export function AscAdd (obj) {
  return http('mine/addPost', obj)
}
// 修改矿机
export function AscEdit (obj) {
  return http('mine/edit', obj)
}
// 修改提交
export function AscEditPost (obj) {
  return http('mine/editPost', obj)
}
// 上下架
export function AscSetStatus (obj) {
  return http('mine/setStatus', obj)
}
// 矿机管理-获取配置
export function AscConfig (obj) {
  return http('mine/config', obj)
}
// 矿机管理-修改配置
export function AscConfigPost (obj) {
  return http('mine/configPost', obj)
}
// 获取所有操作日志
export function getAdminLog (obj) {
  return http('EzooSetUp/getAdminLog', obj)
}
// 矿机管理-矿池记录
export function mineLogList (obj) {
  return http('mine/mineLogList', obj)
}
// 矿机管理-收益记录
export function profitLogList (obj) {
  return http('mine/profitLogList', obj)
}
// 矿机管理-用户矿机列表
export function AscorderList (obj) {
  return http('mine/orderList', obj)
}
// asc- 用户列表
export function AscUserManager (obj) {
  return http('user/list', obj)
}
// 基石
// export function getAscManagerLog (obj) {
//   // return get('admin/getAscManagerLog', obj)
//   return http('admin/AscUserManager', obj)
// }

// 基石记录
export function baseFrozeLog (obj) {
  return http('asclog/baseFrozeLog', obj)
}
// 资金记录
export function coinLog (obj) {
  return http('asclog/coinLog', obj)
}
// 新增基石记录
export function addBaseFrozeLog (obj) {
  return http('asclog/addBaseFrozeLog', obj)
}
// 基石记录详情
export function baseFrozeLogDetail (obj) {
  return http('asclog/baseFrozeLogDetail', obj)
}
// 编辑基石记录
export function editBaseFrozeLog (obj) {
  return http('asclog/editBaseFrozeLog', obj)
}
//  基石投资类型
export function baseList (obj) {
  return http('asclog/baseList', obj)
}
// 删除基石记录
export function delBaseFrozeLog (obj) {
  return http('asclog/delBaseFrozeLog', obj)
}
// 充值记录
export function chargeLog (obj) {
  return http('asclog/chargeLog', obj)
}
// 创建账户记录
export function AscaccountLog (obj) {
  return http('asclog/accountLog', obj)
}
// 创建账户记录
export function transferLog (obj) {
  return http('asclog/transferLog', obj)
}
// 实名认证列表
export function Certification (obj) {
  return http('user/Certification', obj)
}
// 实名认证审核
export function reviewCertification (obj) {
  return http('user/reviewCertification', obj)
}
// 统计概况
export function reportIndex (obj) {
  return http('report/index', obj)
}
// 商品列表
export function goodsIndex (obj) {
  return http('shop/goods/index', obj)
}
// 分类列表
export function categoryList (obj) {
  return http('shop/category/list', obj)
}
