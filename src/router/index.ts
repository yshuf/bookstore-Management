import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import Layout from '@/layout/noLayout.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    /* {
      path: '/',
      redirect: 'mapOverview',
      component: () => import('@/views/mapBuild/index.vue'),
      meta: { title: '地图建设', icon: 'dashboard', affix: true },
      children: [{
        path: '/mapOverview',
        name: 'mapOverview',
        meta: {
          title: '地图概览'
        },
        component: () => import('@/views/mapBuild/overview.vue')
      }]
    }, */
    {
      path: '/',
      redirect: '/homePage',
      component: Layout,
      children: [
        {
          path: 'homePage',
          name: 'homePage',
          component: () => import('@/views/homePage/index.vue'),
          meta: { title: '首页', icon: 'dashboard', affix: true }
        }
      ]
    }, // 重定向
    /*  {
      path: '/homePage',
      name: 'homePage',
      component: () => import('@/views/homePage/index.vue'),
      meta: { title: '门户首页', icon: 'dashboard', affix: true }
    }, */
    {
      path: '/echartsPage',
      name: 'echartsPage',
      component: () => import('@/views/echartsPage/index.vue'),
      meta: { title: '图表首页', icon: 'dashboard', affix: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Login.vue'),
      meta: { title: '登录', icon: 'dashboard', affix: true }
    },
    {
      path: '/login/forgetPwd',
      name: 'forgetPwd',
      component: () => import('@/views/login/forgetPwd/index.vue'),
      meta: { title: '登录', icon: 'dashboard', affix: true }
    },
    {
      path: '/map_build',
      redirect: 'mapOverview',
      component: () => import('@/views/mapBuild/index.vue'),
      meta: { title: '地图建设', icon: 'dashboard', affix: true },
      children: [{
        path: '/mapOverview',
        name: 'mapOverview',
        meta: {
          title: '地图概览'
        },
        component: () => import('@/views/mapBuild/overview.vue')
      }]
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      redirect: '/overview',
      children: [
        {
          path: '/overview',
          name: 'Overview',
          meta: {
            title: '概览统计'
          },
          component: () => import('@/views/overview.vue')
        },
        {
          path: '/userCenter',
          name: 'UserCenter',
          meta: {
            title: '个人中心'
          },
          component: () => import('@/views/userCenter.vue')
        },
        {
          path: '/userAccount',
          name: 'UserAccount',
          meta: {
            title: '用戶账号'
          },
          component: () => import('@/views/userAccount.vue')
        },
        {
          path: '/ele-component',
          name: 'ele-component',
          meta: {
            title: '基于elementui封装的组件'
          },
          component: () => import('@/views/eleComponent/index.vue')
        },
        {
          path: '/adminAccount',
          name: 'AdminAccount',
          meta: {
            title: '员工账号'
          },
          component: () => import('@/views/adminAccount.vue')
        },
        {
          path: '/bookManagement',
          name: 'BookManagement',
          meta: {
            title: '书籍列表'
          },
          component: () => import('@/views/book-management/bookManagement.vue')
        },
        {
          path: '/sortParams',
          name: 'SortParams',
          meta: {
            title: '分类参数'
          },
          component: () => import('@/views/book-management/sortParams.vue')
        },
        {
          path: '/booksSort',
          name: 'BooksSort',
          meta: {
            title: '书籍分类'
          },
          component: () => import('@/views/book-management/booksSort.vue')
        },
        {
          path: '/riskOverview',
          name: 'RiskOverview',
          meta: {
            title: '风险概览'
          },
          component: () => import('@/views/riskOverview.vue')
        },
        {
          path: '/download',
          name: 'DownLoad',
          meta: {
            title: '下载中心'
          },
          component: () => import('@/views/download.vue')
        },
        {
          path: '/previewPdf',
          name: 'PreviewPDF',
          meta: {
            title: 'pdf下载'
          },
          component: () => import('@/views/pdf/previewPdf.vue')
        }
      ]
    }
  ]
});
// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routers
// });

const whiteList = ['/homePage', '/login', '/echartsPage', '/map_build', '/mapOverview'];

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title; // 要现实的title
  }

  const tokenStr = window.sessionStorage.getItem('token');
  if (tokenStr) {
    next();
  } else {
    // to：将要访问的路径 from：代表从哪个路径调转而来 next：放行  next('/login') 强制调转到某路径
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
      NProgress.done();
    };
  }
});

export default router;
