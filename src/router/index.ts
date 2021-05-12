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
        { path: '/overview', name: 'Overview', component: Overview },
        {
          path: '/userCenter',
          name: 'UserCenter',
          component: UserCenter
        },
        {
          path: '/userAccount',
          name: 'UserAccount',
          component: UserAccount
        },
        {
          path: '/adminAccount',
          name: 'AdminAccount',
          component: AdminAccount
        },
        {
          path: '/bookManagement',
          name: 'BookManagement',
          component: BookManagement
        },
        {
          path: '/sortParams',
          name: 'SortParams',
          component: SortParams
        },
        {
          path: '/booksSort',
          name: 'BooksSort',
          component: BooksSort
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
  // to：将要访问的路径 from：代表从哪个路径调转而来 next：放行  next('/login') 强制调转到某路径
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
