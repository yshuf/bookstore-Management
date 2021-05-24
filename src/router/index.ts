import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Overview from '../views/overview.vue'
import UserCenter from '../views/userCenter.vue'
import UserAccount from '../views/userAccount.vue'
import AdminAccount from '../views/adminAccount.vue'
import BookManagement from '../views/bookManagement.vue'
import SortParams from '../views/sortParams.vue'
import BooksSort from '../views/booksSort.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' }, // 重定向
    { path: '/login', name: 'Login', component: Login },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/overview',
      children: [
        {
          path: '/overview', name: 'Overview',
          meta: {
            title:'概览统计'
          },
          component: () =>
          import('@/views/overview.vue')
        },
        {
          path: '/userCenter',
          name: 'UserCenter',
          meta: {
            title:'个人中心'
          },
          component: () =>
          import('@/views/userCenter.vue')
        },
        {
          path: '/userAccount',
          name: 'UserAccount',
          meta: {
            title:"用戶账号"
          },
          component:  () =>
          import('@/views/userAccount.vue')
        },
        {
          path: '/adminAccount',
          name: 'AdminAccount',
          meta: {
            title:"员工账号"
          },
          component:  () =>
          import('@/views/adminAccount.vue')
        },
        {
          path: '/bookManagement',
          name: 'BookManagement',
          meta: {
            title:"书籍列表"
          },
          component:  () =>
          import('@/views/bookManagement.vue')
        },
        {
          path: '/sortParams',
          name: 'SortParams',
          meta: {
            title:"分类参数"
          },
          component: () =>
          import('@/views/sortParams.vue')
        },
        {
          path: '/booksSort',
          name: 'BooksSort',
          meta: {
            title:"书籍分类"
          },
          component: () =>
          import('@/views/booksSort.vue')
        },
        {
          path: '/riskOverview',
          name: 'RiskOverview',
          meta: {
            title: "风险概览"
          },
          component: () =>
            import('@/views/riskOverview.vue')
        }
      ]
    }
  ]
})
// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routers
// });

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title  // 要现实的title
  }
  // to：将要访问的路径 from：代表从哪个路径调转而来 next：放行  next('/login') 强制调转到某路径
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
