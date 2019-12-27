// import Vue from 'vue'
import Router from 'vue-router'
//
// // in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// // detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
//
// Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import DemandDetail from '../views/mobile-management/demand-management/demand-detail'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect: noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    name: 'dashboard',
    hidden: true,
    children: [
      {
        path: 'empty',
        name: 'noAuth',
        component: () => import('@/views/dashboard/empty')
      },
      {
        path: 'default_page',
        name: 'newAddPage',
        component: () => import('@/views/dashboard/default')
      },
      {
        path: '/DemandDetail',
        name: 'DemandDetail',
        component: DemandDetail
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  // 移动端管理
  {
    path: '/mobile',
    component: Layout,
    name: 'mobileManagement',
    meta: { title: '移动端管理', icon: 'mobile', role: ['0', '1', '2', '3', '4'] },
    children: [
      {
        path: 'home',
        name: 'homeConfiguration',
        component: () => import('@/views/mobile-management/home-configuration/index'),
        meta: { title: '首页配置', icon: 'home', role: ['0', '1', '4'] }
      },
      {
        path: 'bannerdetail',
        name: 'bannerDetail',
        hidden: true,
        component: () => import('@/views/mobile-management/home-configuration/banner-detail'),
        meta: { title: 'banner详情', icon: 'home', role: ['0', '1', '4'] }
      },
      {
        path: 'scheme',
        name: 'schemeConfiguration',
        component: () => import('@/views/mobile-management/scheme-configuration/index'),
        meta: { title: '方案&材料', icon: 'scheme', role: ['0', '1', '4'] }
      },
      {
        path: 'demand',
        name: 'demandManagement',
        component: () => import('@/views/mobile-management/demand-management/index'),
        meta: { title: '需求管理', icon: 'demand', role: ['0', '2', '3', '4'] }
      }
    ]
  },

  // web 端管理
  {
    path: '/web',
    component: Layout,
    name: 'webManagement',
    meta: { title: 'web 端管理', icon: 'web', role: ['0', '1', '4'] },
    children: [
      {
        path: 'pcbannerdetail',
        name: 'pcBannerDetail',
        component: () => import('../views/pc-management/pc-banner-management/index'),
        meta: { title: 'banner配置', icon: 'pc-banner', role: ['0', '1', '4'] }
      }
    ]
  },

  // 意见反馈
  {
    path: '/feedback',
    component: Layout,
    name: 'feedback',
    meta: { title: '意见反馈', icon: 'feedback', role: ['0', '1', '4'] },
    children: [
      {
        path: 'userfeedback',
        name: 'userFeedback',
        component: () => import('../views/feedback/index'),
        // meta: { title: '意见反馈', icon: 'feedback', role: ['0', '1', '4'] }
        meta: { title: '意见反馈', icon: 'feedback' }
      }
    ]
  },

  // 权限管理
  {
    path: '/auth',
    component: Layout,
    name: 'auth',
    meta: { title: '权限管理', icon: 'system', role: ['0', '4'] },
    children: [
      {
        path: 'auth',
        name: 'authManage',
        component: () => import('@/views/auth/personnel-list'),
        meta: { title: '权限管理', icon: 'personnel' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true, meta: { role: ['0', '1', '2', '3', '4'] }}
]

