import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/layout'
Vue.use(Router)

/**
 * 注意事项: 只有当route children 大于等于1的时候才会出现子菜单
 * hideen:true                      如果有设置了这一项 那么菜单栏不会出现
 * alwaysShow:true                  如果设置为true 则始终显示根菜单
 *                                  如果未设置alwaysShow 则当有多个子路由时候 它将成为嵌套模式，否则不显示根菜单
 * redirect:noRedirect              如果设置为no redirect 则不会在breadcrumb中重定向
 * name:'router-name'               <keep alive>使用 必须设置!!!!
 * meta:{
 *   title:'title'                  显示在sidebar和面包屑导航
 *   icon:'svg-name'                svg的icon
 *   breadcrumb:false               如果设置为false 则不会在面包屑上出现，默认是true
 * }
 */

/**
 * constantRoutes
 * 没有权限的页面
 * 可以任意访问
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@v/login/login')
  },
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@v/dashboard/dashboard'),
      meta: { title: '个人主页', icon: 'geren' }
    }]
  }
]
export const asyncRoutes = [
  {
    path: '/censuslist',
    name: 'censuslist',
    component: layout,
    redirect: '/census/list',
    alwaysShow: true,
    meta: { title: '数据统计', icon: 'usermanage' },
    children: [
      {
        path: 'censuslist',
        name: 'censuslist',
        component: () => import('@v/census/list'),
        meta: { title: '概况', icon: 'userlist' }
      }
    ]
  },
  {
    path: '/usermanage',
    name: 'usermanage',
    component: layout,
    redirect: '/usermanage/rolelist',
    alwaysShow: true,
    meta: { title: '权限管理', icon: 'usermanage' },
    children: [
      {
        path: 'rolelist',
        name: 'rolelist',
        component: () => import('@v/usermanage/rolelist'),
        meta: { title: '角色列表', icon: 'userlist' }
      },
      {
        path: 'power',
        name: 'power',
        component: () => import('@v/usermanage/power'),
        meta: { title: '权限管理', icon: 'power' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@v/supplier/list'),
        meta: { title: '管理员列表', icon: 'userlist' }
      }
    ]
  },
  {
    path: '/AscUserManage',
    name: 'ascusermanage',
    component: layout,
    redirect: '/asc/AscUserManage',
    alwaysShow: true,
    meta: { title: '日志列表', icon: 'newgoods' },
    children: [
      {
        path: 'ascuserManage',
        name: 'ascusermanage',
        component: () => import('@v/asc/AscUserManage'),
        meta: { title: '用户列表', icon: 'grouplist' }
      },
      {
        path: 'ascfundCode',
        name: 'ascfundcode',
        component: () => import('@v/asc/AscFundCode'),
        meta: { title: '资金记录', icon: 'userlist' }
      },
      {
        path: 'ascstoreCode',
        name: 'ascstorecode',
        component: () => import('@v/asc/AscStoreCode'),
        meta: { title: '基石记录', icon: 'power' }
      },
      {
        path: 'ascinvestCode',
        name: 'ascinvestcode',
        component: () => import('@v/asc/AscInvestCode'),
        meta: { title: '充值记录', icon: 'level' }
      },
      {
        path: 'asccreateCode',
        name: 'asccreatecode',
        component: () => import('@v/asc/AscCreateCode'),
        meta: { title: '创建账户记录', icon: 'level' }
      },
      {
        path: 'asctrasferCode',
        name: 'asctrasfercode',
        component: () => import('@v/asc/AscTrasferCode'),
        meta: { title: '系统转账记录', icon: 'level' }
      }
    ]
  },
  {
    path: '/Ascmine',
    name: 'ascmine',
    component: layout,
    redirect: '/ascmine/Ascmine',
    alwaysShow: true,
    meta: { title: '矿机管理', icon: 'order' },
    children: [
      {
        path: 'Ascmine',
        name: 'ascmine',
        component: () => import('@v/ascmine/Ascmine'),
        meta: { title: '矿机列表', icon: 'grouplist' }
      },
      {
        path: 'AscConfig',
        name: 'ascconfig',
        component: () => import('@v/ascmine/AscConfig'),
        meta: { title: '矿机配置', icon: 'userlist' }
      },
      {
        path: 'AscMineLogList',
        name: 'ascmineloglist',
        component: () => import('@v/ascmine/AscMineLogList'),
        meta: { title: '矿池记录', icon: 'power' }
      },
      {
        path: 'AscProfitLogList',
        name: 'ascprofitloglist',
        component: () => import('@v/ascmine/AscProfitLogList'),
        meta: { title: '收益记录', icon: 'level' }
      },
      {
        path: 'AscOrderList',
        name: 'ascorderlist',
        component: () => import('@v/ascmine/AscOrderList'),
        meta: { title: '用户矿机列表', icon: 'level' }
      }
    ]
  },
  {
    path: '/editpassword',
    name: 'editpassword',
    component: layout,
    redirect: '/editpassword',
    children: [{
      path: 'editpassword',
      name: 'editpassword',
      component: () => import('@v/setting/editpassword'),
      meta: { title: '修改密码', icon: 'editpassword' }
    }]
  },
  {
    path: '/verity',
    name: 'verity',
    component: layout,
    redirect: '/verity',
    children: [{
      path: 'verity',
      name: 'verity',
      component: () => import('@v/setting/verity'),
      meta: { title: '身份证审核', icon: 'power' }
    }]
  },
  // {
  //   path: '/shop',
  //   name: 'shop',
  //   component: layout,
  //   redirect: '/shop',
  //   children: [{
  //     path: 'list',
  //     name: 'list',
  //     component: () => import('@v/shop/list'),
  //     meta: { title: '蚁购严选', icon: 'power' }
  //   }]
  // },
  {
    path: '*',
    name: 'error',
    component: () => import('@v/error/error')
  }
]
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router
