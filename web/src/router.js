import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/Layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'HomePage',
          component: () => import('./views/home/Home.vue')
        },
        {
          path: 'bannerDetail',
          name: 'BannerDetail',
          component: () => import('./views/home/BannerDetail.vue')
        }
      ]
    },
    {
      path: '/scheme',
      name: 'Scheme',
      component: Layout,
      children: [
        {
          path: 'schemeLibrary',
          name: 'SchemeLibrary',
          beforeEnter: (to, from, next) => {
            console.log('from: ', from)
            console.log('to: ', to)
            next()
          },
          component: () => import('./views/scheme/SchemeLibrary.vue'),
          children: [
            {
              path: 'class/:id/:childrenId',
              // path: 'class/:id/:childrenIndex',
              name: 'Class',
              // 直接在地址栏刷新时，正常路由路径 'SchemeLibrary' => 'Class' 变为 'null' => 'Class'
              // 返回 SchemeLibrary 获取相关数据后再前往 Class
              beforeEnter: (to, from, next) => {
                if (!from.name) {
                  next({ name: 'SchemeLibrary' })
                } else {
                  next()
                }
              },
              component: () => import('./views/scheme/Clazz.vue')
            },
            {
              path: 'class/:id/scheme/:goodId/:name',
              name: 'Good',
              beforeEnter: (to, from, next) => {
                if (!from.name) {
                  next({ name: 'SchemeLibrary' })
                } else {
                  next()
                }
              },
              component: () => import('./views/scheme/Good.vue')
            },
            {
              path: 'class/:id/scheme/:goodId/:name/:secId',
              name: 'Good2',
              beforeEnter: (to, from, next) => {
                if (!from.name) {
                  next({ name: 'SchemeLibrary' })
                } else {
                  next()
                }
              },
              component: () => import('./views/scheme/Good.vue')
            }
          ]
        },
        {
          path: '/schemeLibrary/schemeDetail/:id',
          name: 'SchemeDetail',
          component: () => import('./views/scheme/SchemeDetail.vue')
        }
      ]
    },
    {
      path: '/demand',
      name: 'Demand',
      component: Layout,
      children: [
        {
          path: 'demandList',
          name: 'DemandList',
          component: () => import('./views/demand/DemandList.vue'),
          // meta: { keepAlive: true }
        },
        {
          path: 'newDemand',
          name: 'NewDemand',
          component: () => import('./views/demand/NewDemand.vue')
        },
        {
          path: 'demandList/recommitDemand',
          name: 'RecommitDemand',
          component: () => import('./views/demand/RecommitDemand.vue')
        },
        {
          path: 'demandList/demandDetailProcess',
          name: 'DemandDetail',
          component: () => import('./views/demand/DemandDetailProcess.vue')
        }
      ]
    },
    {
      path: '/material',
      name: 'Material',
      component: Layout,
      children: [
        {
          path: 'materialDetail/:matId',
          name: 'MaterialDetail',
          component: () => import('./views/material/MaterialDetail.vue')
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Layout,
      children: [
        {
          path: 'list',
          name: 'SearchList',
          component: () => import('./views/search/SearchList.vue')
        }
      ]
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Layout,
      children: [
        {
          path: 'myFavorite',
          name: 'MyFavorite',
          component: () => import('./views/favorite/MyFavorite.vue')
        }
      ]
    },
    {
      path: '/logistics',
      name: 'Logistics',
      component: Layout,
      children: [
        {
          path: 'summarize',
          name: 'Summarize',
          component: () => import('./views/logistics/Summarize.vue'),
        },
        {
          path: 'track',
          name: 'Track',
          component: () => import('./views/logistics/Track.vue'),
          redirect: '/board',
          children: [
            {
              path: 'waybill',
              name: 'waybill',
              component: () => import('./views/logistics/Waybill.vue'),
            },
            {
              path: 'board',
              name: 'board',
              component: () => import('./views/logistics/TrackBoard.vue'),
            },
            {
              path: 'sendinfo',
              name: 'SendInfo',
              component: () => import('./views/logistics/SendInfo.vue')
            },
            {
              path: 'download',
              name: 'Download',
              component: () => import('./views/logistics/Download.vue')
            }
          ]
        },
        {
          path: 'pack',
          name: 'Pack',
          component: () => import('./views/logistics/Pack.vue'),
          redirect: '/skip',
          children: [
            {
              path: 'skip',
              name: 'skip',
              component: () => import('./views/logistics/PackSkip.vue')
            },
            {
              path: 'schemeDetail/:id',
              name: 'PackSchemeDetail',
              component: () => import('./views/logistics/scheme/SchemeDetail.vue')
            },
            {
              path: 'PackSchemeLibrary',
              name: 'PackSchemeLibrary',
              component: () => import('./views/logistics/scheme/PackSchemeLibrary.vue'), 
              children: [
                {
                  path: 'class/:id/:childrenId',
                  name: 'PackClass',
                  component: () => import('./views/logistics/scheme/Clazz.vue')
                },
                {
                  path: 'class/:id/scheme/:goodId/:name',
                  //path: 'search/list?searchWord',
                  name: 'PackGood',
                  component: () => import('./views/logistics/scheme/Good.vue')
                },
                {
                  path: 'class/:id/scheme/:goodId/:name/:secId',
                  name: 'PackGood2',
                  component: () => import('./views/logistics/scheme/Good.vue')
                }
              ]
            }
          ]
        },
        {
          path: 'solution',
          name: 'Solution',
          component: () => import('./views/logistics/Solution.vue'),
        },
        {
          path: 'reporter',
          name: 'Reporter',
          component: () => import('./views/logistics/Reporter.vue'),
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      // if (to.params.childrenIndex) {
      //   console.log('childIndex: ', to.params.childrenIndex)
      //   const offsetY = to.params.childrenIndex * 213 + 34
      //   return { x: 0, y: offsetY }
      // }
      // console.log('scrollBehavior: ', to)
      return { x: 0, y: 0 }
    }
  }
})
